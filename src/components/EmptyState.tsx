"use client";

interface EmptyStateProps {
  onUpload: () => void;
}

export function EmptyState({ onUpload }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 mb-4 rounded-full bg-surface-primary border border-border-primary shadow-md flex items-center justify-center">
        <svg
          className="w-8 h-8 text-text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-text-primary mb-2">No transactions yet</h2>
      <p className="text-text-secondary text-center mb-6 max-w-sm">
        Upload your bank statement CSV to see your spending breakdown by category
      </p>
      <button
        onClick={onUpload}
        className="px-6 py-3 bg-primary hover:bg-primary-hover text-text-primary font-medium rounded-lg transition-all shadow-md hover:shadow-lg hover:scale-105"
      >
        Upload CSV
      </button>
    </div>
  );
}
