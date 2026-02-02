"use client";

import { CategorySummary } from "@/types/transaction";
import { formatCurrency } from "@/utils/categoryUtils";

interface CategoryCardProps {
  category: CategorySummary;
  onClick: () => void;
}

export function CategoryCard({ category, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full p-4 bg-surface-primary hover:bg-surface-hover border border-border-primary hover:border-border-secondary rounded-xl transition-all text-left group"
    >
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="text-text-primary font-medium truncate">{category.category}</h3>
          <p className="text-sm text-text-secondary mt-0.5">
            {category.count} transaction{category.count !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-3 ml-4">
          <span className="text-lg font-semibold text-danger">
            {formatCurrency(category.total)}
          </span>
          <svg
            className="w-5 h-5 text-text-muted group-hover:text-text-primary transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
}
