/**
 * Shared wrapper for static long-form content pages (About, Shipping,
 * Privacy, Terms). Keeps consistent visual rhythm with the rest of the
 * site (chip eyebrow + big display title + ink-600 prose body).
 */
export default function ContentPage({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="container-soft max-w-3xl py-12 sm:py-16">
      <span className="chip uppercase tracking-[0.12em]">{eyebrow}</span>
      <h1 className="mt-4 font-display text-[2.25rem] font-bold leading-[1.05] tracking-[-0.03em] text-ink-900 sm:text-[3rem]">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
          {subtitle}
        </p>
      )}
      <div className="prose-content mt-10 space-y-6 text-[14.5px] leading-[1.7] text-ink-700">
        {children}
      </div>
    </div>
  );
}
