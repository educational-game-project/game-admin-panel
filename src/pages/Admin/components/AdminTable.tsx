import { useEffect, useMemo, useRef, useState, type HTMLProps } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
	type SortingState,
} from "@tanstack/react-table";
import {
	useDeleteAdminMutation,
	useGetAdminMutation,
} from "../../../services/adminApi";
import {
	showErrorToast,
	showSuccessToast,
	showWarningToast,
} from "../../../components/Toast";
import AlertDelete from "../../../components/AlertDialog/AlertDelete";
import {
	ArrowDownIcon,
	ArrowLeftIcon,
	ArrowRightIcon,
	ArrowUpIcon,
	ChevronDownIcon,
	Loader2Icon,
	PenSquareIcon,
	SearchIcon,
	Trash2Icon,
} from "lucide-react";
import { transformStringPlus } from "../../../utilities/stringUtils";

import type { Admin, DataTableGetRequest } from "../../../types";

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

function AdminTable() {
	const [search, setSearch] = useState("");
	const [limitPage, setLimitPage] = useState(10);
	const [querySearch] = useDebounce(search, 500);

	const [rowSelection, setRowSelection] = useState({});
	const [sorting, setSorting] = useState<SortingState>([]);

	const [isLargeView, setIsLargeView] = useState<boolean>(
		window.innerWidth > 1024
	);

	const [getAdmin, { isLoading, isError, data: admins }] =
		useGetAdminMutation();
	const [deleteAdmin, { isLoading: isLoadingDelete }] =
		useDeleteAdminMutation();
	const admin = useMemo(() => admins?.data ?? [], [admins]);
	const adminPages = admins?.page;
	const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
	const [deleteId, setDeleteId] = useState<string>("");
	const headerClass: Record<string, string> = {
		checkboxs: "w-14 text-center",
		row_number: "w-12",
	};

	const fetchAdmin = async (credentials: DataTableGetRequest) => {
		try {
			await getAdmin(credentials).unwrap();
		} catch (error) {
			showErrorToast("Gagal mengambil data admin");
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
			const responseDelete = await deleteAdmin({ id: deleteId }).unwrap();
			if (responseDelete.success) {
				showSuccessToast("Berhasil menghapus data admin");
				fetchAdmin({ search: querySearch, limit: limitPage });
			}
		} catch (error) {
			showErrorToast("Gagal menghapus data admin");
		}
		setIsOpenDeleteDialog(false);
	};

	const handleSelectedDelete = async (admin: Admin[]) => {
		const adminId = admin[0]._id;
		if (admin.length === 1) {
			try {
				const responseDelete = await deleteAdmin({ id: adminId }).unwrap();
				if (responseDelete.success) {
					showSuccessToast("Berhasil menghapus data admin");
					fetchAdmin({ search: querySearch, limit: limitPage });
				}
			} catch (error) {
				showErrorToast("Gagal menghapus data admin");
			}
		} else {
			showWarningToast("Maaf, fitur ini belum tersedia");
		}
		table.setRowSelection({});
	};

	const columnHelper = createColumnHelper<Admin>();
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
					if (adminPages) {
						const orderedNumber =
							(adminPages?.currentPage - 1) * adminPages?.perPage +
							info?.row?.index +
							1;
						return orderedNumber;
					} else {
						return info.row.index + 1;
					}
				},
			}),
			columnHelper.accessor("name", {
				header: "Nama Lengkap",
				cell: (info) => (
					<div className="flex items-center">
						<div>
							<figure className="mr-3 size-6 rounded-full block overflow-hidden">
								<img
									src={
										info?.row?.original?.image?.fileLink ??
										`https://ui-avatars.com/api/?name=${transformStringPlus(
											info.getValue()
										)}&background=6d5Acd&color=fff`
									}
									alt={`${info?.getValue()} Profile`}
									className="w-full h-full object-cover object-center block"
								/>
							</figure>
						</div>
						<p className="pr-3">{info?.getValue()}</p>
					</div>
				),
			}),
			columnHelper.accessor("email", {
				header: "Email",
				cell: (info) => info.getValue(),
			}),
			columnHelper.accessor("phoneNumber", {
				header: "Telepon",
				cell: (info) => info.getValue(),
			}),
			columnHelper.accessor((data) => data?.school?.name || "", {
				id: "school",
				header: "Sekolah",
				cell: (info) => info?.row?.original?.school?.name ?? "-",
			}),
			columnHelper.accessor("isActive", {
				header: "Status",
				cell: (info) => (
					<div className="flex">
						<div className="flex items-center space-x-1.5 px-2 py-0.75 rounded-full bg-gradient-to-b from-slate-50 via-gray-100 to-gray-200 to-90% dark:from-slate-800 dark:to-gray-900">
							<div
								className={`size-2.5 rounded-full blur-[2px] ${
									info.getValue() ? "bg-green-500" : "bg-red-400"
								}`}
							/>
							<div className="text-xs text-nowrap">
								{info.getValue() ? "Aktif" : "Tidak aktif"}
							</div>
						</div>
					</div>
				),
			}),
			// action edit and delete
			columnHelper.display({
				id: "action",
				header: "",
				cell: (info) => (
					<div className="flex space-x-5 px-2">
						<Link
							className="relative group/tooltip_edit"
							to={`/admin/edit/${info?.row?.original?._id}`}
						>
							<PenSquareIcon
								size={16}
								className="text-sky-500 hover:text-sky-600"
							/>
							<div className="absolute -top-0.75 left-1/2 -translate-x-1/2 -translate-y-full bg-gray-800 text-slate-100 dark:bg-gray-950 dark:text-slate-300 px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 group-hover/tooltip_edit:opacity-100 transition-all-200 pointer-events-none">
								<p className="text-center">Edit</p>
							</div>
						</Link>
						<button
							type="button"
							className="relative group/tooltip_delete"
							onClick={() => openDeleteDialog(info?.row?.original?._id)}
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
		data: admin,
		columns: defaultColumns,
		state: {
			rowSelection,
			sorting,
		},
		enableRowSelection: true,
		getCoreRowModel: getCoreRowModel<Admin>(),
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
		fetchAdmin({ search: querySearch, limit: limitPage });
	}, [querySearch, limitPage]);

	return (
		<div>
			<div className="w-full border border-gray-200 rounded-lg overflow-hidden dark:border-gray-600">
				<div className="flex space-x-3 my-4 px-5 items-center justify-between">
					<div className="relative w-full">
						<input
							id="searchAdmin"
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
					<div>
						<p className="bg-indigo-400 rounded-md px-1.5 py-1 text-gray-50 text-3.25xs dark:bg-indigo-600 dark:text-gray-100">
							{adminPages?.currentPage ?? 1}/{adminPages?.totalPage ?? 1}
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
														desc: <ArrowDownIcon size={16} className="ml-1" />,
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
									length: admin.length !== 0 ? admin.length : 5,
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
										<td className="px-3 py-3.5">
											<div className="skeleton-loader skeleton-sm w-full" />
										</td>
										<td className="px-3 py-3.5">
											<div className="skeleton-loader skeleton-sm w-full" />
										</td>
										<td className="px-3 py-3.5 w-24">
											<div className="skeleton-loader skeleton-sm w-full" />
										</td>
									</tr>
								))
							) : admin.length === 0 ? (
								<tr>
									<td
										colSpan={8}
										className="text-center py-3 text-gray-500 dark:text-gray-400"
									>
										Tidak ada data admin yang ditemukan.
										{isError && (
											<span
												aria-label="button"
												className="cursor-pointer text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
												onClick={() =>
													fetchAdmin({ search: querySearch, limit: limitPage })
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
						<p className="text-gray-500 mr-3 dark:text-gray-400">Menampilkan</p>
						<div className="relative">
							<select
								id="tableAdmin_paginate"
								name="tableAdmin_paginate"
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
								<label htmlFor="tableAdmin_paginate" className="block">
									<ChevronDownIcon size={20} className="text-gray-500" />
								</label>
							</div>
						</div>
						{/* total data */}
						<p className="text-gray-500 ml-3 dark:text-gray-400">
							dari {adminPages?.totalData ?? 0} data
						</p>
					</div>
					<div className="flex space-x-3">
						{isLargeView && (
							<button
								className="px-2.5 py-1 font-medium rounded-md border border-indigo-500 flex items-center bg-indigo-500 text-gray-50 transition hover:bg-indigo-600 hover:border-indigo-600 disabled:bg-indigo-300 disabled:border-indigo-300 disabled:cursor-not-allowed dark:bg-indigo-700 dark:border-indigo-700 dark:hover:bg-indigo-600 dark:hover:border-indigo-600 dark:disabled:bg-gray-700 dark:disabled:border-gray-700 dark:disabled:text-gray-500"
								onClick={() =>
									fetchAdmin({ search: querySearch, page: 1, limit: limitPage })
								}
								disabled={Number(adminPages?.currentPage) <= 1 || isLoading}
							>
								First
							</button>
						)}
						<button
							className="px-2.5 py-1 font-medium rounded-md border border-indigo-500 flex items-center bg-indigo-500 text-gray-50 transition hover:bg-indigo-600 hover:border-indigo-600 disabled:bg-indigo-300 disabled:border-indigo-300 disabled:cursor-not-allowed dark:bg-indigo-700 dark:border-indigo-700 dark:hover:bg-indigo-600 dark:hover:border-indigo-600 dark:disabled:bg-gray-700 dark:disabled:border-gray-700 dark:disabled:text-gray-500"
							onClick={() =>
								fetchAdmin({
									search: querySearch,
									page: Number(adminPages?.currentPage) - 1,
									limit: limitPage,
								})
							}
							disabled={Number(adminPages?.currentPage) <= 1 || isLoading}
						>
							<ArrowLeftIcon size={16} className={isLargeView ? "mr-1" : ""} />
							{isLargeView ? "Previous" : ""}
						</button>
						<button
							className="px-2.5 py-1 font-medium rounded-md border border-indigo-500 flex items-center bg-indigo-500 text-gray-50 transition hover:bg-indigo-600 hover:border-indigo-600 disabled:bg-indigo-300 disabled:border-indigo-300 disabled:cursor-not-allowed dark:bg-indigo-700 dark:border-indigo-700 dark:hover:bg-indigo-600 dark:hover:border-indigo-600 dark:disabled:bg-gray-700 dark:disabled:border-gray-700 dark:disabled:text-gray-500"
							onClick={() =>
								fetchAdmin({
									search: querySearch,
									page: Number(adminPages?.currentPage) + 1,
									limit: limitPage,
								})
							}
							disabled={
								Number(adminPages?.currentPage) >=
									Number(adminPages?.totalPage) || isLoading
							}
						>
							{isLargeView ? "Next" : ""}
							<ArrowRightIcon size={16} className={isLargeView ? "ml-1" : ""} />
						</button>
						{isLargeView && (
							<button
								className="px-2.5 py-1 font-medium rounded-md border border-indigo-500 flex items-center bg-indigo-500 text-gray-50 transition hover:bg-indigo-600 hover:border-indigo-600 disabled:bg-indigo-300 disabled:border-indigo-300 disabled:cursor-not-allowed dark:bg-indigo-700 dark:border-indigo-700 dark:hover:bg-indigo-600 dark:hover:border-indigo-600 dark:disabled:bg-gray-700 dark:disabled:border-gray-700 dark:disabled:text-gray-500"
								onClick={() =>
									fetchAdmin({
										search: querySearch,
										page: Number(adminPages?.totalPage),
										limit: limitPage,
									})
								}
								disabled={
									Number(adminPages?.currentPage) >=
										Number(adminPages?.totalPage) || isLoading
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
				message="admin"
				isLoading={isLoadingDelete}
				onCancel={closeDeleteDialog}
				onConfirm={handleDelete}
			/>
		</div>
	);
}

export default AdminTable;
