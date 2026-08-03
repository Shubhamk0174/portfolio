"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { id: '01', name: 'ABOUT', href: '/about' },
  { id: '02', name: 'PROJECTS', href: '/projects' },
  { id: '03', name: 'EXPERIENCE', href: '/experience' },
  { id: '04', name: 'CONTACT', href: '/contact' },
];

export function SideNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const fontSize = isHome ? "text-[1.6rem]" : "text-[0.8rem]";
  const gapSize = isHome ? "gap-14" : "gap-5";
  const translateHover = isHome ? "hover:-translate-x-3" : "hover:-translate-x-2";
  const bracketTranslateLeft = isHome ? "-translate-x-6" : "-translate-x-4";
  const bracketTranslateRight = isHome ? "translate-x-6" : "translate-x-4";
  const bracketMarginLeft = isHome ? "mr-4" : "mr-3";
  const bracketMarginRight = isHome ? "ml-4" : "ml-3";

  return (
    <nav className={`fixed hidden lg:flex z-50 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
      isHome 
        ? "top-[40%] -translate-y-1/2 right-[clamp(40px,8vw,120px)]" 
        : "top-[clamp(24px,4vw,48px)] right-[clamp(24px,5vw,64px)]"
    }`}>
      <div className="relative flex">
        {isHome && (
          <div className="absolute inset-0 -inset-y-12 -inset-x-24 bg-linear-to-l from-panel/40 to-transparent blur-2xl -z-10 pointer-events-none rounded-full" />
        )}
        <ul className={`flex flex-col items-end group/nav transition-all duration-700 ease-out ${gapSize}`}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name} className="relative flex items-center justify-end group/link cursor-pointer">
                <Link 
                  href={item.href}
                  className={`flex items-center font-mono tracking-[0.2em] transition-all duration-700 ease-out ${fontSize} ${translateHover}`}
                >
                  <span className={`transition-all duration-700 ease-out group-hover/link:opacity-100 group-hover/link:translate-x-0 text-amber font-medium ${bracketMarginLeft} ${isActive ? 'opacity-100 translate-x-0' : `opacity-0 ${bracketTranslateLeft}`}`}>
                    [
                  </span>
                  <span className={`flex gap-3 transition-all duration-700 ease-out group-has-[:hover]/nav:opacity-30 group-hover/link:opacity-100! group-hover/link:text-paper font-semibold ${isActive ? 'text-paper' : (isHome ? 'text-fog hover:text-paper drop-shadow-md' : 'text-fog')}`}>
                    <span className={`transition-colors duration-700 group-hover/link:text-amber group-hover/link:opacity-100 ${isActive ? 'text-amber opacity-100' : 'opacity-40'}`}>{item.id}.</span>
                    <span>{item.name}</span>
                  </span>
                  <span className={`transition-all duration-700 ease-out group-hover/link:opacity-100 group-hover/link:translate-x-0 text-amber font-medium ${bracketMarginRight} ${isActive ? 'opacity-100 translate-x-0' : `opacity-0 ${bracketTranslateRight}`}`}>
                    ]
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
