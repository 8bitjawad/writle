"use client";

import { useState, useTransition } from "react";
import { submitForm } from "./actions";

export default function WriteForm({
  promptId,
  prismaUserId,
}: {
  promptId: string;
  prismaUserId: string;
}) {
  const [result, setResult] = useState<any>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await submitForm(formData, promptId, prismaUserId);
      setResult(res);
    });
  }

  return (
    <div className="space-y-6">
      <form action={handleSubmit} className="space-y-4">
        <textarea
          name="content"
          className="w-full h-48 p-3 border rounded"
          placeholder="Start writing..."
          required
        />

        <button
          type="submit"
          disabled={isPending}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    
    {typeof result?.streak === "number" && (
        <div className="bg-orange-100 text-orange-800 px-3 py-2 rounded-md inline-block">
          🔥 {result.streak}-day streak
        </div>
      )}

     {result?.feedback && (
        <div>
          <h2>AI Feedback</h2>
          <p>{result.feedback}</p>
        </div>
      )}
      {typeof result?.writingScore === "number" && (
      <div className="p-4 border rounded-lg bg-green-50">
        <h2 className="text-lg font-semibold mb-2 text-green-700">Writing Scores</h2>
        <ul className="text-gray-800 space-y-1">
          <li><strong>Overall:</strong> {result.writingScore}/10</li>
          <li><strong>Clarity:</strong> {result.clarityScore}/10</li>
          <li><strong>Coherence:</strong> {result.coherenceScore}/10</li>
          <li><strong>Vocabulary:</strong> {result.vocabularyScore}/10</li>
          <li><strong>Grammar:</strong> {result.grammarScore}/10</li>
        </ul>
      </div>
      )}
    </div>
  );
}
