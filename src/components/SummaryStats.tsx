"use client";

import { formatCurrency } from "@/utils/categoryUtils";

interface SummaryStatsProps {
  totalExpenses: number;
  totalIncome: number;
}

export function SummaryStats({ totalExpenses, totalIncome}: SummaryStatsProps) {
  const net = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <StatCard label="Total Expenses" value={formatCurrency(totalExpenses)} variant="expense" />
      <StatCard label="Total Income" value={formatCurrency(totalIncome)} variant="income" />
      <StatCard label="Net" value={formatCurrency(net)} variant={net >= 0 ? "income" : "expense"} />
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  variant: "income" | "expense" | "neutral";
}

function StatCard({ label, value, variant }: StatCardProps) {
  const styles = {
    income: "text-success bg-gradient-to-br from-success/10 to-success/5 border-success/20 shadow-success/10",
    expense: "text-danger bg-gradient-to-br from-danger/10 to-danger/5 border-danger/20 shadow-danger/10",
    neutral: "text-text-primary bg-gradient-to-br from-surface-hover/40 to-surface-primary/40 border-border-secondary/50 shadow-border-primary/10",
  }[variant];

  return (
    <div className={`p-4 rounded-xl border shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 ${styles}`}>
      <p className="text-xs sm:text-sm text-text-secondary mb-1">{label}</p>
      <p className={`text-lg sm:text-xl font-bold truncate ${variant === "income" ? "text-success" : variant === "expense" ? "text-danger" : "text-text-primary"}`}>{value}</p>
    </div>
  );
}
