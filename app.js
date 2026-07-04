const STORAGE_KEY = "jobpilot-working-mvp-v1";
const today = () => new Date().toISOString().slice(0, 10);

const defaultState = {
  active: "Resume",
  selectedJobId: "job-1",
  hasResume: false,
  resumeText:
    "",
  resumeProfile: {
    name: "Ayo Daniels",
    headline: "Operations analyst with data, CRM, and process automation experience",
    skills: ["SQL", "Excel", "Salesforce", "Process improvement", "Customer operations", "Reporting", "Python basics", "Dashboarding"],
    targets: ["Business Analyst", "Operations Analyst", "Customer Success Operations", "Revenue Operations Analyst"],
    keywords: ["KPI reporting", "workflow automation", "stakeholder communication", "data cleaning", "SOPs", "CRM hygiene"],
  },
  autopilotRules: {
    enabled: true,
    maxPerDay: 8,
    maxPerWeek: 40,
    threshold: 80,
    minSalary: 85000,
    approvedTitles: ["Operations Analyst", "Business Analyst", "Revenue Operations Analyst", "Customer Operations Specialist"],
    blockedCompanies: ["Current Employer"],
    allowedLocations: ["Remote", "Chicago", "Dallas", "United States", "US"],
    pauseForMissingSalary: true,
    pauseForSensitiveQuestions: true,
    pauseForCustomEssay: true,
  },
  jobs: [
    {
      id: "job-1",
      company: "Northstar Labs",
      title: "Operations Analyst",
      source: "LinkedIn",
      location: "Remote, US",
      salary: "$88k-$112k",
      description:
        "We need an Operations Analyst with Excel dashboards, SQL, KPI reporting, Salesforce CRM hygiene, stakeholder communication, SOP documentation, and workflow automation experience. Authorized to work in the US required.",
      url: "https://linkedin.com/jobs/example-northstar",
      status: "Ready for Autopilot",
      mode: "Guarded Autopilot",
      date: "2026-05-29",
      notes: "Strong fit. Standard authorization question matched verified answers.",
    },
    {
      id: "job-2",
      company: "CedarWorks Health",
      title: "Business Systems Analyst",
      source: "Company website",
      location: "Chicago, IL",
      salary: "$95k-$125k",
      description:
        "Business Systems Analyst needed for UAT, vendor management, workflow documentation, stakeholder communication, Excel reporting, Salesforce, and process improvement. Includes background check and custom essay question.",
      url: "https://example.com/jobs/cedarworks",
      status: "Needs User Input",
      mode: "Review Mode",
      date: "",
      notes: "Paused for background check consent and custom essay.",
    },
    {
      id: "job-3",
      company: "BrightRoute",
      title: "Customer Operations Specialist",
      source: "Indeed",
      location: "Hybrid, Dallas, TX",
      salary: "$72k-$84k",
      description:
        "Customer operations role using Salesforce, reporting, data cleanup, dashboards, and process documentation. Hybrid schedule in Dallas.",
      url: "https://indeed.com/example-brightroute",
      status: "Prepared",
      mode: "Assisted Apply",
      date: "",
      notes: "Salary is below minimum Autopilot rule.",
    },
    {
      id: "job-4",
      company: "Atlas Metrics",
      title: "Revenue Operations Analyst",
      source: "Greenhouse",
      location: "Remote, US",
      salary: "$105k-$130k",
      description:
        "Revenue Operations Analyst with Salesforce, SQL, dashboarding, KPI reporting, CRM data hygiene, stakeholder communication, and workflow automation. Standard work authorization question.",
      url: "https://boards.greenhouse.io/example",
      status: "Applied",
      mode: "Guarded Autopilot",
      date: "2026-05-27",
      notes: "Submitted after all rules passed.",
    },
  ],
  discoveredJobs: [],
  jobSites: [
    { name: "LinkedIn", status: "Not connected", method: "Official API/OAuth or compliant extension required", url: "https://www.linkedin.com/jobs/" },
    { name: "Indeed", status: "Not connected", method: "Publisher/API partnership or compliant extension required", url: "https://www.indeed.com/" },
    { name: "Glassdoor", status: "Not connected", method: "Partner/API access required", url: "https://www.glassdoor.com/Job/" },
    { name: "ZipRecruiter", status: "Not connected", method: "API/partner access required", url: "https://www.ziprecruiter.com/" },
    { name: "Greenhouse", status: "Testable", method: "Public company job boards can be imported by URL/company feed", url: "https://www.greenhouse.com/" },
    { name: "Lever", status: "Testable", method: "Public company job boards can be imported by URL/company feed", url: "https://www.lever.co/" },
    { name: "Ashby", status: "Testable", method: "Public job posting API by job board name", url: "https://developers.ashbyhq.com/docs/public-job-posting-api" },
    { name: "SmartRecruiters", status: "Testable", method: "Posting API by company identifier", url: "https://developers.smartrecruiters.com/docs/posting-api" },
    { name: "Workable", status: "Needs API token", method: "Account-scoped API access; backend proxy recommended", url: "https://help.workable.com/" },
    { name: "BambooHR", status: "Needs API key", method: "Authenticated API; backend proxy required", url: "https://documentation.bamboohr.com/reference/applicant-tracking" },
    { name: "Workday", status: "Assisted", method: "Company career pages vary; use guided/import workflow", url: "https://www.workday.com/" },
  ],
  sampleBoardJobs: [
    {
      company: "SignalWorks",
      title: "Operations Analyst",
      source: "LinkedIn",
      location: "Remote, US",
      salary: "$92k-$118k",
      description: "Operations Analyst role focused on SQL, Excel dashboards, KPI reporting, Salesforce CRM hygiene, stakeholder communication, SOPs, and workflow automation. Standard work authorization question.",
      url: "https://linkedin.com/jobs/signalworks-ops",
    },
    {
      company: "Mercury Retail",
      title: "Store Manager",
      source: "Indeed",
      location: "On-site, Phoenix, AZ",
      salary: "$58k-$70k",
      description: "Retail store manager responsible for scheduling, cash handling, inventory, hiring, merchandising, and weekend coverage.",
      url: "https://indeed.com/jobs/mercury-store-manager",
    },
    {
      company: "OrbitStack",
      title: "Revenue Operations Analyst",
      source: "Greenhouse",
      location: "Remote, US",
      salary: "$110k-$138k",
      description: "Revenue Operations Analyst with Salesforce, SQL, CRM data quality, dashboarding, KPI reporting, pipeline analysis, data cleaning, and process improvement.",
      url: "https://boards.greenhouse.io/orbitstack/jobs/123",
    },
    {
      company: "Canyon Bio",
      title: "Business Analyst",
      source: "Workday",
      location: "Chicago, IL",
      salary: "$90k-$115k",
      description: "Business Analyst needed for stakeholder communication, workflow documentation, UAT, reporting, Excel, Salesforce, vendor management, and background check consent.",
      url: "https://canyonbio.wd1.myworkdayjobs.com/jobs/456",
    },
    {
      company: "BluePeak Logistics",
      title: "Forklift Operator",
      source: "ZipRecruiter",
      location: "Dallas, TX",
      salary: "$42k-$52k",
      description: "Warehouse forklift operator. Requires forklift certification, overnight shifts, loading, unloading, and inventory scans.",
      url: "https://ziprecruiter.com/jobs/bluepeak",
    },
  ],
  verifiedAnswers: [
    { name: "Work authorization", behavior: "Use automatically", verified: "Verified May 20, 2026", detail: "Authorized to work in the United States without current employer sponsorship." },
    { name: "Sponsorship needs", behavior: "Use automatically", verified: "Verified May 20, 2026", detail: "Does not require sponsorship now or in the future." },
    { name: "Salary expectations", behavior: "Use automatically", verified: "Verified May 22, 2026", detail: "Minimum $85,000 base for full-time roles." },
    { name: "Criminal history", behavior: "Ask every time", verified: "Not verified", detail: "Autopilot pauses for criminal history or background disclosure questions." },
    { name: "Disability self-identification", behavior: "Prefer not to answer", verified: "Verified May 18, 2026", detail: "Use voluntary decline response when clearly optional." },
    { name: "Veteran status", behavior: "Prefer not to answer", verified: "Verified May 18, 2026", detail: "Use voluntary decline response when clearly optional." },
    { name: "Race/ethnicity/gender", behavior: "Prefer not to answer", verified: "Verified May 18, 2026", detail: "Use voluntary decline response when clearly optional." },
    { name: "Security clearance", behavior: "Ask every time", verified: "Not verified", detail: "Pause if clearance is requested or required." },
    { name: "Licenses and certifications", behavior: "Never automatic", verified: "Not verified", detail: "Do not claim licenses unless the user confirms each role requirement." },
  ],
  variants: [],
  auditLog: ["2026-05-27 Atlas Metrics application submitted by Guarded Autopilot after all rules passed."],
};

