import { Transaction, CategorySummary } from "@/types/transaction";

export type SortOrder = "highest" | "lowest" | "name";

export function groupByCategory(transactions: Transaction[]): CategorySummary[] {
  const map = new Map<string, CategorySummary>();

  for (const t of transactions) {
    const cat = t.category || "Uncategorized";
    const spent = t.lost ?? 0;

    if (!map.has(cat)) {
      map.set(cat, { category: cat, total: 0, count: 0, transactions: [] });
    }

    const summary = map.get(cat)!;
    summary.total += spent;
    summary.count += 1;
    summary.transactions.push(t);
  }

  return Array.from(map.values());
}

export function sortCategories(
  categories: CategorySummary[],
  order: SortOrder
): CategorySummary[] {
  const sorted = [...categories];

  switch (order) {
    case "highest":
      return sorted.sort((a, b) => b.total - a.total);
    case "lowest":
      return sorted.sort((a, b) => a.total - b.total);
    case "name":
      return sorted.sort((a, b) => a.category.localeCompare(b.category));
    default:
      return sorted;
  }
}

export function filterCategories(
  categories: CategorySummary[],
  search: string
): CategorySummary[] {
  if (!search.trim()) return categories;
  const lower = search.toLowerCase();
  return categories.filter((c) => c.category.toLowerCase().includes(lower));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(amount);
}
