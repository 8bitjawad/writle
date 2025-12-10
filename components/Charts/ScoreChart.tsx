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

type ScoreChartProps = {
  submissions: {
    createdAt: string | Date;
    writingScore: number | null;
  }[];
};

export default function ScoreChart({ submissions } : ScoreChartProps ) {
    const scored = submissions.filter(
        (s) => s.writingScore !== null && s.writingScore !== undefined
    )

    const data = scored.map((s) => ({
        date: new Date(s.createdAt).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    }),
    score: s.writingScore ?? 0,
  }));
  if (data.length === 0) {
    return <p className="text-sm text-black">No score data yet.</p>;
  }
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}