"use client";

import { useReveal } from "@/hooks/useReveal";

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** distance traveled while fading in, in px */
  distance?: number;
};

export default function Reveal({
  children,
  delay = 0,
  className = "",
  distance = 24,
}: Props) {
  const { ref, seen } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transform: seen ? "translateY(0)" : `translateY(${distance}px)`,
      }}
      className={`transition-all duration-700 ease-spring ${
        seen ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
