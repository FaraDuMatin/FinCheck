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
      className="px-4 py-2.5 bg-surface-primary border border-border-primary rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-focus cursor-pointer transition-all"
    >
      <option value="highest">Highest First</option>
      <option value="lowest">Lowest First</option>
      <option value="name">Alphabetical</option>
    </select>
  );
}
