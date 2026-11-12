"use client";

import { motion } from "framer-motion";

// Same scroll as the other CTA buttons: the page scrolls inside #app-scroll,
// so a plain #contacts anchor would not move it.
const goToContacts = () => {
  const container = document.getElementById("app-scroll");
  const section = document.getElementById("contacts");
  if (!container || !section) return;
  const offsetTop =
    section.getBoundingClientRect().top -
    container.getBoundingClientRect().top +
    container.scrollTop;
  container.scrollTo({ top: offsetTop, behavior: "smooth" });
};

export const ScrollToContactsButton = ({ label }: { label: string }) => (
  <motion.button
    type="button"
    onClick={goToContacts}
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
    {label}
  </motion.button>
);
