"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import RestApiBadge from "@/assets/clutch-top-rest-api-2026.png";
import WebhookApiBadge from "@/assets/clutch-top-webhook-api-2026.png";

// How long to give Clutch's script to paint the live widget before falling
// back to our own rating block.
const WIDGET_RENDER_TIMEOUT_MS = 3000;

/**
 * Clutch social proof — live widget with a self-hosted fallback.
 *
 * The official rating widget is attempted first (it auto-updates as reviews
 * come in). It can silently fail to render for reasons outside our control:
 *  - Clutch's script validates the referring domain against the company
 *    profile, so it renders nothing while the profile still points at the old
 *    domain;
 *  - privacy browsers and ad blockers (Brave, uBlock) block widget.clutch.co,
 *    which is common in a developer/B2B audience.
 * When the widget hasn't painted within WIDGET_RENDER_TIMEOUT_MS we swap in an
 * equivalent self-hosted block, so the social proof is never missing.
 *
 * The award badges are always self-hosted: Clutch serves /share/badges/ with
 * HTTP 403 + `x-frame-options: SAMEORIGIN`, so those iframes cannot work here.
 * Clutch documents a badge as "an image ... that links back to your profile"
 * and provides downloadable badge files, which is exactly what we render.
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
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const [widgetRendered, setWidgetRendered] = useState(false);
  const [widgetChecked, setWidgetChecked] = useState(false);

  useEffect(() => {
    const SCRIPT_ID = "clutch-widget-script";
    // NOTE: Clutch exposes `CLUTCHCO.Init` with a capital I — a lowercase
    // `init` does not exist, so calling it was a silent no-op. Their script
    // otherwise only self-initializes on a `readystatechange` event, which
    // never fires again once we append the script after hydration.
    type ClutchWindow = Window & {
      CLUTCHCO?: { Init?: () => void; loaded?: boolean };
    };
    const init = () => (window as ClutchWindow).CLUTCHCO?.Init?.();

    if (document.getElementById(SCRIPT_ID)) {
      setTimeout(init, 50);
    } else {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = "https://widget.clutch.co/static/js/widget.js";
      script.async = true;
      script.onload = init;
      // Blocked by a privacy browser / ad blocker: reveal the fallback at once
      // instead of waiting out the timeout.
      script.onerror = () => {
        setWidgetRendered(false);
        setWidgetChecked(true);
      };
      document.body.appendChild(script);
    }

    // Decide which version to show once Clutch has had time to paint.
    const timer = setTimeout(() => {
      const el = widgetRef.current;
      const painted = !!el && el.getBoundingClientRect().height > 0;
      setWidgetRendered(painted);
      setWidgetChecked(true);
    }, WIDGET_RENDER_TIMEOUT_MS);

    return () => clearTimeout(timer);
  }, []);

  // Show the fallback only after the check, so the two never flash together.
  const showFallback = widgetChecked && !widgetRendered;

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
          background, so it sits on the dark hero without a light pill. Hidden
          if it never paints, so it can't leave an empty gap. */}
      <div
        ref={widgetRef}
        className="clutch-widget"
        data-url="https://widget.clutch.co"
        data-widget-type="2"
        data-height="45"
        data-nofollow="false"
        data-expandifr="true"
        data-scale="100"
        data-darkbg="1"
        data-clutchcompany-id="2343082"
        // The iframe is rendered with width="100%", so the wrapper must be
        // pinned to the widget's natural width — otherwise it stretches to the
        // full column and Clutch's left-aligned content looks off-centre.
        // `margin: 0 auto` keeps it centred regardless of the flex context.
        style={
          showFallback
            ? { display: "none" }
            : { width: "300px", maxWidth: "100%", margin: "0 auto" }
        }
      />

      {/* Self-hosted rating fallback — shown only when the official widget
          didn't render (blocked, or profile domain mismatch). Links back to
          the Clutch profile, as Clutch requires. */}
      {showFallback && (
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
          {` from ${REVIEW_COUNT} verified reviews on Clutch`}
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
