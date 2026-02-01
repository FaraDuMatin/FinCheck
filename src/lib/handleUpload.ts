import { checkCategories, storeCategories } from "./categoryCache";
import { Transaction } from "@/types/transaction";

export type { Transaction };

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function handleUpload(
  file: File,
  setTransactions: (t: Transaction[]) => void,
  setStatus: (s: string) => void,
  setLoading: (l: boolean) => void
): Promise<void> {
  setLoading(true);
  setStatus("Uploading...");

  try {
    // 1. Call POST /upload
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Upload failed");
    }

    const transactions: Transaction[] = data.transactions;
    setTransactions(transactions);
    setStatus(`Uploaded ${data.count} transactions. Checking cache...`);

    // 2. Check which descriptions are already cached
    const descriptions = transactions.map((t) => t.description);
    const { cached, uncached } = checkCategories(descriptions);

    console.log(`Cached: ${cached.size}, Uncached: ${uncached.length}`);

    // 3. Apply cached categories
    for (const t of transactions) {
      if (cached.has(t.description)) {
        t.category = cached.get(t.description)!;
      }
    }

    // 4. Only call API for uncached descriptions
    if (uncached.length > 0) {
      setStatus(`Categorizing ${uncached.length} new transactions...`);

      const categorizeResponse = await fetch(`${API_URL}/categorize-batch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ descriptions: uncached }),
      });

      const categorizedData = await categorizeResponse.json();

      if (!categorizeResponse.ok) {
        throw new Error(categorizedData.detail || "Categorization failed");
      }

      // 5. Apply new categories to transactions
      const newCategories: { description: string; category: string }[] = categorizedData.categories;
      const newCategoryMap = new Map(newCategories.map((c) => [c.description, c.category]));

      for (const t of transactions) {
        if (newCategoryMap.has(t.description)) {
          t.category = newCategoryMap.get(t.description)!;
        }
      }

      // 6. Store new categories in cache
      storeCategories(newCategories);
    }

    // 7. Save transactions to localStorage
    localStorage.setItem("transactions", JSON.stringify(transactions));

    // 8. Update UI
    setTransactions([...transactions]);
    setStatus(`Done! ${transactions.length} transactions categorized and saved.`);

  } catch (error) {
    setStatus(`Error: ${error}`);
  } finally {
    setLoading(false);
  }
}
