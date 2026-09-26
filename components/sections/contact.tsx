'use client';

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Check, Copy, MapPin, MessageCircle, MessageSquare, Send } from "lucide-react";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const email = "fardilabintang.work@gmail.com";
  const whatsappUrl = "https://wa.me/628988735324";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const cardScale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [0.96, 1]
  );
  const cardOpacity = useTransform(scrollYProgress, [0, 1], [0.7, 1]);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative w-full overflow-x-clip py-28 px-6 border-t border-neutral-900/60"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          style={{ scale: cardScale, opacity: cardOpacity }}
          className="relative rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/60 to-neutral-950 p-8 sm:p-14 text-center backdrop-blur-md will-change-transform overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[200px] bg-emerald-500/10 blur-[90px] rounded-full" />

          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 uppercase tracking-widest mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>05 // Contact</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Have a visionary project in mind?
          </h2>

          <p className="text-neutral-400 max-w-xl mx-auto text-base sm:text-lg mb-8 leading-relaxed">
            Whether you need an engineer to architect a high-performance web experience, integrate intelligent machine learning models, or lead a frontend team — my inbox is always open.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
            <a
              href={`mailto:${email}`}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all cursor-pointer shadow-lg shadow-white/5"
            >
              <Send className="w-4 h-4" />
              <span>Send Email</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-full border border-neutral-800 bg-neutral-900 text-neutral-300 font-medium text-sm hover:border-neutral-700 hover:text-white transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-neutral-400" />
                  <span>Copy Address</span>
                </>
              )}
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-full border border-neutral-800 bg-neutral-900/60 text-neutral-300 font-medium text-sm hover:border-neutral-700 hover:text-white transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 font-mono">
            <MapPin className="w-3.5 h-3.5 text-neutral-400" />
            <span>Yogyakarta, Indonesia • Available for Remote Worldwide</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
