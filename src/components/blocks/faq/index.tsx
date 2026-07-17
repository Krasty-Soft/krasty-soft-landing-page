"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Section } from "@/components/ui";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import type { FAQItem } from "@/lib/faq";

interface FaqProps {
  items: FAQItem[];
  title?: string;
  variant?: "primary" | "secondary";
}

export const Faq = ({
  items,
  title = "Frequently asked questions",
  variant = "secondary",
}: FaqProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items?.length) return null;

  return (
    <Section variant={variant} animate={false}>
      <SectionWrapper>
        <div style={{ width: "100%", maxWidth: "var(--max-width)" }}>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12"
            style={{ color: "var(--text-primary)", lineHeight: 1.3 }}
          >
            <span style={{ color: "var(--brand-red)" }}>&gt; </span>
            {title}
          </h2>

          <div>
            {items.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  style={{ borderBottom: "1px solid var(--border-default)" }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-6 text-left py-6"
                    style={{ cursor: "pointer", background: "none" }}
                  >
                    <span
                      className="text-lg md:text-xl font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.question}
                    </span>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        flexShrink: 0,
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-default)",
                        backgroundColor: "var(--surface-elevated)",
                      }}
                    >
                      {isOpen ? (
                        <Minus size={18} style={{ color: "var(--brand-red)" }} />
                      ) : (
                        <Plus size={18} style={{ color: "var(--text-primary)" }} />
                      )}
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          className="text-sm md:text-base leading-relaxed pb-6 md:pr-12"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </SectionWrapper>
    </Section>
  );
};
