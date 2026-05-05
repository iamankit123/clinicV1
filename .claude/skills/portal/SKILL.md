---
name: portal
description: Open Azure portal or GoDaddy in Chrome and navigate to the right section. Waits patiently at login screens for the user.
allowed-tools: Bash Write Read
---

# /portal — Open Azure or GoDaddy Portal

Opens the relevant admin portal in Chrome and navigates to the right section for this project. Pauses and waits whenever a login screen appears — never proceeds without the user being logged in.

## Step 1 — Ask which portal

Ask the user:
> Which portal?
> 1. **Azure** — App Service, deployment logs, app settings, log stream
> 2. **GoDaddy** — Domain DNS management for drshivanisingh.com

Optionally ask what task they want to do there (e.g. "check log stream", "update DNS record") so navigation can go deeper.

---

## Azure Portal

### Direct URLs (no login needed)

| Task | URL |
|------|-----|
| Real-time log stream | `https://clinic-website-v1-web-c6c8asakhpcahcam.scm.centralindia-01.azurewebsites.net/api/logstream` |

### Playwright script — Azure

```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: false });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto('https://portal.azure.com', { waitUntil: 'domcontentloaded', timeout: 30000 });

  console.log('>>> Please log in to Azure. Waiting up to 2 minutes...');
  await page.waitForSelector('[data-telemetryname="Dashboard"], .fxs-blade-title, [aria-label="Microsoft Azure"]', { timeout: 120000 });
  console.log('>>> Logged in. Navigating to App Service...');

  // Search for the App Service directly
  await page.goto('https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites', { waitUntil: 'networkidle', timeout: 30000 });

  console.log('>>> App Services list open. Browser will stay open — interact freely.');
  // Do NOT close — user continues from here
})();
```

---

## GoDaddy Portal

### Key URLs

| Task | URL |
|------|-----|
| DNS management | `https://dcc.godaddy.com/manage/drshivanisingh.com/dns` |

### Common DNS tasks for this project

- **Remove forwarding/redirect:** Delete any Forwarding or Domain Forward entry
- **Point to Azure:** A record for `@` → Azure IP; CNAME for `www` → `clinic-website-v1-web-c6c8asakhpcahcam.centralindia-01.azurewebsites.net`

### Playwright script — GoDaddy

```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: false });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto('https://sso.godaddy.com', { waitUntil: 'domcontentloaded', timeout: 30000 });

  console.log('>>> Please log in to GoDaddy. Waiting up to 2 minutes...');
  await page.waitForURL('**/account**', { timeout: 120000 });
  console.log('>>> Logged in. Navigating to DNS management...');

  await page.goto('https://dcc.godaddy.com/manage/drshivanisingh.com/dns', { waitUntil: 'networkidle', timeout: 30000 });
  console.log('>>> DNS management page open. Browser will stay open — interact freely.');
})();
```

---

## Step 2 — Run the script

Save the relevant script as `D:/Personal/clinic/portal-runner.js` and run:

```bash
node D:/Personal/clinic/portal-runner.js
```

Tell the user clearly:
> "The browser is open. Please log in — I'll continue once you're past the login screen."

Watch for the console confirmation, then provide step-by-step guidance for the specific task the user wants to do.

## Step 3 — Cleanup

```bash
rm -f D:/Personal/clinic/portal-runner.js
```
