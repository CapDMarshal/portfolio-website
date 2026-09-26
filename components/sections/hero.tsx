'use client';

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowRight, Award, BrainCircuit, Sparkles, Zap, GraduationCap } from "lucide-react";
import { useLenis } from "@/components/providers/smooth-scroll";

const METRICS = [
  {
    icon: Award,
    value: "3+",
    label: "National Tech Awards",
    sub: "1st Place & Finalist",
  },
  {
    icon: Zap,
    value: "<50ms",
    label: "Facial Inference Latency",
    sub: "Optimized on CPU",
  },
  {
    icon: GraduationCap,
    value: "3.68",
    label: "Academic GPA / 4.00",
    sub: "Informatics @ UTY",
  },
  {
    icon: BrainCircuit,
    value: "Google & IBM",
    label: "AI Certified",
    sub: "Gemini & Vertex AI",
  },
];

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
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "30%"]
  );

  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scaleAtmosphere = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1, 1.2]
  );

  const handleScrollTo = (target: string) => {
    if (lenis) {
      lenis.scrollTo(target, { offset: -40, duration: 1.2 });
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-x-clip flex flex-col items-center justify-center pt-28 pb-20 px-6"
    >
      {/* Dynamic Background Atmosphere */}
      <motion.div
        style={{ scale: scaleAtmosphere }}
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-b from-emerald-500/15 via-teal-500/10 to-transparent blur-[140px] rounded-full -z-10"
      />

      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="flex flex-col items-center text-center max-w-4xl mx-auto will-change-transform"
      >
        {/* Pre-header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/70 backdrop-blur-md text-xs text-neutral-300 mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-medium tracking-wide">
            Creative Frontend Engineer & Applied AI Developer
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
          Building fluid, high-velocity digital experiences where{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
            frontend meets applied AI
          </span>
          .
        </h1>

        {/* Sub-headline */}
        <p className="text-base sm:text-xl text-neutral-400 max-w-2xl font-normal leading-relaxed mb-10">
          Hi, I&apos;m <strong className="text-neutral-200">Fardila Bintang Adinata</strong> (Marshal). Currently active as{" "}
          <span className="text-neutral-200 font-medium">Head of IT Division</span> at UTY Software House and{" "}
          <span className="text-neutral-200 font-medium">Frontend Developer</span> at Ruumi Digital Sdn Bhd, specializing in Next.js, motion dynamics, and machine learning integration.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <button
            onClick={() => handleScrollTo("#projects")}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all hover:gap-3 cursor-pointer shadow-xl shadow-white/5"
          >
            <span>Explore Selected Works</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScrollTo("#contact")}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full border border-neutral-800 bg-neutral-900/60 text-neutral-300 font-medium text-sm hover:border-neutral-700 hover:text-white transition-all cursor-pointer"
          >
            <span>Get In Touch</span>
          </button>
        </div>

        {/* Proof Metrics Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left">
          {METRICS.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <div
                key={i}
                className="p-4 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 backdrop-blur-sm flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
                    {metric.value}
                  </span>
                  <Icon className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-neutral-300">
                    {metric.label}
                  </p>
                  <p className="text-[11px] text-neutral-500 font-mono mt-0.5">
                    {metric.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
