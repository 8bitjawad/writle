"use client";

import { useMemo } from "react";

type HeatmapProps = {
  submissions: {
    createdAt: string | Date;
  }[];
};

// Generate YYYY-MM-DD from date
function formatDate(d: Date) {
  return d.toISOString().split("T")[0];
}

export default function Heatmap({ submissions }: HeatmapProps) {
  // 1) Convert submission timestamps into a Set of YYYY-MM-DD
  const submissionDays = useMemo(() => {
    const set = new Set<string>();
    submissions.forEach((s) => {
      const day = formatDate(new Date(s.createdAt));
      set.add(day);
    });
    return set;
  }, [submissions]);

  // 2) Create 90-day heatmap window (like GitHub mini version)
  const today = new Date();
  const days = [];

  for (let i = 89; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    days.push(d);
  }

  // 3) Convert days into heatmap boxes
  const boxes = days.map((d) => {
    const dateKey = formatDate(d);
    const active = submissionDays.has(dateKey);

    return {
      date: dateKey,
      active,
    };
  });

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Last 90 Days Activity</h3>

      <div className="grid grid-cols-15 gap-1">
        {boxes.map((box) => (
          <div
            key={box.date}
            title={box.date}
            className={`
              w-3 h-3 rounded-sm
              ${box.active ? "bg-green-600" : "bg-gray-300"}
            `}
          />
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-2">
        Green = days you wrote something.
      </p>
    </div>
  );
}
