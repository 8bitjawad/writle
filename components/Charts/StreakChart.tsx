"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type StreakChartProps = {
  submissions: {
    createdAt: string | Date;
  }[];
};

export default function StreakChart({ submissions }: StreakChartProps) {
  if (submissions.length === 0) {
    return <p className="text-sm text-gray-500">No streak data yet.</p>;
  }
  const sorted = [...submissions].sort(
    (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const uniqueDays: Date[] = [];
  const seen = new Set<string>();

  for (const s of sorted) {
    const d = new Date(s.createdAt);
    const key = d.toDateString(); 
    if (!seen.has(key)) {
      seen.add(key);
      uniqueDays.push(d);
    }
  }
  let streak = 0;
  let lastDate: Date | null = null;

  const points: { date: string; streak: number }[] = [];

  for (const d of uniqueDays) {
    if (!lastDate) {
      streak = 1; 
    } else {
      const diffMs = d.getTime() - lastDate.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);

      if (Math.round(diffDays) === 1) {
        streak += 1; 
      } else {
        streak = 1; 
      }
    }

    lastDate = d;

    points.push({
      date: d.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),
      streak,
    });
  }
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={points}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="streak"
            stroke="#f97316"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
