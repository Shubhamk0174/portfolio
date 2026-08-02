"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const [text, setText] = useState("");
  const fullText = "ERROR 404: Path lost in the void.\n\nAttempting to locate coordinates...\nFailed.\n\nWould you like to return to the root directory? [Y/n]";
  const router = useRouter();

  // Typewriter effect
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, currentIndex));
      currentIndex++;
      if (currentIndex > fullText.length) {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut to return home
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'y' || e.key === 'Enter') {
        router.push('/');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center bg-ink text-paper px-6 selection:bg-amber selection:text-ink">
      <div className="grid-bg opacity-30"></div>
      <div className="vignette"></div>
      
      <div className="relative z-10 w-full max-w-2xl bg-ink border border-line/40 p-8 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_rgba(0,220,130,0.05)] backdrop-blur-sm">
        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-6 border-b border-line/40 pb-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span className="font-mono text-xs text-fog tracking-widest opacity-50">tty1</span>
        </div>
        
        {/* Terminal Body */}
        <div className="font-mono text-sm sm:text-base leading-relaxed text-amber whitespace-pre-wrap min-h-[160px]">
          {text}
          <span className="animate-blink-cursor inline-block w-2 h-[1em] bg-amber align-middle ml-1 translate-y-[2px]"></span>
        </div>
        
        {/* Action Button (Fades in when typing completes) */}
        <div className={`mt-8 transition-opacity duration-1000 ${text.length >= fullText.length ? 'opacity-100' : 'opacity-0'}`}>
          <Link 
            href="/"
            className="inline-block px-5 py-2 font-mono text-sm border border-amber/30 text-amber hover:bg-amber hover:text-ink transition-all duration-300 font-semibold uppercase tracking-widest"
          >
            &gt; INITIALIZE REBOOT
          </Link>
        </div>
      </div>
    </div>
  );
}
