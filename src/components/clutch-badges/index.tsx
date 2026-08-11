"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import RestApiBadge from "@/assets/clutch-top-rest-api-2026.png";
import WebhookApiBadge from "@/assets/clutch-top-webhook-api-2026.png";

// TEMPORARY TRIAL: attempt the official Clutch rating widget again.
// Set to false to instantly fall back to the self-hosted rating block below
// (which is kept intact, not deleted).
const USE_OFFICIAL_WIDGET = true;

/**
 * Clutch social proof.
 *
 * Clutch's own embeds (widget.js and the /share/badges/ iframes) are served
 * with HTTP 403 + `x-frame-options: SAMEORIGIN` to this domain, so they render
 * as broken placeholders. Per Clutch's documentation a badge is simply "an
 * image ... that links back to your profile", and Clutch provides downloadable
 * badge files for self-hosting — so we present the same facts ourselves and
 * link back to the profile, with no dependency on their blocked embeds.
 *
 * To use the official artwork: download the PNGs from the Clutch vendor
 * dashboard ("Download Your Badges"), drop them in src/assets, and render them
 * inside the same <a> wrappers below (the profile link must be kept).
 */

const CLUTCH_PROFILE = "https://clutch.co/profile/krasty-soft";
const RATING = "4.9";
const REVIEW_COUNT = 11;

// Official Clutch award artwork, downloaded from the Clutch vendor dashboard
// ("Download Your Badges") and self-hosted — the use Clutch documents for
// badges. Each links back to the profile, which Clutch requires.
const AWARDS = [
  { src: RestApiBadge, alt: "Top Clutch REST API Company — Ukraine, 2026" },
  {
    src: WebhookApiBadge,
    alt: "Top Clutch Webhook API Company — Ukraine, 2026",
  },
];

export const ClutchBadges = () => {
  // TEMPORARY TRIAL: load Clutch's widget script on demand and let it render
  // the live rating widget. Remove this block (and flip USE_OFFICIAL_WIDGET to
  // false) if their embed proves unreliable again.
  useEffect(() => {
    if (!USE_OFFICIAL_WIDGET) return;
    const SCRIPT_ID = "clutch-widget-script";
    type ClutchWindow = Window & { CLUTCHCO?: { init?: () => void } };
    const init = () => (window as ClutchWindow).CLUTCHCO?.init?.();

    if (document.getElementById(SCRIPT_ID)) {
      const timer = setTimeout(init, 50);
      return () => clearTimeout(timer);
    }
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = "https://widget.clutch.co/static/js/widget.js";
    script.async = true;
    script.onload = init;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.25rem",
        width: "100%",
      }}
    >
      {/* Official Clutch rating widget — live, auto-updating. Widget type 2
          with data-darkbg renders the logo and text in white on a transparent
          background, so it sits on the dark hero without a light pill. */}
      {USE_OFFICIAL_WIDGET && (
        <div
          className="clutch-widget"
          data-url="https://widget.clutch.co"
          data-widget-type="2"
          data-height="45"
          data-nofollow="false"
          data-expandifr="true"
          data-scale="100"
          data-darkbg="1"
          data-clutchcompany-id="2343082"
        />
      )}

      {/* Self-hosted rating fallback — kept intact; shown when the official
          widget is disabled. Links back to the Clutch profile, as required. */}
      {!USE_OFFICIAL_WIDGET && (
        <a
          href={CLUTCH_PROFILE}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Krasty Soft is rated ${RATING} out of 5 on Clutch from ${REVIEW_COUNT} verified reviews`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.75rem 1.5rem",
          borderRadius: "9999px",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          textDecoration: "none",
          transition: "border-color 200ms, background-color 200ms",
        }}
        className="hover:!border-[var(--brand-red)] hover:!bg-white/[0.08]"
      >
        <span
          style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "var(--text-primary)",
          }}
        >
          {RATING}
        </span>
        <span style={{ display: "inline-flex", gap: "0.125rem" }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              fill="var(--brand-red)"
              color="var(--brand-red)"
            />
          ))}
        </span>
        <span
          style={{
            fontSize: "0.875rem",
            color: "var(--text-secondary)",
            whiteSpace: "nowrap",
          }}
        >
          {REVIEW_COUNT} verified reviews on Clutch
        </span>
        </a>
      )}

      {/* Official Clutch award badges (transparent PNGs, self-hosted). */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.25rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {AWARDS.map((award) => (
          <a
            key={award.alt}
            href={CLUTCH_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={award.alt}
            style={{ display: "block", lineHeight: 0 }}
            className="transition-transform duration-200 hover:scale-105"
          >
            <Image
              src={award.src}
              alt={award.alt}
              width={110}
              height={119}
              style={{ height: "auto", width: "110px" }}
            />
          </a>
        ))}
      </div>
    </div>
  );
};
