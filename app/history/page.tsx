import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export default async function HistoryPage() {
  const user = await currentUser();
  if (!user) {
    return <p className="p-6 text-red-600">You must be logged in.</p>;
  }

  const submissions = await db.submission.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  // 👇 Automatically infer the type of each item in submissions[]
  type SubmissionType = typeof submissions[number];

  return (
    <div
      className="max-w-3xl mx-auto p-6 space-y-6"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <h1 className="text-3xl font-semibold">Your Writing History</h1>

      {submissions.length === 0 && (
        <p className="text-gray-600">You haven’t submitted anything yet.</p>
      )}

      <div className="space-y-4">
        {submissions.map((s: SubmissionType) => (
          <a
            href={`/history/${s.id}`}
            key={s.id}
            className="block border p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition"
          >
            <p className="text-sm text-gray-500">
              {new Date(s.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <p className="mt-2 text-gray-700 line-clamp-3">{s.content}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
