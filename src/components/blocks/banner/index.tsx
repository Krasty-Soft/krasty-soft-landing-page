"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { StatusBadge, AchievementCard, Modal } from "@/components/ui";
import { StaggerWrapper } from "@/components/ui/scroll-reveal";
import Script from "next/script";

// Stagger item variant for children
const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const goToContact = () => {
  const container = document.getElementById("app-scroll");
  const section = document.getElementById("contacts");
  if (!container || !section) return;

  const containerRect = container.getBoundingClientRect();
  const sectionRect = section.getBoundingClientRect();
  const offsetTop = sectionRect.top - containerRect.top + container.scrollTop;

  container.scrollTo({ top: offsetTop, behavior: "smooth" });
};

const mockReviews = [
  {
    id: "1",
    name: "Amanda Doe",
    position: "VP Marketing",
    company: "Google",
    review:
      "Everybody who&apos;s seen the app tells me how much they like it. I&apos;m very pleased with the app.",
    rating: 5,
  },
  {
    id: "2",
    name: "Marc Brunet",
    position: "CEO",
    company: "Cubebrush",
    review:
      "It&apos;s been a very, very cool casual partnership that we&apos;ve had. It&apos;s almost like they&apos;re my employees.",
    rating: 5,
  },
  {
    id: "3",
    name: "Michael Roberts",
    position: "CEO",
    company: "BrightTech",
    review:
      "The collaboration has been absolutely fantastic! It feels like they are part of my team, always ready to support and assist with anything.",
    rating: 5,
  },
];

const mockAwards = [
  {
    emoji: "🏆",
    title: "Top API Development Company",
    location: "Ukraine 2026",
    platform: "Clutch",
  },
  {
    emoji: "🥇",
    title: "Top REST API Developers",
    location: "Ukraine 2026",
    platform: "Clutch",
  },
  {
    emoji: "⭐",
    title: "Top Software Developers",
    location: "Eastern Europe 2025",
    platform: "GoodFirms",
  },
  {
    emoji: "💎",
    title: "Best Custom Software Company",
    location: "Ukraine 2025",
    platform: "TechReviewer",
  },
];

