import localFont from "next/font/local";

// Sora — variable font (weight axis 100–800), licensed under the SIL Open Font
// License (see src/fonts/OFL.txt). Self-hosted via next/font/local for
// performance (no external request). Covers every weight the design uses
// (400 / 500 / 600 / 700) from a single 110KB file.
export const sora = localFont({
  src: "../fonts/Sora-VariableFont_wght.ttf",
  variable: "--font-sora",
  display: "swap",
  weight: "100 800",
});
