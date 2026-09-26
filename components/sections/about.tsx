'use client';

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Compass, Flame, Sparkles, Users } from "lucide-react";

const PILLARS = [
  {
    icon: Flame,
    tag: "Creative Engineering",
    title: "Fluid Motion & Frontend Systems",
    description:
      "Next.js App Router, React 19, Motion, and Lenis smooth scrolling. Strictly eliminating layout thrashing through GPU compositor acceleration, responsive layouts, and accessible motion controls.",
  },
  {
    icon: Sparkles,
    tag: "Applied AI",
    title: "Intelligence Beyond Prototypes",
    description:
      "Bridging Google Gemini 2.5 Flash, Vertex AI, TensorFlow, and PyTorch into real-world applications — from sub-50ms facial authentication pipelines to progressive vision-AI reporting tools.",
  },
  {
    icon: Users,
    tag: "Technical Leadership",
    title: "Division Strategy & Mentorship",
    description:
      "Leading project lifecycles, cross-functional sprints, code reviews, and developer talent development as Head of IT Division at UTY Software House, delivering high-stakes solutions.",
  },
];

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(
    scrollYProgress,
    [0, 0.4],
    shouldReduceMotion ? ["0px", "0px"] : ["30px", "0px"]
  );

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full overflow-x-clip py-28 px-6 border-t border-neutral-900/60 bg-neutral-950/20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          style={{ y: translateY }}
          className="flex flex-col items-center text-center mb-16 will-change-transform"
        >
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>01 // Who I Am</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight">
            Engineering at the intersection of aesthetic motion & algorithmic precision.
          </h2>
          <p className="mt-6 text-neutral-400 max-w-2xl text-base sm:text-lg leading-relaxed">
            I am driven by two complementary disciplines: the immediate tactile delight of a 60+ FPS, compositor-smooth user interface, and the transformative potential of applied machine learning in everyday software.
          </p>
        </motion.div>

        {/* Narrative & Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="relative rounded-2xl border border-neutral-800/80 bg-neutral-900/30 p-8 backdrop-blur-sm flex flex-col justify-between hover:border-neutral-700/80 hover:bg-neutral-900/50 transition-all duration-300"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-neutral-800/70 border border-neutral-700/60 flex items-center justify-center text-emerald-400 mb-6">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400/90 font-medium">
                    {pillar.tag}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1 mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
