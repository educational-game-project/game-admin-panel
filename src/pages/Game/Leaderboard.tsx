import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table';
import { useAppDispatch } from '../../app/hooks';
import { useGetLeaderboardMutation } from '../../services/scoreApi';
import { setBreadcrumb } from '../../features/breadcrumbSlice';
import { setAllowedToast } from '../../features/toastSlice';
import Breadcrumb from '../../components/Breadcrumb';
import { showErrorToast } from '../../components/Toast';
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  SearchIcon,
} from 'lucide-react';

import type { LeaderboardResponse } from '../../types';

function Leaderboard() {
  const [filter, setFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isLargeView, setIsLargeView] = useState<boolean>(
    window.innerWidth > 1024
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { gameId } = useParams();
  const [getLeaderboard, { data: leaderboards, isError, isLoading }] =
    useGetLeaderboardMutation();
  const leaderboard = useMemo(() => leaderboards?.data ?? [], [leaderboards]);
  const headerClass: Record<string, string> = {
    checkboxs: 'w-14 text-center',
    row_number: 'w-12',
  };

  const fetchLeaderboard = async (id: string) => {
    try {
      await getLeaderboard({ gameId: id }).unwrap();
    } catch (error) {
      dispatch(setAllowedToast());
      showErrorToast('Data leaderboard tidak ditemukan');
      navigate('/game');
    }
  };

  const columnHelper = createColumnHelper<LeaderboardResponse>();
  const defaultColumns = useMemo(
    () => [
      columnHelper.display({
        id: 'row_number',
        header: '#',
        cell: (info) => info?.row?.index + 1,
      }),
      columnHelper.accessor('game.name', {
        header: 'Nama Permainan',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor((data) => data?.leaderboard[0]?.user?.name || '', {
        id: 'player_name',
        header: 'Nama Pemain',
        cell: (info) => info?.getValue() || '',
      }),
      columnHelper.accessor((data) => data?.leaderboard[0]?.value || '', {
        id: 'score',
        header: 'Skor',
        cell: (info) => info?.getValue() || '',
      }),
    ],
    [columnHelper]
  );

  const table = useReactTable({
    data: leaderboard,
    columns: defaultColumns,
    state: {
      globalFilter: filter,
      sorting,
    },
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel<LeaderboardResponse>(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setFilter,
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

  useEffect(() => {
    const newBreadcrumb = [
      {
        icon: 'game',
        label: 'Game',
        path: '/game',
      },
      {
        icon: 'leaderboard',
        label: 'Leaderboard',
        path: `/game/leaderboard/${gameId}`,
      },
    ];
    dispatch(setBreadcrumb(newBreadcrumb));
  }, [dispatch, gameId]);
  useEffect(() => {
    if (gameId) {
      fetchLeaderboard(gameId);
    }
  }, [gameId]);

  return (
    <div className="">
      <div className="mb-6">
        <Breadcrumb />
        <div className="flex items-center justify-between">
          <div className="">
            <h5 className="font-semibold text-3xl mb-1.5">Leaderboard</h5>
            <p className="text-gray-500">
              Lihat peringkat pemain game{' '}
              {isLoading ? '...' : leaderboard[0]?.game?.name} dengan skor
              tertinggi.
            </p>
          </div>
          <div className="flex justify-end">
            <Link
              type="button"
              className={`leading-normal inline-flex justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 transition ${
                isLoading
                  ? 'opacity-50 cursor-not-allowed bg-gray-200 dark:hover:!bg-gray-900'
                  : 'bg-gray-50 hover:bg-gray-100'
              } dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700`}
              to="/game">
              Kembali
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-white p-5 rounded-xl dark:bg-gray-800">
        <div className="">
          <div className="w-full border border-gray-200 rounded-lg overflow-hidden dark:border-gray-600">
            <div className="flex space-x-3 my-4 px-5 items-center justify-between">
              <div className="relative w-full">
                <input
                  id="searchLeaderboard"
                  type="text"
                  placeholder="Cari data leaderboard..."
                  className="w-3/4 pl-10 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-gray-300 dark:placeholder:text-gray-500"
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
              <div className="">
                <p className="bg-indigo-400 rounded-md px-1.5 py-1 text-gray-50 text-3.25xs dark:bg-indigo-600 dark:text-gray-100">
                  {table.getState().pagination.pageIndex + 1}/
                  {table.getPageCount()}
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
                                onClick:
                                  header.column.getToggleSortingHandler(),
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
                  {isLoading ? (
                    Array.from({
                      length: leaderboard.length !== 0 ? leaderboard.length : 5,
                    }).map((_, index) => (
                      <tr
                        className="animate-pulse-fast border-b border-gray-20 dark:border-gray-600"
                        key={index}>
                        <td className="px-3 py-3.5 text-center">
                          <div className="skeleton-loader skeleton-sm w-4/5 mx-auto" />
                        </td>
                        <td className="px-3 py-3.5">
                          <div className="skeleton-loader skeleton-sm w-full" />
                        </td>
                        <td className="px-3 py-3.5">
                          <div className="skeleton-loader skeleton-sm w-full" />
                        </td>
                        <td className="px-3 py-3.5">
                          <div className="skeleton-loader skeleton-sm w-full" />
                        </td>
                      </tr>
                    ))
                  ) : leaderboard.length === 0 ||
                    Object.keys(leaderboard).length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-3 text-gray-500 dark:text-gray-400">
                        Tidak ada data leaderboard yang ditemukan.
                        {isError && (
                          <span
                            aria-label="button"
                            className="cursor-pointer text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                            onClick={() => fetchLeaderboard(gameId ?? '')}>
                            {' '}
                            Coba lagi.
                          </span>
                        )}
                      </td>
                    </tr>
                  ) : (
                    table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className="border-b border-gray-200 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600/40">
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className={`text-sm px-3 py-3 text-gray-500 dark:text-gray-400 ${
                              cell.column.id === 'score' ? 'font-semibold' : ''
                            } ${headerClass[cell.column.id] ?? ''}`}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between mb-3 px-5">
              <div className="flex items-center">
                <p className="text-gray-500 mr-3 dark:text-gray-400">
                  Menampilkan
                </p>
                <div className="relative">
                  <select
                    id="tableLeaderboard_paginate"
                    name="tableLeaderboard_paginate"
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
                      htmlFor="tableLeaderboard_paginate"
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
                  dari {leaderboard.length ?? 0} data
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
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