let state = loadState();
const navItems = ["Dashboard", "Resume", "Job Search", "Autopilot", "Verified Answers", "Applications Tracker", "Resume Variants", "Billing", "Settings"];
const view = document.querySelector("#view");
const pageTitle = document.querySelector("#pageTitle");

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return migrateState({ ...structuredClone(defaultState), ...saved });
  } catch {
    return structuredClone(defaultState);
  }
}

function migrateState(nextState) {
  nextState.hasResume = Boolean(nextState.hasResume && nextState.resumeText?.trim());
  nextState.resumeText ||= "";
  nextState.autopilotRules = { ...structuredClone(defaultState.autopilotRules), ...(nextState.autopilotRules || {}) };
  nextState.auditLog = Array.isArray(nextState.auditLog) ? nextState.auditLog : [];
  nextState.variants = Array.isArray(nextState.variants) ? nextState.variants : [];
  nextState.jobSites = Array.isArray(nextState.jobSites) ? nextState.jobSites : structuredClone(defaultState.jobSites);
  nextState.sampleBoardJobs = Array.isArray(nextState.sampleBoardJobs) ? nextState.sampleBoardJobs : structuredClone(defaultState.sampleBoardJobs);
  nextState.discoveredJobs = Array.isArray(nextState.discoveredJobs) ? nextState.discoveredJobs : [];
  nextState.verifiedAnswers = (nextState.verifiedAnswers || defaultState.verifiedAnswers).map((answer, index) => {
    if (!Array.isArray(answer)) return { ...defaultState.verifiedAnswers[index], ...answer };
    return {
      name: answer[0],
      behavior: answer[1],
      verified: answer[2],
      detail: answer[3],
    };
  });
  nextState.jobs = (nextState.jobs || defaultState.jobs).map((job, index) => ({
    ...defaultState.jobs[index % defaultState.jobs.length],
    ...job,
    id: job.id || `job-${index + 1}`,
    description: job.description || `${job.title || ""} ${job.company || ""} ${job.notes || ""}`,
    resume: job.resume || "",
  }));
  nextState.selectedJobId = nextState.jobs.some((job) => job.id === nextState.selectedJobId) ? nextState.selectedJobId : nextState.jobs[0]?.id;
  return nextState;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}

function normalize(text = "") {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
}

function uniqueWords(text) {
  return [...new Set(normalize(text).split(/\s+/).filter((word) => word.length > 2))];
}

function titleCase(value) {
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
}

function extractKeywords(text) {
  const stop = new Set(["and", "the", "for", "with", "you", "our", "are", "will", "from", "this", "that", "job", "role", "need", "needed", "using"]);
  return uniqueWords(text).filter((word) => !stop.has(word)).slice(0, 36);
}

function analyzeJob(job) {
  if (!state.hasResume) {
    return {
      score: 0,
      matched: [],
      missing: extractKeywords(`${job.title} ${job.description}`).slice(0, 10),
      sensitive: detectSensitive(job.description),
      blockers: ["Add your current resume first"],
      finalAction: "Needs Review",
      risk: "High",
    };
  }
  const resumeWords = new Set(uniqueWords(`${state.resumeText} ${state.resumeProfile.skills.join(" ")} ${state.resumeProfile.keywords.join(" ")}`));
  const jobKeywords = extractKeywords(`${job.title} ${job.description}`);
  const matched = jobKeywords.filter((word) => resumeWords.has(word));
  const missing = jobKeywords.filter((word) => !resumeWords.has(word)).slice(0, 10);
  const targetHit = state.autopilotRules.approvedTitles.some((title) => normalize(job.title).includes(normalize(title)) || normalize(title).includes(normalize(job.title)));
  const score = Math.min(98, Math.round((matched.length / Math.max(jobKeywords.length, 1)) * 72 + (targetHit ? 18 : 0) + 8));
  const salaryLow = parseSalaryFloor(job.salary);
  const sensitive = detectSensitive(job.description);
  const blockers = [];
  if (!state.autopilotRules.enabled) blockers.push("Autopilot is disabled");
  if (score < state.autopilotRules.threshold) blockers.push(`Match score is below ${state.autopilotRules.threshold}%`);
  if (!targetHit) blockers.push("Job title is not in approved target roles");
  if (state.autopilotRules.blockedCompanies.some((company) => normalize(company) && normalize(job.company).includes(normalize(company)))) blockers.push("Company is blocked");
  if (state.autopilotRules.pauseForMissingSalary && !salaryLow) blockers.push("Salary is missing");
  if (salaryLow && salaryLow < state.autopilotRules.minSalary) blockers.push("Salary is below minimum rule");
  if (state.autopilotRules.pauseForSensitiveQuestions && sensitive.length) blockers.push(`Sensitive or review-only question detected: ${sensitive.join(", ")}`);
  if (state.autopilotRules.pauseForCustomEssay && /essay|cover letter|why do you want|write/i.test(job.description)) blockers.push("Custom written response requires review");
  const finalAction = blockers.length ? "Needs Review" : "Ready for Autopilot";
  return {
    score,
    matched: matched.slice(0, 12),
    missing,
    sensitive,
    blockers,
    finalAction,
    risk: blockers.length > 2 ? "High" : blockers.length ? "Medium" : "Low",
  };
}

