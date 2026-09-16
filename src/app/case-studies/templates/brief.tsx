"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Maximize2, Rocket } from "lucide-react";
import { CTABanner, ImageLightbox, Section } from "@/components/ui";
import type { Case, CaseBrief } from "@/lib/cases";

interface TemplateProps {
  caseData: Case & { brief: CaseBrief };
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5 },
};

const labelStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: "0.8125rem",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--text-secondary)",
  margin: 0,
};

const RedMark = () => (
  <span aria-hidden="true" style={{ color: "var(--brand-red)", fontSize: "0.75em" }}>
    ▲
  </span>
);

// Contentful's Images API serves a resized WebP straight from its CDN.
const optimized = (url: string, width: number) =>
  `${url}?w=${width}&fm=webp&q=80`;

export function TemplateBrief({ caseData }: TemplateProps) {
  const { brief } = caseData;
  const shot = caseData.media[0];
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      {shot && (
        <ImageLightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          imageSrc={shot.url}
          imageAlt={shot.description || caseData.title}
          images={[{ src: shot.url, alt: shot.description || caseData.title }]}
          currentIndex={0}
          onNavigate={() => {}}
        />
      )}

      {/* Hero: who the client is, the outcome, and who this is for */}
      <Section variant="primary" animate={false}>
        <div style={{ paddingTop: "3rem", maxWidth: "var(--max-width)" }}>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 transition-colors hover:text-[var(--brand-red)]"
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.9375rem",
              marginBottom: "2.5rem",
            }}
          >
            <ArrowLeft size={20} />
            Back to Case Studies
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p style={{ ...labelStyle, flexWrap: "wrap", marginBottom: "1.5rem" }}>
              <RedMark />
              <span style={{ color: "var(--text-primary)" }}>
                {brief.sector}
                {brief.client && " ·"}
              </span>
              {brief.client && (
                <span
                  style={{
                    fontWeight: 400,
                    letterSpacing: "normal",
                    textTransform: "none",
                    fontSize: "0.9375rem",
                  }}
                >
                  {brief.client}
                </span>
              )}
            </p>

            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold"
              style={{
                color: "var(--text-primary)",
                lineHeight: 1.15,
                maxWidth: "58rem",
                textWrap: "balance",
              }}
            >
              {brief.headline}
            </h1>

            {brief.summary && (
              <p
                className="text-lg md:text-xl"
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  maxWidth: "52rem",
                  marginTop: "1.5rem",
                }}
              >
                {brief.summary}
              </p>
            )}

            {brief.bestFor && (
              <div
                style={{
                  marginTop: "2rem",
                  paddingLeft: "1.25rem",
                  borderLeft: "2px solid var(--border-strong)",
                  maxWidth: "52rem",
                }}
              >
                <h2 style={{ ...labelStyle, marginBottom: "0.5rem" }}>Where this fits</h2>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {brief.bestFor}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </Section>

      {/* Proof, delivery and result beside the product itself */}
      <Section variant="secondary" animate={false}>
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start"
          style={{ maxWidth: "var(--max-width)" }}
        >
          <motion.div
            {...fadeUp}
            style={{
              backgroundColor: "var(--bg-elevated)",
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-2xl)",
              padding: "clamp(1.25rem, 3vw, 2.25rem)",
              minWidth: 0,
            }}
          >
            <p
              className="text-2xl md:text-3xl font-bold"
              style={{ color: "var(--text-primary)", lineHeight: 1.25 }}
            >
              {brief.proofLead}{" "}
              {brief.proofEmphasis && (
                <span style={{ color: "var(--brand-red)" }}>{brief.proofEmphasis}</span>
              )}
            </p>

            {brief.proofPoints.length > 0 && (
              <ul
                className="flex flex-wrap"
                style={{
                  gap: "0.25rem 0.75rem",
                  marginTop: "1rem",
                  color: "var(--text-secondary)",
                  fontSize: "0.9375rem",
                }}
              >
                {brief.proofPoints.map((point, i) => (
                  <li
                    key={point}
                    style={
                      i === 0
                        ? { color: "var(--text-primary)", fontWeight: 600 }
                        : undefined
                    }
                  >
                    {point}
                    {/* Trailing separator, so a wrapped line never starts with one */}
                    {i < brief.proofPoints.length - 1 && (
                      <span
                        aria-hidden="true"
                        style={{
                          marginLeft: "0.75rem",
                          color: "var(--text-secondary)",
                          fontWeight: 400,
                        }}
                      >
                        ·
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {brief.whatWeDid.length > 0 && (
              <>
                <h2 style={{ ...labelStyle, color: "var(--text-primary)", marginTop: "2rem" }}>
                  <RedMark />
                  What we did
                </h2>
                <ul style={{ marginTop: "1rem", display: "grid", gap: "0.75rem" }}>
                  {brief.whatWeDid.map((item) => (
                    <li
                      key={item}
                      className="flex"
                      style={{ gap: "0.875rem", color: "var(--text-primary)", lineHeight: 1.5 }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          flexShrink: 0,
                          width: "0.5rem",
                          height: "0.5rem",
                          marginTop: "0.55em",
                          borderRadius: "9999px",
                          backgroundColor: "var(--brand-red)",
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {brief.result && (
              <div
                style={{
                  marginTop: "2rem",
                  padding: "clamp(1rem, 2.5vw, 1.5rem)",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid var(--border-default)",
                  backgroundColor: "var(--bg-primary)",
                }}
              >
                <h2 style={{ ...labelStyle, color: "var(--text-primary)" }}>
                  <RedMark />
                  Result
                </h2>
                <p style={{ marginTop: "0.75rem", color: "var(--text-primary)", lineHeight: 1.65 }}>
                  {brief.result}
                </p>
              </div>
            )}
          </motion.div>

          <div style={{ minWidth: 0 }}>
            {shot && (
              <motion.figure {...fadeUp} style={{ margin: 0 }}>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  aria-label="Open screenshot full size"
                  className="group relative block w-full overflow-hidden"
                  style={{
                    borderRadius: "var(--radius-xl)",
                    border: "1px solid var(--border-default)",
                    backgroundColor: "var(--bg-primary)",
                    cursor: "zoom-in",
                  }}
                >
                  <Image
                    src={optimized(shot.url, 1600)}
                    alt={shot.description || caseData.title}
                    width={shot.width || 1600}
                    height={shot.height || 1000}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    unoptimized
                    priority
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      top: "0.75rem",
                      right: "0.75rem",
                      padding: "0.5rem",
                      borderRadius: "var(--radius-md)",
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      color: "white",
                    }}
                  >
                    <Maximize2 size={18} />
                  </span>
                </button>
                {shot.description && (
                  <figcaption
                    style={{
                      marginTop: "0.875rem",
                      color: "var(--text-muted)",
                      fontSize: "0.875rem",
                      lineHeight: 1.55,
                    }}
                  >
                    {shot.description}
                  </figcaption>
                )}
              </motion.figure>
            )}

            {brief.hardPart && (
              <motion.div
                {...fadeUp}
                style={{
                  marginTop: shot ? "2.5rem" : 0,
                  paddingLeft: "1.25rem",
                  borderLeft: "3px solid var(--brand-red)",
                }}
              >
                <h2 style={{ ...labelStyle, color: "var(--text-primary)" }}>The hard part</h2>
                <p
                  style={{
                    marginTop: "0.75rem",
                    color: "var(--text-primary)",
                    fontSize: "1.0625rem",
                    lineHeight: 1.7,
                  }}
                >
                  {brief.hardPart}
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {(brief.stack.length > 0 || brief.focus.length > 0) && (
          <motion.dl
            {...fadeUp}
            style={{
              maxWidth: "var(--max-width)",
              marginTop: "3.5rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--border-default)",
              display: "grid",
              gap: "1.25rem",
            }}
          >
            {[
              { label: "Stack", items: brief.stack },
              { label: "Focus", items: brief.focus },
            ]
              .filter((row) => row.items.length > 0)
              .map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-1 md:grid-cols-[6rem_1fr]"
                  style={{ gap: "0.75rem", alignItems: "baseline" }}
                >
                  <dt style={labelStyle}>{row.label}</dt>
                  <dd className="flex flex-wrap" style={{ gap: "0.5rem", margin: 0 }}>
                    {row.items.map((item) => (
                      <span
                        key={item}
                        style={{
                          padding: "0.375rem 0.75rem",
                          borderRadius: "var(--radius-sm)",
                          backgroundColor: "var(--bg-tertiary)",
                          border: "1px solid var(--border-subtle)",
                          color: "var(--text-primary)",
                          fontSize: "0.875rem",
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
          </motion.dl>
        )}
      </Section>

      <Section variant="primary" animate={false}>
        <CTABanner>
          <Rocket size={48} color="white" style={{ margin: "0 auto 1.5rem", display: "block" }} />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "white" }}>
            Facing a similar problem?
          </h2>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "1.125rem",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Tell us where it stalls today, and we&apos;ll tell you how we would approach it.
          </p>
        </CTABanner>
      </Section>
    </>
  );
}
