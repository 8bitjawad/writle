"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type RadarChartProps = {
  submissions: {
    clarityScore: number | null;
    coherenceScore: number | null;
    vocabularyScore: number | null;
    grammarScore: number | null;
    createdAt: string | Date;
  }[];
};

export default function WritingRadarChart({ submissions }: RadarChartProps) {
  const latest = submissions[submissions.length - 1];

  if (!latest) {
    return <p className="text-sm text-gray-500">No radar data yet.</p>;
  }
  const data = [
    {
      skill: "Clarity",
      score: latest.clarityScore ?? 0,
      fullMark: 100,
    },
    {
      skill: "Coherence",
      score: latest.coherenceScore ?? 0,
      fullMark: 100,
    },
    {
      skill: "Vocabulary",
      score: latest.vocabularyScore ?? 0,
      fullMark: 100,
    },
    {
      skill: "Grammar",
      score: latest.grammarScore ?? 0,
      fullMark: 100,
    },
  ];

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="skill" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Tooltip />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#4f46e5"
            fill="#6366f1"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
