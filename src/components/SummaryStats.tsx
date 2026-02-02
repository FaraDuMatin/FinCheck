"use client";

import { formatCurrency } from "@/utils/categoryUtils";

interface SummaryStatsProps {
  totalExpenses: number;
  totalIncome: number;
  categoryCount: number;
}

export function SummaryStats({ totalExpenses, totalIncome, categoryCount }: SummaryStatsProps) {
  const net = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StatCard label="Total Expenses" value={formatCurrency(totalExpenses)} variant="expense" />
      <StatCard label="Total Income" value={formatCurrency(totalIncome)} variant="income" />
      <StatCard label="Net" value={formatCurrency(net)} variant={net >= 0 ? "income" : "expense"} />
      <StatCard label="Categories" value={categoryCount.toString()} variant="neutral" />
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  variant: "income" | "expense" | "neutral";
}

function StatCard({ label, value, variant }: StatCardProps) {
  const colorClass = {
    income: "text-success",
    expense: "text-danger",
    neutral: "text-text-primary",
  }[variant];

  return (
    <div className="p-4 bg-surface-primary rounded-xl border border-border-primary">
      <p className="text-xs sm:text-sm text-text-primary mb-1">{label}</p>
      <p className={`text-lg sm:text-xl font-bold ${colorClass} truncate`}>{value}</p>
    </div>
  );
}
