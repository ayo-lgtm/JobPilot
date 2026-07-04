export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    response.status(500).json({ error: "OPENAI_API_KEY is not configured." });
    return;
  }

  try {
    const { resumeText, jobDescription, company, title, matchedKeywords, missingKeywords } = request.body || {};
    if (!resumeText || !jobDescription) {
      response.status(400).json({ error: "resumeText and jobDescription are required." });
      return;
    }

    const prompt = [
      "Rewrite the resume for this job while preserving strict truthfulness.",
      "Do not invent employers, dates, degrees, certifications, licenses, immigration status, criminal/background information, skills, or experience.",
      "Use only facts present in the reference resume. Improve wording, ordering, and ATS keyword alignment.",
      "Return JSON with keys: summary, tailoredResume, changeNotes, safetyNotes.",
      "",
      `Company: ${company || "Unknown"}`,
      `Job title: ${title || "Unknown"}`,
      `Matched keywords: ${(matchedKeywords || []).join(", ")}`,
      `Missing keywords: ${(missingKeywords || []).join(", ")}`,
      "",
      "Reference resume:",
      resumeText,
      "",
      "Job description:",
      jobDescription,
    ].join("\n");

    const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: prompt,
        text: {
          format: {
            type: "json_schema",
            name: "tailored_resume_response",
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                summary: { type: "string" },
                tailoredResume: { type: "string" },
                changeNotes: { type: "array", items: { type: "string" } },
                safetyNotes: { type: "array", items: { type: "string" } },
              },
              required: ["summary", "tailoredResume", "changeNotes", "safetyNotes"],
            },
          },
        },
      }),
    });

    const data = await openaiResponse.json();
    if (!openaiResponse.ok) {
      response.status(openaiResponse.status).json({ error: data.error?.message || "OpenAI request failed." });
      return;
    }

    const text = data.output_text || data.output?.flatMap((item) => item.content || []).find((item) => item.type === "output_text")?.text;
    response.status(200).json(JSON.parse(text));
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}
