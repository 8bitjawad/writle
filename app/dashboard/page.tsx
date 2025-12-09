import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import ScoreChart from "@/components/Charts/ScoreChart";
import StreakChart from "@/components/Charts/StreakChart";
import WeeklyBarChart from "@/components/Charts/weekly";
import StatsCards from "@/components/Charts/stats";
import WritingRadarChart from "@/components/Charts/radar";
import Heatmap from "@/components/Charts/heatmap";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) return <div>Please sign in</div>;

  const submissions = await db.submission.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });

  return (
    
    <div className="p-8 max-w-4xl mx-auto space-y-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <h1 className="text-3xl font-bold">Your Writing Analytics</h1>
      <section className="bg-white shadow p-6 rounded-xl">
        <Heatmap submissions={submissions} />
       </section>

      <StatsCards submissions={submissions} />

      <div className="bg-white shadow p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Score Trend Over Time</h2>
        <ScoreChart submissions={submissions} />
      </div>

      <section className="bg-white shadow p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Writing Skill Breakdown</h2>
        <WritingRadarChart submissions={submissions} />
      </section>

      <div className="bg-white shadow p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Streak Progress</h2>
        <StreakChart submissions={submissions} />
      </div>

      <div className="bg-white shadow p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Weekly Activity</h2>
        <WeeklyBarChart submissions={submissions} />
      </div>
    </div>
  );
}
