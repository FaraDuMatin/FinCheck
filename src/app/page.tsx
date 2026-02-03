"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { handleUpload, Transaction } from "@/lib/handleUpload";
import { CategorySummary } from "@/types/transaction";
import { 
  groupByCategory, 
  sortCategories, 
  filterCategories, 
  SortOrder 
} from "@/utils/categoryUtils";
import { FileUpload } from "@/components/ui/FileUpload";
import { SearchInput } from "@/components/ui/SearchInput";
import { SortSelect } from "@/components/ui/SortSelect";
import { SummaryStats } from "@/components/SummaryStats";
import { CategoryList } from "@/components/CategoryList";
import { TransactionModal } from "@/components/TransactionModal";
import { EmptyState } from "@/components/EmptyState";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("highest");
  const [selectedCategory, setSelectedCategory] = useState<CategorySummary | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("transactions");
    if (saved) {
      setTransactions(JSON.parse(saved));
    }
  }, []);

  // Compute categories with search and sort
  const categories = useMemo(() => {
    const grouped = groupByCategory(transactions);
    const filtered = filterCategories(grouped, search);
    return sortCategories(filtered, sortOrder);
  }, [transactions, search, sortOrder]);

  // Compute totals
  const totals = useMemo(() => {
    let expenses = 0;
    let income = 0;
    for (const t of transactions) {
      if (t.lost) expenses += t.lost;
      if (t.gained) income += t.gained;
    }
    return { expenses, income };
  }, [transactions]);

  // Handle file upload
  const onFileSelect = async (file: File) => {
    await handleUpload(file, setTransactions, setStatus, setLoading);
  };

  // Handle manual category change
  const handleCategoryChange = (description: string, newCategory: string) => {
    setTransactions((prev) => {
      const updated = prev.map((t) =>
        t.description === description ? { ...t, category: newCategory } : t
      );
      // Save to localStorage
      localStorage.setItem("transactions", JSON.stringify(updated));
      // Update category cache
      import("@/lib/categoryCache").then(({ storeCategories }) => {
        storeCategories([{ description, category: newCategory }]);
      });
      return updated;
    });
    // Close modal to refresh the view
    setSelectedCategory(null);
  };

  const triggerUpload = () => fileInputRef.current?.click();

  const hasData = transactions.length > 0;

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-background/90 via-surface-secondary/90 to-background/90 backdrop-blur-lg border-b border-border-primary/80 shadow-lg">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-text-primary">Finance Tracker</h1>
            <FileUpload onFileSelect={onFileSelect} loading={loading} />
          </div>
          
          {/* Status Message */}
          {status && (
            <p className="mt-2 text-sm text-text-secondary">{status}</p>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {!hasData ? (
          <EmptyState onUpload={triggerUpload} />
        ) : (
          <div className="space-y-6">
            {/* Summary Stats */}
            <SummaryStats
              totalExpenses={totals.expenses}
              totalIncome={totals.income}
            />

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <SearchInput
                  value={search}
                  onChange={setSearch}
                  placeholder="Search categories..."
                />
              </div>
              <SortSelect value={sortOrder} onChange={setSortOrder} />
            </div>

            {/* Category List */}
            <CategoryList
              categories={categories}
              onCategoryClick={setSelectedCategory}
            />
          </div>
        )}
      </main>

      {/* Transaction Detail Modal */}
      <TransactionModal
        category={selectedCategory}
        onClose={() => setSelectedCategory(null)}
        onCategoryChange={handleCategoryChange}
      />

      {/* Hidden file input for EmptyState */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileSelect(file);
        }}
      />
    </div>
  );
}
