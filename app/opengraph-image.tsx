import { ImageResponse } from "next/og";
import { SITE_URL } from "@/lib/site/site-url";

/**
 * The image that appears whenever a ScoreWell link is shared — WhatsApp, Facebook, LinkedIn,
 * Slack. Until this existed the site had no `og:image` at all, so every shared link rendered
 * as a bare URL with no card, which is a quiet loss on a site that spreads by being passed
 * between students.
 *
 * Generated rather than a checked-in PNG: it is drawn from the same brand colours as the site,
 * so it cannot drift out of step with a palette change, and there is no binary to maintain.
 * Next builds it once and serves it as a static file, so it costs nothing per request.
 *
 * The *page's own* title is what varies per link — that comes from `og:title` in the metadata,
 * not from this image. One card plus a real title per page is what a preview needs; drawing a
 * separate image for each of 170 URLs would be a lot of machinery for the same result.
 *
 * Note this renders through Satori, not a browser: flexbox only, every element that has
 * children needs an explicit `display: flex`, and there is no `gap` inheritance to rely on.
 */

export const alt = "ScoreWell — free IELTS practice tests, sample answers and AI writing tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand tokens, kept in step with app/globals.css.
const NAVY = "#294563";
const NAVY_DEEP = "#101f36";
const TEAL = "#1ba69f";
const ORANGE = "#f26522";
const MUTED = "#b3d0e6";

/** The bare host, so the card shows wherever the site actually lives rather than a guess. */
function siteHost(): string {
  try {
    return new URL(SITE_URL).host;
  } catch {
    return "";
  }
}

export default function OpengraphImage() {
  const host = siteHost();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: `linear-gradient(135deg, ${NAVY_DEEP} 0%, ${NAVY} 100%)`,
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 68,
              height: 68,
              borderRadius: 20,
              background: `linear-gradient(135deg, ${TEAL}, ${ORANGE})`,
              fontSize: 38,
              fontWeight: 800,
              color: "#ffffff",
              marginRight: 20,
            }}
          >
            S
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: "#ffffff" }}>
            ScoreWell
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              width: 96,
              height: 8,
              borderRadius: 999,
              background: ORANGE,
              marginBottom: 28,
            }}
          />
          <div style={{ display: "flex", fontSize: 68, fontWeight: 800, color: "#ffffff", lineHeight: 1.12 }}>
            Prep smarter. Score well.
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 30, color: MUTED, lineHeight: 1.4 }}>
            Free IELTS practice tests, sample answers, and AI writing, speaking and grammar tools.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", fontSize: 24, color: "#7ba7cc" }}>
          <div
            style={{
              display: "flex",
              width: 10,
              height: 10,
              borderRadius: 999,
              background: TEAL,
              marginRight: 14,
            }}
          />
          <div style={{ display: "flex" }}>{host}</div>
        </div>
      </div>
    ),
    size,
  );
}
