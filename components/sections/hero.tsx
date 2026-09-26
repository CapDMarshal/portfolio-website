'use client';

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowRight, Award, BrainCircuit, GraduationCap, Zap } from "lucide-react";
import { useLenis } from "@/components/providers/smooth-scroll";
import { HeroBackground } from "@/components/ui/hero-background";

// ---------------------------------------------------------------------------
// GSAP-INSPIRED 3D-STYLE VECTOR SCULPTURES
// ---------------------------------------------------------------------------

function FlowerPetalShape({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="flowerGradient" x1="10%" y1="10%" x2="90%" y2="90%">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
        <radialGradient id="flowerHighlight" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Vertical Pill Petals */}
      <rect x="73" y="16" width="54" height="168" rx="27" fill="url(#flowerGradient)" />
      <rect x="73" y="16" width="54" height="168" rx="27" fill="url(#flowerHighlight)" />

      {/* Horizontal Pill Petals */}
      <rect x="16" y="73" width="168" height="54" rx="27" fill="url(#flowerGradient)" />
      <rect x="16" y="73" width="168" height="54" rx="27" fill="url(#flowerHighlight)" />

      {/* Center Plump Joint */}
      <circle cx="100" cy="100" r="32" fill="url(#flowerGradient)" />
      <circle cx="100" cy="100" r="32" fill="url(#flowerHighlight)" />
    </svg>
  );
}

function TorusShape({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 140"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="torusGrad" x1="10%" y1="10%" x2="90%" y2="90%">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="45%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
        <radialGradient id="torusShine" cx="35%" cy="30%" r="55%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Main Torus Body */}
      <ellipse
        cx="70"
        cy="70"
        rx="44"
        ry="44"
        stroke="url(#torusGrad)"
        strokeWidth="24"
      />
      {/* Specular Edge Highlight */}
      <ellipse
        cx="70"
        cy="70"
        rx="44"
        ry="44"
        stroke="url(#torusShine)"
        strokeWidth="10"
        strokeDasharray="90 180"
      />
    </svg>
  );
}

function DiamondShape({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 90 90"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="50%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#f43f5e" />
        </linearGradient>
      </defs>
      <rect
        x="21"
        y="21"
        width="48"
        height="48"
        rx="12"
        transform="rotate(45 45 45)"
        fill="url(#diamondGrad)"
      />
    </svg>
  );
}

