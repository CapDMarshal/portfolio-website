'use client';

import { createContext, useContext, useEffect, useRef, useMemo, type ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export interface LenisControls {
  scrollTo: (
    target: string | number | HTMLElement,
    options?: { offset?: number; duration?: number; immediate?: boolean }
  ) => void;
  getInstance: () => Lenis | null;
}

const LenisContext = createContext<LenisControls | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = instance;

    let rafId: number;
    function raf(time: number) {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  const controls = useMemo<LenisControls>(
    () => ({
      scrollTo: (target, options) => {
        lenisRef.current?.scrollTo(target, options);
      },
      getInstance: () => lenisRef.current,
    }),
    []
  );

  return <LenisContext value={controls}>{children}</LenisContext>;
}
