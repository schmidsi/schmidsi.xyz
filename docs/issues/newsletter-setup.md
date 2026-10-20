# Task: Newsletter for ses.eth.limo posts

Send new posts by email to opt-in subscribers. Optional: mirror to a Telegram channel.

## Stack

- **Sending**: [Resend](https://resend.com) — Broadcasts + Audiences (contacts, unsubscribe, List-Unsubscribe header built in). Free tier: 3,000 emails/month. No separate list manager (Listmonk) needed at this scale.
- **Spam pre-check**: [Postmark SpamCheck API](https://spamcheck.postmarkapp.com) — free, no account. POST raw email, returns SpamAssassin score.
- **Do not** relay through Fastmail — ToS prohibits duplicative/programmatic bulk mail; risks the account.

## Setup

- [ ] Pick a sending subdomain on a domain we control (e.g. `news.<domain>`). Cannot send from `ses.eth.limo` (no DNS control over eth.limo). Isolates newsletter reputation from personal mail.
- [ ] Add Resend DNS records on that subdomain: SPF, DKIM, DMARC (all three required per 2024 Gmail/Yahoo bulk-sender rules).
- [ ] Create Resend Audience + signup flow with double opt-in.
- [ ] Verify unsubscribe link renders and works.

## Send pipeline

1. Render post as email: HTML **plus plain-text part**.
2. POST raw email to Postmark SpamCheck.
   - Score < 3: send.
   - Score ≥ 3: review rule breakdown, fix, re-check.
3. Send via Resend Broadcast.

## Content rules (structural signals > word choice)

- Full URLs only — no shorteners.
- Low image-to-text ratio.
- Consistent from-address.
- Links to eth.limo / IPFS gateways are fine as full URLs.

## First sends

- Seed issue #1 to self-controlled Gmail + Outlook accounts; verify inbox placement (engagement/reputation on a fresh subdomain outweighs any spam score).
- Optional per-issue sanity check: [mail-tester.com](https://www.mail-tester.com).

## Telegram (optional, later)

- Create channel; automate via Bot API or an RSS-to-Telegram bot watching the feed. No deliverability concerns. Separate from email pipeline.