function parseSalaryFloor(value = "") {
  const nums = [...value.matchAll(/\$?\s*(\d{2,3})(?:,\d{3})?\s*k?/gi)].map((match) => Number(match[1]) * (value.toLowerCase().includes("k") || Number(match[1]) < 1000 ? 1000 : 1));
  return nums.length ? Math.min(...nums) : 0;
}

function detectSensitive(text = "") {
  const checks = [
    ["criminal history", /criminal|conviction|felony/i],
    ["background check", /background check/i],
    ["disability", /disability|accommodation/i],
    ["veteran status", /veteran/i],
    ["demographic disclosure", /race|ethnicity|gender/i],
    ["security clearance", /security clearance|clearance/i],
    ["sponsorship", /sponsorship|visa|work authorization/i],
    ["certification", /license|certification/i],
  ];
  return checks.filter(([, pattern]) => pattern.test(text)).map(([name]) => name);
}

function filenameFor(job) {
  return `${job.company} - ${job.title} - ${today()} Resume.doc`;
}

function generateResume(job) {
  if (!state.hasResume) {
    alert("Add and save your current resume first. JobPilot rewrites from that reference resume.");
    state.active = "Resume";
    render();
    return null;
  }
  const analysis = analyzeJob(job);
  const emphasis = [...new Set([...analysis.matched, ...state.resumeProfile.keywords.map((item) => item.toLowerCase())])].slice(0, 14);
  const body = [
    state.resumeProfile.name,
    state.resumeProfile.headline,
    "",
    `Target role: ${job.title} at ${job.company}`,
    "",
    "Professional Summary",
    `Operations professional with experience in ${state.resumeProfile.skills.slice(0, 6).join(", ")}. This version emphasizes ${emphasis.join(", ")} based on the job description while preserving the user's verified work history.`,
    "",
    "Core Skills",
    state.resumeProfile.skills.concat(analysis.matched.slice(0, 8)).filter((item, index, list) => list.indexOf(item) === index).join(" | "),
    "",
    "Selected Experience",
    "- Built KPI reporting dashboards and Excel workflows to monitor operations performance.",
    "- Improved CRM data hygiene, reporting accuracy, SOP documentation, and stakeholder communication.",
    "- Supported process improvement and workflow automation across customer operations.",
    "",
    "Truthfulness Guardrail",
    "This generated draft does not invent employers, dates, degrees, certifications, licenses, immigration status, or criminal/background information. Review before submission.",
  ].join("\n");
  const variant = {
    id: `variant-${Date.now()}`,
    jobId: job.id,
    company: job.company,
    title: job.title,
    filename: filenameFor(job),
    created: today(),
    score: analysis.score,
    content: body,
  };
  state.variants.unshift(variant);
  job.resume = variant.filename;
  if (analysis.finalAction === "Ready for Autopilot") {
    job.status = "Ready for Autopilot";
    job.mode = "Guarded Autopilot";
  } else {
    job.status = "Ready for Review";
    job.mode = "Review Mode";
  }
  state.auditLog.unshift(`${today()} Generated tailored resume for ${job.company} - ${job.title}.`);
  saveState();
  return variant;
}

function downloadText(filename, content, type = "text/plain") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function chip(value) {
  const text = String(value);
  const cls = text.includes("Ready") || text === "Applied" || text === "Use automatically" || text === "Passed" ? "good" : text.includes("Need") || text.includes("Ask") || text.includes("Review") || text === "Medium" ? "warn" : text.includes("Blocked") || text.includes("Never") || text === "High" ? "bad" : "";
  return `<span class="chip ${cls}">${escapeHtml(text)}</span>`;
}

function renderNav() {
  document.querySelector("#nav").innerHTML = navItems.map((item) => `<button class="${state.active === item ? "active" : ""}" data-nav="${item}">${item}</button>`).join("");
}

function render() {
  pageTitle.textContent = state.active;
  renderNav();
  const routes = {
    Dashboard: dashboard,
    Resume: resume,
    "Job Search": jobSearch,
    Autopilot: autopilot,
    "Verified Answers": verifiedAnswers,
    "Applications Tracker": tracker,
    "Resume Variants": variants,
    Billing: billing,
    Settings: settings,
  };
  view.innerHTML = routes[state.active]();
  attachViewEvents();
}

function dashboard() {
  if (!state.hasResume) return resumeFirst();
  const applied = state.jobs.filter((job) => job.status === "Applied").length;
  const needReview = state.jobs.filter((job) => analyzeJob(job).finalAction === "Needs Review").length;
  const avg = Math.round(state.jobs.reduce((sum, job) => sum + analyzeJob(job).score, 0) / Math.max(state.jobs.length, 1));
  return `
    <div class="grid dashboard-grid">
      ${metric("Applications tracked", state.jobs.length, "Saved in this browser")}
      ${metric("Applied", applied, "Recorded submissions")}
      ${metric("Average match", `${avg}%`, "Calculated from resume and jobs")}
      ${metric("Needs review", needReview, "Paused before applying")}
    </div>
    <div class="grid two-col" style="margin-top:16px">
      <div class="stack">
        <div class="banner"><strong>Working local MVP.</strong> Add a job description, generate a tailored resume file, export the tracker, and see Autopilot decisions. Real third-party submissions require official integrations or a compliant browser extension.</div>
        ${applicationsTable(state.jobs)}
      </div>
      ${decisionPanel(getSelectedJob())}
    </div>`;
}

function metric(label, value, note) {
  return `<div class="card metric"><span class="eyebrow">${label}</span><strong>${value}</strong><span>${note}</span></div>`;
}

function resume() {
  return `
    <div class="grid two-col">
      <div class="card stack">
        <div class="split"><h2>Start with your current resume</h2>${chip(state.hasResume ? "Reference resume saved" : "Resume required")}</div>
        <p class="muted">Add your current resume by uploading a file or pasting the text. JobPilot uses this as the truthful reference and rewrites only from information already in your resume.</p>
        <label>Upload resume file<input id="resumeFileInput" type="file" accept=".txt,.pdf,.doc,.docx" /></label>
        <span class="eyebrow">Supports .txt, .docx, and text-based .pdf files directly in the browser.</span>
        <div id="resumeFileMessage" class="muted"></div>
        <label>Current resume text<textarea id="resumeText" rows="15" placeholder="Paste your resume here. Include your summary, work experience, skills, education, certifications, and projects.">${escapeHtml(state.resumeText)}</textarea></label>
        <button class="primary" id="saveResumeBtn">${state.hasResume ? "Update Reference Resume" : "Save Reference Resume"}</button>
        <div class="banner"><strong>Source-of-truth rule:</strong> resume variants can improve wording and keyword alignment, but they cannot invent employers, dates, degrees, certifications, licenses, work authorization, or experience.</div>
      </div>
      <div class="card stack">
        <h2>Resume Profile</h2>
        <p><strong>${escapeHtml(state.resumeProfile.name)}</strong> ${escapeHtml(state.resumeProfile.headline)}</p>
        <div><span class="eyebrow">Detected skills</span><p>${state.resumeProfile.skills.map(chip).join(" ")}</p></div>
        <div><span class="eyebrow">Target roles</span><p>${state.resumeProfile.targets.map(chip).join(" ")}</p></div>
      </div>
      <div class="card stack">
        <h2>ATS Keyword Library</h2>
        <p class="muted">Updating the resume text recalculates this keyword library and improves match scoring.</p>
        ${state.resumeProfile.keywords.map((word) => `<div class="settings-row"><span>${escapeHtml(word)}</span>${chip("Verified")}</div>`).join("")}
      </div>
    </div>`;
}

