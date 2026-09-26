'use client';

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ExternalLink, Layers, Zap, Code2 } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  gradient: string;
  link: string;
  github: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "parallax-engine",
    title: "Aether Parallax Studio",
    tagline: "Fluid 120 FPS Motion Design",
    description:
      "A spatial web experience featuring multi-layer depth scrolling, GPU-accelerated motion choreography, and zero layout thrashing.",
    tags: ["Next.js 16", "React 19", "Motion", "Lenis", "Tailwind v4"],
    gradient: "from-blue-600/20 via-indigo-600/10 to-transparent",
    link: "https://github.com",
    github: "https://github.com",
  },
  {
    id: "fluid-dashboard",
    title: "Nova Analytics Cloud",
    tagline: "Real-time Metrics Platform",
    description:
      "High-throughput observability dashboard with reactive data visualization, optimistic UI patterns, and accessibility-first motion.",
    tags: ["TypeScript", "Tailwind CSS", "Motion", "App Router"],
    gradient: "from-emerald-600/20 via-teal-600/10 to-transparent",
    link: "https://github.com",
    github: "https://github.com",
  },
  {
    id: "kinetic-commerce",
    title: "Verve Kinetic Commerce",
    tagline: "Ultra-Fast Headless Storefront",
    description:
      "Modern e-commerce interface featuring seamless page transitions, layout-shift-free media loading, and custom micro-interactions.",
    tags: ["Next.js", "Server Components", "Tailwind v4", "Lenis"],
    gradient: "from-purple-600/20 via-pink-600/10 to-transparent",
    link: "https://github.com",
    github: "https://github.com",
  },
];

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(
    scrollYProgress,
    [0, 0.4],
    shouldReduceMotion ? ["0px", "0px"] : ["30px", "0px"]
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full overflow-x-clip py-28 px-6 border-t border-neutral-900/60"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          style={{ y: headerY }}
          className="flex flex-col items-center text-center mb-16 will-change-transform"
        >
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 uppercase tracking-widest mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Selected Projects</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Engineered for performance & polish
          </h2>
          <p className="mt-4 text-neutral-400 max-w-xl text-base sm:text-lg">
            A curation of interactive web interfaces built with strict attention
            to 60+ FPS framerates and clean component architecture.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              shouldReduceMotion={!!shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  shouldReduceMotion,
}: {
  project: ProjectItem;
  index: number;
  shouldReduceMotion: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  // Compositor-only translate
  const yOffset = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0px", "0px"] : [`${(index % 2) * 20 + 15}px`, "0px"]
  );
  const cardOpacity = useTransform(scrollYProgress, [0, 1], [0.75, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y: yOffset, opacity: cardOpacity }}
      className="group relative flex flex-col rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/70 will-change-transform"
    >
      {/* Visual Preview Box */}
      <div
        className={`relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-6 border border-neutral-800 bg-gradient-to-br ${project.gradient} p-6 flex flex-col justify-between`}
      >
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span className="font-mono">0{index + 1}</span>
          <Zap className="w-4 h-4 text-neutral-400 group-hover:text-emerald-400 transition-colors" />
        </div>
        <div>
          <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono">
            {project.tagline}
          </span>
          <h3 className="text-xl font-bold text-white mt-1">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-neutral-400 leading-relaxed mb-6 flex-1">
        {project.description}
      </p>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-neutral-800/60 text-neutral-300 border border-neutral-700/50"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-3 pt-4 border-t border-neutral-800/80 text-xs font-medium">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-neutral-200 hover:text-white transition-colors"
        >
          <span>Live Demo</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-neutral-200 transition-colors ml-auto"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Code</span>
        </a>
      </div>
    </motion.div>
  );
}
