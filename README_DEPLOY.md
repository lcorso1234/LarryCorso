Deployment checklist for Vercel

This file documents the minimal steps and environment configuration to deploy this Next.js app to Vercel safely. It also describes feature flags used to toggle security behavior during rollout.

1. Prerequisites

- A Vercel account
- Project added to Vercel (connect your GitHub/GitLab/Bitbucket repo or import manually)
- (Optional) Vercel CLI installed locally: `npm i -g vercel`

2. Build settings (Vercel UI)

- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: (leave blank)
- Install Command: `npm install`

3. Required Environment Variables (set in Vercel Project > Settings > Environment Variables)

- ADMIN_PASSWORD: string (the admin password used by the /api/admin/login route)
- JWT_SECRET: string (a strong secret used to sign admin JWTs)

4. Optional Feature Flags (recommended defaults shown)

- RATE_LIMITING (default: `false`)
  - When `true`, the app enforces rate limiting via `lib/rate-limiter.ts`.
  - Default should remain `false` during rollout; enable after testing.
- SECURITY_ENFORCE (default: `false`)
  - When `true`, the app will attempt to load the original security middleware (kept as `lib/security-middleware.ts.bak`). If Vercel cannot load the backup (Edge runtime differences), it will fall back to permissive behavior.
  - Keep `false` until you confirm the original middleware runs correctly on your Vercel project.

5. Recommended Vercel Environment variable values example (do NOT commit secrets)

- ADMIN_PASSWORD = LarryCorso2025!Admin
- JWT_SECRET = <strong-jwt-secret-here>
- RATE_LIMITING = false
- SECURITY_ENFORCE = false

6. Deploy steps
   Option A — Via Vercel UI (recommended)

- Push your code to the branch connected to Vercel (e.g., `main`)
- In the Vercel dashboard choose the project and click "Deploy" or wait for automatic deploy on push.
- After deployment completes, open the project URL and test key endpoints:
  - GET /api/health
  - GET /api/connect
  - GET /, /about, /portfolio
  - POST /api/admin/login (requires ADMIN_PASSWORD)

Option B — Using Vercel CLI

- Ensure you are in the project root locally.
- Set environment variables in Vercel for the project (via UI or `vercel env add`), then run:

```bash
vercel --prod
```

7. Smoke tests (after deploy)

- Visit https://<your-project>.vercel.app/ (homepage)
- Curl health endpoint:

```bash
curl -s https://<your-project>.vercel.app/api/health | jq
```

- Test admin login (replace password):

```bash
curl -i -X POST https://<your-project>.vercel.app/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"password":"<ADMIN_PASSWORD>"}'
```

8. How to enable strict security later (safe rollback plan)

- Enable `RATE_LIMITING=true` only after monitoring real traffic and ensuring no false positives.
- To re-enable original middleware:
  - Set `SECURITY_ENFORCE=true` in Vercel.
  - Ensure `lib/security-middleware.ts.bak` exists in the repo root and exports the same named functions (the current permissive file will try to require it). If load fails, the server will fall back to permissive behavior and log a warning.
- If an immediate rollback is needed, set `RATE_LIMITING=false` and `SECURITY_ENFORCE=false` and redeploy.

9. Troubleshooting

- If an endpoint returns 500 or errors after deployment, check Vercel Build & Server logs (Vercel dashboard > Project > Deployments > Logs).
- Verify environment variables exist in the correct environment (Production vs Preview).
- Check `/api/health` for runtime messages.

10. Notes about Edge vs Node runtime

- Some files attempt to require backup modules dynamically when `SECURITY_ENFORCE=true`. This may not work on Edge runtimes; fallback behavior is permissive to avoid blocking requests. If you need strict Node-only middleware, ensure the deployment uses a Node server runtime.

11. Contact

- If you want me to continue and run the deploy commands (I will need your Vercel project access or the Vercel token and you must explicitly provide it), I can prepare a deploy PR and detailed change list.

Change log (this session)

- Rate limiter: restored original-like implementation behind `RATE_LIMITING` env var (default off) and provided instances `apiRateLimiter` and `loginRateLimiter`.
- Security middleware: implemented a toggle via `SECURITY_ENFORCE` to attempt to load the original `.bak` middleware; otherwise provides permissive headers and no-op enforcement.
- Created this `README_DEPLOY.md` to document deployment steps and required env vars.
