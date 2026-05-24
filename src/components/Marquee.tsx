"use client";

/**
 * Edge-to-edge infinite horizontal scroll. The content is rendered twice
 * back-to-back and animated by -50% so the loop is seamless.
 */
export default function Marquee({
  items,
  speed = 35,
}: {
  items: { icon: string; text: string }[];
  speed?: number;
}) {
  const row = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((it, i) => (
        <span
          key={i}
          className="flex items-center gap-2.5 text-[13px] font-semibold tracking-[-0.01em] text-ink-600"
        >
          <span className="text-base leading-none">{it.icon}</span>
          {it.text}
          <span className="ml-6 h-1 w-1 rounded-full bg-ink-200" />
        </span>
      ))}
    </div>
  );

  return (
    <section
      aria-hidden
      className="relative overflow-hidden py-6"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%)",
      }}
    >
      <div
        className="flex w-max animate-marquee motion-reduce:animate-none"
        style={{ animationDuration: `${speed}s` }}
      >
        {row}
        {row}
      </div>
    </section>
  );
}
