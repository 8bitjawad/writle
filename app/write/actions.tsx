"use server";

import { db } from "@/lib/db";
import { generateFeedback } from "@/lib/ai/generateFeedback";

export async function submitForm(
  formData: FormData,
  promptId: string,
  prismaUserId: string
) {
  const content = formData.get("content") as string;

  const submission = await db.submission.create({
    data: {
      content,
      promptId,
      userId: prismaUserId,
    },
  });

  const ai = await generateFeedback(content);

  if (ai) {
    await db.submission.update({
      where: { id: submission.id },
      data: {
        feedback: ai.feedback,
        writingScore: ai.writingScore,
        clarityScore: ai.clarityScore,
        coherenceScore: ai.coherenceScore,
        vocabularyScore: ai.vocabularyScore,
        grammarScore: ai.grammarScore,
      },
    });
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/streak`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: prismaUserId }),
  });

  const streakData = await res.json();

  return {...ai, 
    streak:streakData.streak,};
}
