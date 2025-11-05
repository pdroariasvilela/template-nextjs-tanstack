import { Table } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

interface TablePaginationProps<TData> {
  table: Table<TData>;
}

export function TablePagination<TData>({ table }: TablePaginationProps<TData>) {
  const buttonClass = cn(
    "flex h-8 w-8 items-center justify-center rounded-md border",
    "text-sm font-medium",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "hover:bg-gray-100 dark:hover:bg-gray-800",
    "dark:border-gray-700",
    "text-gray-700 dark:text-gray-300"
  );

  return (
    <div className="flex items-center justify-between gap-4 px-2 py-1">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Página{" "}
        <strong>
          {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </strong>
      </div>
      <div className="flex items-center gap-2">
        <button
          className={buttonClass}
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Primera página</span>
          <ChevronDoubleLeftIcon className="h-4 w-4" />
        </button>
        <button
          className={buttonClass}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Página anterior</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <button
          className={buttonClass}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Página siguiente</span>
          <ChevronRightIcon className="h-4 w-4" />
        </button>
        <button
          className={buttonClass}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Última página</span>
          <ChevronDoubleRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
