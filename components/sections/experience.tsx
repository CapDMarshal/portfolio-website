'use client';

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Briefcase, CheckCircle2, Cpu, Gauge, Smartphone } from "lucide-react";

const CAPABILITIES = [
  {
    icon: Gauge,
    title: "Compositor-Only Motion",
    description:
      "Eliminating layout thrashing and jank by driving animations strictly via GPU transforms (`translate3d`, `scale`, `opacity`).",
  },
  {
    icon: Cpu,
    title: "React 19 & Next.js App Router",
    description:
      "Server Components architecture by default, seamless streaming, zero hydration mismatch, and optimized client boundaries.",
  },
  {
    icon: Smartphone,
    title: "Responsive & Accessible",
    description:
      "Fully responsive across all screen viewports with native `prefers-reduced-motion` compliance baked into every animation layer.",
  },
];

const TIMELINE = [
  {
    role: "Senior Frontend Engineer",
    company: "Studio Interactive",
    period: "2023 — Present",
    points: [
      "Engineered high-profile digital experiences with 99+ Lighthouse performance scores.",
      "Architected custom Lenis smooth-scroll pipelines and Framer Motion choreographies.",
    ],
  },
  {
    role: "Creative Frontend Developer",
    company: "Velocity Labs",
    period: "2021 — 2023",
    points: [
      "Built headless design systems and interactive 3D/parallax landing pages in Next.js.",
      "Optimized Core Web Vitals (LCP, CLS, INP) across 15+ production enterprise web apps.",
    ],
  },
];

export function Experience() {
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
      id="experience"
      ref={containerRef}
      className="relative w-full overflow-x-clip py-28 px-6 border-t border-neutral-900/60 bg-neutral-950/30"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          style={{ y: translateY }}
          className="flex flex-col items-center text-center mb-16 will-change-transform"
        >
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 uppercase tracking-widest mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Capabilities & Experience</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Technical foundation
          </h2>
          <p className="mt-4 text-neutral-400 max-w-xl text-base sm:text-lg">
            Balancing bleeding-edge visual presentation with uncompromising
            runtime performance and clean code craftsmanship.
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-800/60 border border-neutral-700/60 flex items-center justify-center text-emerald-400 mb-2">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">{cap.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {cap.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Experience Timeline */}
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
            Career Timeline
          </h3>
          {TIMELINE.map((item, index) => (
            <div
              key={index}
              className="relative pl-6 border-l border-neutral-800 flex flex-col gap-2"
            >
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-neutral-950" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h4 className="text-base font-semibold text-white">
                  {item.role} <span className="text-neutral-500 font-normal">at</span> {item.company}
                </h4>
                <span className="text-xs font-mono text-neutral-400">
                  {item.period}
                </span>
              </div>
              <ul className="mt-2 space-y-1.5 text-sm text-neutral-400">
                {item.points.map((point, pIndex) => (
                  <li key={pIndex} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