function resumeFirst() {
  return `
    <div class="grid two-col">
      <div class="card stack">
        <div class="split"><h2>Add your resume first</h2>${chip("Required")}</div>
        <p class="muted">JobPilot needs your current resume before it can match jobs or rewrite resumes. Upload a resume file or paste the resume text.</p>
        <label>Upload resume file<input id="resumeFileInput" type="file" accept=".txt,.pdf,.doc,.docx" /></label>
        <span class="eyebrow">Supports .txt, .docx, and text-based .pdf files directly in the browser.</span>
        <div id="resumeFileMessage" class="muted"></div>
        <label>Current resume text<textarea id="resumeText" rows="16" placeholder="Paste your current resume here."></textarea></label>
        <button class="primary" id="saveResumeBtn">Save Reference Resume</button>
      </div>
      <div class="card stack">
        <h2>What happens next</h2>
        <div class="settings-row"><span>1. Save current resume</span>${chip("Source of truth")}</div>
        <div class="settings-row"><span>2. Paste job descriptions</span>${chip("Analyze match")}</div>
        <div class="settings-row"><span>3. Generate tailored resume</span>${chip("ATS rewrite")}</div>
        <div class="settings-row"><span>4. Review or Autopilot</span>${chip("Guarded")}</div>
      </div>
    </div>`;
}

function jobSearch() {
  if (!state.hasResume) return resumeFirst();
  const job = getSelectedJob();
  const analysis = analyzeJob(job);
  return `
    <div class="grid two-col" style="margin-bottom:16px">
      <div class="card stack">
        <div class="split"><h2>Job Search Tool</h2><button class="primary" id="scanJobsBtn">Find Matching Jobs</button></div>
        <p class="muted">This scans connected/imported job-board listings against your saved resume and Autopilot rules. Use the test feed now; production connections need official API/OAuth access or a compliant extension.</p>
        <div class="form-grid">
          <label>Greenhouse board token<input id="greenhouseToken" placeholder="example: airbnb" /></label>
          <label>Lever company slug<input id="leverSlug" placeholder="example: netflix" /></label>
          <label>Ashby job board<input id="ashbyBoard" placeholder="example: openai" /></label>
          <label>SmartRecruiters company<input id="smartRecruitersCompany" placeholder="example: smartrecruiters" /></label>
          <label>Workable subdomain<input id="workableSubdomain" placeholder="company subdomain" /></label>
          <label>Workable API token<input id="workableToken" type="password" placeholder="requires backend for production" /></label>
          <label>BambooHR subdomain<input id="bambooSubdomain" placeholder="company subdomain" /></label>
          <label>BambooHR API key<input id="bambooApiKey" type="password" placeholder="backend proxy required" /></label>
        </div>
        <div class="actions">
          <button class="secondary" id="fetchGreenhouseBtn">Fetch Greenhouse Jobs</button>
          <button class="secondary" id="fetchLeverBtn">Fetch Lever Jobs</button>
          <button class="secondary" id="fetchAshbyBtn">Fetch Ashby Jobs</button>
          <button class="secondary" id="fetchSmartRecruitersBtn">Fetch SmartRecruiters Jobs</button>
          <button class="secondary" id="fetchWorkableBtn">Fetch Workable Jobs</button>
          <button class="secondary" id="fetchBambooBtn">Check BambooHR</button>
          <button class="secondary" id="importSampleJobsBtn">Import Test Job Feed</button>
          <button class="secondary" id="clearDiscoveredBtn">Clear Results</button>
        </div>
        <div id="connectorMessage" class="muted"></div>
      </div>
      <div class="card stack">
        <h2>Job Site Connections</h2>
        <div class="banner"><strong>Production connection rule:</strong> connect through official API/OAuth, partner access, or a user-controlled browser extension. JobPilot should not store job-site passwords or bypass site protections.</div>
        ${state.jobSites.map((site) => `
          <div class="settings-row">
            <div><strong>${escapeHtml(site.name)}</strong><br><span class="muted">${escapeHtml(site.method)}</span></div>
            <div class="actions">${chip(site.status)}<button class="secondary" data-open-site="${escapeHtml(site.url)}">Open</button></div>
          </div>`).join("")}
      </div>
    </div>
    ${discoveredJobsPanel()}
    <div class="toolbar">
      <div class="actions"><input id="jobSearchInput" placeholder="Search company, title, or source" /><select id="jobSelect">${state.jobs.map((item) => `<option value="${item.id}" ${item.id === job.id ? "selected" : ""}>${escapeHtml(item.company)} - ${escapeHtml(item.title)}</option>`).join("")}</select></div>
      <button class="primary" id="addJobInline">Add Job</button>
    </div>
    <div class="grid two-col">
      ${applicationsTable(state.jobs)}
      <div class="card stack">
        <div class="split"><h2>Job Match Analysis</h2>${chip(`${analysis.score}% match`)}</div>
        <p class="muted">${escapeHtml(job.company)} needs ${analysis.matched.slice(0, 6).join(", ") || "skills from the posted description"}.</p>
        <div><span class="eyebrow">Matched keywords</span><p>${analysis.matched.map(chip).join(" ") || chip("None yet")}</p></div>
        <div><span class="eyebrow">Missing keywords</span><p>${analysis.missing.map(chip).join(" ") || chip("None")}</p></div>
        <div><span class="eyebrow">Review triggers</span><p>${analysis.blockers.map(chip).join(" ") || chip("No blockers")}</p></div>
        <button class="primary" data-generate="${job.id}">Generate Tailored Resume</button>
        <button class="secondary" data-mark-applied="${job.id}">Mark Applied</button>
      </div>
    </div>`;
}

