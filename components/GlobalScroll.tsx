"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

const ROUTES = [
  "/",
  "/about",
  "/projects",
  "/experience",
  "/contact"
];

// Prevents rapid back-to-back scrolls from skipping multiple pages
const SCROLL_COOLDOWN = 1200; 

export function GlobalScroll() {
  const router = useRouter();
  const pathname = usePathname();
  const lastScrollTime = useRef(0);
  const isNavigating = useRef(false);

  // Reset navigating lock when the route actually changes
  useEffect(() => {
    const timer = setTimeout(() => {
      isNavigating.current = false;
    }, 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < SCROLL_COOLDOWN || isNavigating.current) return;
      
      const currentIndex = ROUTES.indexOf(pathname);
      if (currentIndex === -1) return;

      // Ensure it's a deliberate scroll, not just a micro-scroll
      if (e.deltaY > 30) {
        // Scroll down -> go to next route
        if (currentIndex < ROUTES.length - 1) {
          lastScrollTime.current = now;
          isNavigating.current = true;
          router.push(ROUTES[currentIndex + 1]);
        }
      } else if (e.deltaY < -10) {
        // Scroll up -> go to previous route
        if (currentIndex > 0) {
          lastScrollTime.current = now;
          isNavigating.current = true;
          router.push(ROUTES[currentIndex - 1]);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [pathname, router]);

  // Touch handling for mobile devices
  const touchStart = useRef(0);
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < SCROLL_COOLDOWN || isNavigating.current) return;
      
      const touchEnd = e.touches[0].clientY;
      const delta = touchStart.current - touchEnd; // Positive means scrolled down
      
      const currentIndex = ROUTES.indexOf(pathname);
      if (currentIndex === -1) return;

      // Require a swipe of at least 50px
      if (delta > 50) {
        if (currentIndex < ROUTES.length - 1) {
          lastScrollTime.current = now;
          isNavigating.current = true;
          router.push(ROUTES[currentIndex + 1]);
        }
      } else if (delta < -50) {
        if (currentIndex > 0) {
          lastScrollTime.current = now;
          isNavigating.current = true;
          router.push(ROUTES[currentIndex - 1]);
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [pathname, router]);

  return null;
}
