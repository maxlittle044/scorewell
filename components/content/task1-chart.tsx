import type { ChartData } from "@/lib/content/writing";

/**
 * Renders the visual a Task 1 Academic prompt refers to ("the chart below shows...").
 * Plain server-rendered SVG/table from stored numbers — no image asset, no client JS,
 * and the same data the AI checker grades task achievement against.
 */

const SERIES_COLORS = [
  "var(--color-brand-600)",
  "var(--color-pop-700)",
  "var(--color-accent-500)",
  "var(--color-brand-300)",
];

const WIDTH = 640;
const HEIGHT = 360;
const MARGIN = { top: 24, right: 24, bottom: 48, left: 56 };
const PLOT_W = WIDTH - MARGIN.left - MARGIN.right;
const PLOT_H = HEIGHT - MARGIN.top - MARGIN.bottom;

function niceMax(max: number): number {
  if (max <= 0) return 1;
  const magnitude = 10 ** Math.floor(Math.log10(max));
  return Math.ceil(max / (magnitude / 2)) * (magnitude / 2);
}

function AxisLabel({
  x,
  y,
  children,
  anchor = "middle",
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "middle" | "start" | "end";
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} className="fill-ink-muted" style={{ fontSize: 11 }}>
      {children}
    </text>
  );
}

function BarChart({ data }: { data: Extract<ChartData, { type: "bar" }> }) {
  const max = niceMax(Math.max(...data.series.flatMap((s) => s.values)));
  const groupWidth = PLOT_W / data.categories.length;
  const barGap = 6;
  const barWidth = (groupWidth - barGap * (data.series.length + 1)) / data.series.length;
  const ticks = 5;

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" role="img" aria-label="Bar chart">
      <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
        {Array.from({ length: ticks + 1 }, (_, i) => {
          const value = (max / ticks) * i;
          const y = PLOT_H - (value / max) * PLOT_H;
          return (
            <g key={i}>
              <line x1={0} x2={PLOT_W} y1={y} y2={y} stroke="var(--color-line)" strokeWidth={1} />
              <AxisLabel x={-8} y={y + 4} anchor="end">
                {Math.round(value).toString()}
              </AxisLabel>
            </g>
          );
        })}
        {data.categories.map((category, ci) => (
          <g key={category} transform={`translate(${ci * groupWidth},0)`}>
            {data.series.map((s, si) => {
              const value = s.values[ci] ?? 0;
              const h = (value / max) * PLOT_H;
              const x = barGap + si * (barWidth + barGap);
              return (
                <rect
                  key={s.label}
                  x={x}
                  y={PLOT_H - h}
                  width={barWidth}
                  height={h}
                  fill={SERIES_COLORS[si % SERIES_COLORS.length]}
                  rx={2}
                />
              );
            })}
            <AxisLabel x={groupWidth / 2} y={PLOT_H + 18}>
              {category}
            </AxisLabel>
          </g>
        ))}
      </g>
      {data.unit && <AxisLabel x={MARGIN.left} y={16}>{data.unit}</AxisLabel>}
    </svg>
  );
}

function LineChart({ data }: { data: Extract<ChartData, { type: "line" }> }) {
  const max = niceMax(Math.max(...data.series.flatMap((s) => s.values)));
  const stepX = data.xLabels.length > 1 ? PLOT_W / (data.xLabels.length - 1) : 0;
  const ticks = 5;

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" role="img" aria-label="Line graph">
      <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
        {Array.from({ length: ticks + 1 }, (_, i) => {
          const value = (max / ticks) * i;
          const y = PLOT_H - (value / max) * PLOT_H;
          return (
            <g key={i}>
              <line x1={0} x2={PLOT_W} y1={y} y2={y} stroke="var(--color-line)" strokeWidth={1} />
              <AxisLabel x={-8} y={y + 4} anchor="end">
                {Math.round(value).toString()}
              </AxisLabel>
            </g>
          );
        })}
        {data.xLabels.map((label, i) => (
          <AxisLabel key={label} x={i * stepX} y={PLOT_H + 18}>
            {label}
          </AxisLabel>
        ))}
        {data.series.map((s, si) => {
          const points = s.values.map((v, i) => `${i * stepX},${PLOT_H - (v / max) * PLOT_H}`).join(" ");
          return (
            <g key={s.label}>
              <polyline
                points={points}
                fill="none"
                stroke={SERIES_COLORS[si % SERIES_COLORS.length]}
                strokeWidth={2.5}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {s.values.map((v, i) => (
                <circle
                  key={i}
                  cx={i * stepX}
                  cy={PLOT_H - (v / max) * PLOT_H}
                  r={3.5}
                  fill={SERIES_COLORS[si % SERIES_COLORS.length]}
                />
              ))}
            </g>
          );
        })}
      </g>
      {data.unit && <AxisLabel x={MARGIN.left} y={16}>{data.unit}</AxisLabel>}
    </svg>
  );
}

function PieChart({ data }: { data: Extract<ChartData, { type: "pie" }> }) {
  const total = data.slices.reduce((sum, s) => sum + s.value, 0);
  const cx = HEIGHT / 2;
  const cy = HEIGHT / 2;
  const r = HEIGHT / 2 - 20;
  let angle = -Math.PI / 2;

  const arcs = data.slices.map((slice, i) => {
    const fraction = total === 0 ? 0 : slice.value / total;
    const startAngle = angle;
    const endAngle = angle + fraction * Math.PI * 2;
    angle = endAngle;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    return { path, color: SERIES_COLORS[i % SERIES_COLORS.length], label: slice.label, value: slice.value, fraction };
  });

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center">
      <svg viewBox={`0 0 ${HEIGHT} ${HEIGHT}`} className="w-full max-w-64" role="img" aria-label="Pie chart">
        {arcs.map((arc) => (
          <path key={arc.label} d={arc.path} fill={arc.color} stroke="var(--surface)" strokeWidth={1.5} />
        ))}
      </svg>
      <ul className="flex flex-col gap-1.5 text-sm text-ink-body">
        {arcs.map((arc) => (
          <li key={arc.label} className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: arc.color }} />
            <span>
              {arc.label} — {Math.round(arc.fraction * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TableChart({ data }: { data: Extract<ChartData, { type: "table" }> }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-line-strong">
            <th className="px-3 py-2 text-left font-semibold text-ink"></th>
            {data.columns.map((col) => (
              <th key={col} className="px-3 py-2 text-right font-semibold text-ink">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row) => (
            <tr key={row.label} className="border-b border-line">
              <td className="px-3 py-2 font-medium text-ink-body">{row.label}</td>
              {row.values.map((v, i) => (
                <td key={i} className="px-3 py-2 text-right text-ink-body">
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Task1Chart({ data }: { data: ChartData }) {
  return (
    <div className="mb-6 rounded-xl border border-line bg-surface p-5">
      {data.type === "bar" && <BarChart data={data} />}
      {data.type === "line" && <LineChart data={data} />}
      {data.type === "pie" && <PieChart data={data} />}
      {data.type === "table" && <TableChart data={data} />}
    </div>
  );
}
