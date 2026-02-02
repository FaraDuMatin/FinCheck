"use client";

import { useRef } from "react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  loading: boolean;
  accept?: string;
}

export function FileUpload({ onFileSelect, loading, accept = ".csv" }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
      <button
        onClick={handleClick}
        disabled={loading}
        className="flex items-center gap-2 px-5 py-2.5 bg-surface-primary hover:bg-surface-hover disabled:bg-disabled disabled:cursor-not-allowed text-text-primary font-medium rounded-lg transition-colors"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Processing...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" viewBox="0 0 140 140" aria-hidden="true">
              <path fillRule="evenodd" fill="currentColor" d="M10 90a10 10 0 0 1 10 10v15a5 5 0 0 0 5 5h90a5 5 0 0 0 5-5v-15a10 10 0 0 1 10-10 10 10 0 0 1 10 10v20c0 11-9 20-20 20H20c-11 0-20-9-20-20v-20a10 10 0 0 1 10-10zM70.5 1.3c2.6 0 5.2 1 7.2 3l41.7 41.6a10 10 0 1 1-14.1 14.2L79.9 34.7v61.6c0 5.4-4.3 9.8-9.7 9.8a9.8 9.8 0 0 1-9.8-9.8V35.4L35.7 60.1a10 10 0 0 1-14.1-14.2L63.3 4.2c2-2 4.6-3 7.2-3z" />
            </svg>
            Upload CSV
          </>
        )}
      </button>
    </div>
  );
}