function HourglassShape({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 70"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <path
        d="M10 8 C10 22 25 32 30 35 C25 38 10 48 10 62 C10 66 14 68 18 68 L42 68 C46 68 50 66 50 62 C50 48 35 38 30 35 C35 32 50 22 50 8 C50 4 46 2 42 2 L18 2 C14 2 10 4 10 8 Z"
        fill="url(#hgGrad)"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// METRICS DATA
// ---------------------------------------------------------------------------

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
    label: "Facial ML Latency",
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

// ---------------------------------------------------------------------------
// MAIN HERO COMPONENT
// ---------------------------------------------------------------------------

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const lenis = useLenis();

  // Scoped scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms for Text
  const yText = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "24%"]
  );
  const opacityText = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Differential Parallax transforms for Visual Sculptures
  const domeY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0px", "0px"] : ["0px", "130px"]
  );

  const flowerY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0px", "0px"] : ["0px", "-50px"]
  );
  const flowerRotate = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 32]
  );

  const torusY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0px", "0px"] : ["0px", "-160px"]
  );
  const torusRotate = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -50]
  );

  const diamondY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0px", "0px"] : ["0px", "-240px"]
  );
  const diamondRotate = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [45, 45] : [45, 115]
  );

  const hourglassY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0px", "0px"] : ["0px", "90px"]
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
      className="relative min-h-screen w-full overflow-x-clip flex flex-col justify-center pt-28 pb-16 px-6 lg:px-16 bg-transparent"
    >
      {/* Rich Multi-Layered GSAP-Inspired Background Atmosphere */}
      <HeroBackground
        scrollYProgress={scrollYProgress}
        shouldReduceMotion={!!shouldReduceMotion}
      />

      {/* Main 2-Column Hero Layout */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* ================================================================ */}
        {/* LEFT COLUMN: GSAP-STYLE PILL HEADLINE & NARRATIVE                */}
        {/* ================================================================ */}
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="lg:col-span-7 flex flex-col items-start text-left will-change-transform z-10"
        >
          {/* Layered Pill Badges */}
          <div className="flex flex-col items-start gap-2.5 sm:gap-3 mb-8">
            {/* Top Pill (Pink) */}
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.02, rotate: -0.5 }}
              className="inline-block px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-2xl bg-[#fed7e2] text-neutral-950 font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-5xl tracking-tight shadow-xl shadow-pink-500/15 cursor-default select-none"
            >
              Creative Frontend
            </motion.div>

            {/* Bottom Pill (Orange/Amber) */}
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.02, rotate: 1 }}
              className="inline-block px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-2xl bg-[#fb923c] text-neutral-950 font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-5xl tracking-tight shadow-xl shadow-orange-500/15 ml-2 sm:ml-6 cursor-default select-none"
            >
              Meets Applied AI
            </motion.div>
          </div>

          {/* Subtitle / Bio Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-normal leading-relaxed max-w-xl mb-8">
            Whether architecting 60+ FPS motion interfaces or deploying sub-50ms machine learning pipelines,{" "}
            <strong className="text-white font-semibold">Fardila Bintang (Marshal)</strong> builds fluid digital experiences with engineering precision.
          </p>

          {/* Current Roles Pill */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400 mb-8">
            <span className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300">
              IT Division Lead @ UTY Software House
            </span>
            <span className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300">
              Frontend Dev @ Ruumi Digital
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-12">
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
        </motion.div>

        {/* ================================================================ */}
        {/* RIGHT COLUMN: GSAP-STYLE 3D PARALLAX SCULPTURE                   */}
        {/* ================================================================ */}
        <div className="lg:col-span-5 relative w-full h-[460px] sm:h-[540px] flex items-end justify-center select-none pointer-events-none">
          
          {/* Floating Torus (Top Left) */}
          <motion.div
            style={{ y: torusY, rotate: torusRotate }}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    y: [0, -12, 0],
                    rotate: [0, 4, 0],
                    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  }
            }
            className="absolute top-10 left-6 sm:left-12 z-20 will-change-transform filter drop-shadow-[0_15px_35px_rgba(56,189,248,0.35)]"
          >
            <TorusShape className="w-20 sm:w-28 h-20 sm:h-28" />
          </motion.div>

          {/* Floating Diamond (Top Right) */}
          <motion.div
            style={{ y: diamondY, rotate: diamondRotate }}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    y: [0, -14, 0],
                    rotate: [45, 52, 45],
                    transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                  }
            }
            className="absolute top-8 right-6 sm:right-12 z-20 will-change-transform filter drop-shadow-[0_12px_28px_rgba(251,146,60,0.45)]"
          >
            <DiamondShape className="w-14 sm:w-16 h-14 sm:h-16" />
          </motion.div>

          {/* Floating Hourglass (Center-Left near base) */}
          <motion.div
            style={{ y: hourglassY }}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    y: [0, 10, 0],
                    rotate: [0, -6, 0],
                    transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 },
                  }
            }
            className="absolute bottom-28 left-4 sm:left-8 z-30 will-change-transform filter drop-shadow-[0_10px_20px_rgba(168,85,247,0.35)]"
          >
            <HourglassShape className="w-9 sm:w-11 h-11 sm:h-13" />
          </motion.div>

          {/* Puffy 4-Petal Flower (Resting directly on top of the green dome) */}
          <motion.div
            style={{ y: flowerY, rotate: flowerRotate }}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    scale: [1, 1.025, 1],
                    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  }
            }
            className="absolute bottom-[170px] sm:bottom-[210px] right-8 sm:right-16 z-30 will-change-transform filter drop-shadow-[0_25px_45px_rgba(236,72,153,0.4)]"
          >
            <FlowerPetalShape className="w-36 sm:w-48 h-36 sm:h-48" />
          </motion.div>

          {/* The Large Emerald-to-Cyan Dome (Base Hemisphere) */}
          <motion.div
            style={{ y: domeY }}
            className="relative z-10 w-[300px] sm:w-[380px] h-[170px] sm:h-[220px] rounded-t-full bg-gradient-to-t from-[#00d664] via-[#05f18c] to-[#38ef7d] shadow-[0_0_90px_rgba(0,214,100,0.35)] will-change-transform overflow-hidden"
          >
            {/* Subtle inner 3D specular curved light */}
            <div className="absolute inset-0 rounded-t-full bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* BOTTOM PROOF METRICS BAR                                         */}
      {/* ================================================================ */}
      <div className="max-w-7xl mx-auto w-full mt-16 pt-10 border-t border-neutral-900/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
        {METRICS.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div
              key={i}
              className="p-4 rounded-2xl border border-neutral-800/80 bg-neutral-900/30 backdrop-blur-sm flex flex-col justify-between"
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
    </section>
  );
}
