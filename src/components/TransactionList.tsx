"use client";

import { useState } from "react";
import { Transaction } from "@/types/transaction";
import { formatCurrency } from "@/utils/categoryUtils";
import { CategoryEditSelect } from "./ui/CategoryEditSelect";

interface TransactionListProps {
  transactions: Transaction[];
  onCategoryChange?: (index: number, newCategory: string) => void;
}

export function TransactionList({ transactions, onCategoryChange }: TransactionListProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleSave = (index: number, newCategory: string) => {
    onCategoryChange?.(index, newCategory);
    setEditingIndex(null);
  };

  return (
    <div className="space-y-2">
      {transactions.map((t, i) => (
        <div
          key={i}
          className="p-3 bg-gradient-to-r from-surface-primary/60 to-surface-secondary/60 rounded-lg border border-border-primary/70 shadow-sm hover:shadow-md hover:border-border-secondary transition-all"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-text-primary font-medium truncate">{t.description}</p>
              <p className="text-sm text-text-secondary mt-0.5">{t.date}</p>
              
              {editingIndex === i ? (
                <CategoryEditSelect
                  currentCategory={t.category || "Others"}
                  onSave={(newCat) => handleSave(i, newCat)}
                  onCancel={() => setEditingIndex(null)}
                />
              ) : (
                <div className="flex items-center gap-2 mt-1">
                  {/* <span className="text-xs text-blue-400">{t.category || "Uncategorized"}</span> */}
                  {onCategoryChange && (
                    <button
                      onClick={() => setEditingIndex(i)}
                      className="text-xs text-blue-500 hover:text-white transition-colors"
                    >
                      Edit
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="text-right shrink-0">
              {t.lost ? (
                <span className="text-danger font-medium">
                  -{formatCurrency(t.lost)}
                </span>
              ) : t.gained ? (
                <span className="text-success font-medium">
                  +{formatCurrency(t.gained)}
                </span>
              ) : (
                <span className="text-text-muted">-</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
