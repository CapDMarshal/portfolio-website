'use client';

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Briefcase, ChevronRight } from "lucide-react";

interface RoleExperience {
  role: string;
  organization: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  highlights: string[];
}

const EXPERIENCES: RoleExperience[] = [
  {
    role: "Head of IT Division",
    organization: "UTY Software House",
    location: "Sleman, Yogyakarta",
    period: "Feb 2026 — Present",
    isCurrent: true,
    highlights: [
      "Drive high-level technical strategy, architecture, and engineering standards across all multidisciplinary software house projects.",
      "Lead developer recruitment initiatives and structured onboarding sprints to scale the workspace with high-performing talent.",
      "Mentor developers and UI/UX designers in Next.js, component architecture, and modern full-stack workflows.",
    ],
  },
  {
    role: "Mobile & Web Frontend Developer",
    organization: "Ruumi Digital Sdn Bhd",
    location: "Remote",
    period: "Active",
    isCurrent: true,
    highlights: [
      "Architect and ship reactive, cross-platform mobile and web interfaces with a focus on buttery 60+ FPS performance.",
      "Collaborate with distributed engineering teams to implement clean UI component systems and reliable state architectures.",
    ],
  },
  {
    role: "Front-End Developer",
    organization: "PT Gama Integra Informatika",
    location: "Sleman, Yogyakarta",
    period: "Feb 2026 — July 2026",
    highlights: [
      "Engineered dynamic user interfaces for clients and national competitions utilizing Next.js, Tailwind CSS, and TypeScript.",
      "Partnered with backend engineers to integrate APIs, ensuring resilient client-side caching and optimal data flow.",
    ],
  },
  {
    role: "Software Development Team Lead & Generative AI Staff",
    organization: "Data Sorcerers",
    location: "Sleman, Yogyakarta",
    period: "May 2025 — Feb 2026",
    highlights: [
      "Directed the software development division and delivered the official Data Sorcerers profile web application in Next.js.",
      "Researched practical applications of generative AI models and automation tooling for team productivity.",
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
      className="relative w-full overflow-x-clip py-28 px-6 border-t border-neutral-900/60 bg-neutral-950/20"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          style={{ y: translateY }}
          className="flex flex-col items-center text-center mb-16 will-change-transform"
        >
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 uppercase tracking-widest mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>03 // Experience</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Leadership & hands-on execution
          </h2>
          <p className="mt-4 text-neutral-400 max-w-xl text-base sm:text-lg">
            Guiding software teams and executing deep in the stack across web, mobile, and machine learning initiatives.
          </p>
        </motion.div>

        {/* Timeline List */}
        <div className="flex flex-col gap-8">
          {EXPERIENCES.map((exp, index) => (
            <div
              key={index}
              className="relative pl-6 sm:pl-8 border-l border-neutral-800/80 group"
            >
              {/* Dot */}
              <div
                className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-neutral-950 transition-colors ${
                  exp.isCurrent
                    ? "bg-emerald-400 ring-emerald-500/20 shadow-sm shadow-emerald-500/50"
                    : "bg-neutral-600 group-hover:bg-neutral-400"
                }`}
              />

              <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/30 p-6 sm:p-7 backdrop-blur-sm hover:border-neutral-700/80 hover:bg-neutral-900/50 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">
                      {exp.role}
                    </h3>
                    {exp.isCurrent && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Current
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-neutral-400">
                    {exp.period}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-neutral-400 font-medium mb-4">
                  <span className="text-emerald-400">{exp.organization}</span>
                  <span className="text-neutral-600">•</span>
                  <span className="text-xs text-neutral-500">{exp.location}</span>
                </div>

                <ul className="space-y-2 text-sm text-neutral-400">
                  {exp.highlights.map((point, pIndex) => (
                    <li key={pIndex} className="flex items-start gap-2.5">
                      <ChevronRight className="w-3.5 h-3.5 text-emerald-400/80 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
