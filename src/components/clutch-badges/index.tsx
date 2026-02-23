"use client";

import { useEffect } from "react";

export const ClutchBadges = () => {
  useEffect(() => {
    // Remove any cached instance so Clutch re-scans the DOM on every mount
    // (next/script won't re-execute on client-side navigation; manual injection does)
    const existing = document.querySelector(
      'script[src="https://widget.clutch.co/static/js/widget.js"]',
    );
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.src = "https://widget.clutch.co/static/js/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const s = document.querySelector(
        'script[src="https://widget.clutch.co/static/js/widget.js"]',
      );
      if (s) s.remove();
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
        width: "100%",
      }}
    >
      {/* Main Clutch Widget - Top Row */}
      <div
        style={{
          display: "inline-flex",
          justifyContent: "center",
          backgroundColor: "#f2f2f2",
          borderRadius: "9999px",
          padding: "0.5rem 1.5rem",
          overflow: "hidden",
        }}
      >
        <div
          className="clutch-widget"
          data-url="https://widget.clutch.co"
          data-widget-type="2"
          data-height="45"
          data-nofollow="false"
          data-expandifr="true"
          data-scale="100"
          data-clutchcompany-id="2343082"
          style={{
            maxWidth: "100%",
            marginLeft: "120px",
          }}
        />
      </div>

      {/* Hexagon Badges - Bottom Row (Horizontal) */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1.5rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <iframe
          width="120"
          height="120"
          src="https://clutch.co/share/badges/2343082/77869?utm_source=clutch_top_company_badge&utm_medium=image_embed"
          title="Top Clutch Rest Api Company Ukraine 2026"
          style={{ border: 0, display: "block" }}
        />
        <iframe
          width="120"
          height="120"
          src="https://clutch.co/share/badges/2343082/81323?utm_source=clutch_top_company_badge&utm_medium=image_embed"
          title="Top Clutch Api Development Company Ukraine 2026"
          style={{ border: 0, display: "block" }}
        />
      </div>
    </div>
  );
};
