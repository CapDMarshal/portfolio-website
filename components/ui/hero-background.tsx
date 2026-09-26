'use client';

import React from "react";
import { motion, useTransform, type MotionValue } from "motion/react";

interface HeroBackgroundProps {
  scrollYProgress: MotionValue<number>;
  shouldReduceMotion: boolean;
}

// ---------------------------------------------------------------------------
// SVG MICRO-ASSETS
// ---------------------------------------------------------------------------

function RockHandIcon({ className }: { className?: string }) {
  // Inspired by the hand wireframe sign on the GSAP reference image
  return (
    <svg
      viewBox="0 0 64 74"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Index & Pinky raised, middle & ring folded */}
      <path d="M18 36V12a4 4 0 0 1 8 0v20" />
      <path d="M26 30a4 4 0 0 1 8 0v6" />
      <path d="M34 30a4 4 0 0 1 8 0v6" />
      <path d="M42 22V12a4 4 0 0 1 8 0v24c0 12-7 22-18 22s-18-10-18-22V36" />
      <path d="M14 42c2 4 6 6 10 6" />
    </svg>
  );
}

function Starburst({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="currentColor"
      className={className}
    >
      <path d="M20 0C20 11.0457 28.9543 20 40 20C28.9543 20 20 28.9543 20 40C20 28.9543 11.0457 20 0 20C11.0457 20 20 11.0457 20 0Z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// HERO BACKGROUND COMPONENT
// ---------------------------------------------------------------------------

export function HeroBackground({
  scrollYProgress,
  shouldReduceMotion,
}: HeroBackgroundProps) {
  // Deep background parallax transforms (subtle, slow speeds)
  const gridY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0px", "0px"] : ["0px", "60px"]
  );

  const handY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0px", "0px"] : ["0px", "-180px"]
  );
  const handRotate = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [12, 35]
  );

  const star1Y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0px", "0px"] : ["0px", "-100px"]
  );
  const star2Y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0px", "0px"] : ["0px", "110px"]
  );

  const orbitRotate = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 45]
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 select-none">
      {/* 1. SUBTLE DOT GRID WITH RADIAL VIGNETTE MASK */}
      <motion.div
        style={{ y: gridY }}
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_65%,transparent_100%)] opacity-35 will-change-transform"
      >
        <svg className="w-full h-full" width="100%" height="100%">
          <defs>
            <pattern
              id="hero-grid-pattern"
              width="36"
              height="36"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="#a1a1aa" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid-pattern)" />
        </svg>
      </motion.div>

      {/* 3. CONCENTRIC DASHED ORBIT RINGS (Behind the sculpture) */}
      <motion.div
        style={{ rotate: orbitRotate }}
        className="absolute -right-24 bottom-12 w-[540px] h-[540px] rounded-full border border-dashed border-emerald-500/15 will-change-transform hidden md:block"
      >
        <div className="absolute inset-8 rounded-full border border-dashed border-teal-500/10" />
        <div className="absolute inset-20 rounded-full border border-dashed border-cyan-500/10" />
      </motion.div>

      {/* 4. WIREFRAME ROCK HAND SIGN (Inspired by GSAP Image 2) */}
      <motion.div
        style={{ y: handY, rotate: handRotate }}
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -10, 0],
                transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              }
        }
        className="absolute top-24 right-8 lg:right-28 text-amber-300/40 will-change-transform drop-shadow-[0_0_20px_rgba(252,211,77,0.25)] hidden sm:block"
      >
        <RockHandIcon className="w-12 h-14" />
      </motion.div>

      {/* 5. FLOATING GEOMETRIC STARBURSTS (✦) */}
      {/* Top Left Sparkle */}
      <motion.div
        style={{ y: star1Y }}
        animate={
          shouldReduceMotion
            ? {}
            : {
                scale: [1, 1.25, 1],
                opacity: [0.35, 0.7, 0.35],
                transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
              }
        }
        className="absolute top-28 left-[12%] text-pink-400/50 will-change-transform"
      >
        <Starburst className="w-6 h-6" />
      </motion.div>

      {/* Center Floating Sparkle */}
      <motion.div
        style={{ y: star2Y }}
        animate={
          shouldReduceMotion
            ? {}
            : {
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.65, 0.3],
                transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
              }
        }
        className="absolute top-[48%] left-[45%] text-teal-300/40 will-change-transform hidden sm:block"
      >
        <Starburst className="w-4 h-4" />
      </motion.div>

      {/* Bottom Right Sparkle */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                scale: [1, 1.2, 1],
                opacity: [0.25, 0.5, 0.25],
                transition: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 2 },
              }
        }
        className="absolute bottom-32 right-[36%] text-purple-400/40 will-change-transform"
      >
        <Starburst className="w-5 h-5" />
      </motion.div>

      {/* 6. FLOATING CODE & TECH RUNES */}
      <div className="absolute top-36 left-[38%] text-[11px] font-mono text-neutral-600/60 hidden lg:block tracking-widest">
        {"<motion.div />"}
      </div>
      <div className="absolute bottom-28 left-[22%] text-[11px] font-mono text-neutral-600/50 hidden lg:block tracking-widest">
        {"{ fps: 120, latency: <50ms }"}
      </div>
      <div className="absolute top-[60%] right-[14%] text-[11px] font-mono text-neutral-600/40 hidden xl:block tracking-widest">
        {"// GSAP & Motion Pipeline"}
      </div>

    </div>
  );
}