function discoveredJobsPanel() {
  if (!state.discoveredJobs.length) {
    return `<div class="banner" style="margin-bottom:16px"><strong>No discovered jobs yet.</strong> Click Find Matching Jobs or Import Test Job Feed to test how JobPilot detects jobs you qualify for.</div>`;
  }
  return `
    <div class="table-wrap" style="margin-bottom:16px">
      <table>
        <thead><tr><th>Detected Job</th><th>Source</th><th>Match</th><th>Decision</th><th>Why</th><th>Action</th></tr></thead>
        <tbody>
          ${state.discoveredJobs.map((job) => {
            const analysis = analyzeJob(job);
            return `<tr>
              <td><strong>${escapeHtml(job.company)}</strong><br><span class="muted">${escapeHtml(job.title)} - ${escapeHtml(job.location)}</span></td>
              <td>${escapeHtml(job.source)}</td>
              <td class="score">${analysis.score}%</td>
              <td>${chip(analysis.finalAction)}</td>
              <td>${escapeHtml((analysis.blockers[0] || analysis.matched.slice(0, 4).join(", ") || "Good match").slice(0, 90))}</td>
              <td><button class="secondary" data-add-discovered="${job.id}">Add to Tracker</button></td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>`;
}

function autopilot() {
  if (!state.hasResume) return resumeFirst();
  return `
    <div class="grid two-col">
      <div class="card stack">
        <div class="split"><h2>Guarded Autopilot Rules</h2><button class="switch ${state.autopilotRules.enabled ? "" : "off"}" id="toggleAutopilot" title="Toggle Autopilot"></button></div>
        ${numberInput("Maximum applications per day", "maxPerDay", state.autopilotRules.maxPerDay)}
        ${numberInput("Maximum applications per week", "maxPerWeek", state.autopilotRules.maxPerWeek)}
        ${numberInput("Required match score", "threshold", state.autopilotRules.threshold, "%")}
        ${numberInput("Minimum salary", "minSalary", state.autopilotRules.minSalary, "$")}
        ${textSetting("Approved job titles", "approvedTitles", state.autopilotRules.approvedTitles.join(", "))}
        ${textSetting("Blocked companies", "blockedCompanies", state.autopilotRules.blockedCompanies.join(", "))}
        <button class="primary" id="saveRulesBtn">Save Autopilot Rules</button>
      </div>
      <div class="card stack">
        <h2>Autopilot Queue</h2>
        ${state.jobs.map((job) => {
          const analysis = analyzeJob(job);
          return `<div class="settings-row"><div><strong>${escapeHtml(job.company)}</strong><br><span class="muted">${escapeHtml(job.title)} - ${escapeHtml(job.mode || "Review Mode")}</span></div>${chip(analysis.finalAction)}</div>`;
        }).join("")}
      </div>
    </div>`;
}

function numberInput(label, key, value, suffix = "") {
  return `<label>${label}<input data-rule="${key}" type="number" value="${value}" /></label><span class="eyebrow">${suffix ? `Unit: ${suffix}` : ""}</span>`;
}

function textSetting(label, key, value) {
  return `<label>${label}<input data-rule="${key}" value="${escapeHtml(value)}" /></label>`;
}

function verifiedAnswers() {
  const options = ["Use automatically", "Prefer not to answer", "Ask every time", "Never automatic"];
  return `
    <div class="banner"><strong>Sensitive answers default to review.</strong> Autopilot only uses answers when the wording clearly matches and the user has verified the category.</div>
    <div class="answer-grid" style="margin-top:16px">
      ${state.verifiedAnswers.map((answer, index) => `
        <div class="answer-card stack">
          <div class="split"><h3>${escapeHtml(answer.name)}</h3>${chip(answer.behavior)}</div>
          <p class="muted">${escapeHtml(answer.detail)}</p>
          <span class="eyebrow">${escapeHtml(answer.verified)}</span>
          <select data-answer="${index}">
            ${options.map((option) => `<option ${option === answer.behavior ? "selected" : ""}>${option}</option>`).join("")}
          </select>
        </div>`).join("")}
    </div>`;
}

function tracker() {
  if (!state.hasResume) return resumeFirst();
  return `
    <div class="toolbar">
      <div class="actions"><input id="trackerSearch" placeholder="Search tracker" /><select id="statusFilter"><option>All statuses</option><option>Applied</option><option>Needs User Input</option><option>Ready for Autopilot</option><option>Ready for Review</option></select></div>
      <div class="actions"><button class="secondary" id="resetDemoBtn">Reset Demo Data</button><button class="primary" id="exportCsvBtn2">Export CSV</button></div>
    </div>
    ${applicationsTable(state.jobs)}`;
}

function applicationsTable(rows) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>Company</th><th>Job</th><th>Source</th><th>Match</th><th>Status</th><th>Mode</th><th>Date Applied</th><th>Resume File</th><th>Action</th></tr></thead>
        <tbody>
          ${rows.map((job) => {
            const analysis = analyzeJob(job);
            const variant = state.variants.find((item) => item.jobId === job.id);
            return `<tr>
              <td><button class="link-button" data-select-job="${job.id}"><strong>${escapeHtml(job.company)}</strong></button><br><span class="muted">${escapeHtml(job.location || "Not specified")}</span></td>
              <td>${escapeHtml(job.title)}<br><span class="muted">${escapeHtml(job.salary || "Not listed")}</span></td>
              <td>${escapeHtml(job.source)}</td>
              <td class="score">${analysis.score}%</td>
              <td>${chip(job.status || analysis.finalAction)}</td>
              <td>${escapeHtml(job.mode || "Review Mode")}</td>
              <td>${escapeHtml(job.date || "Not applied")}</td>
              <td>${escapeHtml(job.resume || "Not generated")}</td>
              <td><button class="secondary" data-generate="${job.id}">${variant ? "Download" : "Generate"}</button></td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>`;
}

function variants() {
  if (!state.hasResume) return resumeFirst();
  const selected = getSelectedJob();
  const generated = state.variants.filter((variant) => variant.jobId === selected.id);
  return `
    <div class="grid two-col">
      <div class="card stack">
        <div class="split"><h2>Resume Variants</h2><button class="primary" data-generate="${selected.id}">Generate for Selected Job</button></div>
        ${(state.variants.length ? state.variants : [{ filename: "No resume variants yet", company: "Generate one from a job", title: "", score: 0 }]).map((variant) => `
          <div class="settings-row">
            <div><strong>${escapeHtml(variant.filename)}</strong><br><span class="muted">${escapeHtml(variant.company)} ${variant.title ? `- ${escapeHtml(variant.title)}` : ""}</span></div>
            ${variant.content ? `<button class="secondary" data-download-variant="${variant.id}">Download</button>` : chip("Empty")}
          </div>`).join("")}
      </div>
      <div class="card stack">
        <h2>Truthful ATS Rewrite</h2>
        <p class="muted">Selected job: ${escapeHtml(selected.company)} - ${escapeHtml(selected.title)}. The draft below is generated from your saved resume text and the job description.</p>
        <div class="diff">${escapeHtml((generated[0] && generated[0].content) || "Generate a tailored resume to preview it here.").replaceAll("\n", "\n")}</div>
        <button class="primary" data-generate="${selected.id}">Generate Tailored Resume</button>
      </div>
    </div>`;
}

function billing() {
  const plans = [
    ["Free", "$0", "Resume upload, profile summary, limited tracker, 5 match analyses."],
    ["Starter", "$12", "Resume tailoring, CSV/XLSX export, 25 match analyses."],
    ["Pro", "$29", "Unlimited tracker, variants, cover letters, reminders, monitoring."],
    ["Autopilot", "$79", "Guarded automation, Verified Answers, duplicate detection, audit log."],
    ["Career Plus", "$149", "Autopilot plus interview prep, analytics, priority support, human review placeholder."],
  ];
  return `
    <div class="toolbar"><strong>Usage this month: 37 of 80 Autopilot applications</strong><button class="secondary">Manage payment</button></div>
    <div class="plans">
      ${plans.map(([name, price, desc]) => `
        <div class="plan ${name === "Autopilot" ? "featured" : ""}">
          <h2>${name}</h2>
          <div class="price">${price}<small>/month</small></div>
          <p class="muted">${desc}</p>
          <button class="${name === "Autopilot" ? "primary" : "secondary"}" style="margin-top:16px">${name === "Autopilot" ? "Current Plan" : "Choose Plan"}</button>
        </div>`).join("")}
    </div>`;
}

function settings() {
  return `
    <div class="grid two-col">
      <div class="card stack">
        <h2>File and Export Settings</h2>
        ${setting("Resume filename pattern", "Company - Job Title - YYYY-MM-DD Resume.doc")}
        ${setting("Default tracker export", "CSV")}
        ${setting("Save audit log", "Enabled")}
        ${setting("Duplicate detection", "Enabled")}
      </div>
      <div class="card stack">
        <h2>Compliance Boundary</h2>
        <p class="muted">This local MVP prepares and records applications. Real automatic submission to LinkedIn, Indeed, Workday, Greenhouse, Lever, and similar sites should be done through official APIs, OAuth, or a compliant user-controlled extension. The app must not store passwords, bypass CAPTCHAs, or ignore website rules.</p>
        ${state.auditLog.slice(0, 6).map((line) => `<div class="settings-row"><span>${escapeHtml(line)}</span>${chip("Audit")}</div>`).join("")}
      </div>
    </div>`;
}

function decisionPanel(job) {
  const analysis = analyzeJob(job);
  return `
    <div class="card stack">
      <div class="split"><h2>Automation Decision</h2>${chip(analysis.finalAction)}</div>
      <p class="muted">${escapeHtml(job.company)} - ${escapeHtml(job.title)}</p>
      <div class="settings-row"><span>Match score</span>${chip(`${analysis.score}%`)}</div>
      <div class="settings-row"><span>Application risk</span>${chip(analysis.risk)}</div>
      <div class="settings-row"><span>Matched keywords</span><span>${escapeHtml(analysis.matched.slice(0, 6).join(", ") || "None")}</span></div>
      <div><span class="eyebrow">Rule blockers</span><p>${analysis.blockers.map(chip).join(" ") || chip("No blockers")}</p></div>
      <button class="primary" data-generate="${job.id}">Generate Resume</button>
      <button class="secondary" data-mark-applied="${job.id}">Mark Applied</button>
    </div>`;
}

function setting(label, value) {
  return `<div class="settings-row"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
}

