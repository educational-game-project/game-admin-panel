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
import { DateTime } from 'luxon';

import userData from '../../data/MOCK_USER.json';

interface UserMockProps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  dob: string;
}

function IndeterminateCheckbox({
  indeterminate,
  className = '',
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
      className={className + ' cursor-pointer'}
      {...rest}
    />
  );
}

function MyTable() {
  const [filter, setFilter] = useState('');
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const data = useMemo(() => userData, []);

  const columnHelper = createColumnHelper<UserMockProps>();
  // Make some columns!
  const defaultColumns = useMemo(
    () => [
      // Display Column
      columnHelper.display({
        id: 'actions',
        header: ({ table }) => (
          <>
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />{' '}
            <button
              {...{
                onClick: table.getToggleAllRowsExpandedHandler(),
              }}>
              {table.getIsAllRowsExpanded() ? '👇' : '👉'}
            </button>{' '}
            Check
          </>
        ),
        cell: ({ row, getValue }) => (
          <div
            style={{
              // Since rows are flattened by default,
              // we can use the row.depth property
              // and paddingLeft to visually indicate the depth
              // of the row
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
              {row.getCanExpand() ? (
                <button
                  {...{
                    onClick: row.getToggleExpandedHandler(),
                    style: { cursor: 'pointer' },
                  }}>
                  {row.getIsExpanded() ? '👇' : '👉'}
                </button>
              ) : (
                '🔵'
              )}{' '}
              {getValue()}
            </>
          </div>
        ),
      }),
      // Grouping Column
      columnHelper.group({
        id: 'name',
        header: () => <span>Name</span>,
        columns: [
          // Accessor Column
          columnHelper.accessor('first_name', {
            header: 'First Name',
            cell: (info) => info.getValue(),
          }),
          // Accessor Column
          columnHelper.accessor((row) => row.last_name, {
            id: 'last_name',
            cell: (info) => info.getValue(),
            header: () => <span>Last Name</span>,
          }),
        ],
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('gender', {
        header: 'Gender',
        cell: (props) => (
          <span
            className={`text-center ${
              props.getValue() === 'Male' ? 'text-red-500' : 'text-lime-500'
            }`}>{`ID ${props.row.original.id} - ${props.getValue()}`}</span>
        ),
      }),
      columnHelper.accessor('dob', {
        header: 'Date of Birth',
        cell: (info) =>
          DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),
      }),
      columnHelper.accessor((row) => `${row.first_name} ${row.last_name}`, {
        id: 'full_name',
        header: 'Full Name',
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
    getCoreRowModel: getCoreRowModel<UserMockProps>(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setFilter,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
  });

  return (
    <div className="">
      <h4 className="mb-4 font-semibold text-2xl">My Table</h4>
      <div className="w-full border border-gray-200 rounded-lg">
        <h4 className="mb-4 font-semibold text-lg px-5 mt-4">List Score</h4>
        <div className="flex space-x-3 mb-4 px-5">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1.5 rounded-md border border-gray-400"
            value={filter ?? ''}
            onChange={(e) => setFilter(String(e.target.value))}
          />
          <select
            className="px-3 py-1.5 rounded-md border border-gray-400"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option
                key={pageSize}
                value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
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
                        cell.column.id === 'gender' ? 'font-semibold' : ''
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
