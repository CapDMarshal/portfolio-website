'use client';

import React from "react";
import Link from "next/link";
import { FileText } from "lucide-react";
import { useLenis } from "@/components/providers/smooth-scroll";

export function Navbar() {
  const lenis = useLenis();

  const handleScrollTo = (target: string) => {
    if (lenis) {
      lenis.scrollTo(target, { offset: -40, duration: 1.2 });
    } else {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between gap-4 sm:gap-6 px-4 sm:px-6 py-2.5 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-800 shadow-2xl transition-all hover:border-neutral-700">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-white hover:text-neutral-300 transition-colors"
        >
          Marshal<span className="text-emerald-400">.</span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-5 text-xs text-neutral-400">
          <button
            onClick={() => handleScrollTo("#about")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => handleScrollTo("#projects")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Projects
          </button>
          <button
            onClick={() => handleScrollTo("#experience")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Experience
          </button>
          <button
            onClick={() => handleScrollTo("#skills")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Stack
          </button>
          <button
            onClick={() => handleScrollTo("#contact")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </button>
        </div>

        <div className="hidden md:flex items-center gap-3 pl-3 border-l border-neutral-800 text-[11px] text-neutral-300">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-neutral-400">Available</span>
          </div>

          <button
            onClick={() => handleScrollTo("#contact")}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 transition-colors cursor-pointer"
          >
            <FileText className="w-3 h-3 text-emerald-400" />
            <span>CV</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
