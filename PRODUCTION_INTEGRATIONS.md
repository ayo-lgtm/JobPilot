# JobPilot Production Integrations

This document records the production connection plan for job discovery and application automation.

## What is connected now

The local app includes live browser connectors for:

- Greenhouse Job Board API: public job-board `GET` endpoints.
- Lever Postings API: public postings endpoint.
- Ashby Public Job Postings API: public job-board endpoint.
- SmartRecruiters Posting API: public company postings endpoint.

Use the Job Search page:

- Greenhouse board token: examples are company board names used in `boards.greenhouse.io/{token}` URLs.
- Lever company slug: the company slug used by Lever postings.
- Ashby job board name: the name used in `jobs.ashbyhq.com/{jobBoardName}`.
- SmartRecruiters company identifier: the company identifier used by SmartRecruiters postings.

Browser limitations still apply. If a company blocks cross-origin browser calls, move that connector to a backend route.

## Recommended backend connector shape

Create backend routes like:

```text
GET /api/connectors/greenhouse?board=company
GET /api/connectors/lever?company=company
GET /api/connectors/ashby?board=company
GET /api/connectors/smartrecruiters?company=company
GET /api/connectors/workable?subdomain=company
GET /api/connectors/bamboohr?subdomain=company
POST /api/applications/:jobId/prepare
POST /api/applications/:jobId/submit
```

The backend should normalize every job into:

```json
{
  "company": "Company",
  "title": "Operations Analyst",
  "source": "Greenhouse",
  "location": "Remote, US",
  "salary": "$90k-$120k",
  "description": "Plain job description text",
  "url": "https://...",
  "externalId": "source-company-id"
}
```

## LinkedIn

LinkedIn job APIs are gated. The documented LinkedIn Talent Solutions job-posting API is primarily for approved partners and employers to create/update jobs, not a general public job-search API.

Production options:

- Apply for LinkedIn Talent Solutions / ATS partner access.
- Use OAuth where available for approved products.
- Use a user-controlled browser extension for assisted apply, subject to LinkedIn terms.
- Do not store LinkedIn passwords.
- Do not bypass CAPTCHAs, rate limits, or bot protections.

Reference:

- Microsoft Learn: LinkedIn `simpleJobPosting` API for creating/updating/closing jobs.

## Indeed

Indeed does not offer a general open job-search API for arbitrary job aggregation in the way this product would need. The current public path is partner/publisher-oriented and may require approval.

Production options:

- Apply for Indeed partner/publisher access.
- Use approved widgets or partner APIs where allowed.
- Use external-link or assisted-apply mode for jobs that cannot be submitted through approved APIs.
- Do not scrape behind login or bypass protections.

Reference:

- Indeed Publisher JavaScript Plugin docs.

## Greenhouse

Greenhouse has a public Job Board API for published jobs. Application submission endpoints require authentication and the required fields vary by board/job.

Production plan:

- Fetch jobs through public board endpoints.
- Inspect job questions before submission.
- Submit only when the job board allows it, required fields are known, and credentials are configured.
- Pause for any question not covered by Verified Answers.

Reference:

- Greenhouse Job Board API documentation.
- Greenhouse API overview.

## Lever

Lever has a public postings API for company postings.

Production plan:

- Fetch postings through the Lever postings endpoint.
- Normalize posting text and application URLs.
- Use assisted apply or backend submission only when an approved apply path exists.

Reference:

- Lever Postings API documentation repository.

## Ashby

Ashby has a public Job Postings API for company job boards. It can return listed postings and optionally compensation data.

Production plan:

- Fetch jobs using the public job board name.
- Normalize department, team, location, compensation, and description fields.
- Use apply URLs for assisted apply unless submission support is approved and implemented safely.

Reference:

- Ashby Public Job Postings API.

## SmartRecruiters

SmartRecruiters has Posting API endpoints for published company postings and additional APIs for application workflows.

Production plan:

- Fetch public postings by company identifier.
- Use backend routes if CORS blocks browser calls.
- Add Application API support only after required question handling and user consent are implemented.

Reference:

- SmartRecruiters Customer API overview.
- SmartRecruiters Posting API.

## Workable

Workable has account-scoped API access. Unlike public company-board APIs, this normally requires an account subdomain and API token.

Production plan:

- Store Workable tokens only on the backend, never in browser local storage.
- Proxy requests through backend routes.
- Fetch jobs, custom fields, and application requirements through approved account access.
- Pause if the job requires custom fields not covered by Verified Answers.

## BambooHR

BambooHR has authenticated APIs and applicant-tracking endpoints. It requires a BambooHR subdomain and API key/OAuth-style authorization depending on the setup.

Production plan:

- Store BambooHR API keys only on the backend.
- Use backend proxy routes for applicant tracking endpoints.
- Treat BambooHR as employer/account-scoped, not a general public job-search network.

## Workday

Workday career sites vary by employer and are not a single public job-search/apply API for applicants.

Production options:

- Use employer-specific career URLs and assisted apply.
- Use a user-controlled browser extension for form filling where allowed.
- Pause on login, CAPTCHA, custom questions, or unclear sensitive questions.

## MCP status

This Codex session does not include installed MCP tools for LinkedIn, Indeed, Glassdoor, ZipRecruiter, Greenhouse, Lever, or Workday. The app is therefore built with an MCP-ready connector boundary:

```js
window.JobPilotConnectors.fetchGreenhouse(boardToken)
window.JobPilotConnectors.fetchLever(companySlug)
```

If MCP tools are added later, connect them behind the same normalized job shape.

## Compliance rules

- Never store job-site passwords.
- Never bypass CAPTCHA, paywalls, rate limits, or bot protections.
- Never invent resume facts or sensitive answers.
- Always maintain an application audit log.
- Autopilot may submit only if the site integration is approved, the application fields are understood, the user has configured rules, and Verified Answers cover every required question.
