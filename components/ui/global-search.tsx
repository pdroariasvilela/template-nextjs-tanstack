import React from 'react';
import { cn } from '@/lib/utils';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface GlobalSearchProps {
  filter: string;
  setFilter: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function GlobalSearch({ 
  filter, 
  setFilter, 
  placeholder = "Buscar...", 
  className 
}: GlobalSearchProps) {
  
  return (
    <div className={cn("relative w-full max-w-sm", className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
      </div>

      <input
        type="text"
        value={filter ?? ''}
        onChange={e => setFilter(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "block w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-sm",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          "dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
        )}
      />
    </div>
  );
}