"use client";

import { CategorySummary } from "@/types/transaction";
import { Modal } from "./ui/Modal";
import { TransactionList } from "./TransactionList";
import { formatCurrency } from "@/utils/categoryUtils";

interface TransactionModalProps {
  category: CategorySummary | null;
  onClose: () => void;
  onCategoryChange?: (description: string, newCategory: string) => void;
}

export function TransactionModal({ category, onClose, onCategoryChange }: TransactionModalProps) {
  if (!category) return null;

  const handleCategoryChange = (index: number, newCategory: string) => {
    const transaction = category.transactions[index];
    if (transaction && onCategoryChange) {
      onCategoryChange(transaction.description, newCategory);
    }
  };

  return (
    <Modal
      isOpen={!!category}
      onClose={onClose}
      title={category.category}
    >
      {/* Summary Header */}
      <div className="mb-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Total Spent</span>
          <span className="text-xl font-bold text-red-400">
            {formatCurrency(category.total)}
          </span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-gray-400">Transactions</span>
          <span className="text-white font-medium">{category.count}</span>
        </div>
      </div>

      {/* Transactions */}
      <TransactionList 
        transactions={category.transactions}
        onCategoryChange={onCategoryChange ? handleCategoryChange : undefined}
      />
    </Modal>
  );
}
