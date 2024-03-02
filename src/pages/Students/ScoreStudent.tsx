import { Fragment, useEffect, useMemo, useState } from 'react';
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
import { useGetScoreMutation } from '../../services/scoreApi';
import { useGetStudentByIdMutation } from '../../services/studentApi';
import { setAllowedToast } from '../../features/toastSlice';
import { setBreadcrumb } from '../../features/breadcrumbSlice';
import { showErrorToast } from '../../components/Toast';
import Breadcrumb from '../../components/Breadcrumb';
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  FilterIcon,
  Loader2Icon,
  SearchIcon,
} from 'lucide-react';
import { transformInteger } from '../../utilities/numberUtils';
import { longMonthDate } from '../../utilities/dateUtils';
import { transformStringPlus } from '../../utilities/stringUtils';

import type { NormalizedScore, Score, ScoreResponse } from '../../types';
import { Menu, Transition } from '@headlessui/react';

function ScoreStudent() {
  const [filter, setFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isLargeView, setIsLargeView] = useState<boolean>(
    window.innerWidth > 1024
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { studentId } = useParams();
  const [getScore, { data: scores, isSuccess, isError, isLoading }] =
    useGetScoreMutation();
  const [getStudentById, { data: student, isLoading: isLoadingGet }] =
    useGetStudentByIdMutation();
  const headerClass: Record<string, string> = {
    checkboxs: 'w-14 text-center',
    row_number: 'w-12',
  };

  const normalizeScores = (data: ScoreResponse[]): NormalizedScore[] => {
    return data.flatMap((item) => {
      const { scores, game } = item;
      return scores.map((score: Score) => ({
        level: score.level,
        value: score.value,
        createdAt: score.createdAt,
        gameId: game._id,
        gameName: game.name,
      }));
    });
  };
  const score = useMemo(() => {
    if (!scores || scores?.data.length === 0) {
      return [];
    }
    return normalizeScores(scores.data);
  }, [scores]);
  const listGame: string[] = useMemo(() => {
    if (!scores || scores?.data.length === 0) {
      return [];
    }
    const uniqueGameNames = new Set<string>();

    scores.data.forEach((item) => {
      uniqueGameNames.add(item.game.name);
    });

    return Array.from(uniqueGameNames);
  }, [scores]);

  const fetchScore = async (id: string) => {
    try {
      await getScore({ userId: id }).unwrap();
    } catch (error) {
      dispatch(setAllowedToast());
      showErrorToast('Data skor tidak ditemukan');
      navigate('/student');
    }
  };
  const fetchStudentById = async (id: string) => {
    try {
      await getStudentById({ id }).unwrap();
    } catch (error) {
      dispatch(setAllowedToast());
      showErrorToast('Data siswa tidak ditemukan');
      navigate('/student');
    }
  };

  const columnHelper = createColumnHelper<NormalizedScore>();
  const defaultColumns = useMemo(
    () => [
      columnHelper.display({
        id: 'row_number',
        header: '#',
        cell: (info) => info?.row?.index + 1,
      }),
      columnHelper.accessor('gameName', {
        header: 'Nama Permainan',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('level', {
        header: 'Level',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('value', {
        header: 'Skor',
        cell: (info) => transformInteger(info.getValue()),
      }),
      columnHelper.accessor('createdAt', {
        header: 'Tanggal',
        cell: (info) => longMonthDate(info.getValue()),
      }),
    ],
    [columnHelper]
  );

  const table = useReactTable({
    data: score,
    columns: defaultColumns,
    state: {
      globalFilter: filter,
      sorting,
    },
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel<NormalizedScore>(),
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
        icon: 'student',
        label: 'Student',
        path: '/student',
      },
      {
        icon: 'score',
        label: 'Score',
        path: `/student/score/${studentId}`,
      },
    ];
    dispatch(setBreadcrumb(newBreadcrumb));
  }, [dispatch, studentId]);
  useEffect(() => {
    if (studentId) {
      fetchScore(studentId);
      fetchStudentById(studentId);
    }
  }, [studentId]);

  return (
    <div>
      <div className="mb-5">
        <Breadcrumb />
        <div className="flex items-center justify-between">
          <div className="">
            <h5 className="font-semibold text-3xl mb-1.5 flex items-center">
              Skor
              {isLoading || isLoadingGet ? (
                <span className="translate-y-px">
                  <Loader2Icon
                    size={22}
                    className="ml-3 animate-spin-fast stroke-gray-900 dark:stroke-gray-300"
                  />
                </span>
              ) : (
                ''
              )}
            </h5>
            <p className="text-gray-500">
              Lihat riwayat skor pemain di setiap permainan.
            </p>
          </div>
          <div className="flex justify-end">
            <Link
              type="button"
              className={`leading-normal inline-flex justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 transition ${
                isLoading || isLoadingGet
                  ? 'opacity-50 cursor-not-allowed bg-gray-200 dark:hover:!bg-gray-900'
                  : 'bg-gray-50 hover:bg-gray-100'
              } dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700`}
              to="/student">
              Kembali
            </Link>
          </div>
        </div>
      </div>
      <div className="mb-5 flex">
        <div
          className={`bg-white p-5 rounded-xl dark:bg-gray-800 flex items-center ${
            isLoading || isLoadingGet ? 'animate-pulse-fast' : ''
          }`}>
          {isLoading || isLoadingGet ? (
            <>
              <div className="">
                <div className="skeleton-loader skeleton-sm !size-18 !rounded-full mr-3" />
              </div>
              <div className="">
                <div className="skeleton-loader skeleton-sm w-40 mb-3" />
                <div className="skeleton-loader skeleton-sm w-58 mb-2.5" />
                <div className="skeleton-loader skeleton-sm w-58" />
              </div>
            </>
          ) : (
            <>
              <figure className="mr-3 size-18 rounded-full block overflow-hidden">
                <img
                  src={
                    student?.data?.image?.fileLink ??
                    `https://ui-avatars.com/api/?name=${transformStringPlus(
                      student?.data?.name
                    )}&background=6d5Acd&color=fff`
                  }
                  alt={`${student?.data?.name} Profile`}
                  className="w-full h-full object-cover object-center block"
                />
              </figure>
              <div className="">
                <p className="font-semibold text-lg mb-0.5">
                  {student?.data?.name}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  📧 {student?.data?.email || '-'}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  💼 {student?.data?.school?.name || '-'}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="bg-white p-5 rounded-xl dark:bg-gray-800">
        <div className="">
          <div className="w-full border border-gray-200 rounded-lg overflow-hidden dark:border-gray-600">
            <div className="flex space-x-3 my-4 px-5 items-center justify-between">
              <div className="relative w-full">
                <input
                  id="searchScore"
                  type="text"
                  placeholder="Cari data skor..."
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
              <div className="flex items-center space-x-8">
                {/* filter */}
                <div className="">
                  <Menu
                    as="div"
                    className="relative inline-block text-right">
                    <div>
                      <Menu.Button className="group/filter inline-flex w-full items-center justify-center rounded-md px-2 py-1.5 font-medium text-3.25xs text-gray-600 bg-gray-100 hover:bg-indigo-100 hover:text-indigo-600 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 dark:bg-gray-700 dark:hover:bg-indigo-600 dark:text-gray-200 dark:hover:text-indigo-100">
                        <FilterIcon
                          className="mr-1.5 stroke-gray-600 group-hover/filter:stroke-indigo-600 transition dark:stroke-gray-200 dark:group-hover/filter:stroke-indigo-100"
                          aria-hidden="true"
                          size={17}
                        />
                        Filter
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95">
                      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="px-1 py-1 ">
                          {isLoading || isLoadingGet ? (
                            <Menu.Item>
                              <button className="flex w-full items-center rounded-md px-2 py-2 text-sm">
                                Loading...
                              </button>
                            </Menu.Item>
                          ) : null}
                          {isSuccess && listGame.length !== 0
                            ? listGame?.map((item, index) => (
                                <Menu.Item key={index}>
                                  {({ active }) => (
                                    <button
                                      className={`${
                                        active
                                          ? 'bg-violet-500 text-white'
                                          : 'text-gray-900'
                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                                      {active ? 'icon active' : 'icon inactive'}
                                      {item}
                                    </button>
                                  )}
                                </Menu.Item>
                              ))
                            : null}
                          {isSuccess && listGame.length === 0 ? (
                            <Menu.Item>
                              <button className="flex w-full items-center rounded-md px-2 py-2 text-sm">
                                Tidak ada data permainan.
                              </button>
                            </Menu.Item>
                          ) : null}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
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
                      length: score.length !== 0 ? score.length : 5,
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
                        <td className="px-3 py-3.5">
                          <div className="skeleton-loader skeleton-sm w-full" />
                        </td>
                      </tr>
                    ))
                  ) : score.length === 0 || Object.keys(score).length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-3 text-gray-500 dark:text-gray-400">
                        Tidak ada data skor yang ditemukan.
                        {isError && (
                          <span
                            aria-label="button"
                            className="cursor-pointer text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                            onClick={() => fetchScore(studentId ?? '')}>
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
                  dari {score.length ?? 0} data
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

export default ScoreStudent;
