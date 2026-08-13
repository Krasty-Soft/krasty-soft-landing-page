"use client";

import Link from "next/link";
import { Mail, MapPin, Star } from "lucide-react";
import PAGES from "@/lib/navigation";

// Expanded footer navigation required by the usability audit: column links to
// the main sections, contact details, and the trust signals repeated from the
// hero. Legal links (Privacy Policy / Terms / Cookie Policy) are intentionally
// omitted until those pages exist — linking to 404s would be worse than not
// linking at all.

type NavItem = { slug: string; label: string };
const asArray = (v: unknown): NavItem[] => (Array.isArray(v) ? (v as NavItem[]) : []);

const CONTACT_EMAIL = "contact@krastysoft.com";
const CLUTCH_PROFILE = "https://clutch.co/profile/krasty-soft";

const COMPANY_LINKS: NavItem[] = [
  { slug: "about", label: "About Us" },
  { slug: "case-studies", label: "Case Studies" },
  { slug: "blog", label: "Blog" },
  { slug: "careers", label: "Careers" },
];

const columnTitle =
  "text-xs uppercase tracking-wider font-semibold mb-4";
const linkCls =
  "block text-sm py-1.5 transition-colors duration-200 hover:text-white";

export const FooterNav = () => {
  const columns: { title: string; items: NavItem[] }[] = [
    { title: "Services", items: asArray(PAGES.services) },
    { title: "Industries", items: asArray(PAGES.industries) },
    { title: "Technologies", items: asArray(PAGES.technologies) },
    { title: "Company", items: COMPANY_LINKS },
  ];

  return (
    <div
      className="w-full"
      style={{
        maxWidth: "var(--max-width)",
        margin: "0 auto",
        paddingTop: "3rem",
        marginTop: "3rem",
        borderTop: "1px solid var(--border-default)",
      }}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <div className={columnTitle} style={{ color: "var(--text-muted)" }}>
              {col.title}
            </div>
            {col.items.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                className={linkCls}
                style={{ color: "var(--text-secondary)" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ))}

        {/* Contact + trust */}
        <div>
          <div className={columnTitle} style={{ color: "var(--text-muted)" }}>
            Contact
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center gap-2 text-sm py-1.5 transition-colors duration-200 hover:text-white"
            style={{ color: "var(--text-secondary)" }}
          >
            <Mail size={14} style={{ color: "var(--brand-red)" }} />
            {CONTACT_EMAIL}
          </a>
          <div
            className="flex items-center gap-2 text-sm py-1.5"
            style={{ color: "var(--text-secondary)" }}
          >
            <MapPin size={14} style={{ color: "var(--brand-red)" }} />
            Ukraine · working worldwide
          </div>
          <a
            href={CLUTCH_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm py-1.5 transition-colors duration-200 hover:text-white"
            style={{ color: "var(--text-secondary)" }}
          >
            <Star size={14} fill="var(--brand-red)" color="var(--brand-red)" />
            4.9/5 on Clutch · 11 reviews
          </a>
        </div>
      </div>
    </div>
  );
};