function getSelectedJob() {
  return state.jobs.find((job) => job.id === state.selectedJobId) || state.jobs[0];
}

function attachViewEvents() {
  document.querySelectorAll("[data-nav-target]").forEach((button) => button.addEventListener("click", () => navigate(button.dataset.navTarget)));
  document.querySelectorAll("[data-select-job]").forEach((button) => button.addEventListener("click", () => {
    state.selectedJobId = button.dataset.selectJob;
    saveState();
    render();
  }));
  document.querySelectorAll("[data-generate]").forEach((button) => button.addEventListener("click", () => {
    const job = state.jobs.find((item) => item.id === button.dataset.generate);
    const existing = state.variants.find((variant) => variant.jobId === job.id);
    const variant = existing || generateResume(job);
    if (!variant) return;
    downloadText(variant.filename, variant.content, "application/msword");
    render();
  }));
  document.querySelectorAll("[data-download-variant]").forEach((button) => button.addEventListener("click", () => {
    const variant = state.variants.find((item) => item.id === button.dataset.downloadVariant);
    downloadText(variant.filename, variant.content, "application/msword");
  }));
  document.querySelectorAll("[data-mark-applied]").forEach((button) => button.addEventListener("click", () => {
    const job = state.jobs.find((item) => item.id === button.dataset.markApplied);
    job.status = "Applied";
    job.date = today();
    state.auditLog.unshift(`${today()} ${job.company} marked Applied using ${job.resume || "no generated resume"}.`);
    saveState();
    render();
  }));
  document.querySelector("#addJobInline")?.addEventListener("click", openJobDialog);
  document.querySelector("#scanJobsBtn")?.addEventListener("click", scanJobBoards);
  document.querySelector("#importSampleJobsBtn")?.addEventListener("click", scanJobBoards);
  document.querySelector("#fetchGreenhouseBtn")?.addEventListener("click", fetchGreenhouseJobs);
  document.querySelector("#fetchLeverBtn")?.addEventListener("click", fetchLeverJobs);
  document.querySelector("#fetchAshbyBtn")?.addEventListener("click", fetchAshbyJobs);
  document.querySelector("#fetchSmartRecruitersBtn")?.addEventListener("click", fetchSmartRecruitersJobs);
  document.querySelector("#fetchWorkableBtn")?.addEventListener("click", fetchWorkableJobs);
  document.querySelector("#fetchBambooBtn")?.addEventListener("click", fetchBambooJobs);
  document.querySelector("#clearDiscoveredBtn")?.addEventListener("click", () => {
    state.discoveredJobs = [];
    saveState();
    render();
  });
  document.querySelectorAll("[data-add-discovered]").forEach((button) => button.addEventListener("click", () => addDiscoveredJob(button.dataset.addDiscovered)));
  document.querySelectorAll("[data-open-site]").forEach((button) => button.addEventListener("click", () => window.open(button.dataset.openSite, "_blank", "noopener")));
  document.querySelector("#exportCsvBtn2")?.addEventListener("click", exportCsv);
  document.querySelector("#resetDemoBtn")?.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    state = structuredClone(defaultState);
    render();
  });
  document.querySelector("#saveResumeBtn")?.addEventListener("click", saveResume);
  document.querySelector("#resumeFileInput")?.addEventListener("change", handleResumeUpload);
  document.querySelector("#saveRulesBtn")?.addEventListener("click", saveRules);
  document.querySelector("#toggleAutopilot")?.addEventListener("click", () => {
    state.autopilotRules.enabled = !state.autopilotRules.enabled;
    saveState();
    render();
  });
  document.querySelectorAll("[data-answer]").forEach((select) => select.addEventListener("change", () => {
    state.verifiedAnswers[Number(select.dataset.answer)].behavior = select.value;
    state.verifiedAnswers[Number(select.dataset.answer)].verified = `Verified ${new Date().toLocaleDateString()}`;
    saveState();
    render();
  }));
  document.querySelector("#jobSelect")?.addEventListener("change", (event) => {
    state.selectedJobId = event.target.value;
    saveState();
    render();
  });
}

