"use client";

import { useState } from "react";

interface CategoryEditSelectProps {
  currentCategory: string;
  onSave: (newCategory: string) => void;
  onCancel: () => void;
}

const CATEGORIES = [
  "Salary/Income", "Government Benefits", "Groceries", "Restaurants", "Fast Food", 
  "Coffee/Café", "Gas/Fuel", "Public Transit", "Parking", "Rent/Mortgage", 
  "Utilities", "Internet/Phone", "Healthcare/Pharmacy", "Insurance", "Clothing", 
  "Electronics", "Entertainment/Gaming", "Subscriptions", "Gym/Fitness", 
  "Personal Care", "Pet Expenses", "Education", "Travel", "Bank Fees", 
  "Loan Payment", "Savings/Investment", "Gifts", "Donations", "Transfers", "Others"
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
        className="flex-1 px-3 py-1.5 bg-gray-700 border border-gray-600 rounded text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors"
      >
        Save
      </button>
      <button
        onClick={onCancel}
        className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded transition-colors"
      >
        Cancel
      </button>
    </div>
  );
}
