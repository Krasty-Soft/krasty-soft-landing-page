"use client";

import Script from "next/script";

export const ClutchBadges = () => {
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
      <Script
        src="https://widget.clutch.co/static/js/widget.js"
        strategy="afterInteractive"
      />

      {/* Main Clutch Widget - Top Row */}
      <div
        style={{
          maxWidth: "100%",
          overflow: "hidden",
          width: "100%",
          display: "flex",
          justifyContent: "center",
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
        {/* Badge 1 with red tint overlay */}
        <div
          style={{
            position: "relative",
            width: "110px",
            height: "120px",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <iframe
            width="120"
            height="120"
            src="https://clutch.co/share/badges/2343082/77869?utm_source=clutch_top_company_badge&utm_medium=image_embed"
            title="Top Clutch Rest Api Company Ukraine 2026"
            style={{ border: 0, display: "block" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(220, 38, 38, 0.3), rgba(0, 0, 0, 0.5))",
              mixBlendMode: "multiply",
              pointerEvents: "none",
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
          />
        </div>

        {/* Badge 2 with red tint overlay */}
        <div
          style={{
            position: "relative",
            width: "110px",
            height: "120px",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <iframe
            width="120"
            height="120"
            src="https://clutch.co/share/badges/2343082/81323?utm_source=clutch_top_company_badge&utm_medium=image_embed"
            title="Top Clutch Api Development Company Ukraine 2026"
            style={{ border: 0, display: "block" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(220, 38, 38, 0.3), rgba(0, 0, 0, 0.5))",
              mixBlendMode: "multiply",
              pointerEvents: "none",
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};
