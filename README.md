# JobPilot

JobPilot is a resume-first job application assistant. It stores a user's current resume as the source of truth, detects matching jobs, generates truthful ATS-oriented resume variants, and tracks applications.

## Current Production Package

This package is a static web app:

- `index.html`
- `styles.css`
- `app.js`
- `connectors.js`
- `PRODUCTION_INTEGRATIONS.md`

It can be hosted on any static host such as Netlify, Vercel, Cloudflare Pages, GitHub Pages, or an S3/static-site bucket.

## What Works Now

- Resume upload/paste flow.
- Browser parsing for `.txt`, `.docx`, and some text-based `.pdf` files.
- Resume profile and keyword extraction.
- Job matching against the saved resume.
- Guarded Autopilot decision logic.
- Resume variant generation and download.
- Application tracker with CSV export.
- Live public job connectors for Greenhouse, Lever, Ashby, and SmartRecruiters where CORS allows browser access.
- Backend-required connector boundaries for Workable and BambooHR.

## Production Boundaries

Do not store job-site passwords. Do not bypass CAPTCHA, rate limits, login walls, or bot protections.

Credential-based integrations such as Workable, BambooHR, LinkedIn, Indeed, Glassdoor, ZipRecruiter, and many Workday flows must use official APIs, partner access, OAuth, or a user-controlled compliant browser extension.

## Deployment

Before deploying, follow [CONNECT_ACCOUNTS.md](./CONNECT_ACCOUNTS.md) and add the Lovable secrets listed in [LOVABLE_ENVIRONMENT.md](./LOVABLE_ENVIRONMENT.md).

### Netlify

Upload the project folder or connect a Git repo. The included `netlify.toml` publishes the root folder.

### Vercel

Recommended. Import the project from GitHub, then add the environment variables from `.env.example`.

The app includes Vercel-style serverless endpoints:

- `/api/rewrite-resume`
- `/api/create-checkout-session`
- `/api/job-proxy`

### Manual Static Hosting

Upload these files to the web root:

- `index.html`
- `styles.css`
- `app.js`
- `connectors.js`
- `PRODUCTION_INTEGRATIONS.md`

## Next Backend Step

Create a backend API for:

- Secure user accounts.
- Encrypted resume storage.
- PDF/OCR parsing.
- DOCX generation.
- OpenAI resume tailoring.
- Stripe billing.
- Backend job connectors for credential-based systems.
- Audit logs.
- Application submission workflows with user-approved rules.
