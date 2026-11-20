// The page scrolls inside #app-scroll, not the window, so a plain "#id" anchor
// does not move it. Every scroll-to-section button goes through this helper.
export const scrollToSection = (id: string) => {
  const container = document.getElementById("app-scroll");
  const section = document.getElementById(id);
  if (!container || !section) return;
  const offsetTop =
    section.getBoundingClientRect().top -
    container.getBoundingClientRect().top +
    container.scrollTop;
  container.scrollTo({ top: offsetTop, behavior: "smooth" });
};
