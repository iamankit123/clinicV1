---
description: Open Azure portal or GoDaddy in Chrome and navigate to the relevant section. Waits at login screens for the user.
allowed-tools:
  - Bash
  - Write
  - Read
---

# /portal — Open Azure or GoDaddy Portal

Opens the relevant admin portal in Chrome and navigates to the right section for this project. Pauses and waits whenever a login screen appears.

## Step 1 — Ask which portal

Ask the user:
> Which portal?
> 1. **Azure** — App Service, deployment logs, app settings, log stream
> 2. **GoDaddy** — Domain DNS management for drshivanisingh.com

Optionally ask what task they want to do there (e.g. "check log stream", "update DNS record") so navigation can go deeper.

---

## Azure Portal

### Key URLs

| Task | URL |
|------|-----|
| Resource group overview | https://portal.azure.com/#resource/subscriptions/.../resourceGroups/clinic-website-v1/overview |
| App Service | https://portal.azure.com/#resource/subscriptions/.../resourceGroups/clinic-website-v1/providers/Microsoft.Web/sites/clinic-website-v1-web/overview |
| Log stream (real-time) | https://clinic-website-v1-web-c6c8asakhpcahcam.scm.centralindia-01.azurewebsites.net/api/logstream |
| App settings | https://portal.azure.com/#blade/WebsitesExtension/FunctionsIFrameBladeMain/id/%2Fsubscriptions%2F...%2FresourceGroups%2Fclinic-website-v1%2Fproviders%2FMicrosoft.Web%2Fsites%2Fclinic-website-v1-web/configTab/appsettings |
| Deployment center | Navigate from App Service → Deployment Center |
| Custom domains | Navigate from App Service → Custom Domains |

Use the **log stream URL** directly — it does not require portal login.

### Playwright script

```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: false });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto('https://portal.azure.com', { waitUntil: 'domcontentloaded', timeout: 30000 });

  // Wait for login — do NOT proceed until the portal dashboard is visible
  console.log('Waiting for Azure login...');
  await page.waitForSelector('[data-telemetryname="Dashboard"], .fxs-blade-title, [aria-label="Microsoft Azure"]', { timeout: 120000 });
  console.log('Logged in. Navigating to App Service...');

  // Navigate to the App Service
  await page.goto('https://portal.azure.com/#view/WebsitesExtension/SiteSummaryMenuBlade/~/overview/resourceId/%2Fsubscriptions%2F{SUB_ID}%2FresourceGroups%2Fclinic-website-v1%2Fproviders%2FMicrosoft.Web%2Fsites%2Fclinic-website-v1-web', { waitUntil: 'networkidle', timeout: 30000 });

  // Keep browser open for user interaction
  console.log('Azure App Service page open. Browser will stay open.');
  // Do NOT close — user interacts directly
})();
```

**Note:** Replace `{SUB_ID}` with the actual Azure subscription ID. If unknown, navigate manually from the portal after login.

---

## GoDaddy Portal

### Key URLs

| Task | URL |
|------|-----|
| Domain list | https://account.godaddy.com/products |
| DNS management for drshivanisingh.com | https://dcc.godaddy.com/manage/drshivanisingh.com/dns |

### Common DNS tasks for this project

- **Remove forwarding/redirect:** Delete any Forwarding or Domain Forward entry
- **Point to Azure:** A record for `@` → Azure IP, CNAME for `www` → `clinic-website-v1-web-c6c8asakhpcahcam.centralindia-01.azurewebsites.net`

### Playwright script

```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: false });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto('https://sso.godaddy.com', { waitUntil: 'domcontentloaded', timeout: 30000 });

  console.log('Waiting for GoDaddy login...');
  await page.waitForURL('**/account**', { timeout: 120000 });
  console.log('Logged in. Navigating to DNS management...');

  await page.goto('https://dcc.godaddy.com/manage/drshivanisingh.com/dns', { waitUntil: 'networkidle', timeout: 30000 });
  console.log('DNS management page open. Browser will stay open.');
})();
```

---

## Step 2 — Run the script

Save the relevant script as `D:/Personal/clinic/portal-runner.js`, run it:

```bash
node D:/Personal/clinic/portal-runner.js
```

**Pause and wait** after opening the browser. Tell the user:
> "Chrome is open. Please log in — I'll continue once you're past the login screen."

Watch for the console log confirming login, then continue with navigation or instructions.

## Step 3 — Cleanup

```bash
rm -f D:/Personal/clinic/portal-runner.js
```
