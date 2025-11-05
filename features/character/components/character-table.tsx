"use client";

import React, { useState, useMemo, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  PaginationState,
  SortingState,
} from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';


import { columns } from './character-columns';
import { getAllCharactersQueryOptions } from '../api/queries/character.queries';
import { DataTable } from '@/components/ui/data-table';
import { TablePagination } from '@/components/ui/table-pagination';
import { GlobalSearch } from '@/components/ui/global-search';

export function CharacterTable() {
  
  const [sorting, setSorting] = useState<SortingState>([]);
  
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

  const [globalFilter, setGlobalFilter] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(globalFilter);
      setPagination(prev => ({ ...prev, pageIndex: 0 })); 
    }, 500);
    
    return () => clearTimeout(handler);
  }, [globalFilter]);


  const queryOptions = getAllCharactersQueryOptions({
    page: pagination.pageIndex,
    search: debouncedSearch,
  });

  const {
    data: apiResponse,
    isLoading,
    isError, 
  } = useQuery(queryOptions); 
  const tableData = useMemo(() => apiResponse?.results ?? [], [apiResponse]);
  const pageCount = useMemo(() => apiResponse?.info?.pages ?? -1, [apiResponse]);
  const tableColumns = useMemo(() => columns, []);

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true, 
    
    pageCount: pageCount,

    state: {
      sorting,
      pagination,
      globalFilter,
    },
    
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    
    getCoreRowModel: getCoreRowModel(),
  });

  if (isError) {
    return <div className="text-red-500">Error al cargar los personajes.</div>
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <GlobalSearch
        filter={globalFilter}
        setFilter={setGlobalFilter}
        placeholder="Buscar personaje..."
      />
      
      <DataTable 
        table={table}
        isLoading={isLoading} 
      />
      
      <TablePagination table={table} />
    </div>
  );
}