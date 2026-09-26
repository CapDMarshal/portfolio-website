'use client';

import React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

export function AmbientParallaxBackground() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // 30% scroll speed parallax depth
  // Moving fixed elements at -scrollY * 0.3 means they scroll upward at exactly 30% of the page's scroll speed.
  const orb1Y = useTransform(
    scrollY,
    (val) => (shouldReduceMotion ? 0 : -val * 0.28)
  );
  const orb2Y = useTransform(
    scrollY,
    (val) => (shouldReduceMotion ? 0 : -val * 0.32)
  );
  const orb3Y = useTransform(
    scrollY,
    (val) => (shouldReduceMotion ? 0 : -val * 0.30)
  );
  const orb4Y = useTransform(
    scrollY,
    (val) => (shouldReduceMotion ? 0 : -val * 0.34)
  );
  const orb5Y = useTransform(
    scrollY,
    (val) => (shouldReduceMotion ? 0 : -val * 0.26)
  );

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-50 overflow-hidden select-none"
    >
      {/* 1. Emerald & Mint Bloom (Hero / Intro) */}
      <motion.div
        style={{ y: orb1Y }}
        className="absolute -top-[10vh] -right-[15vw] w-[60vw] max-w-[850px] aspect-square rounded-full bg-gradient-to-bl from-emerald-500/16 via-teal-500/10 to-transparent blur-[140px] will-change-transform"
      />

      {/* 2. Violet & Deep Indigo Bloom (About / Transition) */}
      <motion.div
        style={{ y: orb2Y }}
        className="absolute top-[40vh] -left-[20vw] w-[65vw] max-w-[900px] aspect-square rounded-full bg-gradient-to-tr from-purple-600/14 via-indigo-600/10 to-transparent blur-[150px] will-change-transform"
      />

      {/* 3. Warm Amber & Coral Accent Bloom (Selected Works / Projects) */}
      <motion.div
        style={{ y: orb3Y }}
        className="absolute top-[90vh] -right-[10vw] w-[55vw] max-w-[800px] aspect-square rounded-full bg-gradient-to-tl from-amber-500/12 via-orange-500/8 to-transparent blur-[140px] will-change-transform"
      />

      {/* 4. Electric Cyan & Sky Blue Bloom (Experience & Leadership) */}
      <motion.div
        style={{ y: orb4Y }}
        className="absolute top-[140vh] -left-[15vw] w-[60vw] max-w-[850px] aspect-square rounded-full bg-gradient-to-br from-cyan-500/14 via-sky-600/10 to-transparent blur-[160px] will-change-transform"
      />

      {/* 5. Deep Teal & Emerald Bloom (Stack & Contact) */}
      <motion.div
        style={{ y: orb5Y }}
        className="absolute top-[190vh] left-[20vw] w-[70vw] max-w-[950px] aspect-square rounded-full bg-gradient-to-t from-emerald-600/14 via-teal-600/8 to-transparent blur-[160px] will-change-transform"
      />
    </div>
  );
}
