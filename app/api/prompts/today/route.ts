import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getTodayAtMidnight } from "@/lib/date";

export async function GET() {
  const today = getTodayAtMidnight();

  // Step 1: Check if today's prompt exists
  let prompt = await db.prompt.findUnique({
    where: { date: today },
  });

  // Step 2: If not, create a default one
  if (!prompt) {
    prompt = await db.prompt.create({
      data: {
        date: today,
        text: "Write about something you learned today.",
      },
    });
  }

  return NextResponse.json(prompt);
}
