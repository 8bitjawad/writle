"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type WeeklyBarChartProps = {
  submissions: {
    createdAt: string | Date;
  }[];
};

export default function WeeklyBarChart({ submissions }: WeeklyBarChartProps) {
  const today = new Date();

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (6 - i)); 
    return d;
  });

  const data = last7Days.map((day) => {
    const count = submissions.filter((s) => {
      const created = new Date(s.createdAt).toDateString();
      return created === day.toDateString();
    }).length;

    return {
      day: day.toLocaleDateString("en-IN", { weekday: "short" }),
      submissions: count,
    };
  });

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="submissions" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
