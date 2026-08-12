"use client";

import { motion } from "framer-motion";
import { CalendarDays, Rocket, Star } from "lucide-react";
import { Section } from "@/components/ui";
import { SectionWrapper } from "@/components/ui/section-wrapper";

// Key company figures, shown directly under the hero. Required by the SEO
// brief as a trust block on the homepage.
const STATS = [
  { icon: CalendarDays, value: "3+", label: "Years of expertise" },
  { icon: Rocket, value: "50+", label: "Delivered projects" },
  { icon: Star, value: "4.9/5", label: "Average rating on Clutch" },
];

export const TrustStats = () => {
  return (
    <Section variant="secondary" animate={false}>
      <SectionWrapper>
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 w-full"
          style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}
        >
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex flex-col items-center text-center"
              style={{
                padding: "1.75rem 1.25rem",
                borderRadius: "var(--radius-lg)",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <stat.icon
                size={22}
                style={{ color: "var(--brand-red)", marginBottom: "0.75rem" }}
              />
              <span
                className="text-3xl md:text-4xl font-bold"
                style={{ color: "var(--text-primary)", lineHeight: 1.1 }}
              >
                {stat.value}
              </span>
              <span
                className="text-sm md:text-base mt-2"
                style={{ color: "var(--text-secondary)" }}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>
    </Section>
  );
};
