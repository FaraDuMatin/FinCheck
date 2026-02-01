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
      className="px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all"
    >
      <option value="highest">Highest First</option>
      <option value="lowest">Lowest First</option>
      <option value="name">Alphabetical</option>
    </select>
  );
}
