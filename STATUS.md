# Project Status — Dr. Shivani Clinic Website

> Auto-managed by Claude. Max 20 entries. Newest at top.
> After each session, Claude prepends a new entry and removes oldest if count exceeds 20.

---

## [2026-05-05] Project infrastructure — skills, CLAUDE.md, STATUS.md
- Created `.claude/commands/` with 6 project-local skills: `/dev`, `/content`, `/test`, `/ux-review`, `/portal`, `/debug`
- Created `CLAUDE.md` at project root for persistent Claude session context
- Created this `STATUS.md` file for change tracking
- Migrated global `/clinic-test` skill coverage into project-local `/test` and `/ux-review`

## [2026-05-04] Booking form fix + gallery alt text + README rewrite
- Fixed `/api/book-appointment`: removed hard 503 when Cosmos DB not configured; now returns `ok:true` and logs to console
- Swapped hero photo → `clinic3.png` (dental treatment room), About Preview → `clinic2.png` (waiting area)
- Fixed gallery alt text to match actual photo content (clinic1=exterior, clinic2=waiting, clinic3=dental, clinic4=consultation)
- Rewrote `README.md` with full stack table, build/deploy guide, critical zip rule, troubleshooting
- Pushed: commit `2a0da2b`

## [2026-05-03] Visual review + carousel + admin page
- Built `TestimonialsCarousel.tsx` — horizontal scrollable carousel wrapping `TestimonialCard`
- Fixed `TestimonialCard` to use `date` field (was `treatment`)
- Added `/admin` page for internal appointments viewer (Cosmos DB integration)
- Added `no-scrollbar` utility to `globals.css`
- Pushed: commit `dd8e86c`

## [2026-05-03] Azure deployment fix — critical zip step
- Root cause: `upload-artifact@v4` silently drops hidden dirs (`.next`) from raw folder paths
- Fix: added `zip -r ../../deploy.zip .` in workflow before artifact upload
- Changed deploy step to use `package: deploy.zip`
- App settings: `PORT=8080`, `HOSTNAME=0.0.0.0`, `SCM_DO_BUILD_DURING_DEPLOYMENT=false`
- Pushed: commit `3893920`

## [2026-05-03] Initial content, photos, domain, address update
- Added 4 real clinic photos to `public/clinic-images/` (clinic1–4.png)
- Updated address → Khasra No. 391, Main Kushak Road, Block J, Swaroop Nagar, Bhalswa, Delhi - 110042
- Fixed Google Maps embed URL with correct coordinates for the clinic
- Updated `TESTIMONIALS` with real Google Maps reviews (Riya Vaish, Nitin Rana, Krishan Bhan Singh, etc.)
- Linked drshivanisingh.com to Azure — GoDaddy DNS updated by user (may still have forwarding rule active)
- Cosmos DB not configured — appointments log to console
- Pushed: commit `679c38e`

---

## Current known issues
- drshivanisingh.com may still redirect to lovable.app — GoDaddy forwarding rule may still be active. Run `/debug` → Domain redirecting wrongly to investigate.
- Cosmos DB not configured — appointment bookings are not persisted, only logged to Azure console.
- Google Maps embed on /contact may not render in Playwright tests (iframe timing issue).
