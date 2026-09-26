'use client';

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowRight, Code2, Sparkles } from "lucide-react";
import { useLenis } from "@/components/providers/smooth-scroll";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const lenis = useLenis();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "40%"]
  );

  const opacityText = useTransform(
    scrollYProgress,
    [0, 0.7],
    [1, 0]
  );

  const scaleBackground = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1, 1.15]
  );

  const handleScrollToProjects = () => {
    if (lenis) {
      lenis.scrollTo("#projects", { duration: 1.2 });
    } else {
      document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[95vh] w-full overflow-x-clip flex flex-col items-center justify-center pt-24 pb-16 px-6"
    >
      {/* Background radial atmosphere */}
      <motion.div
        style={{ scale: scaleBackground }}
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-indigo-500/15 via-emerald-500/10 to-transparent blur-[120px] rounded-full -z-10"
      />

      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="flex flex-col items-center text-center max-w-4xl mx-auto will-change-transform"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm text-xs text-neutral-300 mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Frontend Engineer & Creative Developer</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
          Crafting fluid, high-performance web experiences
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-neutral-400 max-w-2xl font-normal leading-relaxed mb-10">
          Specializing in Next.js App Router, smooth Lenis interactions, and
          compositor-driven animations designed for conversion and delight.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={handleScrollToProjects}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all hover:gap-3 cursor-pointer shadow-lg shadow-white/5"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-full border border-neutral-800 bg-neutral-900/50 text-neutral-300 font-medium text-sm hover:border-neutral-700 hover:text-white transition-all"
          >
            <Code2 className="w-4 h-4 text-neutral-400" />
            <span>GitHub Profile</span>
          </a>
        </div>
      </motion.div>

      {/* Subtle Scroll Cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500 text-xs">
        <span className="tracking-widest uppercase text-[10px]">Scroll</span>
        <div className="w-4 h-7 rounded-full border border-neutral-700 flex justify-center pt-1.5">
          <div className="w-1 h-1.5 bg-neutral-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
