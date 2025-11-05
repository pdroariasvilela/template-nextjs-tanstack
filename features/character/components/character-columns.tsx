"use client";

import { createColumnHelper } from '@tanstack/react-table';
import { cn } from '@/lib/utils';

import { 
  CheckCircleIcon, 
  XCircleIcon, 
  QuestionMarkCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { ICharacter } from '../types/character.types';

const columnHelper = createColumnHelper<ICharacter>();

export const columns = [
  columnHelper.accessor('name', {
    header: 'Character',
    size: 250,
    cell: (info) => (
      <div className="flex items-center gap-3">
        <img
          src={info.row.original.image}
          alt={info.getValue()}
          className="h-10 w-10 rounded-full object-cover"
        />
        <span className="font-medium text-gray-900 dark:text-white">
          {info.getValue()}
        </span>
      </div>
    ),
  }),

  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => {
      const status = info.getValue();
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold',
            {
              'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': status === 'Alive',
              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200': status === 'Dead',
              'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200': status === 'unknown',
            }
          )}
        >
          {status === 'Alive' && <CheckCircleIcon className="h-3 w-3" />}
          {status === 'Dead' && <XCircleIcon className="h-3 w-3" />}
          {status === 'unknown' && <QuestionMarkCircleIcon className="h-3 w-3" />}
          {status}
        </span>
      );
    },
  }),
  
  columnHelper.accessor('species', {
    header: 'Species',
    cell: (info) => (
      <div className="flex flex-col">
        <span className="text-sm">{info.getValue()}</span>
        {info.row.original.type && (
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <SparklesIcon className='h-3 w-3 text-blue-400' />
            {info.row.original.type}
          </span>
        )}
      </div>
    ),
  }),

  columnHelper.accessor('origin.name', {
    header: 'Origin',
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor((row) => row.episode.length, {
    id: 'episodeCount',
    header: 'Episode Count',
    cell: (info) => (
      <span className="font-mono text-blue-600 dark:text-blue-400">
        {info.getValue()}
      </span>
    ),
  }),

  columnHelper.accessor('created', {
    header: 'Created On',
    cell: (info) => (
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {new Date(info.getValue()).toLocaleDateString()}
      </span>
    ),
  }),
];