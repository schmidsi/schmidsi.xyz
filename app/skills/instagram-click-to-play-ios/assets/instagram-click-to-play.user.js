// ==UserScript==
// @name         Instagram click to play
// @description  Stops Instagram videos and reels from autoplaying (tap a video to play it). Hides the stories bar and the notes bar in messages, and removes the tag behind Safari's App Store banner.
// @version      2.3
// @match        https://*.instagram.com/*
// @run-at       document-start
// @inject-into  content
// ==/UserScript==
(() => {
  const HIDE_STORIES_BAR = true; // the row of stories at the top of the home feed
  const HIDE_NOTES_BAR = true;   // the row of notes at the top of the messages inbox
  const HIDE_APP_BANNER = true;  // Safari's App Store banner (not the "Open" banner iOS shows while the app is installed)
  // The first item of each row, as Instagram labels it in your language. Add yours if it is not English.
  const STORY_LABELS = ['Your story'];
  const NOTE_LABELS = ['Your note'];

  // ---- 1. Tap to play -------------------------------------------------------------------------
  // guard() runs twice: in the extension's content world (event guard, immune to Instagram's
  // script policy) and in the page's own world (play() override). It must not use outer variables.
  const guard = (inPage) => {
    if (inPage) { if (window.__igClickToPlay) return null; window.__igClickToPlay = true; }
    const EXEMPT = /^\/(stories|call|groupcall)\//; // stories and calls keep playing normally
    const TAP_MS = 1000; // playback that starts this soon after a tap on the video counts as yours
    let tap = { t: -1e9, x: -1, y: -1 }, down = null;
    const hit = (v, x, y) => {
      const r = v.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    };
    const allowed = (v) => EXEMPT.test(location.pathname)
      || !!v.webkitDisplayingFullscreen || (v.webkitPresentationMode || 'inline') !== 'inline' // native fullscreen, picture in picture
      || (performance.now() - tap.t < TAP_MS && hit(v, tap.x, tap.y));
    const opts = { capture: true, passive: true };
    addEventListener('touchstart', (e) => {
      const p = e.touches[0];
      down = e.touches.length === 1 ? {
        x: p.clientX, y: p.clientY,
        v: inPage ? null : [...document.querySelectorAll('video')].find((v) => v.paused && hit(v, p.clientX, p.clientY)),
      } : null;
    }, opts);
    addEventListener('touchend', (e) => {
      const p = e.changedTouches[0], d = down;
      down = null;
      if (!d || !p || Math.hypot(p.clientX - d.x, p.clientY - d.y) > 12) return; // a swipe, not a tap
      tap = { t: performance.now(), x: p.clientX, y: p.clientY };
      // a tap on a paused video: if Instagram's own tap handling has not started it, start it
      if (d.v) setTimeout(() => { if (d.v.isConnected && d.v.paused && allowed(d.v)) d.v.play().catch(() => {}); }, 350);
    }, opts);
    addEventListener('click', (e) => {
      if (e.isTrusted && (e.clientX || e.clientY)) tap = { t: performance.now(), x: e.clientX, y: e.clientY };
    }, opts);

    if (inPage) {
      // Instagram starts videos with play() from scroll and visibility handlers. Refuse those the
      // way Safari itself refuses autoplay, so Instagram treats the video as not started.
      const proto = HTMLMediaElement.prototype, play = proto.play;
      proto.play = function () {
        if (!(this instanceof HTMLVideoElement) || allowed(this)) return play.apply(this, arguments);
        return Promise.reject(new DOMException('Autoplay blocked, tap the video to play', 'NotAllowedError'));
      };
      return null;
    }

    // Backstop that needs no access to Instagram's code: whatever starts a video, a start that
    // did not come from a tap on it is paused again.
    const ok = new WeakSet(); // videos you started
    document.addEventListener('play', (e) => {
      const v = e.target;
      if (!(v instanceof HTMLVideoElement)) return;
      if (allowed(v)) ok.add(v); else v.pause();
    }, true);
    document.addEventListener('pause', (e) => { ok.delete(e.target); }, true);
    return () => {
      if (EXEMPT.test(location.pathname)) return;
      for (const v of document.querySelectorAll('video')) {
        if (v.autoplay) v.autoplay = false;
        if (!v.controls) v.controls = true; // the native play button
        if (!v.paused && !ok.has(v) && !allowed(v)) v.pause(); // already playing when this script started
      }
    };
  };

  const sweep = guard(false);

  // Instagram only runs scripts that carry its nonce, so the page-world copy borrows the nonce of
  // one of Instagram's own script tags. If that is refused, the event guard above still works.
  const code = `(${guard})(true);`;
  let injected = false;
  const inject = () => {
    if (injected) return;
    const own = document.querySelector('script[nonce]');
    if (!own && document.readyState === 'loading') return; // wait for Instagram's first script
    injected = true;
    const tag = document.createElement('script');
    if (own) tag.nonce = own.nonce;
    try { tag.textContent = code; } catch { return; }
    (document.head || document.documentElement).append(tag);
    tag.remove();
  };

  // ---- 2. Safari's app banner -----------------------------------------------------------------
  // Safari draws its App Store banner from this tag, so the tag is removed the moment it appears
  // (Instagram puts it back as you move around). The "Open in the Instagram app" banner that iOS
  // shows while the app is installed comes from the app itself, and no script can remove that one.
  const dropBanner = (root) => {
    if (!HIDE_APP_BANNER || !root) return;
    for (const m of root.querySelectorAll('meta[name="apple-itunes-app"]')) m.remove();
  };

  // ---- 3. Stories bar (home) and notes bar (messages) -----------------------------------------
  // Instagram's class names change all the time, so the rows are found by what they are: its own
  // markers where it has them, else the story rings or the "Your story" / "Your note" item. What
  // gets hidden is the row itself, never something that also holds a post, a chat or a text field.
  const RINGS = 'canvas, [aria-label*="story" i]';
  const NEVER = 'article, input, textarea, nav, a[href^="/direct/t/"], [role="tablist"]';
  // what makes an element "something": content, a control, or a part Instagram has given a name or a role
  const STUFF = 'img, svg, canvas, video, input, textarea, button, a[href], article, [aria-label], [data-pagelet], [role]:not([role="presentation"]):not([role="none"])';
  const bars = { stories: null, notes: null }; // per row: { row, top, folds, known, opens }
  const retry = { stories: 0, notes: 0 };
  const gone = (el) => { if (el.style.display !== 'none') el.style.setProperty('display', 'none', 'important'); };
  const outer = (el) => !el || el === document.body || el === document.documentElement || el.tagName === 'MAIN';
  const SKIP = /^(SCRIPT|STYLE|LINK|META|NOSCRIPT|TEMPLATE)$/;
  const hollow = (el) => SKIP.test(el.tagName) || (!el.matches(STUFF) && !el.querySelector(STUFF) && !el.textContent.trim());
  // a part of a wrapper that nobody would miss: an empty spacer, or a small control such as the
  // row's own scroll arrow. A part of no height is not counted: it may be a slot Instagram fills later.
  const tiny = (el) => {
    if (SKIP.test(el.tagName)) return true;
    const r = el.getBoundingClientRect();
    if (!(r.height > 0) || el.matches(NEVER) || el.querySelector(NEVER)) return false;
    return (r.height <= 48 && hollow(el)) || (r.height <= 64 && r.width <= 64);
  };
  // real content comes after this element (inside the same main area)
  const followed = (el) => {
    for (let n = el; !outer(n); n = n.parentElement) for (let s = n.nextElementSibling; s; s = s.nextElementSibling) if (!hollow(s)) return true;
    return false;
  };
  // The largest wrapper around `from` (a hidden row, or a wrapper already folded) that holds
  // nothing else, so that no blank space stays where the row was. A wrapper is only taken when the
  // rest of it is tiny (see above), and when real content already follows it: one still waiting
  // for its own content is left alone.
  const shell = (from) => {
    let top = from;
    for (let p = from.parentElement; !outer(p); p = p.parentElement) {
      if (p.getBoundingClientRect().height > 400 || !followed(p)) break;
      if (![...p.children].every((c) => c === top || tiny(c))) break;
      top = p;
    }
    return top;
  };
  // Folding a wrapper: no height and nothing shown, but still laid out at its full width.
  // (Hidden outright it has no width; Instagram then takes the row for overflowing and adds a
  // scroll arrow inside, and v2.2 answered that by showing the wrapper again: the flicker.)
  // What is inside a folded wrapper can still be measured, which grown() relies on.
  const FOLD = [['max-height', '0'], ['min-height', '0'], ['padding-top', '0'], ['padding-bottom', '0'], ['margin-top', '0'], ['margin-bottom', '0'],
    ['border-top-width', '0'], ['border-bottom-width', '0'], ['overflow', 'hidden'], ['opacity', '0'], ['visibility', 'hidden'], ['pointer-events', 'none']];
  const fold = (bar, el) => {
    const was = FOLD.map(([k]) => [k, el.style.getPropertyValue(k), el.style.getPropertyPriority(k)]);
    for (let n = bar.top; n !== el; n = n.parentElement) for (const c of n.parentElement.children) bar.known.add(c);
    for (const [k, v] of FOLD) el.style.setProperty(k, v, 'important');
    bar.folds.push({ el, was, base: el.scrollHeight });
    bar.top = el;
  };
  const open = (bar) => {
    for (const f of bar.folds.reverse()) if (f.el.isConnected) for (const [k, v, pr] of f.was) v ? f.el.style.setProperty(k, v, pr) : f.el.style.removeProperty(k);
    bar.folds = []; bar.known = new Set(); bar.top = bar.row;
  };
  // Has something real turned up inside a folded wrapper? A text field, a post or a chat; content
  // that makes it taller; or a new part that is more than tiny.
  const grown = (bar) => {
    for (const f of bar.folds) if (!f.el.isConnected || f.el.querySelector(NEVER) || f.el.scrollHeight > f.base + 80) return true;
    for (let n = bar.row; n !== bar.top; n = n.parentElement) {
      if (!n.parentElement) return true;
      for (const c of n.parentElement.children) {
        if (c === n || bar.known.has(c) || SKIP.test(c.tagName)) continue;
        if (!tiny(c) && getComputedStyle(c).position !== 'absolute') return true; // absolute: an overlay on the row, not page content
      }
    }
    return false;
  };
  // Keep a found row hidden, and fold the empty wrappers around it as the page fills in. If
  // something real turns up inside a folded wrapper, it is shown again; after the second time the
  // wrappers of this row are left alone for good, so the page can never keep flipping.
  // False when there is no row to keep.
  const settle = (kind) => {
    const bar = bars[kind];
    if (!bar) return false;
    if (!bar.row.isConnected) { open(bar); bars[kind] = null; return false; }
    gone(bar.row);
    if (bar.folds.length && grown(bar)) { open(bar); bar.opens++; return true; }
    if (bar.opens >= 2) return true;
    const top = shell(bar.top);
    if (top !== bar.top) fold(bar, top);
    return true;
  };
  const hide = (kind, row) => { bars[kind] = { row, top: row, folds: [], known: new Set(), opens: 0 }; settle(kind); };
  // Off the page a row belongs to (Instagram swaps pages in place and may reuse the same boxes for
  // other content): give everything back.
  const drop = (kind) => {
    const bar = bars[kind];
    if (!bar) return;
    open(bar);
    if (bar.row.isConnected) bar.row.style.removeProperty('display');
    bars[kind] = null;
  };
  const labelled = (scope, labels) => {
    for (const label of labels) {
      const node = document.evaluate(`.//text()[normalize-space()=${JSON.stringify(label)}]`, scope, null, 9, null).singleNodeValue;
      if (node && node.parentElement) return node.parentElement;
    }
    return null;
  };
  // From an element inside a row to the row: the first ancestor that spans the screen. Null when
  // that is not a row (too tall, or it holds a post, a chat or a text field).
  const rowOf = (start) => {
    let box = start;
    while (box && box.getBoundingClientRect().width < innerWidth * 0.7) box = box.parentElement;
    return !box || outer(box) || box.getBoundingClientRect().height > 300 || box.querySelector(NEVER) ? null : box;
  };
  const hideStories = () => {
    if (!HIDE_STORIES_BAR) return;
    if (location.pathname !== '/') return drop('stories');
    if (settle('stories') || performance.now() < retry.stories) return;
    const scope = document.querySelector('main') || document.body;
    if (!scope) return;
    const first = scope.querySelector('article'); // the first post
    const above = (el) => !el.closest('article') && (!first || !!(first.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_PRECEDING));
    // Instagram's own markers for the tray
    for (const el of scope.querySelectorAll('[data-pagelet="story_tray"], [role="menu"]')) {
      if (el.querySelector(NEVER) || !above(el)) continue;
      if (el.matches('[data-pagelet="story_tray"]') || el.querySelectorAll(RINGS).length >= 2) return hide('stories', el);
    }
    // No marker: wait for the first post, so that "above the first post" means something
    if (!first) return;
    const rings = [...scope.querySelectorAll(RINGS)].filter(above);
    let start = null;
    if (rings.length >= 2) { start = rings[0].parentElement; while (start && !rings.every((r) => start.contains(r))) start = start.parentElement; }
    else { const own = labelled(scope, STORY_LABELS); if (own && above(own)) start = own; }
    if (!start) return;
    const row = rowOf(start);
    if (row && !row.contains(first)) hide('stories', row); else retry.stories = performance.now() + 2000;
  };
  const hideNotes = () => {
    if (!HIDE_NOTES_BAR) return;
    if (!/^\/direct\/(inbox\/?)?$/.test(location.pathname)) return drop('notes');
    if (settle('notes') || performance.now() < retry.notes) return;
    const scope = document.querySelector('main') || document.body;
    const own = scope && labelled(scope, NOTE_LABELS);
    if (!own) return;
    const row = rowOf(own);
    if (row) hide('notes', row); else retry.notes = performance.now() + 2000;
  };
  let styled = false;
  const addStyle = () => {
    if (styled || !HIDE_STORIES_BAR || !document.documentElement) return;
    styled = true; // no flash where Instagram marks the tray itself
    const style = document.createElement('style');
    style.textContent = 'main [data-pagelet="story_tray"]{display:none!important}';
    document.documentElement.append(style);
  };

  // ---- run ------------------------------------------------------------------------------------
  let timer = 0;
  const tick = () => { timer = 0; inject(); addStyle(); sweep(); dropBanner(document); hideStories(); hideNotes(); };
  new MutationObserver(() => {
    inject();
    dropBanner(document.head); // at once, before Safari reads the tag
    if (!timer) timer = setTimeout(tick, 100);
  }).observe(document, { childList: true, subtree: true, attributes: true, attributeFilter: ['name'] });
  document.addEventListener('DOMContentLoaded', tick);
  tick();
})();
