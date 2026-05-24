"use client";

import { useEffect, useRef } from "react";

/**
 * Canvas-based animated mesh gradient. ~3 KB, no dependencies.
 *
 * Performance:
 * - Pauses via IntersectionObserver when off-screen.
 * - Throttled to ~30 fps normally; further dialled down to ~5 fps while the
 *   user is actively scrolling so iOS Safari doesn't fight the canvas for
 *   main-thread time (this is the fix for the "scroll feels laggy" issue).
 * - DPR capped at 2 for retina mobile.
 * - `will-change: transform` lifts the canvas onto its own compositor layer.
 * - Honours prefers-reduced-motion (one static frame).
 *
 * Aesthetic:
 * - Five soft radial blobs that drift gently and bounce off the frame.
 * - Each blob "breathes" via a slow sine on its radius (alive but calming).
 */

type BlobSpec = {
  x: number; // 0..1
  y: number;
  vx: number; // per ms
  vy: number;
  baseR: number; // radius factor of max(w,h)
  phase: number; // ms offset for breathing sine
  rgb: [number, number, number];
  alpha: number;
};

const BLOBS: BlobSpec[] = [
  { x: 0.18, y: 0.28, vx: 0.000050, vy: 0.000034, baseR: 0.60, phase: 0,     rgb: [95, 195, 113], alpha: 0.46 },
  { x: 0.82, y: 0.22, vx: -0.000044, vy: 0.000058, baseR: 0.58, phase: 1400, rgb: [245, 168, 92], alpha: 0.42 },
  { x: 0.52, y: 0.86, vx: 0.000040, vy: -0.000042, baseR: 0.62, phase: 2800, rgb: [255, 217, 61], alpha: 0.30 },
  { x: 0.72, y: 0.62, vx: -0.000052, vy: -0.000030, baseR: 0.48, phase: 4200, rgb: [95, 195, 113], alpha: 0.32 },
  { x: 0.30, y: 0.74, vx: 0.000036, vy: 0.000028, baseR: 0.42, phase: 5600, rgb: [255, 168, 92], alpha: 0.28 },
];

const FRAME_NORMAL = 33;     // ~30 fps
const FRAME_SCROLLING = 180; // ~5 fps while scrolling

export default function AuroraCanvas({
  className = "absolute inset-0 h-full w-full",
}: {
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const blobs = BLOBS.map((b) => ({ ...b }));

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(r.width * dpr));
      canvas.height = Math.max(1, Math.floor(r.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // pause-ish during scroll for iOS smoothness
    let scrolling = false;
    let scrollTimer: ReturnType<typeof setTimeout> | undefined;
    const onScroll = () => {
      scrolling = true;
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        scrolling = false;
      }, 160);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf = 0;
    let running = true;
    let last = performance.now();
    let lastDraw = 0;

    const draw = (t: number) => {
      const r = canvas.getBoundingClientRect();
      const w = r.width;
      const h = r.height;
      if (w === 0 || h === 0) return;
      const reach = Math.max(w, h);

      ctx.clearRect(0, 0, w, h);
      for (const b of blobs) {
        // gentle breathing pulse on radius — ±6% over ~7s
        const breath = Math.sin((t + b.phase) * 0.00045) * 0.06;
        const rad = (b.baseR + breath) * reach;
        const cx = b.x * w;
        const cy = b.y * h;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        const [R, G, B] = b.rgb;
        grad.addColorStop(0, `rgba(${R},${G},${B},${b.alpha})`);
        grad.addColorStop(0.55, `rgba(${R},${G},${B},${b.alpha * 0.32})`);
        grad.addColorStop(1, `rgba(${R},${G},${B},0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }
    };

    const tick = (t: number) => {
      const frameBudget = scrolling ? FRAME_SCROLLING : FRAME_NORMAL;
      if (t - lastDraw >= frameBudget) {
        const dt = Math.min(48, t - last);
        last = t;
        for (const b of blobs) {
          b.x += b.vx * dt;
          b.y += b.vy * dt;
          if (b.x < 0.12 || b.x > 0.88) b.vx *= -1;
          if (b.y < 0.12 || b.y > 0.88) b.vy *= -1;
        }
        draw(t);
        lastDraw = t;
      }
      if (running) raf = requestAnimationFrame(tick);
    };

    if (reduced) {
      draw(0);
    } else {
      raf = requestAnimationFrame(tick);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduced) return;
        if (entry.isIntersecting && !running) {
          running = true;
          last = performance.now();
          raf = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={className}
      style={{
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    />
  );
}
