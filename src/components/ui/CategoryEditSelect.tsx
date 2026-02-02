"use client";

import { useState } from "react";

interface CategoryEditSelectProps {
  currentCategory: string;
  onSave: (newCategory: string) => void;
  onCancel: () => void;
}

const CATEGORIES = [
  "Bank Fees", "Clothing", "Coffee/Café", "Donations", "Education", "Electronics", 
  "Entertainment/Gaming", "Fast Food", "Gas/Fuel", "Gifts", "Government Benefits", 
  "Groceries", "Gym/Fitness", "Healthcare/Pharmacy", "Insurance", "Internet/Phone",
  "Loan Payment", "Others", "Parking", "Personal Care", "Pet Expenses", "Public Transit",
  "Rent/Mortgage", "Restaurants", "Salary/Income", "Savings/Investment", "Subscriptions", 
  "Transfers", "Travel", "Utilities"
];

export function CategoryEditSelect({ currentCategory, onSave, onCancel }: CategoryEditSelectProps) {
  const [selected, setSelected] = useState(currentCategory);

  const handleSave = () => {
    if (selected !== currentCategory) {
      onSave(selected);
    } else {
      onCancel();
    }
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="flex-1 px-3 py-1.5 bg-surface-hover border border-border-secondary rounded text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-focus"
        autoFocus
      >
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button
        onClick={handleSave}
        className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-text-primary text-sm font-medium rounded transition-colors"
      >
        Save
      </button>
      <button
        onClick={onCancel}
        className="px-3 py-1.5 bg-surface-hover hover:bg-border-secondary text-text-primary text-sm font-medium rounded transition-colors"
      >
        Cancel
      </button>
    </div>
  );
}