function saveResume() {
  const text = document.querySelector("#resumeText").value.trim();
  if (text.length < 80) {
    alert("Please paste more of your current resume first. JobPilot needs enough detail to rewrite truthfully.");
    return;
  }
  state.resumeText = text;
  state.hasResume = true;
  const words = extractKeywords(text);
  const lines = text.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const knownSkills = [
    "sql",
    "excel",
    "salesforce",
    "python",
    "tableau",
    "power bi",
    "javascript",
    "react",
    "crm",
    "reporting",
    "dashboard",
    "dashboards",
    "automation",
    "project management",
    "data analysis",
    "customer operations",
    "stakeholder communication",
    "process improvement",
    "workflow automation",
  ];
  const lower = normalize(text);
  const detectedSkills = knownSkills.filter((skill) => lower.includes(normalize(skill))).map(titleCase);
  const roleHints = ["Business Analyst", "Operations Analyst", "Data Analyst", "Product Manager", "Project Manager", "Customer Success Manager", "Revenue Operations Analyst"].filter((role) => lower.includes(normalize(role)));
  state.resumeProfile.name = lines[0] || state.resumeProfile.name;
  state.resumeProfile.headline = lines.find((line) => /analyst|manager|engineer|specialist|developer|designer|coordinator|associate/i.test(line)) || "Resume reference saved for job matching";
  state.resumeProfile.keywords = words.slice(0, 10);
  state.resumeProfile.skills = detectedSkills;
  if (roleHints.length) state.resumeProfile.targets = roleHints;
  if (!state.resumeProfile.skills.length) state.resumeProfile.skills = defaultState.resumeProfile.skills;
  state.auditLog.unshift(`${today()} Resume profile analyzed and saved locally.`);
  saveState();
  render();
}

async function handleResumeUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const message = document.querySelector("#resumeFileMessage");
  const textarea = document.querySelector("#resumeText");
  const extension = file.name.split(".").pop().toLowerCase();
  message.textContent = `Reading ${file.name}...`;
  try {
    let text = "";
    if (extension === "txt") text = await file.text();
    if (extension === "pdf") text = await extractPdfText(file);
    if (extension === "docx") text = await extractDocxText(file);
    if (extension === "doc") throw new Error("Legacy .doc files need conversion to .docx or PDF first.");
    if (!text.trim()) throw new Error("No readable resume text was found.");
    textarea.value = text.trim();
    message.textContent = `${file.name} loaded. Review the extracted text, then save it as your reference resume.`;
  } catch (error) {
    message.textContent = `${file.name} could not be read automatically. ${error.message} You can still paste the resume text into the box.`;
  }
}

async function extractPdfText(file) {
  const buffer = await file.arrayBuffer();
  const raw = new TextDecoder("latin1").decode(buffer);
  const chunks = [];
  const textObjectMatches = raw.match(/BT[\s\S]*?ET/g) || [];
  textObjectMatches.forEach((object) => {
    const literalMatches = object.match(/\((?:\\.|[^\\)])*\)\s*Tj/g) || [];
    literalMatches.forEach((match) => chunks.push(decodePdfLiteral(match.replace(/\s*Tj$/, ""))));
    const arrayMatches = object.match(/\[(?:.|\s)*?\]\s*TJ/g) || [];
    arrayMatches.forEach((match) => {
      const literals = match.match(/\((?:\\.|[^\\)])*\)/g) || [];
      literals.forEach((literal) => chunks.push(decodePdfLiteral(literal)));
      const hexes = match.match(/<([0-9a-fA-F\s]+)>/g) || [];
      hexes.forEach((hex) => chunks.push(decodePdfHex(hex)));
    });
    const hexMatches = object.match(/<([0-9a-fA-F\s]+)>\s*Tj/g) || [];
    hexMatches.forEach((match) => chunks.push(decodePdfHex(match.replace(/\s*Tj$/, ""))));
  });
  const text = chunks.join(" ").replace(/\s+/g, " ").trim();
  if (text.length < 40 && /\/Filter\s*\/FlateDecode/.test(raw)) {
    throw new Error("This PDF stores text in compressed streams that need the production PDF parser.");
  }
  return text;
}

function decodePdfLiteral(value) {
  return value
    .replace(/^\(/, "")
    .replace(/\)$/, "")
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\n")
    .replace(/\\t/g, " ")
    .replace(/\\\(/g, "(")
    .replace(/\\\)/g, ")")
    .replace(/\\\\/g, "\\");
}

function decodePdfHex(value) {
  const hex = value.replace(/[<>\s]/g, "");
  let output = "";
  for (let index = 0; index < hex.length - 1; index += 2) {
    const code = parseInt(hex.slice(index, index + 2), 16);
    if (code > 31 && code < 127) output += String.fromCharCode(code);
  }
  return output;
}

