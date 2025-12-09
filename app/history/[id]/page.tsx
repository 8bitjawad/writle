import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import Link from "next/link";

export default async function SubmissionPage({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return <p className="p-6 text-red-600">You must be logged in.</p>;

  const submission = await db.submission.findFirst({
    where: {
      id: params.id,
      userId: user.id,
    },
  });

  if (!submission) {
    return (
      <div className="p-6">
        <p className="text-red-600">Submission not found.</p>
        <Link href="/history" className="text-blue-600 underline mt-3 block">
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Link href="/history" className="text-blue-600 underline">
        ← Back to History
      </Link>

      <h1 className="text-2xl font-semibold">
        Submitted on{" "}
        {new Date(submission.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </h1>

      <div className="p-6 rounded-xl border bg-white shadow-sm whitespace-pre-wrap text-gray-800 leading-relaxed">
        {submission.content}
      </div>
    </div>
  );
}
