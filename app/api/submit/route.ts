import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getTodayAtMidnight } from "@/lib/date";
import { error } from "console";

export async function POST(req: Request) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({error:"Unauthorized"},{status:401});
    }

    const { content } = await req.json();
    if(!content || content.trim().length === 0){
        return NextResponse.json({error:"Content Needed"},{status:400});
    }
    const today = getTodayAtMidnight();

    const prompt = await db.prompt.findUnique({
        where: {date:today},
    });

    if(!prompt){
        return NextResponse.json({error:"No prompt today :("},{status:500});
    }
    const existing = await db.submission.findFirst({
    where: {
      userId,
      promptId: prompt.id,
    },
    });

    if (existing) {
        return NextResponse.json(
        { error: "You already submitted today" },
        { status: 400 }
        );
    }

    const submission = await db.submission.create({
        data: {
        userId,
        promptId: prompt.id,
        content,
        },
    });

    return NextResponse.json(submission);
    }