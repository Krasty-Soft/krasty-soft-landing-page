/**
 * Clutch profile figures — the single source of truth for the whole site.
 *
 * These numbers appear in the hero proof line, the trust block, the footer,
 * the FAQ answer and the AggregateRating structured data. They used to be
 * hardcoded in six separate files, which meant an update quietly went stale
 * in some of them — and inaccurate AggregateRating markup breaks Google's
 * structured-data rules, so drift here is not just cosmetic.
 *
 * TO UPDATE: change the two values below and nothing else.
 * Current figures can be read from the live widget or the Clutch profile.
 */
export const CLUTCH = {
  /** Average rating shown on the Clutch profile (out of 5). */
  rating: 4.9,
  /** Number of verified reviews on the Clutch profile. */
  reviewCount: 13,
  profileUrl: "https://clutch.co/profile/krasty-soft",
} as const;

/** "4.9" — for display in copy. */
export const CLUTCH_RATING = CLUTCH.rating.toFixed(1);
/** "4.9/5" — compact form used in the trust block and footer. */
export const CLUTCH_RATING_OUT_OF_5 = `${CLUTCH_RATING}/5`;
