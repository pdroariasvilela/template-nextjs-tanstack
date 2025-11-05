import { cn } from "@/lib/utils";
import { Table, flexRender } from "@tanstack/react-table";

interface DataTableProps<TData> {
  table: Table<TData>;
  isLoading?: boolean;
}

export function DataTable<TData>({ table, isLoading }: DataTableProps<TData>) {
  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full text-sm">
        <thead className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-300"
                  style={{
                    width:
                      header.getSize() !== 150 ? header.getSize() : undefined,
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="divide-y dark:divide-gray-700">
          {isLoading ? (
            <tr>
              <td
                colSpan={table.getAllColumns().length}
                className="p-4 text-center text-gray-500"
              >
                Cargando...
              </td>
            </tr>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={cn(
                  "hover:bg-gray-50/50 dark:hover:bg-gray-800/50", // Clase base
                  {
                    "bg-blue-50 dark:bg-blue-900/50": row.getIsSelected(), // Clase condicional
                  }
                )}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={table.getAllColumns().length}
                className="p-4 text-center text-gray-500"
              >
                No se encontraron resultados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
