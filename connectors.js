window.JobPilotConnectors = {
  async fetchGreenhouse(boardToken) {
    if (!boardToken) throw new Error("Enter a Greenhouse board token, for example 'airbnb'.");
    const url = `https://boards-api.greenhouse.io/v1/boards/${encodeURIComponent(boardToken)}/jobs?content=true`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Greenhouse returned ${response.status}. Check the board token.`);
    const data = await response.json();
    return (data.jobs || []).map((job) => ({
      company: data.name || boardToken,
      title: job.title || "Untitled role",
      source: "Greenhouse",
      location: (job.location && job.location.name) || "Not specified",
      salary: extractSalary(`${job.content || ""} ${job.title || ""}`),
      description: htmlToText(job.content || ""),
      url: job.absolute_url || `https://boards.greenhouse.io/${boardToken}/jobs/${job.id}`,
      externalId: `greenhouse-${boardToken}-${job.id}`,
    }));
  },

  async fetchLever(companySlug) {
    if (!companySlug) throw new Error("Enter a Lever company slug, for example 'netflix'.");
    const url = `https://api.lever.co/v0/postings/${encodeURIComponent(companySlug)}?mode=json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Lever returned ${response.status}. Check the company slug.`);
    const data = await response.json();
    return (data || []).map((job) => ({
      company: companySlug,
      title: job.text || "Untitled role",
      source: "Lever",
      location: (job.categories && job.categories.location) || "Not specified",
      salary: extractSalary(`${job.descriptionPlain || ""} ${job.additionalPlain || ""}`),
      description: [job.descriptionPlain, job.additionalPlain, job.lists?.map((list) => `${list.text}\n${list.content}`).join("\n")].filter(Boolean).join("\n\n"),
      url: job.hostedUrl || job.applyUrl,
      externalId: `lever-${companySlug}-${job.id}`,
    }));
  },

  async fetchAshby(jobBoardName) {
    if (!jobBoardName) throw new Error("Enter an Ashby job board name, for example 'openai'.");
    const url = `https://api.ashbyhq.com/posting-api/job-board/${encodeURIComponent(jobBoardName)}?includeCompensation=true`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Ashby returned ${response.status}. Check the job board name.`);
    const data = await response.json();
    return (data.jobs || []).map((job) => ({
      company: jobBoardName,
      title: job.title || "Untitled role",
      source: "Ashby",
      location: locationToText(job),
      salary: compensationToText(job.compensation) || "Not listed",
      description: [job.descriptionPlain, job.descriptionHtml && htmlToText(job.descriptionHtml), job.department, job.team].filter(Boolean).join("\n\n"),
      url: job.jobUrl || `https://jobs.ashbyhq.com/${jobBoardName}/${job.id}`,
      externalId: `ashby-${jobBoardName}-${job.id}`,
    }));
  },

  async fetchSmartRecruiters(companyIdentifier) {
    if (!companyIdentifier) throw new Error("Enter a SmartRecruiters company identifier.");
    const url = `https://api.smartrecruiters.com/v1/companies/${encodeURIComponent(companyIdentifier)}/postings`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`SmartRecruiters returned ${response.status}. Check the company identifier.`);
    const data = await response.json();
    const jobs = data.content || data.jobs || [];
    return jobs.map((job) => ({
      company: companyIdentifier,
      title: job.name || job.title || "Untitled role",
      source: "SmartRecruiters",
      location: smartRecruitersLocation(job),
      salary: extractSalary(`${job.name || ""} ${job.jobAd?.sections?.jobDescription?.text || ""}`),
      description: smartRecruitersDescription(job),
      url: job.ref || job.applyUrl || job.url || `https://jobs.smartrecruiters.com/${companyIdentifier}`,
      externalId: `smartrecruiters-${companyIdentifier}-${job.id || job.uuid}`,
    }));
  },

  async fetchWorkable(accountSubdomain, apiToken) {
    if (!accountSubdomain || !apiToken) throw new Error("Workable requires an account subdomain and API token.");
    throw new Error("Workable authenticated calls should run through a backend proxy so the API token is not exposed in the browser.");
  },

  async fetchBambooHR(subdomain, apiKey) {
    if (!subdomain || !apiKey) throw new Error("BambooHR requires a subdomain and API key.");
    throw new Error("BambooHR authenticated calls should run through a backend proxy so the API key is not exposed in the browser.");
  },
};

function htmlToText(html) {
  const documentFragment = new DOMParser().parseFromString(html, "text/html");
  return (documentFragment.body.textContent || "").replace(/\s+/g, " ").trim();
}

function extractSalary(text) {
  const match = String(text).match(/\$\s?\d{2,3}(?:,\d{3})?\s?k?\s?[-–]\s?\$?\s?\d{2,3}(?:,\d{3})?\s?k?/i);
  return match ? match[0].replace(/\s+/g, "") : "Not listed";
}

function locationToText(job) {
  const primary = typeof job.location === "string" ? job.location : job.location?.location;
  const secondary = (job.secondaryLocations || []).map((item) => item.location).filter(Boolean);
  return [primary, ...secondary].filter(Boolean).join(" / ") || "Not specified";
}

function compensationToText(compensation) {
  if (!compensation) return "";
  if (typeof compensation === "string") return compensation;
  const min = compensation.compensationTierSummary || compensation.summary;
  return min || "";
}

function smartRecruitersLocation(job) {
  const loc = job.location || {};
  return [loc.city, loc.region, loc.country].filter(Boolean).join(", ") || job.location?.fullLocation || "Not specified";
}

function smartRecruitersDescription(job) {
  const sections = job.jobAd?.sections || {};
  return [
    sections.companyDescription?.text,
    sections.jobDescription?.text,
    sections.qualifications?.text,
    sections.additionalInformation?.text,
    job.description,
  ]
    .filter(Boolean)
    .map(htmlToText)
    .join("\n\n");
}
