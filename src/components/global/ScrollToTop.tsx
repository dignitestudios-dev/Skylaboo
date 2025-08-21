"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the window
  }, [pathname]); // Re-run effect whenever the pathname changes

  return null; // This component doesn't render any visible UI
}
