---
name: debug
description: Diagnose production issues — Azure Application Error, domain redirect problems, failed GitHub Actions deployments, page not updating after push.
allowed-tools: Bash Read Glob Grep
---

# /debug — Diagnose Production Issues

Systematic diagnosis of production problems. Goes from symptom to root cause.

## Step 1 — Identify the symptom

Ask the user (or infer from context):
> What are you seeing?
> 1. **Azure shows "Application Error"** — 500/503 on the Azure URL
> 2. **Domain redirecting wrongly** — drshivanisingh.com goes to wrong site
> 3. **GitHub Actions failed** — deployment didn't complete
> 4. **Page not updating** — pushed but changes not live
> 5. **Something else** — describe the issue

---

## Azure Application Error

Check in this order:

### 1. Real-time log stream (no login needed)
```bash
curl -s "https://clinic-website-v1-web-c6c8asakhpcahcam.scm.centralindia-01.azurewebsites.net/api/logstream" --max-time 15
```
- `Error: Could not find a production build in the './.next' directory` → zip step removed from workflow
- `Cannot find module` → missing files in deployment package
- `EADDRINUSE` → PORT not set correctly (must be 8080)

### 2. Check last GitHub Actions run
```bash
gh run list --limit 3
gh run view $(gh run list --limit 1 --json databaseId -q '.[0].databaseId') --log | tail -100
```

### 3. Verify zip step exists in workflow
```bash
grep -n "zip\|standalone\|upload-artifact\|deploy.zip" D:/Personal/clinic/.github/workflows/main_clinic-website-v1-web.yml
```
Must see: `zip -r ../../deploy.zip .` **and** `path: deploy.zip`

If missing — add back:
```yaml
- name: Zip standalone for deployment
  run: cd .next/standalone && zip -r ../../deploy.zip .
```

### 4. Check Azure app settings
```bash
az webapp config appsettings list --name clinic-website-v1-web --resource-group clinic-website-v1 --output table
```
Must have: `PORT=8080`, `HOSTNAME=0.0.0.0`, `SCM_DO_BUILD_DURING_DEPLOYMENT=false`

---

## Domain Redirecting Wrongly

```bash
nslookup drshivanisingh.com
curl -sI https://drshivanisingh.com | head -20
```

**Redirecting to lovable.app or another site:**
- GoDaddy Domain Forwarding rule is still active
- Fix: run `/portal` → GoDaddy → DNS → delete any Forwarding/Redirect entry
- A record for `@` must point to Azure IP
- CNAME for `www` must point to `clinic-website-v1-web-c6c8asakhpcahcam.centralindia-01.azurewebsites.net`
- DNS changes can take up to 48 hours to propagate

**SSL certificate error:**
- Check Azure App Service → Custom Domains blade for certificate status

---

## GitHub Actions Failed

```bash
gh run list --limit 5
gh run view $(gh run list --limit 1 --json databaseId -q '.[0].databaseId') --log | grep -E "Error|error|failed|FAILED" | head -30
```

Common causes:
- `npm ci` fails → `package.json` and `package-lock.json` out of sync — run `npm install` locally and commit the updated lock file
- TypeScript build error → run `npm run build` locally to reproduce and fix
- `az` CLI auth expired → re-run workflow or refresh the publish profile secret in GitHub Actions settings

---

## Page Not Updating After Push

```bash
git log origin/main --oneline -5
gh run list --limit 5
```

If Actions ran and succeeded but site hasn't updated:
```bash
az webapp restart --name clinic-website-v1-web --resource-group clinic-website-v1
```

---

## Local Dev Issues

**Turbopack crash "reading file …\nul":**
```bash
ls D:/Personal/clinic/nul 2>/dev/null && rm D:/Personal/clinic/nul || echo "nul file not present"
```

**Port already in use:**
```bash
npx kill-port 3001
```

**TypeScript errors:**
```bash
cd D:/Personal/clinic && npm run build 2>&1 | grep -E "Error|error TS"
```

---

## After Diagnosing

- Explain the root cause clearly in plain language
- Apply the fix if it is a code or config change
- Suggest running `/dev` → Deploy to push any fixes
- Update `STATUS.md` with what was found and fixed
