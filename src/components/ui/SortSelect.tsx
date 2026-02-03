"use client";

import { SortOrder } from "@/utils/categoryUtils";

interface SortSelectProps {
  value: SortOrder;
  onChange: (value: SortOrder) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOrder)}
      className="px-4 py-2.5 bg-gradient-to-r from-surface-primary/80 to-surface-primary/30 border border-border-primary/80 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-focus cursor-pointer transition-all shadow-sm hover:shadow-md"
    >
      <option value="highest">Highest First</option>
      <option value="lowest">Lowest First</option>
      <option value="name">Alphabetical</option>
    </select>
  );
}
