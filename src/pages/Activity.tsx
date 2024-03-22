import {
	type HTMLProps,
	useEffect,
	useRef,
	useState,
	useMemo,
	Fragment,
} from "react";
import { useDebounce } from "use-debounce";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
	type SortingState,
} from "@tanstack/react-table";
import { useAppDispatch } from "../app/hooks";
import { useDeleteLogMutation, useGetLogsMutation } from "../services/logApi";
import { setBreadcrumb } from "../features/breadcrumbSlice";
import Breadcrumb from "../components/Breadcrumb";
import HeaderContainer from "../components/HeaderContainer";
import {
	showErrorToast,
	showSuccessToast,
	showWarningToast,
} from "../components/Toast";
import AlertDelete from "../components/AlertDialog/AlertDelete";
import {
	ArrowDownIcon,
	ArrowLeftIcon,
	ArrowRightIcon,
	ArrowUpIcon,
	ChevronDownIcon,
	FilterIcon,
	Loader2Icon,
	SearchIcon,
	ActivitySquareIcon,
	Trash2Icon,
	XSquareIcon,
	CheckSquareIcon,
} from "lucide-react";
import { longMonthDate } from "../utilities/dateUtils";

import type { DataTableGetRequest, Log } from "../types";
import { Menu, Transition } from "@headlessui/react";

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
		if (typeof indeterminate === "boolean") {
			ref.current.indeterminate = !rest.checked && indeterminate;
		}
	}, [ref, indeterminate, rest.checked]);

	return (
		<input
			type="checkbox"
			ref={ref}
			className={`cursor-pointer form-checkbox h-4 w-4 border-2 border-gray-400 rounded bg-gray-50 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-indigo-600/20 focus:border-indigo-500/50 focus:ring-offset-0 focus:ring-0 block checked:bg-indigo-500 dark:checked:bg-indigo-600 dark:checked:border-indigo-600 dark:checked:hover:bg-indigo-600 dark:checked:hover:border-indigo-600 ${
				isHeader
					? "dark:bg-gray-500 dark:border-gray-500"
					: "dark:border-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 dark:hover:border-gray-500"
			}`}
			autoComplete="off"
			{...rest}
		/>
	);
}

