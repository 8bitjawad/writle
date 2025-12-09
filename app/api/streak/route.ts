// testing github ignore this
export const runtime = "nodejs";
import { NextResponse } from 'next/server';
import { db } from "@/lib/db";

export async function POST(req:Request){
  try {
    const { userId } = await req.json()

    if(!userId){
      return NextResponse.json({error:"Missing User ID"}, {status:400})
    }
    const user = await db.user.findUnique({
      where: {id:userId}
    })
    if(!user){
      return NextResponse.json({error:"User not found"}, {status:404})
    }
    const today = new Date();
    today.setHours(0,0,0,0);

    let newStreak = 1;
    
    if(user.lastSubmissionDate){
      const last = new Date(user.lastSubmissionDate)
      last.setHours(0,0,0,0);

      const diff = today.getTime() - last.getTime();
      const oneDay = 24 * 60 * 60 * 1000;
      
      if(diff===oneDay){
        newStreak=user.streak+1;
      }
      else if(diff>oneDay){
        newStreak=1;
      }
      else{
        newStreak=user.streak;
      }
    }
    const updated = await db.user.update({
      where:{id:userId},
      data:{streak:newStreak, lastSubmissionDate:today}
    });

    return NextResponse.json({streak:newStreak});
  }
  catch(error){
    console.error(error);
    return NextResponse.json({error:"Failed to update streak"}, {status:500});
  }     
}
