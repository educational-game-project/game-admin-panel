import { SetStateAction, useMemo, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import scoreData from '../../data/SCORE_DATA.json';

interface ScoreDataProps {
  user_id: number;
  first_name: string;
  last_name: string;
  score: number;
}

interface SortingState {
  id: string;
  desc: boolean;
}

function BasicTable() {
  const [sorting, setSorting] = useState<SetStateAction<SortingState[]>>([]);
  const [filter, setFilter] = useState('');

  const dataScore = useMemo(() => scoreData, []);
  const columnsScore = [
    {
      header: 'User ID',
      accessorKey: 'user_id',
    },
    {
      header: 'Full Name',
      accessorFn: (row: ScoreDataProps) => `${row.first_name} ${row.last_name}`,
    },
    {
      header: 'Point',
      accessorKey: 'score',
      // if the data date string
      // cell: (info) => DateTime.fromISO(info.value).toFormat('yyyy-MM-dd'),
      // cell: (info) => DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),
    },
  ];
  const table = useReactTable({
    data: dataScore,
    columns: columnsScore,
    getCoreRowModel: getCoreRowModel<ScoreDataProps>(),
    getFilteredRowModel: getFilteredRowModel<ScoreDataProps>(),
    getPaginationRowModel: getPaginationRowModel<ScoreDataProps>(),
    getSortedRowModel: getSortedRowModel<ScoreDataProps>(),
    state: {
      sorting: sorting,
      globalFilter: filter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFilter,
  });

  return (
    <div className="">
      <h4 className="mb-4 font-semibold text-2xl">Basic Table</h4>
      <div className="w-full border border-gray-200 rounded-lg">
        <h4 className="mb-4 font-semibold text-lg px-5 mt-4">List Score</h4>
        <div className="flex space-x-3 mb-4 px-5">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1.5 rounded-md border border-gray-400"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <table className="w-full mb-3">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                className="border-y border-gray-200 bg-indigo-50/50"
                key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className="font-bold text-xs text-gray-500 tracking-wide px-5 py-3 text-left"
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {
                      { asc: '↑', desc: '↓' }[
                        header.column.getIsSorted() ?? null
                      ]
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                className="border-b border-gray-200 hover:bg-gray-100"
                key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    className={`text-sm px-5 py-3 ${
                      cell.column.id === 'score'
                        ? 'font-semibold text-gray-700'
                        : 'text-gray-500'
                    }`}
                    key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex space-x-3 mb-4 px-5">
          <button
            onClick={() => table.setPageIndex(0)}
            className="px-3 py-1.5 rounded-md border border-gray-400">
            First Page
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1.5 rounded-md border border-gray-400">
            Previous Page
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1.5 rounded-md border border-gray-400">
            Next Page
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            className="px-3 py-1.5 rounded-md border border-gray-400">
            Last Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default BasicTable;
