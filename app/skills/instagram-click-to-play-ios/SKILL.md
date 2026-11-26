---
name: instagram-click-to-play-ios
description: Stop Instagram videos and reels from autoplaying on iPhone by using instagram.com in Safari with a userscript (tap a video to play it), and optionally hide the stories bar and the notes bar in messages. Use when the user wants Instagram without autoplay on iOS, when a userscript that overrides play() only half works on Instagram, when hidden rows leave blank space or flicker, or when the script stops working from a Home Screen icon.
---

# Instagram without autoplay on iPhone

**Download the script:** [instagram-click-to-play.user.js](assets/instagram-click-to-play.user.js) (v2.3)

The Instagram app has no setting that stops video autoplay, and iOS has none either
(Settings > Accessibility > Motion > Auto-Play Video Previews only covers Apple's apps).
What works is instagram.com in Safari with a userscript. The script in
[`assets/instagram-click-to-play.user.js`](assets/instagram-click-to-play.user.js) does
three things, each with a switch at the top of the file:

- **Tap to play:** no video or reel starts by itself, in the feed, on profiles or in DMs.
  A tap on a video plays it. Stories and calls play as normal.
- **Stories bar** on the home feed and **notes bar** in the messages inbox are hidden, and
  the space they took is collapsed.
- **App Store banner:** the `apple-itunes-app` tag is removed as soon as Instagram adds it.

Version 2.3, verified on an iPhone in Safari with the Userscripts app, and on the real
mobile site in a Chromium browser at 402 x 874. Instagram changes its markup often, so
expect to adjust it now and then (see "When it breaks").

## Install

1. Install the **Userscripts** Safari extension from the App Store (free, open source,
   github.com/quoid/userscripts).
2. iOS Settings > Apps > Safari > Extensions > Userscripts: turn it on and set
   instagram.com (or All Websites) to Allow.
3. Download the script in Safari on the iPhone (link above; it lands in Files >
   Downloads), then move it into the Userscripts folder (On My iPhone > Userscripts; the
   folder icon in the extension's popup opens that location). The popup may have no "+"
   button, so the file route is the reliable one. If iOS saves it as `.js.txt`, rename it
   to end in `.user.js`.
4. Open instagram.com in Safari, open the Userscripts popup (the puzzle or AA icon) once,
   then reload. **Changed or new files are only picked up after the popup has been opened**,
   so do this after every update.

Check: a reel in the feed shows a paused frame with a play control and starts on a tap.

## Things that look like bugs but are iOS

- **Home Screen icon bypasses the script.** Since iOS 26, a site added to the Home Screen
  opens as a web app by default, and Safari extensions do not run in iOS web apps. Delete
  the icon and add it again with Share > Add to Home Screen, turning **off "Open as Web
  App"** before tapping Add. The mode is fixed at creation. If that icon lands in another
  browser or in the Instagram app, make a Shortcut with one "Open URLs" action for
  `x-safari-https://www.instagram.com/` and put the Shortcut on the Home Screen instead.
- **The "Open in the Instagram app" banner stays.** While the app is installed, iOS shows
  that banner because of Instagram's universal links, not because of the page's tag, and no
  script can remove it. It goes away only if the app is deleted. Removing the tag only
  stops the App Store variant, shown when the app is not installed.
- **The notes row language.** The rows are found partly by their first item's label,
  `Your story` and `Your note`. For another Instagram language, add the label to
  `STORY_LABELS` / `NOTE_LABELS`.

## How the script works, and why

These are the lessons from the versions that did not work; keep them when editing.

1. **A plain `play()` override does nothing on Instagram.** Userscripts runs scripts in
   an isolated content world by default, so patching `HTMLMediaElement.prototype.play`
   there does not touch the page's prototype. Instagram also only runs scripts that carry
   its CSP nonce. The script therefore injects the override into the page with the nonce
   of one of Instagram's own `<script>` tags. Symptom of getting this wrong: posts stop
   autoplaying (a one-time pause) but reels in the feed still start.
2. **Instagram starts videos with `play()` from scroll and visibility handlers**, not with
   the `autoplay` attribute. The override rejects those calls with `NotAllowedError`, the
   way Safari refuses autoplay, so Instagram treats the video as not started.
3. **Backstop in the content world:** a capturing `play` event listener pauses any video
   whose start did not follow a tap on that video. This works even if the injection is
   refused.
4. **What counts as a tap:** a touch that moved less than 12 px, on the video's rectangle,
   within 1 s before playback. If Instagram's own tap handling does not start a paused
   video, the script starts it. Native fullscreen and picture in picture are allowed.
5. **Rows are found by what they are, not by class names:** Instagram's own marker
   (`data-pagelet="story_tray"`) first, else story rings above the first post, else the
   label of the first item. A candidate is rejected if it contains a post, a chat link, a
   text field, a nav bar or a tab list, so the failure mode is a bar that stays, not
   content that disappears.
6. **Collapse by folding, never `display: none` on the wrappers.** Hiding only the row
   leaves a blank area, so the empty wrappers around it must go too. Hidden outright, a
   wrapper has zero width; Instagram then thinks the row overflows and inserts a "Next"
   arrow, an earlier version read that as new content and showed the wrapper again, and the
   page flickered every ~110 ms. Folding (max-height 0, no padding or margin, hidden,
   width kept) avoids the loop. Small controls such as that arrow are ignored, zero-height
   empty boxes are never swallowed (they may be slots Instagram fills later), and a fold is
   undone at most twice before the script leaves that row's wrappers alone.
7. **Give everything back on navigation.** Instagram swaps pages in place and reuses
   boxes, so folds are released when the path is no longer `/` or `/direct/inbox/`.
8. **Safari's banner tag** is removed from inside the MutationObserver callback, before
   Safari reads it, because Instagram re-inserts it on navigation.

## When it breaks

There is no remote inspector by default, and the shell an agent gets rarely reaches a
phone over USB. What worked:

- **Real DOM, desktop browser:** open instagram.com in a browser the agent controls,
  signed in by the user (the agent must not type passwords), resized to 402 x 874 with a
  mobile user agent. Paste the script body into the page's console or a JS tool and
  measure: position of the "Messages" header and the first post before and after, number
  of layout jumps over 3 s via `requestAnimationFrame`, whether `window.__igClickToPlay`
  is set (injection worked), and `securitypolicyviolation` events.
- **Limits of that setup:** autoplay did not happen in that Chromium pane even without the
  script, so it cannot prove the tap-to-play part. Safari-only behaviour (the banner,
  Userscripts injection) needs the phone: the user can enable Settings > Apps > Safari >
  Advanced > Web Inspector and inspect from Safari's Develop menu on a Mac.
- **Mock page for regressions:** a local page with an IntersectionObserver that calls
  `play()`, a transparent overlay above each video, a nonce-only CSP, a re-inserted
  `apple-itunes-app` tag and both rows in several nestings, driven by Playwright with the
  script injected into an isolated world (`Page.addScriptToEvaluateOnNewDocument` with a
  `worldName`), reproduces most failures above before they reach the phone.
- **Screen recordings** from the user are useful for flicker: a contact sheet and
  frame-to-frame difference (ffmpeg `tblend=difference` + `signalstats`) show the period.

## Alternatives that were ruled out

- **Content blocker rules** (AdGuard user rules like `||cdninstagram.com^$media`): blocks
  video entirely, not click to play, and Instagram may stream video in ways `$media` does
  not catch. Untested.
- **Modified Instagram apps** (SCInsta, RyukGram) have an autoplay switch but need a
  jailbreak, TrollStore or sideloading, and break Meta's terms.
- **Other userscripts** found (insta-safari, insta-filter, REEL-BLOCK) remove reels or
  ads but none stops feed autoplay on iOS. instagram-autoplay-neutralizer does, for
  desktop Chrome only.
- **Own WKWebView wrapper app:** viable and fixes the Home Screen problem (script injected
  with `WKUserScript`, rule lists via `WKContentRuleList`, extensions via `WKWebExtension`
  since iOS 18.4, same JavaScript engine as Safari). Costs: Xcode builds signed with a free
  Apple ID expire after 7 days (paid program: about a year), a separate login, no push
  notifications. Prior art: Quiet Stories (aleksey-kutepov/quiet-stories).
