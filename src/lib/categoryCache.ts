// Category dictionary stored in localStorage
// Key: description, Value: category

const CACHE_KEY = "categoryDictionary";

interface CategoryEntry {
  description: string;
  category: string;
}

// Get all cached categories
export function getCategoryDictionary(): CategoryEntry[] {
  const saved = localStorage.getItem(CACHE_KEY);
  return saved ? JSON.parse(saved) : [];
}

// Store new categories (no duplicates)
export function storeCategories(entries: CategoryEntry[]): void {
  const existing = getCategoryDictionary();
  const existingDescriptions = new Set(existing.map((e) => e.description));

  for (const entry of entries) {
    if (!existingDescriptions.has(entry.description)) {
      existing.push(entry);
      existingDescriptions.add(entry.description);
    }
  }

  localStorage.setItem(CACHE_KEY, JSON.stringify(existing));
}

// Check which descriptions already have cached categories
// Returns: { cached: descriptions with known categories, uncached: descriptions needing API call }
export function checkCategories(descriptions: string[]): {
  cached: Map<string, string>;
  uncached: string[];
} {
  const dictionary = getCategoryDictionary();
  const lookupMap = new Map(dictionary.map((e) => [e.description, e.category]));

  const cached = new Map<string, string>();
  const uncached: string[] = [];

  for (const desc of descriptions) {
    if (lookupMap.has(desc)) {
      cached.set(desc, lookupMap.get(desc)!);
    } else {
      uncached.push(desc);
    }
  }

  return { cached, uncached };
}
