# Dr. Shivani Medical & Dental Care — Clinic Website

Website for Dr. Shivani Singh's dental + skin + aesthetics clinic in Delhi.  
Live at **[drshivanisingh.com](https://drshivanisingh.com)**

---

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router, `output: standalone`) |
| Styling | Tailwind CSS v4 |
| Language | TypeScript |
| Hosting | Azure App Service Linux — Central India |
| CI/CD | GitHub Actions → auto-deploys on push to `main` |
| Domain | GoDaddy — drshivanisingh.com |

---

## Local Development

```bash
npm install
npm run dev          # http://localhost:3000 (uses Turbopack)
```

> **Windows gotcha:** If Turbopack crashes with "reading file …\nul", delete any file
> named `nul` in the project root — it is a reserved Windows device name.
> `rm nul`

---

## Building for Production

```bash
npm run build
```

The build outputs to `.next/standalone/`. To run it locally:

```bash
cp -r .next/static    .next/standalone/.next/static
cp -r public          .next/standalone/public
node .next/standalone/server.js     # listens on $PORT or 3000
```

---

## Deploying to Azure

**Just push to `main`** — GitHub Actions handles everything automatically.

```bash
git add <files>
git commit -m "your message"
git push origin main
```

Monitor the run: <https://github.com/iamankit123/clinicV1/actions>  
The full build + deploy takes ~4 minutes.

### How the workflow works (`/.github/workflows/main_clinic-website-v1-web.yml`)

```
1. checkout + npm ci + next build          (ubuntu-latest, Node 20)
2. cp .next/static → .next/standalone/.next/static
   cp public       → .next/standalone/public
3. cd .next/standalone && zip -r ../../deploy.zip .   ← CRITICAL STEP
4. upload deploy.zip as GitHub artifact
5. download artifact in deploy job
6. az webapp config appsettings set ...    (sets PORT, HOSTNAME, Node version)
7. azure/webapps-deploy  package=deploy.zip  startup-command="node server.js"
```

### ⚠️ Critical deployment rule — never remove the zip step

`upload-artifact` silently **drops hidden directories** (like `.next`) when you
hand it a raw folder. Zipping first with `zip -r` preserves them.

If you ever see this error in the Azure log stream:
```
Error: Could not find a production build in the './.next' directory
```
it means the zip step was removed or bypassed. Add it back and re-deploy.

### Azure resources

| Resource | Value |
|----------|-------|
| Resource group | `clinic-website-v1` |
| App Service name | `clinic-website-v1-web` |
| Default Azure URL | `clinic-website-v1-web-c6c8asakhpcahcam.centralindia-01.azurewebsites.net` |
| Custom domain | `drshivanisingh.com` |
| Region | Central India |
| Node version | 20 |
| Startup command | `node server.js` |

App settings set by the workflow:
```
HOSTNAME=0.0.0.0
PORT=8080
SCM_DO_BUILD_DURING_DEPLOYMENT=false
WEBSITE_NODE_DEFAULT_VERSION=~20
```

---

## Project Structure

```
src/
  app/
    page.tsx                  # Home — hero, gallery, testimonials, CTA
    about/page.tsx            # Doctor profile + clinic gallery
    services/page.tsx         # All 27+ treatments (3 categories)
    contact/page.tsx          # Contact form + Google Maps embed
    book-appointment/page.tsx # Appointment booking form
    prescription/page.tsx     # Clinic info card
    layout.tsx                # Root layout (Navbar + Footer)
    globals.css               # Color theme, animations, utilities
  components/
    Navbar.tsx
    Footer.tsx
    AnimateOnScroll.tsx
    SectionHeading.tsx
    ServiceCard.tsx
    TestimonialCard.tsx       # Single review card (expandable text)
    TestimonialsCarousel.tsx  # Scrollable carousel wrapping TestimonialCard
  lib/
    constants.ts              # ← ALL clinic data lives here
public/
  clinic-images/              # 4 real clinic photos (clinic1–4.png)
clinic-docs/                  # Source files: prescription PDF + original photos
```

## Updating Content

**Everything** — address, phones, email, hours, doctor bio, treatments,
testimonials — lives in one file: **`src/lib/constants.ts`**.

Edit that file and push. No other file needs to change for content updates.

---

## Troubleshooting

### Azure shows "Application Error"
Check the log stream:
```
https://clinic-website-v1-web-c6c8asakhpcahcam.scm.centralindia-01.azurewebsites.net/api/logstream
```
Most likely cause: the `.next` zip step was removed. See critical rule above.

### `npm run dev` Turbopack crash
Delete the `nul` file from the project root (Windows reserved device name):
```bash
rm nul
```

### drshivanisingh.com redirects to wrong site
The GoDaddy Domain Forwarding rule is still active. In GoDaddy DNS:
1. Delete the Forwarding/Redirect entry
2. Confirm A record for `@` points to Azure IP
3. Confirm CNAME for `www` points to the Azure default domain

### TypeScript errors after editing components
Run `npm run build` — it will show exact file + line. The most common issue
is passing a prop with a wrong field name (e.g. `treatment` vs `date` on
`TestimonialCard` — the component expects `date`).

---

## Claude Code Skill

A `/clinic-test` skill is installed at `~/.claude/skills/clinic-test.md`.  
It builds, runs, and visually tests this site in Edge via Playwright.

Invoke it with: `/clinic-test`
