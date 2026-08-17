"use client";

import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, Cell, Tooltip, Legend, XAxis, YAxis } from "recharts";
import type { ChartSpec } from "@/lib/chart-spec";

const COLORS = ["var(--brand-gold)", "var(--brand-burgundy)", "var(--brand-amber)"];

interface DynamicChartProps {
  spec: ChartSpec;
  /**
   * Compact mode: height 160, smaller typography, tighter padding.
   * Used by the floating mini chat. Default is the full 220 height for
   * the main /metrics-ai page.
   */
  compact?: boolean;
}

export function DynamicChart({ spec, compact = false }: DynamicChartProps) {
  if (!spec.data || spec.data.length === 0) {
    return (
      <div className={compact ? "rounded-xl bg-white/40 p-3 text-center" : "glass-panel rounded-2xl p-6 text-center"}>
        <p className={compact ? "text-[11px] text-muted-foreground" : "text-sm text-muted-foreground"}>
          No data for this slice
        </p>
      </div>
    );
  }

  const height = compact ? 160 : 220;
  const outerClass = compact
    ? "rounded-xl bg-white/40 p-2 backdrop-blur-sm"
    : "glass-panel rounded-2xl p-4 w-full";
  const titleClass = compact
    ? "mb-0.5 text-[11px] font-semibold text-foreground"
    : "mb-1 text-base font-semibold";
  const subtitleClass = compact
    ? "mb-1 text-[10px] text-muted-foreground"
    : "mb-3 text-xs text-muted-foreground";
  const noteClass = compact
    ? "mt-1 text-[10px] italic text-muted-foreground"
    : "mt-3 text-xs italic text-muted-foreground";

  // Compact axis typography is smaller so labels don't crowd the panel.
  const axisTickStyle = compact
    ? { fontSize: 9, fill: "var(--muted-foreground)" }
    : { fontSize: 11, fill: "var(--muted-foreground)" };

  const renderChart = () => {
    switch (spec.kind) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={spec.data} margin={compact ? { top: 4, right: 4, bottom: 4, left: -10 } : undefined}>
              <XAxis dataKey="label" tick={axisTickStyle} interval={0} angle={compact ? -25 : 0} textAnchor={compact ? "end" : "middle"} height={compact ? 40 : 30} />
              <YAxis tick={axisTickStyle} width={compact ? 32 : 40} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: compact ? 9 : 11 }} />
              <Bar dataKey="value" name={spec.measure}>
                {spec.data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={spec.data} margin={compact ? { top: 4, right: 4, bottom: 4, left: -10 } : undefined}>
              <XAxis dataKey="label" tick={axisTickStyle} interval={0} angle={compact ? -25 : 0} textAnchor={compact ? "end" : "middle"} height={compact ? 40 : 30} />
              <YAxis tick={axisTickStyle} width={compact ? 32 : 40} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: compact ? 9 : 11 }} />
              <Line type="monotone" dataKey="value" name={spec.measure} stroke={COLORS[0]} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: compact ? 9 : 11 }} />
              <Pie data={spec.data} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={compact ? 55 : 80}>
                {spec.data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        );
      case 'kpi':
        return (
          <div className="flex items-center justify-center" style={{ height }}>
            <div className="text-center">
              <p className={compact ? "text-3xl font-bold" : "text-4xl font-bold"} style={{ color: COLORS[0] }}>
                {spec.data[0]?.value.toLocaleString()}
              </p>
              <p className={compact ? "mt-1 text-[10px] text-muted-foreground" : "mt-2 text-sm text-muted-foreground"}>
                {spec.unit || spec.measure}
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={outerClass}>
      <h3 className={titleClass}>{spec.title}</h3>
      {spec.subtitle && <p className={subtitleClass}>{spec.subtitle}</p>}
      {renderChart()}
      {spec.note && <p className={noteClass}>{spec.note}</p>}
    </div>
  );
}
