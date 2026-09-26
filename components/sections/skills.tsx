'use client';

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Award, Code, Cpu, Database, ShieldCheck, Terminal } from "lucide-react";

const SKILL_DOMAINS = [
  {
    icon: Code,
    title: "Frontend & Mobile Engineering",
    description: "Responsive, compositor-accelerated web & mobile architectures.",
    skills: [
      "Next.js 16 (App Router)",
      "React 19 & TypeScript",
      "Tailwind CSS v4 & NativeWind",
      "Motion & GSAP",
      "React Native & Expo",
      "Flutter & Dart",
    ],
  },
  {
    icon: Cpu,
    title: "Applied Machine Learning & Vision",
    description: "Production ML pipelines, edge latency, and intelligent interfaces.",
    skills: [
      "Gemini 2.5 Flash & Vertex AI",
      "TensorFlow & PyTorch",
      "Scikit-learn & Hugging Face",
      "FaceNet & MTCNN Vision",
      "Plotly.js Data Visualization",
      "OpenCV & Image Processing",
    ],
  },
  {
    icon: Database,
    title: "Backend, Cloud & Infrastructure",
    description: "Scalable APIs, performant queries, and deployment orchestration.",
    skills: [
      "FastAPI & Python",
      "Supabase (Auth, Storage, DB)",
      "PostgreSQL & MySQL",
      "Prisma ORM",
      "Docker & Microservices",
      "Google Cloud Platform (GCP)",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Certifications & Industry Credentials",
    description: "Formally validated competencies across global cloud providers.",
    skills: [
      "Google: Gemini Certified Student",
      "Google: Build Real-World AI Apps",
      "Google: Prompt Design in Vertex AI",
      "IBM: Granite Data Classification",
      "IBM: Data Analysis with Python",
      "BNSP: Junior Programmer (2023-2026)",
    ],
  },
];

const HONORS = [
  {
    place: "1st Winner",
    event: "Himatika Tech Innovation Challenge 2.0",
    focus: "Web & Machine Learning Track",
    year: "2025",
  },
  {
    place: "1st Runner-Up",
    event: "UINIC 7.0 National Competition",
    focus: "Website Development & PWA Track",
    year: "2025",
  },
  {
    place: "Winner",
    event: "USH x MetAirflow Mobile Challenge",
    focus: "React Native Mobile Engineering",
    year: "2026",
  },
];

export function Skills() {
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
      id="skills"
      ref={containerRef}
      className="relative w-full overflow-x-clip py-32 px-6 bg-transparent"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          style={{ y: translateY }}
          className="flex flex-col items-center text-center mb-16 will-change-transform"
        >
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 uppercase tracking-widest mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>04 // Stack & Tools</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            A modern, production-tested arsenal
          </h2>
          <p className="mt-4 text-neutral-400 max-w-xl text-base sm:text-lg">
            Proven competencies across modern client frameworks, low-latency AI backends, and cloud platforms.
          </p>
        </motion.div>

        {/* 4 Quadrants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {SKILL_DOMAINS.map((domain, i) => {
            const Icon = domain.icon;
            return (
              <div
                key={i}
                className="rounded-2xl border border-neutral-800/80 bg-neutral-900/30 p-7 backdrop-blur-sm hover:border-neutral-700/80 hover:bg-neutral-900/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-neutral-800/70 border border-neutral-700/60 flex items-center justify-center text-emerald-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      {domain.title}
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-400 mb-6">
                    {domain.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {domain.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-mono px-3 py-1.5 rounded-lg bg-neutral-800/50 text-neutral-300 border border-neutral-700/40 hover:border-neutral-600 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* National Honors Banner */}
        <div className="rounded-2xl border border-neutral-800/80 bg-gradient-to-r from-emerald-950/20 via-neutral-900/40 to-neutral-950/60 p-6 sm:p-8 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs font-medium text-amber-400 uppercase tracking-widest mb-4">
            <Award className="w-4 h-4" />
            <span>National Recognition & Competition Honors</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {HONORS.map((honor, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold font-mono text-emerald-400">
                    {honor.place}
                  </span>
                  <h4 className="text-sm font-semibold text-white mt-1">
                    {honor.event}
                  </h4>
                </div>
                <p className="text-[11px] text-neutral-500 font-mono mt-3">
                  {honor.focus} • {honor.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
