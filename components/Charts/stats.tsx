import type { Submission } from "@prisma/client";

type StatsCardsProps = {
  submissions: Submission[];
};

export default function StatsCards({ submissions }: StatsCardsProps) {
  // 1) Total submissions
  const total = submissions.length;

  // 2) Average writing score across all submissions
  const avgScore =
    submissions.length > 0
      ? Math.round(
          submissions.reduce(
            (sum, s) => sum + (s.writingScore ?? 0),
            0
          ) / submissions.length
        )
      : 0;

  // 3) Placeholder for current streak
  // Later we can compute or fetch real streak
  const currentStreak = 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Total */}
      <div className="p-5 bg-white shadow rounded-xl">
        <p className="text-sm text-gray-500">Total Submissions</p>
        <p className="text-2xl font-bold">{total}</p>
      </div>

      {/* Average score */}
      <div className="p-5 bg-white shadow rounded-xl">
        <p className="text-sm text-gray-500">Average Score</p>
        <p className="text-2xl font-bold">{avgScore}</p>
      </div>

      {/* Current streak */}
      <div className="p-5 bg-white shadow rounded-xl">
        <p className="text-sm text-gray-500">Current Streak</p>
        <p className="text-2xl font-bold">{currentStreak}</p>
      </div>
    </div>
  );
}
