"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";

interface InlineCtaProps {
  label: string;
  /** Short line above the button. */
  text?: string;
  /** Link target; without it the button scrolls to the contact form. */
  href?: string;
}

const buttonClass =
  "inline-flex items-center gap-2 rounded-full border border-[var(--brand-red)] bg-[var(--brand-red)] px-7 py-3.5 text-base font-semibold text-white transition-[transform,background-color,box-shadow] duration-200 hover:scale-[1.02] hover:bg-[var(--brand-red-light)] hover:shadow-[var(--shadow-red-md)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-red)]";

// A one-line call to action placed after a section (SEO brief, Nov 2026).
export const InlineCta = ({ label, text, href }: InlineCtaProps) => (
  // data-fab-avoid: the floating back-to-top button hides while this passes under it.
  <div
    data-fab-avoid
    className="mt-12 flex w-full flex-col items-center gap-4 text-center md:mt-16"
    style={{ maxWidth: "var(--max-width)" }}
  >
    {text && (
      <p className="text-base md:text-lg" style={{ color: "var(--text-secondary)" }}>
        {text}
      </p>
    )}
    {href ? (
      <Link href={href} className={buttonClass}>
        {label}
        <ArrowRight size={18} />
      </Link>
    ) : (
      <button type="button" onClick={() => scrollToSection("contacts")} className={buttonClass}>
        {label}
        <ArrowRight size={18} />
      </button>
    )}
  </div>
);
