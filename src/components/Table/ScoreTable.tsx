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

import scoreData from '../../data/SCORE_DATA.json';
import { ScoreProps } from '../../interfaces/api';
import { ListFilterIcon, SearchIcon } from 'lucide-react';

function IndeterminateCheckbox({
  indeterminate,
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
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
      className="cursor-pointer forms-checkbox"
      {...rest}
    />
  );
}

function MyTable() {
  const [filter, setFilter] = useState('');
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const data = useMemo(() => scoreData, []);

  const columnHelper = createColumnHelper<ScoreProps>();
  const defaultColumns = useMemo(
    () => [
      columnHelper.display({
        id: 'actions',
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row, getValue }) => (
          <div
            style={{
              paddingLeft: `${row.depth * 2}rem`,
            }}>
            <>
              <IndeterminateCheckbox
                {...{
                  checked: row.getIsSelected(),
                  indeterminate: row.getIsSomeSelected(),
                  onChange: row.getToggleSelectedHandler(),
                }}
              />{' '}
              <button
                {...{
                  onClick: row.getToggleExpandedHandler(),
                  style: { cursor: 'pointer' },
                }}></button>
              {getValue()}
            </>
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

  return (
    <div className="">
      <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex space-x-3 my-4 px-5 items-center justify-between">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Cari berdasarkan nama atau skor..."
              className="w-3/4 pl-10 focus:outline-none focus:ring-0"
              value={filter ?? ''}
              onChange={(e) => setFilter(String(e.target.value))}
            />
            <div className="absolute left-0 top-0">
              <SearchIcon
                size={20}
                className="text-gray-500"
              />
            </div>
          </div>
          <div className="relative">
            <select
              className="bg-transparent focus:outline-none focus:ring-0 text-gray-600 cursor-pointer pl-7"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}>
              {[10, 20, 50, 100].map((pageSize) => (
                <option
                  key={pageSize}
                  value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
            <div className="absolute left-0 top-0">
              <ListFilterIcon
                size={20}
                className="text-gray-500"
              />
            </div>
          </div>
        </div>
        <div className="mb-3 pb-4 overflow-x-auto">
          <table className="w-full pb-4">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-y border-gray-200 bg-indigo-50/50">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="font-bold text-xs text-gray-500 tracking-wide px-5 py-3 text-left">
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
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
                  className="border-b border-gray-200 hover:bg-gray-100">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`whitespace-nowrap text-sm px-5 py-3 text-gray-500 ${
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-3 mb-4 px-5">
            <button
              className="px-3 py-1.5 rounded-md border border-gray-400"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}>
              First Page
            </button>
            <button
              className="px-3 py-1.5 rounded-md border border-gray-400"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              Previous Page
            </button>
            <button
              className="px-3 py-1.5 rounded-md border border-gray-400"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              Next Page
            </button>
            <button
              className="px-3 py-1.5 rounded-md border border-gray-400"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}>
              Last Page
            </button>
          </div>
          <p className="">
            <span>Page</span>{' '}
            <span>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </span>
          </p>
          <div>{table.getRowModel().rows.length} Rows</div>
        </div>
        <button
          className="border rounded p-2 mb-2"
          onClick={() => console.info('rowSelection', rowSelection)}>
          Log `rowSelection` state
        </button>
      </div>
    </div>
  );
}

export default MyTable;
