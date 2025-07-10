// src/hooks/useIsMobile.ts
"use client";

import { useState, useEffect } from "react";

// This hook returns `true` if the window width is less than the breakpoint (default 768px).
export const useIsMobile = (breakpoint: number = 768): boolean => {
  // To prevent SSR mismatch, we can't check window.innerWidth on the server.
  // We initialize state to `false` and update it on the client with useEffect.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // This code runs only on the client.
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Run on mount
    checkScreenSize();

    // Re-run on resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, [breakpoint]);

  return isMobile;
};
