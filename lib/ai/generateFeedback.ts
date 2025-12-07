import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateFeedback(content: string) {
  if (!process.env.GROQ_API_KEY) {
    console.warn("GROQ_API_KEY not set");
    return null;
  }

  const result = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: `
You MUST respond ONLY with valid JSON.

Use this exact shape:

{
  "feedback": "A short, friendly paragraph giving constructive feedback. 3–5 sentences.",
  "writingScore": number,
  "clarityScore": number,
  "coherenceScore": number,
  "vocabularyScore": number,
  "grammarScore": number
}

Rules:
- Do NOT wrap JSON in backticks.
- Do NOT add comments.
- Do NOT add explanations.
- Do NOT include any text before or after the JSON.
`
      },
      {
        role: "user",
        content,
      },
    ],
    temperature: 0.3,
  });

  const raw = result.choices?.[0]?.message?.content?.trim() ?? "{}";

  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("JSON parse error. Raw output:", raw);
    return null;
  }
}
