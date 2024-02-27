import { HTMLProps, useEffect, useMemo, useRef, useState } from 'react';
import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  SearchIcon,
  Trash2Icon,
} from 'lucide-react';

import scoreData from '../../../data/SCORE_DATA.json';

interface ScoreProps {
  id: string;
  name: string;
  score: number;
}

function IndeterminateCheckbox({
  isHeader,
  indeterminate,
  ...rest
}: {
  indeterminate?: boolean;
  isHeader?: boolean;
} & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={`cursor-pointer form-checkbox h-4 w-4 border-2 border-gray-400 rounded bg-gray-50 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-indigo-600/20 focus:border-indigo-500/50 focus:ring-offset-0 focus:ring-0 block checked:bg-indigo-500 dark:checked:bg-indigo-600 dark:checked:border-indigo-600 dark:checked:hover:bg-indigo-600 dark:checked:hover:border-indigo-600 ${
        isHeader
          ? 'dark:bg-gray-500 dark:border-gray-500'
          : 'dark:border-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 dark:hover:border-gray-500'
      }`}
      autoComplete="off"
      {...rest}
    />
  );
}

function ScoreTable() {
  const [filter, setFilter] = useState('');
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isLargeView, setIsLargeView] = useState<boolean>(
    window.innerWidth > 1024
  );
  const data = useMemo(() => scoreData, []);
  const headerClass: Record<string, string> = {
    checkboxs: 'w-14 text-center',
    row_number: 'w-12',
    name: '',
    score: '',
  };

  const columnHelper = createColumnHelper<ScoreProps>();
  const defaultColumns = useMemo(
    () => [
      columnHelper.display({
        id: 'checkboxs',
        header: ({ table }) => (
          <IndeterminateCheckbox
            isHeader={true}
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="flex justify-center">
            <IndeterminateCheckbox
              isHeader={false}
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      }),
      columnHelper.display({
        id: 'row_number',
        header: '#',
        cell: (info) => info.row.index + 1,
      }),
      columnHelper.accessor('name', {
        header: 'Nama Lengkap',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('score', {
        header: 'Skor',
        cell: (info) => info.getValue(),
      }),
    ],
    [columnHelper]
  );

  const table = useReactTable({
    data,
    columns: defaultColumns,
    state: {
      globalFilter: filter,
      rowSelection,
      sorting,
    },
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel<ScoreProps>(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setFilter,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
  });

  const handleResize = () => {
    setIsLargeView(window.innerWidth > 1024);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="">
      <div className="w-full border border-gray-200 rounded-lg overflow-hidden dark:border-gray-600">
        <div className="flex space-x-3 my-4 px-5 items-center justify-between">
          <div className="relative w-full">
            <input
              id="searchScore"
              type="text"
              placeholder="Cari berdasarkan nama atau skor..."
              className="w-3/4 pl-10 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-gray-300 dark:placeholder:text-gray-500"
              value={filter ?? ''}
              onChange={(e) => setFilter(String(e.target.value))}
              autoComplete="off"
            />
            <div className="absolute left-0 top-0">
              <SearchIcon
                size={20}
                className="text-gray-500"
              />
            </div>
          </div>
          <div className="">
            <p className="bg-indigo-400 rounded-md px-1.5 py-1 text-gray-50 text-3.25xs dark:bg-indigo-600 dark:text-gray-100">
              {table.getState().pagination.pageIndex + 1}/{table.getPageCount()}
            </p>
          </div>
        </div>
        <div className="pb-3 overflow-x-auto">
          <table className="w-full pb-4">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-y border-gray-200 bg-indigo-50/50 dark:border-gray-600 dark:bg-gray-600">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={`font-bold text-xs text-gray-500 tracking-wide px-3 py-3 text-left ${
                        headerClass[header.id] ?? ''
                      } dark:text-gray-300`}>
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none flex items-center'
                              : header.id === 'checkboxs'
                              ? 'flex justify-center'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: (
                              <ArrowUpIcon
                                size={16}
                                className="ml-1"
                              />
                            ),
                            desc: (
                              <ArrowDownIcon
                                size={16}
                                className="ml-1"
                              />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-200 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600/40">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`whitespace-nowrap text-sm px-3 py-3 text-gray-500 dark:text-gray-400 ${
                        cell.column.id === 'score' ? 'font-semibold' : ''
                      }`}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mb-3 px-5">
          <div className="flex items-center">
            <p className="text-gray-500 mr-3 dark:text-gray-400">Menampilkan</p>
            <div className="relative">
              <select
                id="tableScore_paginate"
                name="tableScore_paginate"
                className="bg-gray-50 border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-0 text-gray-600 cursor-pointer pr-7 appearance-none dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}>
                {[10, 20, 50, 100].map((pageSize) => (
                  <option
                    key={pageSize}
                    value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
              <div className="absolute right-1.5 top-1.5 pointer-events-none">
                <label
                  htmlFor="tableScore_paginate"
                  className="block">
                  <ChevronDownIcon
                    size={20}
                    className="text-gray-500"
                  />
                </label>
              </div>
            </div>
            {/* total data */}
            <p className="text-gray-500 ml-3 dark:text-gray-400">
              dari {data.length} data
            </p>
          </div>
          <div className="flex space-x-3">
            {isLargeView && (
              <button
                className="px-2.5 py-1 font-medium rounded-md border border-indigo-500 flex items-center bg-indigo-500 text-gray-50 transition hover:bg-indigo-600 hover:border-indigo-600 disabled:bg-indigo-300 disabled:border-indigo-300 disabled:cursor-not-allowed dark:bg-indigo-700 dark:border-indigo-700 dark:hover:bg-indigo-600 dark:hover:border-indigo-600 dark:disabled:bg-gray-700 dark:disabled:border-gray-700 dark:disabled:text-gray-500"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}>
                First
              </button>
            )}
            <button
              className="px-2.5 py-1 font-medium rounded-md border border-indigo-500 flex items-center bg-indigo-500 text-gray-50 transition hover:bg-indigo-600 hover:border-indigo-600 disabled:bg-indigo-300 disabled:border-indigo-300 disabled:cursor-not-allowed dark:bg-indigo-700 dark:border-indigo-700 dark:hover:bg-indigo-600 dark:hover:border-indigo-600 dark:disabled:bg-gray-700 dark:disabled:border-gray-700 dark:disabled:text-gray-500"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              <ArrowLeftIcon
                size={16}
                className={isLargeView ? 'mr-1' : ''}
              />
              {isLargeView ? 'Previous' : ''}
            </button>
            <button
              className="px-2.5 py-1 font-medium rounded-md border border-indigo-500 flex items-center bg-indigo-500 text-gray-50 transition hover:bg-indigo-600 hover:border-indigo-600 disabled:bg-indigo-300 disabled:border-indigo-300 disabled:cursor-not-allowed dark:bg-indigo-700 dark:border-indigo-700 dark:hover:bg-indigo-600 dark:hover:border-indigo-600 dark:disabled:bg-gray-700 dark:disabled:border-gray-700 dark:disabled:text-gray-500"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              {isLargeView ? 'Next' : ''}
              <ArrowRightIcon
                size={16}
                className={isLargeView ? 'ml-1' : ''}
              />
            </button>
            {isLargeView && (
              <button
                className="px-2.5 py-1 font-medium rounded-md border border-indigo-500 flex items-center bg-indigo-500 text-gray-50 transition hover:bg-indigo-600 hover:border-indigo-600 disabled:bg-indigo-300 disabled:border-indigo-300 disabled:cursor-not-allowed dark:bg-indigo-700 dark:border-indigo-700 dark:hover:bg-indigo-600 dark:hover:border-indigo-600 dark:disabled:bg-gray-700 dark:disabled:border-gray-700 dark:disabled:text-gray-500"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}>
                Last
              </button>
            )}
          </div>
        </div>
      </div>
      <div
        className={`fixed transform -translate-x-1/2 left-1/2 transition-all-200 bottom-12 ${
          Object.keys(rowSelection).length > 0
            ? 'z-50 opacity-100 scale-100'
            : '-z-10 opacity-0 scale-50'
        }`}>
        <div className="rounded-full px-12 py-4 shadow-lg bg-gray-900">
          <div className="flex items-center space-x-4">
            <p className="text-gray-100 dark:text-gray-300">
              {Object.keys(rowSelection).length} data terpilih
            </p>
            {/* log */}
            <button
              className="px-3 py-1 font-medium rounded-full border border-indigo-500 flex items-center bg-indigo-500 text-gray-50 dark:text-gray-100 transition disabled:opacity-30 disabled:cursor-not-allowed hover:border-indigo-600 hover:bg-indigo-600 dark:border-indigo-600 dark:bg-indigo-600 dark:hover:border-indigo-700 dark:hover:bg-indigo-700"
              onClick={() => console.log('rowSelection', rowSelection)}>
              Log
            </button>
            {/* hapus */}
            <button
              className="px-3 py-1 font-medium rounded-full border border-red-500 flex items-center bg-red-500 text-gray-50 dark:text-gray-100 transition hover:border-red-600 hover:bg-red-600 disabled:opacity-30 disabled:cursor-not-allowed dark:bg-red-600 dark:border-red-600 dark:hover:border-red-500 dark:hover:bg-red-500"
              onClick={() => {
                const selectedIds = Object.keys(rowSelection);
                const newData = data.filter(
                  (item) => !selectedIds.includes(item.id)
                );
                console.log('newData', newData);
              }}>
              <Trash2Icon
                size={16}
                className="mr-1"
              />
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScoreTable;
