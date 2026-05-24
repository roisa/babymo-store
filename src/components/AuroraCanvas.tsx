"use client";

import { useEffect, useRef } from "react";

/**
 * Canvas-based animated mesh gradient. ~3 KB, no dependencies.
 * - Soft radial blobs drift slowly and bounce off the frame, creating a
 *   gentle aurora effect — no library needed.
 * - Pauses via IntersectionObserver when the element scrolls off-screen.
 * - Caps devicePixelRatio at 2 for perf on retina mobile.
 * - Respects prefers-reduced-motion (renders a static frame, no animation).
 */

type BlobSpec = {
  x: number; // 0..1
  y: number;
  vx: number; // per ms
  vy: number;
  r: number; // radius factor of max(w,h)
  rgb: [number, number, number];
  alpha: number;
};

const BLOBS: BlobSpec[] = [
  { x: 0.18, y: 0.28, vx: 0.000055, vy: 0.000038, r: 0.6, rgb: [95, 195, 113], alpha: 0.45 },
  { x: 0.82, y: 0.22, vx: -0.000048, vy: 0.000062, r: 0.58, rgb: [245, 168, 92], alpha: 0.42 },
  { x: 0.52, y: 0.86, vx: 0.000042, vy: -0.000045, r: 0.62, rgb: [255, 217, 61], alpha: 0.30 },
  { x: 0.72, y: 0.62, vx: -0.000058, vy: -0.000032, r: 0.48, rgb: [95, 195, 113], alpha: 0.32 },
];

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

    // independent mutable copy
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

    let raf = 0;
    let last = performance.now();
    let running = true;

    const draw = () => {
      const r = canvas.getBoundingClientRect();
      const w = r.width;
      const h = r.height;
      if (w === 0 || h === 0) return;
      const reach = Math.max(w, h);

      ctx.clearRect(0, 0, w, h);
      for (const b of blobs) {
        const cx = b.x * w;
        const cy = b.y * h;
        const rad = b.r * reach;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        const [R, G, B] = b.rgb;
        grad.addColorStop(0, `rgba(${R},${G},${B},${b.alpha})`);
        grad.addColorStop(0.55, `rgba(${R},${G},${B},${b.alpha * 0.35})`);
        grad.addColorStop(1, `rgba(${R},${G},${B},0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }
    };

    const tick = (t: number) => {
      const dt = Math.min(48, t - last); // clamp huge frames (e.g. tab restore)
      last = t;
      for (const b of blobs) {
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        if (b.x < 0.12 || b.x > 0.88) b.vx *= -1;
        if (b.y < 0.12 || b.y > 0.88) b.vy *= -1;
      }
      draw();
      if (running) raf = requestAnimationFrame(tick);
    };

    if (reduced) {
      draw();
    } else {
      raf = requestAnimationFrame(tick);
    }

    // pause when off-screen
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
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
