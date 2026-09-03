"use client";

import { useState } from "react";
import type { BandTrend, TrendPoint } from "@/lib/analytics";
import type { Skill } from "@/generated/prisma/enums";

/**
 * Band score over time, one line per skill (site-build-prompt.md section 6,
 * "average band score trend").
 *
 * Deliberately *not* a single averaged line. An IELTS overall band is the average of
 * four skills taken together; a line drawn through interleaved single-skill attempts
 * would look like an overall trend while measuring nothing of the sort. Each skill gets
 * its own series, and a gap in a line is a real gap in the record rather than an
 * interpolation.
 *
 * Categorical palette validated with the dataviz skill's checker against a white surface
 * (all checks pass). Its contrast warning obliges "relief" — hence the direct label on
 * every line end, which the four-series rule wants anyway.
 */

const SKILL_LABELS: Record<Skill, string> = {
  LISTENING: "Listening",
  READING: "Reading",
  WRITING: "Writing",
  SPEAKING: "Speaking",
};

/** Fixed hue per skill — colour follows the entity, never the rank or the render order. */
const SKILL_COLORS: Record<Skill, string> = {
  LISTENING: "#2a78d6",
  READING: "#f26522",
  WRITING: "#1ba69f",
  SPEAKING: "#eda100",
};

const WIDTH = 720;
const HEIGHT = 240;
const PAD = { top: 16, right: 96, bottom: 30, left: 34 };
const PLOT_W = WIDTH - PAD.left - PAD.right;
const PLOT_H = HEIGHT - PAD.top - PAD.bottom;

type Placed = { point: TrendPoint; x: number; y: number; skill: Skill };