export const Banner = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [reviewsModalOpen, setReviewsModalOpen] = useState(false);
  const [awardsModalOpen, setAwardsModalOpen] = useState(false);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24 md:py-32 overflow-hidden"
      style={{
        backgroundColor: "var(--bg-primary)",
      }}
    >
      {/* Background gradient effect */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(229, 6, 6, 0.12), transparent 60%), radial-gradient(circle at 20% 80%, rgba(229, 6, 6, 0.06), transparent 40%)",
        }}
      />

      <StaggerWrapper className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
        {/* Status badge */}
        <motion.div variants={staggerItem} className="mb-8">
          <StatusBadge
            status="Open for work"
            subtitle="Building the future"
            variant="default"
            animated
          />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={staggerItem}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-6 tracking-tight"
          style={{
            color: "var(--text-primary)",
            lineHeight: "1.1",
          }}
        >
          Software company <br className="hidden md:block" />
          you can trust
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={staggerItem}
          className="text-lg md:text-xl lg:text-2xl text-center mb-12 max-w-3xl"
          style={{
            color: "var(--text-muted)",
            lineHeight: "1.6",
          }}
        >
          At Krasty Soft we build software products which solve your business
          problems and challenges.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={staggerItem} className="mb-16 relative">
          {/* Base glow (always visible) */}
          <motion.div
            className="absolute inset-0 rounded-full blur-3xl -z-10"
            style={{
              background:
                "radial-gradient(circle, rgba(229, 6, 6, 0.6), rgba(229, 6, 6, 0.3) 50%, transparent 70%)",
            }}
            initial={false}
            animate={{
              scale: isHovered ? 1.4 : 1.1,
              opacity: isHovered ? 1 : 0.8,
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
            }}
          />

          <motion.button
            onClick={goToContact}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative group px-12 py-5 text-lg font-bold rounded-full"
            style={{
              background:
                "linear-gradient(135deg, #E50606 0%, #FF2020 50%, #E50606 100%)",
              color: "var(--text-primary)",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
            }}
            initial={false}
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "linear-gradient(45deg, #FF0000, #E50606, #FF0000, #E50606)",
                backgroundSize: "300% 300%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Shimmer sweep */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
              }}
              animate={{
                backgroundPosition: ["-200% 0%", "200% 0%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut",
              }}
            />

            {/* Text with arrow */}
            <span className="relative z-10 flex items-center justify-center gap-3">
              <span>Get started today</span>
              <motion.span
                animate={{
                  x: [0, 6, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>

        {/* Social Proof Grid */}
        <motion.div
          variants={staggerItem}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 w-full max-w-5xl"
        >
          <AchievementCard
            variant="rating"
            rating={5}
            maxRating={5}
            label="Rating"
            onClick={() => setReviewsModalOpen(true)}
            animateStars
          />

          <AchievementCard
            variant="award"
            emoji="🏆"
            title="Top API Dev"
            subtitle="Ukraine 2026"
            onClick={() => setAwardsModalOpen(true)}
          />

          <AchievementCard
            variant="stat"
            number={11}
            label="Client Reviews"
            onClick={() => setReviewsModalOpen(true)}
          />

          <AchievementCard
            variant="award"
            emoji="🏆"
            title="Top REST API"
            subtitle="Ukraine 2026"
            onClick={() => setAwardsModalOpen(true)}
          />
        </motion.div>

        <motion.div variants={staggerItem} className="w-full max-w-5xl">
          <Script
            src="https://widget.clutch.co/static/js/widget.js"
            strategy="afterInteractive"
          />
          <div
            className="clutch-widget"
            data-url="https://widget.clutch.co"
            data-widget-type="2"
            data-height="45"
            data-nofollow="false"
            data-expandifr="true"
            data-scale="100"
            data-clutchcompany-id="2343082"
          />
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            <iframe
              width="120"
              height="120"
              src="https://clutch.co/share/badges/2343082/77869?utm_source=clutch_top_company_badge&utm_medium=image_embed"
              title="Top Clutch Rest Api Company Ukraine 2026"
              style={{ border: 0, maxWidth: "100%" }}
            />
            <iframe
              width="120"
              height="120"
              src="https://clutch.co/share/badges/2343082/81323?utm_source=clutch_top_company_badge&utm_medium=image_embed"
              title="Top Clutch Api Development Company Ukraine 2026"
              style={{ border: 0, maxWidth: "100%" }}
            />
          </div>
        </motion.div>
      </StaggerWrapper>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-2"
          style={{ borderColor: "var(--border-default)" }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "var(--brand-red)" }}
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>

      {/* Reviews Modal */}
      <Modal
        isOpen={reviewsModalOpen}
        onClose={() => setReviewsModalOpen(false)}
        title="Client Reviews"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {mockReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                padding: "2rem",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "var(--radius-lg)",
                position: "relative",
              }}
            >
              {/* Quote Icon */}
              <div
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  opacity: 0.2,
                }}
              >
                <Quote size={32} color="var(--brand-red)" />
              </div>

              {/* Stars */}
              <div
                style={{
                  display: "flex",
                  gap: "0.25rem",
                  marginBottom: "1rem",
                }}
              >
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill="var(--brand-red)"
                    color="var(--brand-red)"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p
                style={{
                  fontSize: "1.125rem",
                  lineHeight: "1.7",
                  color: "var(--text-primary)",
                  marginBottom: "1.5rem",
                  fontStyle: "italic",
                }}
              >
                &quot;{review.review}&quot;
              </p>

              {/* Author */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "50%",
                    backgroundColor: "rgba(220, 38, 38, 0.1)",
                    border: "1px solid rgba(220, 38, 38, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "var(--brand-red)",
                  }}
                >
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div
                    style={{ fontWeight: 600, color: "var(--text-primary)" }}
                  >
                    {review.name}
                  </div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {review.position}, {review.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Modal>

      {/* Awards Modal */}
      <Modal
        isOpen={awardsModalOpen}
        onClose={() => setAwardsModalOpen(false)}
        title="Awards & Recognition"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {mockAwards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              style={{
                padding: "2rem",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "var(--radius-lg)",
                textAlign: "center",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Background glow */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(circle at center, rgba(220, 38, 38, 0.05), transparent)",
                  pointerEvents: "none",
                }}
              />

              {/* Trophy */}
              <div
                style={{
                  fontSize: "3.5rem",
                  marginBottom: "1.5rem",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {award.emoji}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "0.75rem",
                  lineHeight: "1.3",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {award.title}
              </h3>

              {/* Location */}
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                  marginBottom: "0.75rem",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {award.location}
              </p>

              {/* Platform */}
              <div
                style={{
                  display: "inline-block",
                  padding: "0.375rem 1rem",
                  borderRadius: "9999px",
                  backgroundColor: "rgba(220, 38, 38, 0.1)",
                  border: "1px solid rgba(220, 38, 38, 0.3)",
                  fontSize: "0.8125rem",
                  color: "var(--brand-red)",
                  fontWeight: 600,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {award.platform}
              </div>
            </motion.div>
          ))}
        </div>
      </Modal>
    </section>
  );
};
