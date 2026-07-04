# Security Notes

JobPilot handles sensitive career data. Treat resumes, verified answers, and application history as private data.

## Do Not Ship

- Do not store LinkedIn, Indeed, Glassdoor, ZipRecruiter, Workday, Workable, or BambooHR passwords in the browser.
- Do not store API keys in `localStorage`.
- Do not bypass CAPTCHA, paywalls, rate limits, bot protections, or login walls.
- Do not submit applications when a question is unclear or not covered by Verified Answers.

## Required Before Real User Launch

- Add authentication.
- Encrypt stored resumes and generated resume variants.
- Move credential-based connectors to a backend.
- Add a real privacy policy and terms of service.
- Add audit logs for every generated resume, answer, and application.
- Add user export/delete controls.
- Add explicit consent for Autopilot.
- Add human-review fallback for sensitive/unclear questions.
