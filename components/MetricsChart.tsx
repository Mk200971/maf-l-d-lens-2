'use client';

import { kpis } from '@/lib/dashboard-data';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export default function MetricsChart() {
  // Learning Hours by BU data
  const buData = Object.entries(kpis.learningHoursByBU).map(([bu, hours]) => ({
    name: bu,
    hours,
  }));

  // Completion metrics
  const completionData = [
    { name: 'Total Completions', value: kpis.totalCompletions },
    { name: 'Unique Learners', value: kpis.uniqueLearners },
  ];

  // Satisfaction metrics
  const satisfactionData = [
    {
      name: 'Average Satisfaction',
      value: (kpis.avgSatisfaction / 5) * 100,
      label: `${kpis.avgSatisfaction.toFixed(2)}/5`,
    },
    {
      name: 'Satisfaction Rate',
      value: kpis.satisfactionRatePct,
      label: `${kpis.satisfactionRatePct.toFixed(1)}%`,
    },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6">
      {/* Key Numbers */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-background rounded-lg p-3 border border-border">
          <p className="text-xs text-muted-foreground">Learning Hours</p>
          <p className="text-lg font-bold text-foreground">
            {(kpis.totalLearningHours / 1000).toFixed(1)}k
          </p>
        </div>
        <div className="bg-background rounded-lg p-3 border border-border">
          <p className="text-xs text-muted-foreground">Active Programs</p>
          <p className="text-lg font-bold text-foreground">
            {kpis.programsCount}
          </p>
        </div>
        <div className="bg-background rounded-lg p-3 border border-border">
          <p className="text-xs text-muted-foreground">Completion Rate</p>
          <p className="text-lg font-bold text-foreground">
            {kpis.completionRatePct.toFixed(1)}%
          </p>
        </div>
        <div className="bg-background rounded-lg p-3 border border-border">
          <p className="text-xs text-muted-foreground">Feedback Responses</p>
          <p className="text-lg font-bold text-foreground">
            {kpis.feedbackResponses}
          </p>
        </div>
      </div>

      {/* Learning Hours by BU */}
      <div className="bg-background rounded-lg p-4 border border-border">
        <h3 className="text-sm font-semibold mb-3">Learning Hours by BU</h3>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={buData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)' }} />
            <Bar dataKey="hours" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Satisfaction Metrics */}
      <div className="bg-background rounded-lg p-4 border border-border">
        <h3 className="text-sm font-semibold mb-3">Satisfaction Overview</h3>
        <div className="space-y-2">
          {satisfactionData.map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-muted-foreground">{item.name}</span>
                <span className="text-xs font-semibold">{item.label}</span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learners vs Completions */}
      <div className="bg-background rounded-lg p-4 border border-border">
        <h3 className="text-sm font-semibold mb-3">Reach vs Completions</h3>
        <ResponsiveContainer width="100%" height={150}>
          <PieChart>
            <Pie
              data={completionData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={65}
              paddingAngle={2}
              dataKey="value"
            >
              {completionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => value.toLocaleString()} />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-3 space-y-1">
          {completionData.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: COLORS[idx] }}
              />
              <span className="text-muted-foreground">{item.name}: </span>
              <span className="font-semibold">{item.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