function formatDate(at: number): string {
  return new Date(at).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function BandTrendChart({ trend }: { trend: BandTrend }) {
  const [hovered, setHovered] = useState<Placed | null>(null);

  const series = trend.bySkill.filter((entry) => entry.points.length > 0);
  const all = series.flatMap((entry) => entry.points);

  if (all.length === 0) {
    return (
      <p className="mt-5 text-sm text-ink-muted">
        No band scores recorded yet. Listening and Reading tests are marked automatically, and
        a writing or speaking answer checked by the AI is recorded too — a couple of either
        will start the trend.
      </p>
    );
  }

  // A padded whole-band window, so the line isn't pinned to the frame; clamped to the
  // 0–9 scale and never narrower than two bands, which would exaggerate small moves.
  const lowest = Math.min(...all.map((point) => point.band));
  const highest = Math.max(...all.map((point) => point.band));
  let yMin = Math.max(0, Math.floor(lowest) - 1);
  let yMax = Math.min(9, Math.ceil(highest) + 1);
  if (yMax - yMin < 2) {
    yMax = Math.min(9, yMin + 2);
    yMin = Math.max(0, yMax - 2);
  }

  const times = all.map((point) => point.at);
  const tMin = Math.min(...times);
  const tMax = Math.max(...times);
  const tSpan = tMax - tMin;

  // With a real span, position by time. Identical timestamps carry no span to divide by,
  // so those fall back to even spacing by chronological order rather than stacking into
  // one unreadable column.
  const order = [...new Set(times)].sort((a, b) => a - b);
  const xFor = (at: number) => {
    if (tSpan > 0) return PAD.left + ((at - tMin) / tSpan) * PLOT_W;
    if (order.length < 2) return PAD.left + PLOT_W / 2;
    return PAD.left + (order.indexOf(at) / (order.length - 1)) * PLOT_W;
  };
  const yFor = (band: number) => PAD.top + PLOT_H - ((band - yMin) / (yMax - yMin)) * PLOT_H;

  const ticks: number[] = [];
  for (let band = yMin; band <= yMax; band += 1) ticks.push(band);

  const placed: Placed[] = series.flatMap((entry) =>
    entry.points.map((point) => ({
      point,
      skill: entry.skill,
      x: xFor(point.at),
      y: yFor(point.band),
    })),
  );

  return (
    <div className="mt-5">
      <div className="relative">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="h-auto w-full"
          role="img"
          aria-label={`Band score over time by skill. ${series
            .map((entry) => `${SKILL_LABELS[entry.skill]} latest ${entry.latest}`)
            .join(". ")}.`}
        >
          {/* Recessive hairline grid, one step off the surface. */}
          {ticks.map((band) => (
            <g key={band}>
              <line
                x1={PAD.left}
                x2={PAD.left + PLOT_W}
                y1={yFor(band)}
                y2={yFor(band)}
                className="stroke-line"
                strokeWidth="1"
              />
              <text
                x={PAD.left - 8}
                y={yFor(band) + 4}
                textAnchor="end"
                className="fill-ink-muted"
                fontSize="11"
              >
                {band}
              </text>
            </g>
          ))}

          {series.map((entry) => {
            const points = entry.points.map((point) => ({
              x: xFor(point.at),
              y: yFor(point.band),
            }));
            const last = points[points.length - 1];

            return (
              <g key={entry.skill}>
                {points.length > 1 && (
                  <polyline
                    points={points.map((point) => `${point.x},${point.y}`).join(" ")}
                    fill="none"
                    stroke={SKILL_COLORS[entry.skill]}
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                )}

                {points.map((point, index) => (
                  <circle
                    key={index}
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill={SKILL_COLORS[entry.skill]}
                    className="stroke-surface"
                    strokeWidth="2"
                  />
                ))}

                {/* Direct label at the line end — identity without colour-matching, and
                    the relief the palette's contrast warning requires. */}
                <text
                  x={last.x + 10}
                  y={last.y + 4}
                  fontSize="11"
                  className="fill-ink-body"
                >
                  {SKILL_LABELS[entry.skill]} {entry.latest}
                </text>
              </g>
            );
          })}

          {/* Hit targets sit above the marks and are larger than them. */}
          {placed.map((item, index) => (
            <circle
              key={index}
              cx={item.x}
              cy={item.y}
              r="12"
              fill="transparent"
              onMouseEnter={() => setHovered(item)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}

          <text x={PAD.left} y={HEIGHT - 8} fontSize="11" className="fill-ink-muted">
            {formatDate(tMin)}
          </text>
          {/* Only when it differs — repeating one date at both ends reads as an error. */}
          {formatDate(tMax) !== formatDate(tMin) && (
            <text
              x={PAD.left + PLOT_W}
              y={HEIGHT - 8}
              textAnchor="end"
              fontSize="11"
              className="fill-ink-muted"
            >
              {formatDate(tMax)}
            </text>
          )}
        </svg>

        {hovered && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg bg-zinc-900 px-2.5 py-1.5 text-xs text-white shadow-lg"
            style={{
              left: `${(hovered.x / WIDTH) * 100}%`,
              top: `${(hovered.y / HEIGHT) * 100}%`,
            }}
          >
            <span className="font-semibold">
              {SKILL_LABELS[hovered.skill]} · band {hovered.point.band}
            </span>
            <span className="block text-zinc-300">
              {hovered.point.label} · {formatDate(hovered.point.at)}
            </span>
          </div>
        )}
      </div>

      {/* Legend: identity is never carried by colour alone. */}
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {series.map((entry) => (
          <li key={entry.skill} className="flex items-center gap-1.5 text-xs text-ink-body">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: SKILL_COLORS[entry.skill] }}
            />
            {SKILL_LABELS[entry.skill]}
            {entry.change !== null && (
              <span className={entry.change >= 0 ? "text-emerald-700" : "text-rose-700"}>
                {entry.change >= 0 ? "+" : ""}
                {entry.change}
              </span>
            )}
          </li>
        ))}
      </ul>

      {all.length < 2 && (
        <p className="mt-3 text-xs text-ink-muted">
          One result so far — the line appears once you have a second in the same skill.
        </p>
      )}
    </div>
  );
}
