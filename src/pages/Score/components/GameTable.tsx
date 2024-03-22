import { useMemo, useState } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type SortingState,
} from "@tanstack/react-table";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useGetScoreChartMutation } from "../../../services/scoreApi";
import ModalDisplay from "../../../components/ModalDisplay";
import { selectTheme } from "../../../features/themeSlice";
import { setAllowedToast } from "../../../features/toastSlice";
import { showErrorToast } from "../../../components/Toast";
import {
	CustomAxisTick,
	CustomLegend,
	CustomTooltip,
	RoundedBar,
} from "../../../components/Chart/ChartConfig";
import {
	ArrowDownIcon,
	ArrowLeftIcon,
	ArrowRightIcon,
	ArrowUpIcon,
	BarChart2Icon,
	ChevronDownIcon,
	SearchIcon,
} from "lucide-react";
import { BarsScaleFade } from "react-svg-spinners";
import { getColorLevel } from "../../../utilities/appUtils";
import { transformInteger } from "../../../utilities/numberUtils";

import type {
	GameTableProps,
	GameTableState,
	NormalizeScoreChartDataEntry,
	ScoreChartSuccessResponse,
} from "../../../types";

function GameTable({
	scores,
	isLoading,
	isLoadingUser,
	isLargeView,
	isError,
	fetchScore,
	studentId,
	userData,
}: GameTableProps) {
	const [filter, setFilter] = useState("");
	const [sorting, setSorting] = useState<SortingState>([]);
	const [isOpenChart, setIsOpenChart] = useState(false);
	const theme = useAppSelector(selectTheme);
	const axisColor = theme === "dark" ? "#6b7280" : "#9ca3af";

	const dispatch = useAppDispatch();
	const [
		getScoreChart,
		{ data: scoreCharts, isLoading: isLoadingChart, isSuccess: isSuccessChart },
	] = useGetScoreChartMutation();

	const headerClass: Record<string, string> = {
		checkboxs: "w-14 text-center",
		row_number: "w-12",
	};

	const games: GameTableState[] = useMemo(() => {
		if (scores?.data?.length) {
			return scores.data.map((item) => {
				const { _id, name } = item.game;
				return { id: _id, name };
			});
		}

		return [];
	}, [scores]);

	const columnHelper = createColumnHelper<GameTableState>();
	const defaultColumns = useMemo(
		() => [
			columnHelper.display({
				id: "row_number",
				header: "#",
				cell: (info) => info?.row?.index + 1,
			}),
			columnHelper.accessor("name", {
				header: "Nama Permainan",
				cell: (info) => info.getValue(),
			}),
			// action
			columnHelper.display({
				id: "action",
				header: "",
				cell: (info) => (
					<div className="flex space-x-5 px-2">
						<button
							className="relative group/tooltip_delete flex items-center px-2 py-0.75 rounded-md bg-lime-500/10"
							onClick={() => openModalChart(info.row.original.id)}
						>
							<BarChart2Icon
								size={16}
								className="text-lime-500 hover:text-lime-600 mr-1.5"
							/>
							<span className="text-lime-600">Analisis</span>
							<div className="absolute -top-0.75 left-1/2 -translate-x-1/2 -translate-y-full bg-gray-800 text-slate-100 dark:bg-gray-950 dark:text-slate-300 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 group-hover/tooltip_delete:opacity-100 transition-all-200 pointer-events-none">
								<p className="text-center">Tampilkan Chart</p>
							</div>
						</button>
					</div>
				),
			}),
		],
		[columnHelper]
	);

	const table = useReactTable({
		data: games,
		columns: defaultColumns,
		state: {
			globalFilter: filter,
			sorting,
		},
		enableRowSelection: true,
		getCoreRowModel: getCoreRowModel<GameTableState>(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onGlobalFilterChange: setFilter,
		onSortingChange: setSorting,
	});

	const fetchScoreChart = async (gameId: string) => {
		try {
			await getScoreChart({
				gameId,
				userId: studentId ?? "",
			}).unwrap();
		} catch (error) {
			dispatch(setAllowedToast());
			showErrorToast("Data analisis skor tidak ditemukan.");
		}
	};

	const closeModalChart = () => {
		setIsOpenChart(false);
	};
	const openModalChart = (gameId: string) => {
		setIsOpenChart(true);
		fetchScoreChart(gameId);
	};

	const normalizeScoreChart = (
		data: ScoreChartSuccessResponse["data"] | undefined
	) => {
		if (!data?.scores || !Array.isArray(data.scores)) {
			return [];
		}

		return data.scores.map((gameplay, index) => {
			const name = `Gameplay ${index + 1} (score)`;
			const transformedGameplay: NormalizeScoreChartDataEntry = {
				name,
				...gameplay.reduce((acc, { level, value }) => {
					acc[`lvl_${level}`] = transformInteger(value);
					return acc;
				}, {} as Record<string, number>),
			};

			return transformedGameplay;
		});
	};

	const dataCharts: NormalizeScoreChartDataEntry[] = useMemo(() => {
		return normalizeScoreChart(scoreCharts?.data) || [];
	}, [scoreCharts]);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const labelCharts: any[] = useMemo(() => {
		return [
			...new Set(
				dataCharts.flatMap(({ ...labels }) => {
					if (labels) {
						return Object.keys(labels).filter((label) => label !== "name");
					}
				})
			),
		];
	}, [dataCharts]);

	return (
		<>
			<div className="bg-white p-5 rounded-xl dark:bg-gray-800">
				<div className="mb-5">
					<h4 className="font-semibold text-2xl mb-1">Daftar Permainan</h4>
					<p className="text-gray-500">Tabel daftar permainan oleh pemain.</p>
				</div>
				<div className="">
					<div className="w-full border border-gray-200 rounded-lg overflow-hidden dark:border-gray-600">
						<div className="flex space-x-3 my-4 px-5 items-center justify-between">
							<div className="relative w-full">
								<input
									id="searchGame"
									type="text"
									placeholder="Cari data permainan..."
									className="w-3/4 pl-10 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-gray-300 dark:placeholder:text-gray-500"
									value={filter ?? ""}
									onChange={(e) => setFilter(String(e.target.value))}
								/>
								<div className="absolute left-0 top-0">
									<SearchIcon size={20} className="text-gray-500" />
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
											className="border-y border-gray-200 bg-indigo-50/50 dark:border-gray-600 dark:bg-gray-600"
										>
											{headerGroup.headers.map((header) => (
												<th
													key={header.id}
													className={`font-bold text-xs text-gray-500 tracking-wide px-3 py-3 text-left ${
														headerClass[header.id] ?? ""
													} dark:text-gray-300`}
												>
													{header.isPlaceholder ? null : (
														<div
															{...{
																className: header.column.getCanSort()
																	? "cursor-pointer select-none flex items-center"
																	: header.id === "checkboxs"
																	? "flex justify-center"
																	: "",
																onClick:
																	header.column.getToggleSortingHandler(),
															}}
														>
															{flexRender(
																header.column.columnDef.header,
																header.getContext()
															)}
															{{
																asc: <ArrowUpIcon size={16} className="ml-1" />,
																desc: (
																	<ArrowDownIcon size={16} className="ml-1" />
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
											length: games.length !== 0 ? games.length : 5,
										}).map((_, index) => (
											<tr
												className="animate-pulse-fast border-b border-gray-20 dark:border-gray-600"
												key={index}
											>
												<td className="px-3 py-3.5 text-center">
													<div className="skeleton-loader skeleton-sm w-4/5 mx-auto" />
												</td>
												<td className="px-3 py-3.5">
													<div className="skeleton-loader skeleton-sm w-full" />
												</td>
												<td className="px-3 py-3.5 w-18">
													<div className="skeleton-loader skeleton-sm w-full" />
												</td>
											</tr>
										))
									) : games.length === 0 || Object.keys(games).length === 0 ? (
										<tr>
											<td
												colSpan={3}
												className="text-center py-3 text-gray-500 dark:text-gray-400"
											>
												Tidak ada data permainan yang ditemukan.
												{isError && (
													<span
														aria-label="button"
														className="cursor-pointer text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
														onClick={fetchScore}
													>
														{" "}
														Coba lagi.
													</span>
												)}
											</td>
										</tr>
									) : (
										table.getRowModel().rows.map((row) => (
											<tr
												key={row.id}
												className="border-b border-gray-200 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600/40"
											>
												{row.getVisibleCells().map((cell) => (
													<td
														key={cell.id}
														className={`text-sm px-3 py-3 text-gray-500 dark:text-gray-400 ${
															cell.column.id === "score" ? "font-semibold" : ""
														} ${headerClass[cell.column.id] ?? ""}`}
													>
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
										}}
									>
										{[10, 20, 50, 100].map((pageSize) => (
											<option key={pageSize} value={pageSize}>
												{pageSize}
											</option>
										))}
									</select>
									<div className="absolute right-1.5 top-1.5 pointer-events-none">
										<label htmlFor="tableScore_paginate" className="block">
											<ChevronDownIcon size={20} className="text-gray-500" />
										</label>
									</div>
								</div>
								{/* total data */}
								<p className="text-gray-500 ml-3 dark:text-gray-400">
									dari {games.length ?? 0} data
								</p>
							</div>
							<div className="flex space-x-3">
								{isLargeView && (
									<button
										className="px-2.5 py-1 font-medium rounded-md border border-indigo-500 flex items-center bg-indigo-500 text-gray-50 transition hover:bg-indigo-600 hover:border-indigo-600 disabled:bg-indigo-300 disabled:border-indigo-300 disabled:cursor-not-allowed dark:bg-indigo-700 dark:border-indigo-700 dark:hover:bg-indigo-600 dark:hover:border-indigo-600 dark:disabled:bg-gray-700 dark:disabled:border-gray-700 dark:disabled:text-gray-500"
										onClick={() => table.setPageIndex(0)}
										disabled={!table.getCanPreviousPage()}
									>
										First
									</button>
								)}
								<button
									className="px-2.5 py-1 font-medium rounded-md border border-indigo-500 flex items-center bg-indigo-500 text-gray-50 transition hover:bg-indigo-600 hover:border-indigo-600 disabled:bg-indigo-300 disabled:border-indigo-300 disabled:cursor-not-allowed dark:bg-indigo-700 dark:border-indigo-700 dark:hover:bg-indigo-600 dark:hover:border-indigo-600 dark:disabled:bg-gray-700 dark:disabled:border-gray-700 dark:disabled:text-gray-500"
									onClick={() => table.previousPage()}
									disabled={!table.getCanPreviousPage()}
								>
									<ArrowLeftIcon
										size={16}
										className={isLargeView ? "mr-1" : ""}
									/>
									{isLargeView ? "Previous" : ""}
								</button>
								<button
									className="px-2.5 py-1 font-medium rounded-md border border-indigo-500 flex items-center bg-indigo-500 text-gray-50 transition hover:bg-indigo-600 hover:border-indigo-600 disabled:bg-indigo-300 disabled:border-indigo-300 disabled:cursor-not-allowed dark:bg-indigo-700 dark:border-indigo-700 dark:hover:bg-indigo-600 dark:hover:border-indigo-600 dark:disabled:bg-gray-700 dark:disabled:border-gray-700 dark:disabled:text-gray-500"
									onClick={() => table.nextPage()}
									disabled={!table.getCanNextPage()}
								>
									{isLargeView ? "Next" : ""}
									<ArrowRightIcon
										size={16}
										className={isLargeView ? "ml-1" : ""}
									/>
								</button>
								{isLargeView && (
									<button
										className="px-2.5 py-1 font-medium rounded-md border border-indigo-500 flex items-center bg-indigo-500 text-gray-50 transition hover:bg-indigo-600 hover:border-indigo-600 disabled:bg-indigo-300 disabled:border-indigo-300 disabled:cursor-not-allowed dark:bg-indigo-700 dark:border-indigo-700 dark:hover:bg-indigo-600 dark:hover:border-indigo-600 dark:disabled:bg-gray-700 dark:disabled:border-gray-700 dark:disabled:text-gray-500"
										onClick={() => table.setPageIndex(table.getPageCount() - 1)}
										disabled={!table.getCanNextPage()}
									>
										Last
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<ModalDisplay
				title="Analisis Skor"
				onCloseModal={closeModalChart}
				isOpen={isOpenChart}
			>
				<div className="score-game-chart">
					{isLoadingChart || isLoadingUser ? (
						<div className="">
							<div className="animate-pulse-fast skeleton-loader skeleton-sm w-2/3 mb-7" />
							<div className="w-full h-96 mb-1.5 flex items-center justify-center">
								<BarsScaleFade
									width="2rem"
									height="2rem"
									color="#6b7280"
									dur={0.5}
								/>
							</div>
						</div>
					) : null}
					{isSuccessChart && (
						<div className="">
							<p className="text-sm text-gray-500 dark:text-gray-400 mb-7">
								Grafik perolehan skor{" "}
								<span className="text-teal-600 dark:text-teal-500">
									{userData?.data?.name}
								</span>{" "}
								pada permainan{" "}
								<span className="text-teal-600 dark:text-teal-500">
									{scoreCharts?.data?.game?.name}
								</span>{" "}
								dalam beberapa waktu terakhir.
							</p>
							<div className="w-full h-96 mb-1.5">
								<ResponsiveContainer>
									<BarChart width={730} height={250} data={dataCharts}>
										<CartesianGrid strokeDasharray="3 3" stroke={axisColor} />
										<XAxis
											dataKey="name"
											axisLine={{ stroke: axisColor }}
											tick={<CustomAxisTick />}
										/>
										<YAxis
											fontSize={14}
											domain={[0, 100]}
											axisLine={{ stroke: axisColor }}
											tick={{ fill: axisColor }}
										/>
										<Tooltip content={<CustomTooltip />} />
										<Legend content={<CustomLegend />} />
										{labelCharts.map((label, index) => (
											<Bar
												key={label}
												dataKey={label}
												fill={getColorLevel(index + 1, labelCharts.length)}
												shape={<RoundedBar />}
											/>
										))}
									</BarChart>
								</ResponsiveContainer>
							</div>
						</div>
					)}
				</div>
			</ModalDisplay>
		</>
	);
}

export default GameTable;
