"use client";

import React, { useEffect, useState, useRef, ReactNode } from "react";
import { useTheme } from "./ThemeProvider";

import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";
import Link from "next/link";

const CHARS = '!<>-_\\/[]{}—=+*^?#01';

const TICKER_ITEMS = [
  "Java",
  "Python",
  "JavaScript",
  "TypeScript",
  "Next.js",
  "React",
  "React Native",
  "Express.js",
  "Supabase",
  "PostgreSQL",
  "Tailwind CSS",
  "Git"
];

function useTextScramble(finalText: string) {
  const [displayNodes, setDisplayNodes] = useState<ReactNode[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);
  const queueRef = useRef<{ from: string; to: string; start: number; end: number; char: string }[]>([]);
  const frameRef = useRef(0);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayNodes([finalText]);
      setIsRevealed(true);
      return;
    }

    const length = finalText.length;
    const queue = [];
    for (let i = 0; i < length; i++) {
      const from = '';
      const to = finalText[i] || '';
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 24) + 16;
      queue.push({ from, to, start, end, char: '' });
    }
    queueRef.current = queue;
    frameRef.current = 0;

    let complete = 0;

    const update = () => {
      let nodes: ReactNode[] = [];
      complete = 0;
      for (let i = 0; i < queueRef.current.length; i++) {
        let q = queueRef.current[i];
        if (frameRef.current >= q.end) {
          complete++;
          nodes.push(q.to);
        } else if (frameRef.current >= q.start) {
          if (!q.char || Math.random() < 0.3) {
            q.char = q.to === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)];
          }
          nodes.push(<span key={i} className="text-fog">{q.char}</span>);
        } else {
          nodes.push(q.from);
        }
      }

      setDisplayNodes(nodes);

      if (complete === queueRef.current.length) {
        setIsRevealed(true);
      } else {
        frameRef.current++;
        requestRef.current = requestAnimationFrame(update);
      }
    };

    const timeout = setTimeout(() => {
      requestRef.current = requestAnimationFrame(update);
    }, 300);

    return () => {
      clearTimeout(timeout);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [finalText]);

  return { displayNodes, isRevealed };
}

export function Hero() {
  const { theme, setTheme } = useTheme();
  const [time, setTime] = useState("--:--:-- IST");
  
  const finalHeadline = "I build backend systems that don't wake me up at 3am.";
  const { displayNodes, isRevealed } = useTextScramble(finalHeadline);
  
  const [showRest, setShowRest] = useState({
    byline: false,
    sub: false,
    cta: false,
  });

  useEffect(() => {
    if (isRevealed) {
      setTimeout(() => setShowRest(s => ({ ...s, byline: true })), 250);
      setTimeout(() => setShowRest(s => ({ ...s, sub: true })), 520);
      setTimeout(() => setShowRest(s => ({ ...s, cta: true })), 780);
    }
  }, [isRevealed]);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false });
      setTime(timeStr + ' IST');
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div 
      className="relative min-h-screen flex flex-col text-paper"
    >
      <div className="grid-bg"></div>
      
      <div className="vignette"></div>

      {/* Topbar */}
      <header className="relative z-10 flex items-center pt-[clamp(18px,3vw,32px)] px-[clamp(24px,6vw,96px)] font-mono text-xs tracking-widest text-fog">
        <div className="flex items-center gap-6">
          <span className="font-tabular-nums hidden sm:inline">{time}</span>
          <button 
            onClick={toggleTheme}
            className="hover:text-paper transition-colors cursor-pointer flex items-center justify-center p-2 -ml-2 rounded-full hover:bg-line/20 text-[1.1rem]"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
        </div>
        
        <div className="flex items-center gap-5 border-l border-line/40 pl-6 ml-6 text-[1.15rem]">
          <a href="https://github.com/Shubhamk0174" target="_blank" rel="noopener noreferrer" className="hover:text-paper transition-colors hover:scale-110" aria-label="GitHub">
            <IoLogoGithub />
          </a>
          <a href="https://www.linkedin.com/in/shubhamkumar-profile/" target="_blank" rel="noopener noreferrer" className="hover:text-paper transition-colors hover:scale-110" aria-label="LinkedIn">
            <IoLogoLinkedin />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col justify-center py-[clamp(32px,6vw,48px)] px-[clamp(24px,6vw,96px)] max-w-275">
        <h1 className="m-0 font-mono font-bold text-[clamp(2rem,5.4vw,4.4rem)] leading-[1.12] tracking-[-0.01em] text-paper min-h-[1.2em]">
          <span>{displayNodes.length > 0 ? displayNodes : <>&nbsp;</>}</span>
          <span className={`inline-block ml-0.5 text-amber transform translate-y-0.5 ${isRevealed ? 'animate-blink-cursor opacity-100' : 'opacity-0'}`}>
            ▍
          </span>
        </h1>

        <p className={`font-mono font-semibold text-[clamp(0.9rem,1.4vw,1.05rem)] text-amber mt-4.5 transition-all duration-600 ease-out ${showRest.byline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          Shubham Kumar — Full Stack Developer
        </p>

        <p className={`font-sans text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.65] text-fog max-w-155 mt-5.5 transition-all duration-600 ease-out ${showRest.sub ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          Currently dedicating my time to <strong className="text-paper font-semibold">Continuous Learning</strong> —
          exploring modern web technologies and mastering everything from database architecture to the final user experience.
        </p>

        <div className={`flex gap-3.5 flex-wrap mt-8.5 transition-all duration-600 ease-out ${showRest.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <Link href="/projects" className="font-mono text-[0.9rem] font-semibold no-underline py-3.25 px-5.5 rounded-md inline-flex items-center gap-2 transition-all duration-150 ease-out bg-amber text-ink border border-amber hover:opacity-80 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-amber w-full sm:w-auto justify-center">
            View my work <span aria-hidden="true">→</span>
          </Link>
          <Link href="/contact" className="font-mono text-[0.9rem] font-semibold no-underline py-3.25 px-[22px] rounded-md inline-flex items-center gap-2 transition-all duration-150 ease-out bg-transparent text-paper border border-line hover:border-fog hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-offset-[3px] focus-visible:outline-amber w-full sm:w-auto justify-center">
            Get in touch
          </Link>
        </div>
      </main>

      {/* Ticker */}
      <footer className="relative z-10 border-t border-line bg-panel overflow-hidden py-3.5">
        <div className="flex w-max animate-scroll-ticker">
          <span className="font-mono text-[0.78rem] tracking-[0.14em] text-fog whitespace-nowrap pr-0">
            {TICKER_ITEMS.map((item, i) => (
              <React.Fragment key={i}>
                {item}&nbsp;&nbsp;&middot;&nbsp;&nbsp;
              </React.Fragment>
            ))}
          </span>
          <span className="font-mono text-[0.78rem] tracking-[0.14em] text-fog whitespace-nowrap pr-0" aria-hidden="true">
            {TICKER_ITEMS.map((item, i) => (
              <React.Fragment key={i}>
                {item}&nbsp;&nbsp;&middot;&nbsp;&nbsp;
              </React.Fragment>
            ))}
          </span>
        </div>
      </footer>
    </div>
  );
}
