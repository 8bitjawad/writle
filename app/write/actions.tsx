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

  return ai;
}
