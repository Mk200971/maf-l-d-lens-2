"use client";

import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts";
import type { ChartSpec } from "@/lib/chart-spec";

const COLORS = ["var(--brand-gold)", "var(--brand-burgundy)", "var(--brand-amber)"];

export function DynamicChart({ spec }: { spec: ChartSpec }) {
  if (!spec.data || spec.data.length === 0) {
    return (
      <div className="glass-panel rounded-2xl p-6 text-center">
        <p className="text-sm text-muted-foreground">No data for this slice</p>
      </div>
    );
  }

  const renderChart = () => {
    switch (spec.kind) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={spec.data}>
              <Tooltip />
              <Legend />
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
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={spec.data}>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" name={spec.measure} stroke={COLORS[0]} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie data={spec.data} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={80}>
                {spec.data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        );
      case 'kpi':
        return (
          <div className="flex items-center justify-center h-[220px]">
            <div className="text-center">
              <p className="text-4xl font-bold" style={{ color: COLORS[0] }}>
                {spec.data[0]?.value.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground mt-2">{spec.unit || spec.measure}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-4 w-full">
      <h3 className="text-base font-semibold mb-1">{spec.title}</h3>
      {spec.subtitle && <p className="text-xs text-muted-foreground mb-3">{spec.subtitle}</p>}
      {renderChart()}
      {spec.note && <p className="text-xs text-muted-foreground mt-3 italic">{spec.note}</p>}
    </div>
  );
}