async function extractDocxText(file) {
  const buffer = await file.arrayBuffer();
  const entries = parseZipEntries(buffer);
  const documentEntry = entries.find((entry) => entry.name === "word/document.xml");
  if (!documentEntry) throw new Error("This DOCX does not contain a readable document body.");
  const xml = await inflateZipEntry(buffer, documentEntry);
  return xml
    .replace(/<w:tab\/>/g, " ")
    .replace(/<\/w:p>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function parseZipEntries(buffer) {
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);
  let end = -1;
  for (let index = bytes.length - 22; index >= Math.max(0, bytes.length - 66000); index--) {
    if (view.getUint32(index, true) === 0x06054b50) {
      end = index;
      break;
    }
  }
  if (end < 0) throw new Error("The DOCX zip directory could not be found.");
  const total = view.getUint16(end + 10, true);
  let offset = view.getUint32(end + 16, true);
  const entries = [];
  for (let count = 0; count < total; count++) {
    if (view.getUint32(offset, true) !== 0x02014b50) break;
    const method = view.getUint16(offset + 10, true);
    const compressedSize = view.getUint32(offset + 20, true);
    const uncompressedSize = view.getUint32(offset + 24, true);
    const nameLength = view.getUint16(offset + 28, true);
    const extraLength = view.getUint16(offset + 30, true);
    const commentLength = view.getUint16(offset + 32, true);
    const localOffset = view.getUint32(offset + 42, true);
    const name = new TextDecoder().decode(bytes.slice(offset + 46, offset + 46 + nameLength));
    entries.push({ name, method, compressedSize, uncompressedSize, localOffset });
    offset += 46 + nameLength + extraLength + commentLength;
  }
  return entries;
}

async function inflateZipEntry(buffer, entry) {
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);
  const local = entry.localOffset;
  if (view.getUint32(local, true) !== 0x04034b50) throw new Error("The DOCX file entry is invalid.");
  const nameLength = view.getUint16(local + 26, true);
  const extraLength = view.getUint16(local + 28, true);
  const start = local + 30 + nameLength + extraLength;
  const compressed = bytes.slice(start, start + entry.compressedSize);
  if (entry.method === 0) return new TextDecoder().decode(compressed);
  if (entry.method !== 8) throw new Error("This DOCX uses an unsupported compression method.");
  if (!("DecompressionStream" in window)) throw new Error("This browser does not support DOCX decompression.");
  const stream = new Blob([compressed]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  const output = await new Response(stream).arrayBuffer();
  return new TextDecoder().decode(output);
}

function scanJobBoards() {
  if (!state.hasResume) {
    alert("Save your current resume first so JobPilot knows what jobs you qualify for.");
    state.active = "Resume";
    render();
    return;
  }
  const existingUrls = new Set([...state.jobs, ...state.discoveredJobs].map((job) => job.url));
  const matches = state.sampleBoardJobs
    .filter((job) => !existingUrls.has(job.url))
    .map((job, index) => ({ ...job, id: `discovered-${Date.now()}-${index}`, status: "Discovered", mode: "Not added", date: "", resume: "", notes: "Detected by Job Search Tool." }))
    .filter((job) => analyzeJob(job).score >= Math.max(60, state.autopilotRules.threshold - 20))
    .sort((a, b) => analyzeJob(b).score - analyzeJob(a).score);
  state.discoveredJobs = [...matches, ...state.discoveredJobs];
  state.auditLog.unshift(`${today()} Job Search Tool scanned ${state.sampleBoardJobs.length} listings and found ${matches.length} possible matches.`);
  saveState();
  render();
}

async function fetchGreenhouseJobs() {
  const token = document.querySelector("#greenhouseToken")?.value.trim();
  await fetchConnectorJobs("Greenhouse", () => window.JobPilotConnectors.fetchGreenhouse(token));
}

async function fetchLeverJobs() {
  const slug = document.querySelector("#leverSlug")?.value.trim();
  await fetchConnectorJobs("Lever", () => window.JobPilotConnectors.fetchLever(slug));
}

async function fetchAshbyJobs() {
  const board = document.querySelector("#ashbyBoard")?.value.trim();
  await fetchConnectorJobs("Ashby", () => window.JobPilotConnectors.fetchAshby(board));
}

async function fetchSmartRecruitersJobs() {
  const company = document.querySelector("#smartRecruitersCompany")?.value.trim();
  await fetchConnectorJobs("SmartRecruiters", () => window.JobPilotConnectors.fetchSmartRecruiters(company));
}

async function fetchWorkableJobs() {
  const subdomain = document.querySelector("#workableSubdomain")?.value.trim();
  const token = document.querySelector("#workableToken")?.value.trim();
  await fetchConnectorJobs("Workable", () => window.JobPilotConnectors.fetchWorkable(subdomain, token));
}

async function fetchBambooJobs() {
  const subdomain = document.querySelector("#bambooSubdomain")?.value.trim();
  const key = document.querySelector("#bambooApiKey")?.value.trim();
  await fetchConnectorJobs("BambooHR", () => window.JobPilotConnectors.fetchBambooHR(subdomain, key));
}

async function fetchConnectorJobs(source, fetcher) {
  if (!state.hasResume) {
    alert("Save your current resume first so JobPilot can score fetched jobs.");
    state.active = "Resume";
    render();
    return;
  }
  const message = document.querySelector("#connectorMessage");
  if (message) message.textContent = `Fetching ${source} jobs...`;
  try {
    const jobs = await fetcher();
    const existingUrls = new Set([...state.jobs, ...state.discoveredJobs].map((job) => job.url));
    const discovered = jobs
      .filter((job) => job.url && !existingUrls.has(job.url))
      .map((job, index) => ({
        ...job,
        id: `live-${source.toLowerCase()}-${Date.now()}-${index}`,
        status: "Discovered",
        mode: "Not added",
        date: "",
        resume: "",
        notes: `Fetched from ${source} API.`,
      }))
      .filter((job) => analyzeJob(job).score >= Math.max(55, state.autopilotRules.threshold - 25))
      .sort((a, b) => analyzeJob(b).score - analyzeJob(a).score)
      .slice(0, 25);
    state.discoveredJobs = [...discovered, ...state.discoveredJobs];
    state.auditLog.unshift(`${today()} ${source} connector fetched ${jobs.length} jobs and found ${discovered.length} possible resume matches.`);
    saveState();
    render();
  } catch (error) {
    if (message) message.textContent = `${source} fetch failed: ${error.message}`;
    state.auditLog.unshift(`${today()} ${source} connector failed: ${error.message}`);
    saveState();
  }
}

function addDiscoveredJob(id) {
  const found = state.discoveredJobs.find((job) => job.id === id);
  if (!found) return;
  const analysis = analyzeJob(found);
  const job = {
    ...found,
    id: `job-${Date.now()}`,
    status: analysis.finalAction === "Ready for Autopilot" ? "Ready for Autopilot" : "Ready for Review",
    mode: analysis.finalAction === "Ready for Autopilot" ? "Guarded Autopilot" : "Review Mode",
    notes: `Added from ${found.source}. ${analysis.blockers.length ? `Needs review: ${analysis.blockers.join("; ")}` : "Eligible for guarded Autopilot."}`,
  };
  state.jobs.unshift(job);
  state.discoveredJobs = state.discoveredJobs.filter((item) => item.id !== id);
  state.selectedJobId = job.id;
  state.auditLog.unshift(`${today()} Added discovered job ${job.company} - ${job.title} to tracker.`);
  saveState();
  render();
}

function saveRules() {
  document.querySelectorAll("[data-rule]").forEach((input) => {
    const key = input.dataset.rule;
    if (["approvedTitles", "blockedCompanies"].includes(key)) {
      state.autopilotRules[key] = input.value.split(",").map((item) => item.trim()).filter(Boolean);
    } else {
      state.autopilotRules[key] = Number(input.value);
    }
  });
  state.auditLog.unshift(`${today()} Autopilot rules updated.`);
  saveState();
  render();
}

function openJobDialog() {
  document.querySelector("#jobDialog").showModal();
}

function saveJob(event) {
  event.preventDefault();
  const company = document.querySelector("#companyInput").value.trim() || "New Company";
  const title = document.querySelector("#titleInput").value.trim() || "New Role";
  const job = {
    id: `job-${Date.now()}`,
    company,
    title,
    source: document.querySelector("#sourceInput").value,
    location: "Not specified",
    salary: document.querySelector("#salaryInput").value.trim() || "Not listed",
    description: document.querySelector("#descriptionInput").value.trim(),
    status: "Prepared",
    mode: "Review Mode",
    date: "",
    resume: "",
    url: document.querySelector("#urlInput").value.trim(),
    notes: "Added manually.",
  };
  const analysis = analyzeJob(job);
  job.status = analysis.finalAction === "Ready for Autopilot" ? "Ready for Autopilot" : "Ready for Review";
  job.mode = analysis.finalAction === "Ready for Autopilot" ? "Guarded Autopilot" : "Review Mode";
  state.jobs.unshift(job);
  state.selectedJobId = job.id;
  state.auditLog.unshift(`${today()} Added and analyzed ${company} - ${title}.`);
  saveState();
  document.querySelector("#jobDialog").close();
  state.active = "Job Search";
  render();
}

function exportCsv() {
  const headers = ["Company", "Job Title", "Source", "Location", "Salary", "Match Score", "Status", "Date Applied", "Resume File", "Mode", "URL", "Notes"];
  const rows = state.jobs.map((job) => {
    const analysis = analyzeJob(job);
    return [job.company, job.title, job.source, job.location, job.salary, analysis.score, job.status, job.date, job.resume, job.mode, job.url, job.notes];
  });
  const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell || "").replaceAll('"', '""')}"`).join(",")).join("\n");
  downloadText("jobpilot-application-tracker.csv", csv, "text/csv");
}

function navigate(item) {
  state.active = item;
  saveState();
  render();
}

document.querySelector("#nav").addEventListener("click", (event) => {
  const item = event.target.closest("[data-nav]");
  if (item) navigate(item.dataset.nav);
});
document.querySelector("#quickJobBtn").addEventListener("click", openJobDialog);
document.querySelector("#saveJobBtn").addEventListener("click", saveJob);
document.querySelector("#exportCsvBtn").addEventListener("click", exportCsv);

render();