function Activity() {
	const [status, setStatus] = useState<string>("all");
	const [search, setSearch] = useState("");
	const [limitPage, setLimitPage] = useState(10);
	const [querySearch] = useDebounce(search, 500);

	const [rowSelection, setRowSelection] = useState({});
	const [sorting, setSorting] = useState<SortingState>([]);

	const [isLargeView, setIsLargeView] = useState<boolean>(
		window.innerWidth > 1024
	);

	const dispatch = useAppDispatch();
	const [getLogs, { isLoading, isError, data: logs, isSuccess }] =
		useGetLogsMutation();
	const [deleteLog, { isLoading: isLoadingDelete }] = useDeleteLogMutation();
	const log = useMemo(() => logs?.data ?? [], [logs]);
	const logPages = logs?.page;
	const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
	const [deleteId, setDeleteId] = useState<string>("");
	const headerClass: Record<string, string> = {
		checkboxs: "w-14 text-center",
		row_number: "w-12",
	};

	const fetchLog = async (credentials: DataTableGetRequest) => {
		try {
			await getLogs(credentials).unwrap();
		} catch (error) {
			showErrorToast("Gagal mengambil data aktivitas");
		}
	};

	const openDeleteDialog = (id: string) => {
		setIsOpenDeleteDialog(true);
		setDeleteId(id);
	};
	const closeDeleteDialog = () => {
		setIsOpenDeleteDialog(false);
	};

	const handleDelete = async () => {
		try {
			const responseDelete = await deleteLog({ id: deleteId }).unwrap();
			if (responseDelete.success) {
				showSuccessToast("Berhasil menghapus data aktivitas");
				fetchLog({ search: querySearch, limit: limitPage });
			}
		} catch (error) {
			showErrorToast("Gagal menghapus data aktivitas");
		}
		setIsOpenDeleteDialog(false);
	};

	const handleSelectedDelete = async (logData: Log[]) => {
		const logId = logData[0]._id;
		if (logData.length === 1) {
			try {
				const responseDelete = await deleteLog({ id: logId }).unwrap();
				if (responseDelete.success) {
					showSuccessToast("Berhasil menghapus data aktivitas");
					fetchLog({ search: querySearch, limit: limitPage });
				}
			} catch (error) {
				showErrorToast("Gagal menghapus data aktivitas");
			}
		} else {
			showWarningToast("Maaf, fitur ini belum tersedia");
		}
		table.setRowSelection({});
	};

	const columnHelper = createColumnHelper<Log>();
	const defaultColumns = useMemo(
		() => [
			columnHelper.display({
				id: "checkboxs",
				header: ({ table }) => (
					<IndeterminateCheckbox
						isHeader
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
				id: "row_number",
				header: "#",
				cell: (info) => {
					if (logPages) {
						const orderedNumber =
							(logPages?.currentPage - 1) * logPages?.perPage +
							info?.row?.index +
							1;
						return orderedNumber;
					} else {
						return info.row.index + 1;
					}
				},
			}),
			columnHelper.accessor((data) => data?.actor?.name || "", {
				id: "actor",
				header: "Aktor",
				cell: (info) => info?.row?.original?.actor?.name ?? "-",
			}),
			columnHelper.accessor("target", {
				header: "Target",
				cell: (info) => <>{info.getValue() ?? "-"}</>,
			}),
			columnHelper.accessor("createdAt", {
				header: "Tanggal",
				cell: (info) => longMonthDate(info.getValue()),
			}),
			// action
			columnHelper.display({
				id: "action",
				header: "",
				cell: (info) => (
					<div className="flex space-x-5 px-2">
						<button
							className="relative group/tooltip_delete"
							onClick={() => openDeleteDialog(info.row.original._id)}
						>
							<Trash2Icon
								size={16}
								className="text-red-500 hover:text-red-600"
							/>
							<div className="absolute -top-0.75 left-1/2 -translate-x-1/2 -translate-y-full bg-gray-800 text-slate-100 dark:bg-gray-950 dark:text-slate-300 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 group-hover/tooltip_delete:opacity-100 transition-all-200 pointer-events-none">
								<p className="text-center">Hapus</p>
							</div>
						</button>
					</div>
				),
			}),
		],
		[columnHelper]
	);

	const table = useReactTable({
		data: log,
		columns: defaultColumns,
		state: {
			rowSelection,
			sorting,
		},
		enableRowSelection: true,
		getCoreRowModel: getCoreRowModel<Log>(),
		getSortedRowModel: getSortedRowModel(),
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
	});

	const handleResize = () => {
		setIsLargeView(window.innerWidth > 1024);
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		if (status === "all") {
			fetchLog({ search: querySearch, limit: limitPage });
		} else if (status === "success") {
			fetchLog({
				search: querySearch,
				limit: limitPage,
				status: true,
			});
		} else if (status === "fail") {
			fetchLog({
				search: querySearch,
				limit: limitPage,
				status: false,
			});
		}
	}, [querySearch, limitPage, status]);

	useEffect(() => {
		const newBreadcrumb = [
			{
				icon: "activity",
				label: "Activity",
				path: "/activity",
			},
		];
		dispatch(setBreadcrumb(newBreadcrumb));
	}, [dispatch]);

	return (
		<div className="">
			<div className="mb-6">
				<Breadcrumb />
				<HeaderContainer title="Activity" subtitle="Lihat aktivitas terbaru." />
			</div>
			<div className="bg-white p-5 rounded-xl dark:bg-gray-800">
				<div className="w-full border border-gray-200 rounded-lg overflow-hidden dark:border-gray-600">
					<div className="flex space-x-3 my-4 px-5 items-center justify-between">
						<div className="relative w-full">
							<input
								id="searchLog"
								type="text"
								placeholder="Cari berdasarkan nama..."
								className="w-3/4 pl-10 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-gray-300 dark:placeholder:text-gray-500"
								value={search ?? ""}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<div className="absolute left-0 top-0">
								<SearchIcon size={20} className="text-gray-500" />
							</div>
						</div>
						<div className="flex items-center space-x-6">
							{/* filter */}
							<div className="">
								<Menu as="div" className="relative inline-block text-right">
									<div>
										<Menu.Button className="relative group/filter inline-flex w-full items-center justify-center rounded-md px-2 py-1.5 font-medium text-3.25xs text-gray-600 bg-gray-100 hover:bg-indigo-100 hover:text-indigo-600 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 dark:bg-gray-700 dark:hover:bg-indigo-600 dark:text-gray-200 dark:hover:text-indigo-100">
											{status !== "all" && (
												<div className="absolute -right-0.75 w-2.5 h-2.5 -top-0.75">
													<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75 dark:bg-red-400" />
													<span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 -translate-y-1.6375 translate-x-0.125" />
												</div>
											)}
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
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700 z-10">
											<div className="px-1 py-1 space-y-1.5">
												{isLoading && (
													<Menu.Item>
														<button className="flex w-full items-center rounded-md px-2 py-2 text-sm">
															Loading...
														</button>
													</Menu.Item>
												)}
												{isSuccess && (
													<>
														<Menu.Item>
															{({ active }) => (
																<button
																	className={`${
																		active
																			? "bg-violet-500/30 text-violet-700 dark:text-violet-200"
																			: "text-gray-900 dark:text-gray-300"
																	} ${
																		status === "all"
																			? "!bg-violet-500 !text-white dark:!bg-violet-600"
																			: ""
																	} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
																	onClick={() => setStatus("all")}
																>
																	<ActivitySquareIcon
																		size={16}
																		className="mr-2"
																	/>
																	Semua Status
																</button>
															)}
														</Menu.Item>
														<Menu.Item>
															{({ active }) => (
																<button
																	className={`${
																		active
																			? "bg-violet-500/30 text-violet-700 dark:text-violet-200"
																			: "text-gray-900 dark:text-gray-300"
																	} ${
																		status === "success"
																			? "!bg-violet-500 !text-white dark:!bg-violet-600"
																			: ""
																	} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
																	onClick={() => setStatus("success")}
																>
																	<CheckSquareIcon size={16} className="mr-2" />
																	Sukses
																</button>
															)}
														</Menu.Item>
														<Menu.Item>
															{({ active }) => (
																<button
																	className={`${
																		active
																			? "bg-violet-500/30 text-violet-700 dark:text-violet-200"
																			: "text-gray-900 dark:text-gray-300"
																	} ${
																		status === "fail"
																			? "!bg-violet-500 !text-white dark:!bg-violet-600"
																			: ""
																	} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
																	onClick={() => setStatus("fail")}
																>
																	<XSquareIcon size={16} className="mr-2" />
																	Gagal
																</button>
															)}
														</Menu.Item>
													</>
												)}
												{isError && (
													<Menu.Item>
														<button className="flex w-full items-center rounded-md px-2 py-2 text-sm">
															Tidak ada data status.
														</button>
													</Menu.Item>
												)}
											</div>
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
							<p className="bg-indigo-400 rounded-md px-1.5 py-1 text-gray-50 text-3.25xs dark:bg-indigo-600 dark:text-gray-100">
								{logPages?.currentPage ?? 1}/{logPages?.totalPage ?? 1}
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
															onClick: header.column.getToggleSortingHandler(),
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
										length: log.length !== 0 ? log.length : 5,
									}).map((_, index) => (
										<tr
											className="animate-pulse-fast border-b border-gray-20 dark:border-gray-600"
											key={index}
										>
											<td className="px-3 py-3.5 text-center">
												<div className="skeleton-loader skeleton-sm !size-4.5 !rounded mx-auto" />
											</td>
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
											<td className="px-3 py-3.5 w-18">
												<div className="skeleton-loader skeleton-sm w-full" />
											</td>
										</tr>
									))
								) : log.length === 0 ? (
									<tr>
										<td
											colSpan={6}
											className="text-center py-3 text-gray-500 dark:text-gray-400"
										>
											Tidak ada data aktivitas yang ditemukan.
											{isError && (
												<span
													aria-label="button"
													className="cursor-pointer text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
													onClick={() =>
														fetchLog({
															search: querySearch,
															limit: limitPage,
														})
													}
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
														headerClass[cell.column.id] ?? ""
													}`}
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
									id="tableLog_paginate"
									name="tableLog_paginate"
									className="bg-gray-50 border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-0 text-gray-600 cursor-pointer pr-7 appearance-none dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
									value={limitPage}
									disabled={isLoading}
									onChange={(e) => setLimitPage(Number(e.target.value))}
								>
									{[10, 20, 50, 100].map((pageSize) => (
										<option key={pageSize} value={pageSize}>
											{pageSize}
										</option>
									))}
								</select>
								<div className="absolute right-1.5 top-1.5 pointer-events-none">
									<label htmlFor="tableLog_paginate" className="block">
										<ChevronDownIcon size={20} className="text-gray-500" />
									</label>
								</div>
							</div>
							{/* total data */}
							<p className="text-gray-500 ml-3 dark:text-gray-400">
								dari {logPages?.totalData ?? 0} data
							</p>
						</div>
						<div className="flex space-x-3">
							{isLargeView && (
								<button
									className="px-2.5 py-1 font-medium rounded-md border border-indigo-500 flex items-center bg-indigo-500 text-gray-50 transition hover:bg-indigo-600 hover:border-indigo-600 disabled:bg-indigo-300 disabled:border-indigo-300 disabled:cursor-not-allowed dark:bg-indigo-700 dark:border-indigo-700 dark:hover:bg-indigo-600 dark:hover:border-indigo-600 dark:disabled:bg-gray-700 dark:disabled:border-gray-700 dark:disabled:text-gray-500"
									onClick={() => {
										if (status === "all") {
											fetchLog({
												search: querySearch,
												page: 1,
												limit: limitPage,
											});
										} else if (status === "success") {
											fetchLog({
												search: querySearch,
												page: 1,
												limit: limitPage,
												status: true,
											});
										} else if (status === "fail") {
											fetchLog({
												search: querySearch,
												page: 1,
												limit: limitPage,
												status: false,
											});
										}
									}}
									disabled={Number(logPages?.currentPage) <= 1 || isLoading}
								>
									First
								</button>
							)}
							<button
								className="px-2.5 py-1 font-medium rounded-md border border-indigo-500 flex items-center bg-indigo-500 text-gray-50 transition hover:bg-indigo-600 hover:border-indigo-600 disabled:bg-indigo-300 disabled:border-indigo-300 disabled:cursor-not-allowed dark:bg-indigo-700 dark:border-indigo-700 dark:hover:bg-indigo-600 dark:hover:border-indigo-600 dark:disabled:bg-gray-700 dark:disabled:border-gray-700 dark:disabled:text-gray-500"
								onClick={() => {
									if (status === "all") {
										fetchLog({
											search: querySearch,
											page: Number(logPages?.currentPage) - 1,
											limit: limitPage,
										});
									} else if (status === "success") {
										fetchLog({
											search: querySearch,
											page: Number(logPages?.currentPage) - 1,
											limit: limitPage,
											status: true,
										});
									} else if (status === "fail") {
										fetchLog({
											search: querySearch,
											page: Number(logPages?.currentPage) - 1,
											limit: limitPage,
											status: false,
										});
									}
								}}
								disabled={Number(logPages?.currentPage) <= 1 || isLoading}
							>
								<ArrowLeftIcon
									size={16}
									className={isLargeView ? "mr-1" : ""}
								/>
								{isLargeView ? "Previous" : ""}
							</button>
							<button
								className="px-2.5 py-1 font-medium rounded-md border border-indigo-500 flex items-center bg-indigo-500 text-gray-50 transition hover:bg-indigo-600 hover:border-indigo-600 disabled:bg-indigo-300 disabled:border-indigo-300 disabled:cursor-not-allowed dark:bg-indigo-700 dark:border-indigo-700 dark:hover:bg-indigo-600 dark:hover:border-indigo-600 dark:disabled:bg-gray-700 dark:disabled:border-gray-700 dark:disabled:text-gray-500"
								onClick={() => {
									if (status === "all") {
										fetchLog({
											search: querySearch,
											page: Number(logPages?.currentPage) + 1,
											limit: limitPage,
										});
									} else if (status === "success") {
										fetchLog({
											search: querySearch,
											page: Number(logPages?.currentPage) + 1,
											limit: limitPage,
											status: true,
										});
									} else if (status === "fail") {
										fetchLog({
											search: querySearch,
											page: Number(logPages?.currentPage) + 1,
											limit: limitPage,
											status: false,
										});
									}
								}}
								disabled={
									Number(logPages?.currentPage) >=
										Number(logPages?.totalPage) || isLoading
								}
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
									onClick={() => {
										if (status === "all") {
											fetchLog({
												search: querySearch,
												page: Number(logPages?.totalPage),
												limit: limitPage,
											});
										} else if (status === "success") {
											fetchLog({
												search: querySearch,
												page: Number(logPages?.totalPage),
												limit: limitPage,
												status: true,
											});
										} else if (status === "fail") {
											fetchLog({
												search: querySearch,
												page: Number(logPages?.totalPage),
												limit: limitPage,
												status: false,
											});
										}
									}}
									disabled={
										Number(logPages?.currentPage) >=
											Number(logPages?.totalPage) || isLoading
									}
								>
									Last
								</button>
							)}
						</div>
					</div>
				</div>
				<div
					className={`fixed transform -translate-x-1/2 left-1/2 transition-all-200 bottom-12 ${
						Object.keys(rowSelection).length > 0
							? "z-50 opacity-100 scale-100"
							: "-z-10 opacity-0 scale-50"
					}`}
				>
					<div className="rounded-full px-12 py-4 shadow-lg bg-gray-900">
						<div className="flex items-center space-x-4">
							<p className="text-gray-100">
								{Object.keys(rowSelection).length} data terpilih
							</p>
							{/* log */}
							<button
								className="px-3 py-1 font-medium rounded-full border border-indigo-500 flex items-center bg-indigo-500 text-gray-50 disabled:bg-indigo-300 disabled:border-indigo-300 disabled:cursor-not-allowed"
								onClick={() => console.log("rowSelection", rowSelection)}
							>
								Log
							</button>
							{/* hapus */}
							<button
								className="px-3 py-1 font-medium rounded-full border border-red-500 flex items-center bg-red-500 text-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
								disabled={isLoadingDelete}
								onClick={() => {
									const selectedRow = table.getSelectedRowModel().flatRows;
									const selectedRowOriginal = selectedRow.map(
										(row) => row.original
									);
									handleSelectedDelete(selectedRowOriginal);
								}}
							>
								{isLoadingDelete ? (
									<>
										<span className="translate-y-px">
											<Loader2Icon
												size={18}
												className="mr-1.5 animate-spin-fast"
											/>
										</span>
										<span>Menghapus...</span>
									</>
								) : (
									<>
										<Trash2Icon size={16} className="mr-1" />
										Hapus
									</>
								)}
							</button>
						</div>
					</div>
				</div>

				{/* dialog delete */}
				<AlertDelete
					isOpen={isOpenDeleteDialog}
					message="aktivitas"
					isLoading={isLoadingDelete}
					onCancel={closeDeleteDialog}
					onConfirm={handleDelete}
				/>
			</div>
		</div>
	);
}

export default Activity;
