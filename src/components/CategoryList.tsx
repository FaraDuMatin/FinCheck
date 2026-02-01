"use client";

import { CategorySummary } from "@/types/transaction";
import { CategoryCard } from "./CategoryCard";

interface CategoryListProps {
  categories: CategorySummary[];
  onCategoryClick: (category: CategorySummary) => void;
}

export function CategoryList({ categories, onCategoryClick }: CategoryListProps) {
  if (categories.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <svg
          className="w-12 h-12 mx-auto mb-3 opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p>No categories found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {categories.map((cat) => (
        <CategoryCard
          key={cat.category}
          category={cat}
          onClick={() => onCategoryClick(cat)}
        />
      ))}
    </div>
  );
}
