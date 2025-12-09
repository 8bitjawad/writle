import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { getTodayAtMidnight } from "@/lib/date";
import WriteForm from "./WriteForm";
import { PROMPTS } from "@/lib/prompts";

export default async function WritePage() {
  const { userId } = await auth();
  if (!userId) return <p>You must be logged in.</p>;

  let user = await db.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    user = await db.user.create({
      data: { clerkId: userId },
    });
  }

  const prismaUserId = user.id;
  const today = getTodayAtMidnight();
  let prompt = await db.prompt.findUnique({
    where: { date: today },
  });

  if (!prompt) {
  const randomPrompt = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];

  prompt = await db.prompt.create({
    data: {
      date: today,
      text: randomPrompt,
    },
  });
}

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <h1 className="text-3xl font-bold">Today's Prompt</h1>

      <p className="text-lg bg-gray-100 p-4 rounded">{prompt.text}</p>

      <WriteForm promptId={prompt.id} prismaUserId={prismaUserId} />
    </div>
  );
}
