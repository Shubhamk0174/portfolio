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

  const fontSize = isHome ? "text-[1.25rem]" : "text-[0.8rem]";
  const gapSize = isHome ? "gap-10" : "gap-5";
  const translateHover = isHome ? "hover:-translate-x-3" : "hover:-translate-x-2";
  const bracketTranslateLeft = isHome ? "-translate-x-6" : "-translate-x-4";
  const bracketTranslateRight = isHome ? "translate-x-6" : "translate-x-4";
  const bracketMarginLeft = isHome ? "mr-4" : "mr-3";
  const bracketMarginRight = isHome ? "ml-4" : "ml-3";

  return (
    <nav className="fixed right-[clamp(24px,5vw,64px)] top-[clamp(24px,4vw,48px)] hidden lg:flex z-50">
      <div className="relative flex">
        <ul className={`flex flex-col items-end group/nav transition-all duration-700 ease-out ${gapSize}`}>
          {navItems.map((item) => (
            <li key={item.name} className="relative flex items-center justify-end group/link cursor-pointer">
              <Link 
                href={item.href}
                className={`flex items-center font-mono tracking-[0.2em] transition-all duration-700 ease-out ${fontSize} ${translateHover}`}
              >
                <span className={`opacity-0 transition-all duration-700 ease-out group-hover/link:opacity-100 group-hover/link:translate-x-0 text-amber font-medium ${bracketTranslateLeft} ${bracketMarginLeft}`}>
                  [
                </span>
                <span className="flex gap-3 transition-all duration-700 ease-out text-fog group-hover/nav:opacity-30 group-hover/link:!opacity-100 group-hover/link:text-paper font-semibold">
                  <span className="opacity-40 group-hover/link:text-amber group-hover/link:opacity-100 transition-colors duration-700">{item.id}.</span>
                  <span>{item.name}</span>
                </span>
                <span className={`opacity-0 transition-all duration-700 ease-out group-hover/link:opacity-100 group-hover/link:translate-x-0 text-amber font-medium ${bracketTranslateRight} ${bracketMarginRight}`}>
                  ]
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
