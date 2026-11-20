"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";

// The site's feature card (Nov 2026, from the services-block mockup): a gradient
// surface with a red corner mark, an icon tile, a title, a description, and
// either a link row or a faint index number. Used by the home Services and
// About blocks and the Custom Software Development services grid.

interface IconCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Position in its list; staggers the entrance and feeds the index number. */
  index: number;
  /** A faint line drawing for the top-right corner. */
  art?: React.ReactNode;
  /** Show "01", "02"… in the top-right corner when there is no drawing. */
  showIndex?: boolean;
  /** Makes the whole card a link, with a red link row at the bottom. */
  link?: { href: string; label: string };
  className?: string;
  /** "raised" sits on the darkest page background; "sunken" on the lighter
   * secondary sections, where a lighter card would melt into the ground. */
  surface?: "raised" | "sunken";
}

const SURFACES = {
  raised: "linear-gradient(180deg, #121214 0%, #0d0d0f 100%)",
  sunken: "linear-gradient(180deg, #0d0d0f 0%, #08080a 100%)",
};

export const IconCard = ({
  icon: Icon,
  title,
  description,
  index,
  art,
  showIndex,
  link,
  className = "",
  surface = "raised",
}: IconCardProps) => (
  <motion.li
    initial={{ y: 16 }}
    whileInView={{ y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ delay: index * 0.06, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
    className={`group relative isolate flex min-w-0 flex-col overflow-hidden rounded-xl border p-6 transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-1 hover:border-[rgba(229,6,6,0.45)] hover:shadow-[0_18px_40px_-24px_rgba(229,6,6,0.45)] md:p-7 ${className}`}
    style={{
      listStyle: "none",
      borderColor: "var(--border-subtle)",
      background: SURFACES[surface],
    }}
  >
    {/* Red corner mark */}
    <span
      aria-hidden="true"
      className="absolute left-0 top-0 h-3.5 w-3.5"
      style={{ background: "var(--brand-red)", clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
    />
    {/* Soft red light that wakes up on hover */}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -right-16 -top-16 -z-10 h-48 w-48 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{ background: "radial-gradient(circle, rgba(229,6,6,0.16), transparent 65%)" }}
    />

    {art ? (
      <div className="pointer-events-none absolute right-3 top-3 -z-10 opacity-80 transition-opacity duration-200 group-hover:opacity-100 md:right-5 md:top-4">
        {art}
      </div>
    ) : showIndex ? (
      <span
        aria-hidden="true"
        className="absolute right-6 top-6 text-sm font-semibold tabular-nums transition-colors duration-200 group-hover:text-[var(--brand-red)] md:right-7 md:top-7"
        style={{ color: "var(--text-disabled)", letterSpacing: "0.08em" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    ) : null}

    <span
      className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg border transition-colors duration-200 group-hover:border-[rgba(229,6,6,0.45)] group-hover:text-[var(--brand-red)]"
      style={{ borderColor: "var(--border-default)", backgroundColor: "#151517", color: "var(--text-secondary)" }}
    >
      <Icon size={26} strokeWidth={1.5} />
    </span>

    <h3 className="mb-3 text-xl font-semibold leading-snug md:text-[1.3rem]" style={{ color: "var(--text-primary)" }}>
      {title}
    </h3>
    <p
      className={`${link ? "mb-7" : ""} max-w-[46ch] text-[0.9375rem] leading-relaxed`}
      style={{ color: "var(--text-secondary)" }}
    >
      {description}
    </p>

    {link && (
      <div className="mt-auto flex items-center gap-3">
        <ArrowRight
          size={18}
          style={{ color: "var(--brand-red)" }}
          className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
        />
        {/* The link covers the whole card (after:inset-0), so the card is one target. */}
        <Link
          href={link.href}
          className="text-[0.9375rem] font-medium underline underline-offset-4 after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          style={{ color: "var(--brand-red)", textDecorationColor: "rgba(229, 6, 6, 0.6)" }}
        >
          {link.label}
        </Link>
        <span aria-hidden="true" className="h-px flex-1" style={{ backgroundColor: "var(--border-subtle)" }} />
      </div>
    )}
    {link && (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl group-has-[a:focus-visible]:outline group-has-[a:focus-visible]:outline-2 group-has-[a:focus-visible]:outline-[var(--brand-red)]"
      />
    )}
  </motion.li>
);
