'use client';

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ExternalLink, Layers, Zap, Code2, Trophy } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  badge?: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string;
  link: string;
  github?: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "sigap-dengue",
    title: "SiGap Dengue",
    badge: "1st Place Winner // HIMATICS Tech Innovation",
    category: "Healthcare AI & Geospatial Tracking",
    description:
      "Clinical early detection platform using custom SVM and Logistic Regression models to predict Dengue risks with high accuracy, paired with MapTiler outbreak visualization.",
    tags: ["Next.js 16", "Supabase", "Scikit-learn", "Python", "MapTiler", "GSAP"],
    gradient: "from-rose-500/20 via-orange-500/10 to-transparent",
    link: "https://github.com/CapDMarshal/SiGap-Dengue",
    github: "https://github.com/CapDMarshal/SiGap-Dengue",
  },
  {
    id: "wastecare",
    title: "WasteCare v2",
    badge: "1st Runner-Up // UINIC 7.0 & Thesis",
    category: "Smart Cities & Vision AI PWA",
    description:
      "Progressive Web App leveraging Gemini 2.5 Flash and Vertex AI vision models to estimate municipal waste volume and report environmental hazards via camera in real time.",
    tags: ["Next.js 16", "Gemini 2.5 Flash", "Vertex AI", "Supabase", "PWA", "MapTiler"],
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    link: "https://github.com/CapDMarshal/waste-care-v2",
    github: "https://github.com/CapDMarshal/waste-care-v2",
  },
  {
    id: "pam-attendance",
    title: "PAM Attendance Ecosystem",
    badge: "<50ms Latency on CPU",
    category: "Computer Vision & Enterprise Auth",
    description:
      "High-throughput facial recognition platform integrating MTCNN and FaceNet optimized for CPU servers, complete with a cross-platform Flutter app and Next.js admin dashboard.",
    tags: ["FastAPI", "TensorFlow", "FaceNet", "Flutter", "Next.js 16", "TypeScript"],
    gradient: "from-sky-500/20 via-indigo-500/10 to-transparent",
    link: "https://github.com/CapDMarshal/pam-attendance-app",
    github: "https://github.com/CapDMarshal/pam-attendance-app",
  },
  {
    id: "rentverse",
    title: "RentVerse Mobile App",
    badge: "Winner // USH x MetAirflow",
    category: "Mobile Architecture & Spatial Search",
    description:
      "Award-winning property listing application featuring gesture-driven navigation, MapLibre GL map-based area search, and NativeWind styling for smooth frame rates.",
    tags: ["React Native", "Expo", "NativeWind", "MapLibre GL", "React Navigation 7"],
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    link: "https://github.com/CapDMarshal",
    github: "https://github.com/CapDMarshal",
  },
  {
    id: "data-sorcerers",
    title: "Data Sorcerers Community Hub",
    badge: "Official Tech Platform",
    category: "Web Engineering & Brand Identity",
    description:
      "Community website engineered with Next.js 15 and Tailwind CSS, featuring structured SEO, fluid interactions, and high-scoring Core Web Vitals for data science practitioners.",
    tags: ["Next.js 15", "Tailwind CSS", "TypeScript", "Vercel"],
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    link: "https://www.data-sorcerers.com/",
    github: "https://github.com/CapDMarshal",
  },
  {
    id: "wisma-sejahtera",
    title: "Wisma Sejahtera Hotel",
    badge: "Commercial Client Build",
    category: "Hospitality & Web Profile",
    description:
      "Full web profile and digital presence developed for Wisma Sejahtera Magelang, streamlining room amenity displays, location guides, and customer reservations.",
    tags: ["AngularJS", "Figma UI/UX", "Responsive CSS"],
    gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
    link: "https://wismasejahterahotel.com/",
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
      className="relative w-full overflow-x-clip py-32 px-6 bg-transparent"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          style={{ y: headerY }}
          className="flex flex-col items-center text-center mb-16 will-change-transform"
        >
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 uppercase tracking-widest mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>02 // Selected Works</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Award-winning products & ML applications
          </h2>
          <p className="mt-4 text-neutral-400 max-w-xl text-base sm:text-lg">
            A curation of interactive web platforms, progressive web apps, and machine learning pipelines engineered for real-world impact.
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

  const yOffset = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0px", "0px"] : [`${(index % 3) * 15}px`, "0px"]
  );
  const cardOpacity = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y: yOffset, opacity: cardOpacity }}
      className="group relative flex flex-col rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/70 will-change-transform"
    >
      {/* Visual Preview Box */}
      <div
        className={`relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-6 border border-neutral-800 bg-gradient-to-br ${project.gradient} p-5 flex flex-col justify-between`}
      >
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span className="font-mono text-emerald-400 font-semibold">0{index + 1}</span>
          {project.badge ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-900/80 text-neutral-200 border border-neutral-700/60">
              <Trophy className="w-2.5 h-2.5 text-amber-400" />
              <span>{project.badge}</span>
            </span>
          ) : (
            <Zap className="w-4 h-4 text-neutral-400 group-hover:text-emerald-400 transition-colors" />
          )}
        </div>
        <div>
          <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono">
            {project.category}
          </span>
          <h3 className="text-xl font-bold text-white mt-0.5">
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
      <div className="flex items-center gap-4 pt-4 border-t border-neutral-800/80 text-xs font-medium">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-neutral-200 hover:text-white transition-colors"
        >
          <span>Live / Demo</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-neutral-200 transition-colors ml-auto"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Repository</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}
