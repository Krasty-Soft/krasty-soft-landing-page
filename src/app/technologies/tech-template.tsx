"use client";

import { motion } from "framer-motion";
import { Section, TypingText, CTABanner } from "@/components/ui";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { ItemsGrid } from "@/components/blocks";
import { TechDetail } from "@/lib/techs";
import { CheckCircle2 } from "lucide-react";

interface TechTemplateProps {
  tech: TechDetail;
}

const renderTextWithHighlight = (text: string) => {
  const parts = text.split(/(<strong>.*?<\/strong>)/g);
  return parts.map((part, index) => {
    if (part.startsWith("<strong>") && part.endsWith("</strong>")) {
      const content = part.replace(/<\/?strong>/g, "");
      return <strong key={index}>{content}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
};

export default function TechTemplate({ tech }: TechTemplateProps) {
  return (
    <>
      {/* Hero Section */}
      <Section variant="primary" animate={false}>
        <SectionWrapper>
          <div style={{ paddingTop: "4rem" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-12 md:mb-16"
                style={{
                  color: "var(--text-primary)",
                  lineHeight: "1.2",
                }}
              >
                <span style={{ color: "var(--brand-red)" }}>&gt; </span>
                <TypingText
                  text={tech.subtitle}
                  speed={50}
                  delay={300}
                  highlightWords={[tech.title]}
                />
              </h1>

              {/* Intro Paragraphs */}
              <div
                style={{
                  maxWidth: "var(--max-width)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                {tech.introParagraphs.map((para, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                    style={{
                      fontSize: "1.125rem",
                      lineHeight: "1.8",
                      color: "var(--text-secondary)",
                      textAlign: "justify",
                      textIndent: "1rem",
                    }}
                  >
                    {renderTextWithHighlight(para)}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </div>
        </SectionWrapper>
      </Section>

      {/* What We Build Section */}
      <Section variant="secondary" animate={false}>
        <SectionWrapper>
          <div className="mb-12 md:mb-16" style={{ alignSelf: "flex-start" }}>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold"
              style={{
                color: "var(--text-primary)",
                lineHeight: "1.4",
                maxWidth: "var(--max-width)",
              }}
            >
              <span style={{ color: "var(--brand-red)" }}>&gt; </span>
              <TypingText
                text={tech.whatWeBuild.title}
                speed={50}
                delay={300}
                highlightWords={[tech.title]}
              />
            </h2>
          </div>

          <ul
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1rem",
              maxWidth: "var(--max-width)",
              width: "100%",
              listStyle: "none",
              padding: 0,
            }}
          >
            {tech.whatWeBuild.items.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  padding: "1rem",
                  backgroundColor: "var(--surface-primary)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-lg)",
                }}
              >
                <CheckCircle2
                  size={20}
                  style={{
                    color: tech.brandColor,
                    flexShrink: 0,
                    marginTop: "0.125rem",
                  }}
                />
                <span
                  style={{
                    fontSize: "0.9375rem",
                    lineHeight: "1.6",
                    color: "var(--text-secondary)",
                  }}
                >
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </SectionWrapper>
      </Section>

      {/* Why Choose Section */}
      <Section variant="primary" animate={false}>
        <SectionWrapper>
          <div className="mb-12 md:mb-16" style={{ alignSelf: "flex-start" }}>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold"
              style={{
                color: "var(--text-primary)",
                lineHeight: "1.4",
                maxWidth: "var(--max-width)",
              }}
            >
              <span style={{ color: "var(--brand-red)" }}>&gt; </span>
              <TypingText
                text={tech.whyChoose.title}
                speed={50}
                delay={300}
                highlightWords={[tech.title]}
              />
            </h2>
          </div>

          <div
            style={{
              maxWidth: "var(--max-width)",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            {tech.whyChoose.paragraphs.map((para, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: "1.8",
                  color: "var(--text-secondary)",
                  textAlign: "justify",
                  textIndent: "1rem",
                }}
              >
                {renderTextWithHighlight(para)}
              </motion.p>
            ))}
          </div>
        </SectionWrapper>
      </Section>

      {/* Industries Section */}
      <Section variant="secondary" animate={false}>
        <div className="mb-12 md:mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
            style={{
              color: "var(--text-primary)",
              lineHeight: "1.4",
            }}
          >
            <span style={{ color: "var(--brand-red)" }}>&gt; </span>
            <TypingText
              text={tech.industries.title}
              speed={40}
              delay={300}
              highlightWords={[tech.title]}
            />
          </h2>
        </div>

        <ItemsGrid items={tech.industries.list} />
      </Section>

      {/* CTA Section */}
      <Section variant="primary" animate={false}>
        <CTABanner>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: "white" }}
          >
            Ready to build with {tech.title}?
          </h2>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "1.125rem",
              maxWidth: "var(--max-width)",
              margin: "0 auto 2rem",
            }}
          >
            Let&apos;s discuss how we can help you achieve your goals.
          </p>
          <motion.button
            type="button"
            onClick={() => {
              const container = document.getElementById("app-scroll");
              const section = document.getElementById("contacts");
              if (container && section) {
                const containerRect = container.getBoundingClientRect();
                const sectionRect = section.getBoundingClientRect();
                const offsetTop =
                  sectionRect.top - containerRect.top + container.scrollTop;
                container.scrollTo({ top: offsetTop, behavior: "smooth" });
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.875rem 1.75rem",
              fontSize: "1rem",
              fontWeight: 600,
              color: "#7f1d1d",
              backgroundColor: "white",
              border: "none",
              borderRadius: "var(--radius-lg)",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
            }}
          >
            Get in touch
          </motion.button>
        </CTABanner>
      </Section>
    </>
  );
}
