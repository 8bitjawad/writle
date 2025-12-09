
type StatsCardsProps = {
  submissions: any[];
};

export default function StatsCards({ submissions }: StatsCardsProps) {
  const total = submissions.length;
  const avgScore =
    submissions.length > 0
      ? Math.round(
          submissions.reduce(
            (sum, s) => sum + (s.writingScore ?? 0),
            0
          ) / submissions.length
        )
      : 0;

  const currentStreak = 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="p-5 bg-white shadow rounded-xl">
        <p className="text-sm text-gray-500">Total Submissions</p>
        <p className="text-2xl font-bold">{total}</p>
      </div>

      <div className="p-5 bg-white shadow rounded-xl">
        <p className="text-sm text-gray-500">Average Score</p>
        <p className="text-2xl font-bold">{avgScore}</p>
      </div>

      <div className="p-5 bg-white shadow rounded-xl">
        <p className="text-sm text-gray-500">Current Streak</p>
        <p className="text-2xl font-bold">{currentStreak}</p>
      </div>
    </div>
  );
}
