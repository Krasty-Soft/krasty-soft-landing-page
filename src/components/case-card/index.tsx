"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Image } from "@/components/ui";
import { Case } from "@/lib/cases";

const mockSrc = "https://placehold.co/600x400.png";
const MAX_TAGS = 4;
const MAX_CATEGORIES = 2;

// Card-specific palette straight from the Figma spec ("Mini case").
const CARD_BG = "#0A0404";
const CARD_BORDER = "#454545";
const CHIP_BG = "#26282B";
const CHIP_TEXT = "#E5E5E5";
const META_TEXT = "#A9A9A9";
// Faint brand-red wash applied over the whole card on hover. Tune the alpha here.
const CARD_TINT = "rgba(229, 6, 6, 0.08)";

export const CaseCard = ({ data }: { data: Case }) => {
  const [isHovered, setIsHovered] = useState(false);

  const banner = data.media?.find((media) => media.title?.includes("banner"));
  const coverSrc =
    data.preview || banner?.url || data.media?.[0]?.url || mockSrc;

  const tags = (data.tags ?? []).slice(0, MAX_TAGS);

  // Meta line: explicit categories win, else fall back to industries, else nothing.
  const categories = (
    data.categories && data.categories.length > 0
      ? data.categories
      : (data.industries ?? [])
  ).slice(0, MAX_CATEGORIES);

  return (
    <Link
      href={`/case-studies/${data.slug}`}
      style={{ textDecoration: "none", display: "block", height: "100%" }}
    >
      <motion.article
        initial={false}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{ y: isHovered ? -6 : 0 }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "1.25rem",
          height: "100%",
          minHeight: "455px",
          width: "100%",
          padding: "1.25rem",
          backgroundColor: CARD_BG,
          border: `1px solid ${CARD_BORDER}`,
          borderRadius: "20px",
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        {/* Top block: cover → chips → title */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          {/* Cover image: grayscale at rest → full color on hover, slight zoom */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "360 / 161",
              borderRadius: "12px",
              overflow: "hidden",
              backgroundColor: CHIP_BG,
            }}
          >
            <motion.div
              initial={false}
              animate={{
                scale: isHovered ? 1.05 : 1,
                filter: isHovered ? "grayscale(0)" : "grayscale(1)",
              }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              style={{ position: "absolute", inset: 0 }}
            >
              <Image
                src={coverSrc}
                alt={data.title}
                wrapperClasses="w-full h-full"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  display: "block",
                }}
              />
            </motion.div>
            {/* Subtle dim over the grayscale rest state; clears fully on hover */}
            <motion.div
              initial={false}
              animate={{ opacity: isHovered ? 0 : 0.18 }}
              transition={{ duration: 0.4 }}
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "#000",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Tech-stack chips */}
          {tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {tags.map((tag, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "4px",
                    backgroundColor: CHIP_BG,
                    color: CHIP_TEXT,
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3
            style={{
              margin: 0,
              fontSize: "1.5rem",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "#ffffff",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {data.title}
          </h3>
        </div>

        {/* Bottom block: the meta line rests flush at the card bottom; on hover
            it lifts to reveal "View case" (absolutely placed → no reserved gap) */}
        <div style={{ position: "relative" }}>
          {categories.length > 0 && (
            <motion.div
              initial={false}
              animate={{ y: isHovered ? -32 : 0 }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {categories.map((category, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  {i > 0 && (
                    <span
                      aria-hidden
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "9999px",
                        backgroundColor: "var(--brand-red)",
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <span
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 400,
                      textTransform: "uppercase",
                      letterSpacing: "0.02em",
                      color: META_TEXT,
                    }}
                  >
                    {category}
                  </span>
                </span>
              ))}
            </motion.div>
          )}

          {/* "View case" CTA — absolutely anchored to the bottom, revealed on hover */}
          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              color: "var(--brand-red)",
              fontSize: "1rem",
              fontWeight: 400,
              pointerEvents: isHovered ? "auto" : "none",
            }}
          >
            <span>View case</span>
            <motion.span
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ display: "inline-flex" }}
            >
              <ArrowRight size={24} />
            </motion.span>
          </motion.div>
        </div>

        {/* Hover: faint brand-red wash over the whole card */}
        <motion.div
          aria-hidden
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "20px",
            backgroundColor: CARD_TINT,
            pointerEvents: "none",
            zIndex: 5,
          }}
        />
      </motion.article>
    </Link>
  );
};
