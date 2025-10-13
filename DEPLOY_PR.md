This PR prepares the repository for a safe Vercel deployment.

What this PR contains:

- `.env.example` with required environment variables (no secrets)
- `scripts/deploy-vercel.sh` which calls `vercel --prod` (requires vercel CLI auth)
- `README_DEPLOY.md` (already added) with the detailed deploy checklist and feature flags.

Why:
- Keep sensitive configuration out of repo while documenting required variables.
- Provide a small helper script for local deploys when the vercel CLI is available.

How to review:
- Verify `.env.example` matches the variables used in the code.
- Review `README_DEPLOY.md` for accuracy.

Merge and deploy steps:
1. Merge this PR into the branch you use for Vercel (e.g., `main`).
2. In Vercel dashboard, add environment variables described in `README_DEPLOY.md`.
3. Allow Vercel to auto-deploy on push or run `scripts/deploy-vercel.sh` locally.
4. Verify endpoints: `/api/health`, `/api/connect`, `/`, and `/admin`.

If you'd like, I can open the PR for you and include these files; I will not perform the Vercel deploy without your explicit token/access.
