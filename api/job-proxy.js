export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { source, id } = request.query || {};
  if (!source || !id) {
    response.status(400).json({ error: "source and id are required." });
    return;
  }

  try {
    const jobs = await fetchJobs(source, id);
    response.status(200).json({ jobs });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}

async function fetchJobs(source, id) {
  if (source === "greenhouse") {
    const result = await fetch(`https://boards-api.greenhouse.io/v1/boards/${encodeURIComponent(id)}/jobs?content=true`);
    if (!result.ok) throw new Error(`Greenhouse returned ${result.status}.`);
    const data = await result.json();
    return (data.jobs || []).map((job) => ({
      company: data.name || id,
      title: job.title,
      source: "Greenhouse",
      location: job.location?.name || "Not specified",
      salary: "Not listed",
      description: stripHtml(job.content || ""),
      url: job.absolute_url,
      externalId: `greenhouse-${id}-${job.id}`,
    }));
  }

  if (source === "lever") {
    const result = await fetch(`https://api.lever.co/v0/postings/${encodeURIComponent(id)}?mode=json`);
    if (!result.ok) throw new Error(`Lever returned ${result.status}.`);
    const data = await result.json();
    return (data || []).map((job) => ({
      company: id,
      title: job.text,
      source: "Lever",
      location: job.categories?.location || "Not specified",
      salary: "Not listed",
      description: [job.descriptionPlain, job.additionalPlain].filter(Boolean).join("\n\n"),
      url: job.hostedUrl || job.applyUrl,
      externalId: `lever-${id}-${job.id}`,
    }));
  }

  if (source === "ashby") {
    const result = await fetch(`https://api.ashbyhq.com/posting-api/job-board/${encodeURIComponent(id)}?includeCompensation=true`);
    if (!result.ok) throw new Error(`Ashby returned ${result.status}.`);
    const data = await result.json();
    return (data.jobs || []).map((job) => ({
      company: id,
      title: job.title,
      source: "Ashby",
      location: typeof job.location === "string" ? job.location : job.location?.location || "Not specified",
      salary: job.compensation?.compensationTierSummary || "Not listed",
      description: job.descriptionPlain || stripHtml(job.descriptionHtml || ""),
      url: job.jobUrl,
      externalId: `ashby-${id}-${job.id}`,
    }));
  }

  throw new Error(`Unsupported source: ${source}`);
}

function stripHtml(html) {
  return String(html).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
