---
name: dev
description: Development workflow — build, deploy, status check, or local setup. Asks what to do when invoked.
allowed-tools: Bash Read Edit Glob Grep
---

# /dev — Development Workflow

Project root: `D:\Personal\clinic`
GitHub: https://github.com/iamankit123/clinicV1
Azure: https://clinic-website-v1-web-c6c8asakhpcahcam.centralindia-01.azurewebsites.net

## Step 1 — Ask what to do

Ask the user:
> What would you like to do?
> 1. **Build** — compile and type-check locally
> 2. **Deploy** — build → commit → push → monitor Azure deployment
> 3. **Status** — check if Azure URL and domain are live
> 4. **Setup** — install dependencies and prepare local environment

---

## Build

```bash
cd D:/Personal/clinic && npm run build
```

- TypeScript errors → show file:line, explain the fix
- Build success → confirm `.next/standalone/` was created
- **Never proceed to Deploy if build fails**

---

## Deploy

1. Run Build first. Stop if it fails.
2. Show a `git diff --stat` so the user sees what will be committed.
3. Ask for a commit message or suggest one based on changes.
4. Stage only source files — never `node_modules/`, `.next/`, `screenshots/`, `*.js` debug scripts in root, or `nul`:
   ```bash
   git add src/ public/ .github/ .claude/ CLAUDE.md STATUS.md README.md next.config.* tsconfig.* tailwind.* package*.json
   ```
5. Commit and push:
   ```bash
   git commit -m "<message>\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
   git push origin main
   ```
6. Monitor GitHub Actions until complete:
   ```bash
   gh run list --limit 1
   ```
7. After success, run the Status check below.
8. Update `STATUS.md` with a timestamped entry.

**Critical:** Never remove or modify the `zip -r` step in the workflow file. It preserves `.next/` hidden directory for Azure. Removing it causes "Could not find production build" error.

---

## Status

Check three things and report ✅ or ❌ for each:

```bash
# GitHub Actions — last run
gh run list --limit 1

# Azure default URL
curl -s -o /dev/null -w "%{http_code}" https://clinic-website-v1-web-c6c8asakhpcahcam.centralindia-01.azurewebsites.net

# Custom domain
curl -s -o /dev/null -w "%{http_code}" https://drshivanisingh.com
```

If Azure returns non-200, suggest running `/debug`.

---

## Setup

```bash
cd D:/Personal/clinic && npm install
node --version   # must be 20+
```

Tell the user to start the dev server with:
```bash
npm run dev -- --port 3001
```

Windows gotcha: if Turbopack crashes with "reading file …\nul", run `rm nul` to delete the reserved device name file.
