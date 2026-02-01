export interface Transaction {
  date: string;
  description: string;
  lost: number | null;
  gained: number | null;
  balance: number;
  category: string | null;
}

export interface CategorySummary {
  category: string;
  total: number;
  count: number;
  transactions: Transaction[];
}
