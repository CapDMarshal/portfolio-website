'use client';

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ExternalLink, Layers, Zap, Code2, Trophy, ArrowRight } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  badge?: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string;
  link?: string;
  github?: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "sigap-dengue",
    title: "SiGap Dengue",
    badge: "1st Place Winner // HIMATICS Tech Innovation",
    category: "Clinical Machine Learning & Risk Analysis",
    description:
      "Early clinical detection platform powered by custom Machine Learning classification algorithms (SVM & Logistic Regression) to analyze medical symptom data and predict Dengue risks with high diagnostic accuracy.",
    tags: ["Next.js 16", "Machine Learning", "Scikit-learn", "Python", "Plotly.js", "GSAP"],
    gradient: "from-rose-500/20 via-orange-500/10 to-transparent",
    link: "https://sigap-dengue.vercel.app/",
    github: "https://github.com/CapDMarshal/SiGap-Dengue",
  },
  {
    id: "wastecare",
    title: "WasteCare v2",
    badge: "1st Runner-Up // UINIC 7.0 & Thesis",
    category: "Geospatial Tracking, Vision AI & PWA",
    description:
      "Progressive Web App featuring real-time geospatial tracking via MapTiler, Google Vertex AI and Gemini vision models to automatically detect, estimate volume, and report municipal waste hazards via camera.",
    tags: ["Next.js 16", "Vertex AI", "Gemini 2.5 Flash", "MapTiler", "PWA", "Supabase"],
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    link: "https://waste-care-v2.vercel.app/",
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
    github: "https://github.com/CapDMarshal/pam-attendance-app",
  },
  {
    id: "lentera-hijaiyah",
    title: "Lentera Hijaiyah",
    badge: "SMPN 1 Seyegan Client Project",
    category: "EdTech & Intelligent Recognition",
    description:
      "Interactive educational platform for middle school students, integrating Hugging Face machine learning models for real-time character recognition and Prisma ORM progress tracking.",
    tags: ["Next.js 16", "Hugging Face", "Prisma", "PostgreSQL", "Tailwind CSS", "TypeScript"],
    gradient: "from-amber-500/20 via-emerald-500/10 to-transparent",
    link: "https://lentera-hijaiyah.vercel.app/",
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
    github: "https://github.com/PratamaRizki22/metaAirflow-mobile.git",
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

// Elevation drop per card step matching the 6deg runway angle: tan(6deg) ≈ 0.1051
// For a ~412px stride (380px width + 32px gap), the vertical drop is ~43px per card
const ELEVATION_STEP_Y = 43;

export function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scoped vertical scroll tracking over the tall pinned runway section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Horizontal travel across the 7 cards (pure array mapping for compositor execution)
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "-74%"]
  );

  // Diagonal elevation travel: pure mapped value evaluated on compositor thread
  const yDesktop = useTransform(scrollYProgress, [0, 1], ["0px", "-258px"]);
  const y = isDesktop && !shouldReduceMotion ? yDesktop : 0;

  // Animated visual progress bar on the left
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["8%", "100%"]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full h-[370vh] bg-transparent overflow-x-clip"
    >
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-x-clip">
        
        {/* ================================================================ */}
        {/* STREAMLINED RUNWAY RIBBON IN BACKGROUND (Desktop only)            */}
        {/* Optimized: No heavy backdrop-blur or 60px shadow for 120 FPS      */}
        {/* ================================================================ */}
        <div
          className={`hidden lg:block absolute inset-x-0 top-1/2 -translate-y-1/2 h-[660px] w-[140vw] -left-[20vw] bg-[#0a0a0c]/90 border-y border-cyan-400/25 -z-10 transition-transform duration-500 ${
            shouldReduceMotion ? "rotate-0" : "rotate-[6deg]"
          }`}
        >
          {/* Top Linear Backlight matching the runway angle */}
          <div className="absolute -top-10 inset-x-0 h-20 bg-gradient-to-b from-cyan-400/25 via-emerald-400/10 to-transparent blur-lg pointer-events-none select-none" />
          
          {/* Bottom Linear Backlight matching the runway angle */}
          <div className="absolute -bottom-10 inset-x-0 h-20 bg-gradient-to-t from-cyan-400/20 via-teal-400/10 to-transparent blur-lg pointer-events-none select-none" />
        </div>

        {/* ================================================================ */}
        {/* MAIN STAGE CONTENT (Upright & unclipped, aligned to screen grid) */}
        {/* ================================================================ */}
        <div className="relative w-full h-full max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center justify-start lg:justify-center pt-20 sm:pt-24 lg:pt-0 px-4 sm:px-8 lg:px-16 z-10">
          
          {/* ================================================================ */}
          {/* LEFT COLUMN: COMPACT HUD ON MOBILE, ELEVATED CARD ON DESKTOP      */}
          {/* ================================================================ */}
          <div className="relative z-30 w-full lg:w-[400px] xl:w-[420px] flex-shrink-0 flex flex-col justify-center py-2 sm:py-5 lg:py-6 pr-0 lg:pr-10 lg:-translate-y-10">
            {/* Elevated 3D Card Backing (Optimized solid glass) */}
            <div className="absolute -inset-3 sm:-inset-6 bg-[#0c0d10]/95 rounded-2xl lg:rounded-3xl border border-white/[0.08] -z-10 shadow-2xl" />

            {/* Tag & Mobile Counter on Single Row */}
            <div className="flex items-center justify-between lg:block mb-1 sm:mb-2 lg:mb-3">
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-medium text-emerald-400 uppercase tracking-widest">
                <Layers className="w-3 h-3 text-emerald-400" />
                <span>02 // Selected Works</span>
              </div>
              <span className="lg:hidden text-[11px] font-mono text-neutral-400">
                01 — 07
              </span>
            </div>

            {/* Title: Compact on mobile, 5xl on desktop */}
            <h2 className="text-xl sm:text-3xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-1 sm:mb-3 lg:mb-4">
              Explore My Projects
            </h2>

            {/* Hidden on mobile portrait to save ~120px vertical space */}
            <p className="hidden sm:block text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6 max-w-sm">
              An elevated runway showcase of award-winning applications and intelligent models. Scroll down to travel along the sloped track.
            </p>

            {/* Scroll Indicator & Progress Bar */}
            <div className="flex flex-col gap-1.5 sm:gap-2.5 max-w-xs">
              <div className="hidden lg:flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-1.5 text-neutral-300">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>Scroll to scrub</span>
                </span>
                <span>01 — 07</span>
              </div>
              <div className="w-full h-1 lg:h-1.5 rounded-full bg-neutral-800/80 overflow-hidden">
                <motion.div
                  style={{ width: progressBarWidth }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                />
              </div>
            </div>
          </div>

          {/* ================================================================ */}
          {/* RIGHT COLUMN: HORIZONTALLY SCROLLING RUNWAY CARDS               */}
          {/* Paint isolation + lightweight GPU compositing                     */}
          {/* ================================================================ */}
          <div
            style={{ contain: "paint" }}
            className="relative w-full flex-1 h-[450px] sm:h-[500px] lg:h-[620px] overflow-hidden flex items-start lg:items-center ml-0 lg:ml-10 mt-1 sm:mt-3 lg:mt-0 [mask-image:linear-gradient(to_right,transparent_0%,black_24px,black_calc(100%-24px),transparent_100%)] lg:[mask-image:linear-gradient(to_right,transparent_0%,transparent_30px,black_150px,black_calc(100%-150px),transparent_100%)]"
          >
            <motion.div
              style={{ x, y }}
              className="flex flex-row gap-4 sm:gap-8 items-start will-change-transform pl-2 sm:pl-6 lg:pl-12 pr-28 pt-1 lg:pt-8"
            >
              {PROJECTS.map((project, index) => {
                // Stepped elevation on desktop along 6deg slope, flat on mobile:
                const elevationOffset = isDesktop && !shouldReduceMotion ? index * ELEVATION_STEP_Y : 0;
                return (
                  <div
                    key={project.id}
                    style={{ transform: `translate3d(0, ${elevationOffset}px, 0)` }}
                    className="flex-shrink-0"
                  >
                    <ProjectCard
                      project={project}
                      index={index}
                    />
                  </div>
                );
              })}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: ProjectItem;
  index: number;
}) {
  return (
    <div
      style={{ transform: "translateZ(0)" }}
      className="group relative flex flex-col justify-between w-[85vw] max-w-[340px] sm:w-[370px] lg:w-[390px] h-[430px] sm:h-[460px] lg:h-[470px] rounded-2xl border border-neutral-800/80 bg-[#121316] p-5 sm:p-6 shadow-xl shadow-black/50 transition-colors duration-200 hover:border-neutral-700 select-none will-change-transform"
    >
      <div>
        {/* Visual Preview Box */}
        <div
          className={`relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-5 border border-neutral-800 bg-gradient-to-br ${project.gradient} p-5 flex flex-col justify-between`}
        >
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span className="font-mono text-emerald-400 font-semibold">
              0{index + 1}
            </span>
            {project.badge ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-900/90 text-neutral-200 border border-neutral-700/60 shadow-sm">
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
        <p className="text-sm text-neutral-400 leading-relaxed mb-5 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800/60 text-neutral-300 border border-neutral-700/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      {(project.link || project.github) && (
        <div className="flex items-center gap-4 pt-4 border-t border-neutral-800/80 text-xs font-medium">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-neutral-200 hover:text-white transition-colors"
            >
              <span>Live / Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 text-neutral-400 hover:text-neutral-200 transition-colors ${
                project.link ? "ml-auto" : ""
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Repository</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
