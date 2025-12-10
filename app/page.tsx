"use client";

import React from 'react';
import Link from "next/link";

export default function Home() {
  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    document.body.style.fontFamily = "'Plus Jakarta Sans', sans-serif";
    
    return () => {
      document.body.style.fontFamily = '';
    };
  }, []);

  const techStack = [
    { name: 'Next.js', icon: '▲' },
    { name: 'React.js', icon: '⚛' },
    { name: 'Tailwind CSS', icon: '🎨' },
    { name: 'Llama 3', icon: '🤖' },
    { name: "Prisma", icon: "◭" },
    { name: "Clerk", icon: "🔑" },
    { name: "Supabase", icon: "⚡" },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-12 px-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      <div className="max-w-3xl text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-extrabold tracking-tight">
            Welcome to <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">Writle</span>
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-purple-400 mx-auto rounded-full"></div>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
          Inspired by NYT's Wordle, Writle was built to help people regain their natural writing abilities 
          in an era where over-dependence on LLMs has weakened creativity, cognitive ability,
          clarity, and critical thinking. Every day, you get a new prompt, and through consistent practice, 
          structured feedback, and personal reflection, Writle helps you rebuild 
          strong writing habits. Writle also gives you AI-generated feedback 
          to improve your writing abilities. Come back every day for a new writing prompt!
        </p>

        <div className="space-y-3 pt-4">
          <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide">Built With</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {techStack.map((tech) => (
              <span 
                key={tech.name}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-purple-200 rounded-full text-sm font-medium text-purple-700 shadow-sm hover:shadow-md hover:border-purple-300 transition-all"
              >
                <span className="text-lg">{tech.icon}</span>
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Buttons changed to <Link> */}
        <div className="flex gap-4 justify-center pt-6">
          <Link
            href="/write"
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Start Writing
          </Link>

          <Link
            href="/sign-in"
            className="px-8 py-3 rounded-lg border-2 border-purple-200 bg-white text-purple-700 font-semibold hover:bg-purple-50 hover:border-purple-300 transition-all"
          >
            Sign In
          </Link>
        </div>
      </div>

      <div className="mt-16 text-center text-gray-600 space-y-2">
        <p className="text-sm">
          Built by{" "}
          <a
            href="https://github.com/8bitjawad"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 font-medium hover:text-purple-700 underline decoration-2 underline-offset-2"
          >
            Jawad
          </a>
        </p>
        <a 
          href="https://www.linkedin.com/in/mohammed-jawad-hussain" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 font-medium hover:text-purple-700 underline decoration-2 underline-offset-2 inline-block"
        >
          Connect on LinkedIn
        </a>
      </div>

    </main>
  );
}
