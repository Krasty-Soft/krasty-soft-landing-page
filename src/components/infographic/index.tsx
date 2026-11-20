import { getImageProps } from "next/image";

// Site infographics (SEO brief, Nov 2026). Each one is rendered from
// tools/infographics/cards/ in two layouts: a wide desktop image and a tall
// phone image, so text stays readable at the size it is shown.
const INFOGRAPHICS = {
  "case-results": {
    alt: "Results clients measured after Krasty Soft's AI software went live: about 40% less handling time per support ticket with a HIPAA-compliant AI assistant, about 15% fewer support tickets and 4% higher cart totals with an AI shopping assistant, about 18 after-hours bookings recovered a month per client with an AI voice agent, and about 95% extraction accuracy in an AI data extraction pipeline.",
    desktop: { width: 2400, height: 1942 },
    mobile: { width: 1200, height: 3351 },
  },
  "custom-before-after": {
    alt: "What custom software development replaced at three clients: about 6 hours a week of manual ad reporting cut to close to zero by a marketing analytics dashboard, weekly purchasing carts rebuilt from memory replaced by predictive ordering, and one-off revenue queries replaced by one live view of MRR, churn and usage.",
    desktop: { width: 2400, height: 1854 },
    mobile: { width: 1200, height: 3366 },
  },
} as const;

export type InfographicName = keyof typeof INFOGRAPHICS;

export const Infographic = ({ name }: { name: InfographicName }) => {
  const info = INFOGRAPHICS[name];
  const common = { alt: info.alt, sizes: "(max-width: 767px) 100vw, 1200px" };
  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({
    ...common,
    ...info.mobile,
    src: `/images/infographics/${name}-mobile.jpg`,
  });
  const { props: desktop } = getImageProps({
    ...common,
    ...info.desktop,
    src: `/images/infographics/${name}-desktop.jpg`,
  });

  return (
    <figure className="w-full" style={{ maxWidth: "var(--max-width)", margin: 0 }}>
      <picture>
        <source media="(max-width: 767px)" srcSet={mobileSrcSet} />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
        <img
          {...desktop}
          loading="lazy"
          className="block h-auto w-full rounded-xl border"
          style={{ borderColor: "var(--border-subtle)" }}
        />
      </picture>
    </figure>
  );
};
