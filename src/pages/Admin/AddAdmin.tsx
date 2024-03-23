import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../app/hooks";
import { useAddAdminMutation } from "../../services/adminApi";
import { useGetSchoolMutation } from "../../services/schoolApi";
import { setBreadcrumb } from "../../features/breadcrumbSlice";
import { setAllowedToast } from "../../features/toastSlice";
import Breadcrumb from "../../components/Breadcrumb";
import { showErrorToast, showSuccessToast } from "../../components/Toast";
import {
	ChevronDownIcon,
	EyeIcon,
	EyeOffIcon,
	Loader2Icon,
	UploadCloudIcon,
} from "lucide-react";

import type { AdminAddRequest, School } from "../../types";

const MAX_FILE_SIZE = 3 * 1024 * 1024;
const schema = yup.object().shape({
	name: yup.string().required("Nama harus diisi"),
	email: yup.string().email("Email tidak valid").required("Email harus diisi"),
	phoneNumber: yup.string().required("Nomor telepon harus diisi"),
	password: yup.string().required("Password harus diisi"),
	school: yup.string().required("Sekolah harus diisi"),
	media: yup
		.mixed()
		.test(
			"fileSize",
			"Ukuran file terlalu besar. Maksimal 3MB",
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(value: any) => {
				if (!value) return true; // Allow empty files
				return value.length && value[0]?.size <= MAX_FILE_SIZE;
			}
		)
		.test(
			"fileType",
			"Tipe file tidak valid. Hanya menerima file gambar",
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(value: any) => {
				if (!value) return true; // Allow empty files
				return value.length && value[0]?.type.startsWith("image/");
			}
		)
		.nullable(),
});

function AddAdmin() {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const mediaRef = useRef<HTMLImageElement>(null);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [addAdmin, { isLoading }] = useAddAdminMutation();
	const [getSchool, { isLoading: isLoadingGet, data: schools }] =
		useGetSchoolMutation();

	const fetchSchool = async () => {
		try {
			await getSchool({ search: "", limit: 100 }).unwrap();
		} catch (error) {
			dispatch(setAllowedToast());
			showErrorToast("Gagal memuat data sekolah");
			navigate("/admin");
		}
	};

	const {
		clearErrors,
		formState: { errors },
		handleSubmit,
		register,
		setValue,
		watch,
	} = useForm<AdminAddRequest>({
		mode: "all",
		resolver: yupResolver(schema),
	});

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			setValue("media", acceptedFiles);
		},
		[setValue]
	);
	const { getInputProps, getRootProps, isDragActive } = useDropzone({
		onDrop,
		maxFiles: 1,
		multiple: false,
	});

	const watchMedia = watch("media");

	const handleApplyMedia = () => {
		if (
			mediaRef.current &&
			watchMedia?.length > 0 &&
			watchMedia[0].size <= MAX_FILE_SIZE &&
			watchMedia[0].type.startsWith("image/")
		) {
			clearErrors("media");
			mediaRef.current.src = URL.createObjectURL(watchMedia[0]);
		}
	};
	const handleDeleteMedia = () => setValue("media", null);

	const onSubmit: SubmitHandler<AdminAddRequest> = async (data) => {
		try {
			await addAdmin(data).unwrap();
			dispatch(setAllowedToast());
			showSuccessToast("Data admin berhasil ditambahkan");
			navigate("/admin");
		} catch (error) {
			showErrorToast("Gagal menambahkan data admin");
		}
	};

	useEffect(() => {
		fetchSchool();
	}, []);

	useEffect(() => {
		const newBreadcrumb = [
			{
				icon: "admin",
				label: "Admin",
				path: "/admin",
			},
			{
				icon: "user_add",
				label: "Add Admin",
				path: "/admin/add",
			},
		];
		dispatch(setBreadcrumb(newBreadcrumb));
	}, [dispatch]);

	return (
		<div>
			<div className="mb-6">
				<Breadcrumb />
				<div className="flex items-center justify-between">
					<div>
						<h5 className="font-semibold text-3xl mb-1.5 flex items-center">
							Tambah Admin
							{isLoadingGet && (
								<span className="translate-y-px">
									<Loader2Icon
										size={22}
										className="ml-3 animate-spin-fast stroke-gray-900 dark:stroke-gray-300"
									/>
								</span>
							)}
						</h5>
						<p className="text-gray-500">
							Tambahkan admin baru ke dalam sistem.
						</p>
					</div>
					<div className="flex justify-end">
						<Link
							type="button"
							className={`leading-normal inline-flex justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 transition ${
								isLoading || isLoadingGet
									? "opacity-50 cursor-not-allowed bg-gray-200 dark:hover:!bg-gray-900"
									: "bg-gray-50 hover:bg-gray-100"
							} dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700`}
							to="/admin"
						>
							Kembali
						</Link>
						<button
							type="button"
							className="leading-normal ml-4 inline-flex justify-center rounded-lg border border-transparent bg-violet-600 px-6 py-3 text-sm font-medium text-gray-100 transition hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-violet-500 disabled:focus-visible:ring-2 disabled:focus-visible:ring-violet-500 disabled:focus-visible:ring-offset-2 dark:hover:bg-violet-700 dark:disabled:bg-violet-700"
							disabled={isLoading || isLoadingGet}
							onClick={handleSubmit(onSubmit)}
						>
							{isLoading ? (
								<>
									<span className="translate-y-px">
										<Loader2Icon
											size={18}
											className="mr-1.5 animate-spin-fast"
										/>
									</span>
									<span>Menyimpan...</span>
								</>
							) : (
								"Simpan"
							)}
						</button>
					</div>
				</div>
			</div>
			<form className="grid grid-cols-12 gap-6">
				<div className="col-span-full xl:col-span-8">
					<div className="bg-white rounded-xl dark:bg-gray-800">
						<div className="px-5 pt-4">
							<h4 className="font-semibold text-xl mb-0.5">Informasi Admin</h4>
							<p className="text-gray-500">
								Informasi admin yang akan ditambahkan ke dalam sistem.
							</p>
						</div>
						<div className="p-5">
							<div>
								{/* name */}
								<div className="mb-4">
									<label
										htmlFor="name"
										className="block mb-2 font-medium text-gray-500 dark:text-gray-400"
									>
										Nama Lengkap
									</label>
									<input
										id="name"
										type="text"
										className={`px-3 py-2.5 rounded-lg border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 ${
											errors.name
												? "bg-red-50 border-red-400 focus:outline-red-500/30 focus:border-red-500 dark:border-gray-700 dark:focus:outline-red-500/30 dark:focus:border-red-500"
												: ""
										} dark:bg-gray-700 dark:border-gray-700 dark:text-gray-200 dark:disabled:text-gray-300 dark:focus:outline-indigo-500/30 dark:focus:border-indigo-600`}
										placeholder="Masukkan nama admin"
										aria-required="true"
										aria-invalid={errors.name ? "true" : "false"}
										{...register("name")}
									/>
									{errors.name && (
										<p className="mt-1 -mb-1.5 text-red-500">
											{errors.name.message}
										</p>
									)}
								</div>
								{/* email */}
								<div className="mb-4">
									<label
										htmlFor="email"
										className="block mb-2 font-medium text-gray-500 dark:text-gray-400"
									>
										Email
									</label>
									<input
										id="email"
										type="email"
										className={`px-3 py-2.5 rounded-lg border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 ${
											errors.email
												? "bg-red-50 border-red-400 focus:outline-red-500/30 focus:border-red-500 dark:border-gray-700 dark:focus:outline-red-500/30 dark:focus:border-red-500"
												: ""
										} dark:bg-gray-700 dark:border-gray-700 dark:text-gray-200 dark:disabled:text-gray-300 dark:focus:outline-indigo-500/30 dark:focus:border-indigo-600`}
										placeholder="Masukkan email admin"
										aria-required="true"
										aria-invalid={errors.email ? "true" : "false"}
										{...register("email")}
									/>
									{errors.email && (
										<p className="mt-1 -mb-1.5 text-red-500">
											{errors.email.message}
										</p>
									)}
								</div>
								{/* phone number */}
								<div className="mb-4">
									<label
										htmlFor="phone"
										className="block mb-2 font-medium text-gray-500 dark:text-gray-400"
									>
										Nomor Telepon
									</label>
									<input
										id="phone"
										type="text"
										className={`px-3 py-2.5 rounded-lg border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 ${
											errors.phoneNumber
												? "bg-red-50 border-red-400 focus:outline-red-500/30 focus:border-red-500 dark:border-gray-700 dark:focus:outline-red-500/30 dark:focus:border-red-500"
												: ""
										} dark:bg-gray-700 dark:border-gray-700 dark:text-gray-200 dark:disabled:text-gray-300 dark:focus:outline-indigo-500/30 dark:focus:border-indigo-600`}
										placeholder="Masukkan nomor telepon admin"
										aria-required="true"
										aria-invalid={errors.phoneNumber ? "true" : "false"}
										{...register("phoneNumber")}
									/>
									{errors.phoneNumber && (
										<p className="mt-1 -mb-1.5 text-red-500">
											{errors.phoneNumber.message}
										</p>
									)}
								</div>
								{/* password */}
								<div className="mb-4">
									<label
										htmlFor="email"
										className="block mb-2 font-medium text-gray-500 dark:text-gray-400"
									>
										Password
									</label>
									<div className="relative w-full">
										<input
											type={showPassword ? "text" : "password"}
											id="password"
											className={`px-3 py-2.5 rounded-lg border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 ${
												errors.password
													? "bg-red-50 border-red-400 focus:outline-red-500/30 focus:border-red-500 dark:border-gray-700 dark:focus:outline-red-500/30 dark:focus:border-red-500"
													: ""
											} dark:bg-gray-700 dark:border-gray-700 dark:text-gray-200 dark:disabled:text-gray-300 dark:focus:outline-indigo-500/30 dark:focus:border-indigo-600`}
											placeholder="Masukkan password admin"
											aria-required="true"
											aria-invalid={errors.password ? "true" : "false"}
											{...register("password")}
										/>
										<div
											className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
											aria-labelledby=""
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? (
												<EyeOffIcon
													size={18}
													className="text-gray-400 cursor-pointer"
												/>
											) : (
												<EyeIcon
													size={18}
													className="text-gray-400 cursor-pointer"
												/>
											)}
										</div>
									</div>
									{errors.password && (
										<p className="mt-1 -mb-1.5 text-red-500">
											{errors.password.message}
										</p>
									)}
								</div>
								{/* school::select */}
								<div className="mb-1">
									<label
										htmlFor="school"
										className="block mb-2 font-medium text-gray-500 dark:text-gray-400"
									>
										Sekolah
									</label>
									<div className="relative">
										<select
											id="school"
											className={`h-10.8 px-3 py-2.5 rounded-lg border bg-gray-50 border-gray-300 w-full appearance-none focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 ${
												errors.school
													? "bg-red-50 border-red-400 focus:outline-red-500/30 focus:border-red-500 dark:border-gray-700 dark:focus:outline-red-500/30 dark:focus:border-red-500"
													: ""
											} dark:bg-gray-700 dark:border-gray-700 dark:text-gray-200 dark:disabled:text-gray-300 dark:focus:outline-indigo-500/30 dark:focus:border-indigo-600`}
											aria-required="true"
											aria-invalid={errors.school ? "true" : "false"}
											{...register("school")}
										>
											<option value="">Pilih Sekolah</option>
											{schools?.data.map((school: School) => (
												<option key={school._id} value={school._id}>
													{school.name}
												</option>
											))}
										</select>
										<div className="absolute inset-y-0 right-1 flex items-center px-2 pointer-events-none">
											<ChevronDownIcon size={18} className="text-gray-400" />
										</div>
									</div>
									{errors.school && (
										<p className="mt-1 -mb-1.5 text-red-500">
											{errors.school.message}
										</p>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-span-full xl:col-span-4">
					<div className="bg-white rounded-xl dark:bg-gray-800">
						<div className="px-5 pt-4">
							<h4 className="font-semibold text-xl mb-0.5">Foto Profil</h4>
							<p className="text-gray-500">
								Foto profil admin yang akan ditambahkan ke dalam sistem.
							</p>
						</div>
						<div className="p-5">
							<div className="flex items-center mb-4">
								<figure className="flex items-center justify-center overflow-hidden w-14 h-14 rounded-full mr-3">
									<img
										ref={mediaRef}
										src={
											!errors.media && watchMedia?.length > 0
												? URL.createObjectURL(watchMedia[0])
												: "https://ui-avatars.com/api/?name=Gameon"
										}
										alt="Profile Placeholder"
										className="w-full h-full object-cover object-center"
									/>
								</figure>
								<div>
									<h5 className="font-medium text-base mb-0.5">
										Tambah Foto Profil
									</h5>
									<div className="flex items-center space-x-3">
										<p
											className="text-gray-400 hover:text-red-500 cursor-pointer dark:text-gray-600 dark:hover:text-red-600"
											onClick={handleDeleteMedia}
										>
											Hapus
										</p>
										<p
											className="text-violet-600 hover:text-violet-500 cursor-pointer"
											onClick={handleApplyMedia}
										>
											Terapkan
										</p>
									</div>
								</div>
							</div>
							<div>
								<div
									{...getRootProps({ className: "dropzone" })}
									className={`group drop-media cursor-pointer w-full p-4 border-2 border-dashed rounded-md flex flex-col justify-center items-center focus:ring-0 focus:outline-none focus:border-gray-400 focus:bg-neutral-200 dark:focus:bg-gray-700 dark:focus:!border-gray-600 hover:bg-gray-100/60 dark:hover:bg-gray-900/60 transition ${
										isDragActive
											? "border-gray-400 bg-neutral-200 dark:bg-gray-700 dark:!border-gray-600"
											: "border-gray-300"
									} dark:border-gray-700`}
								>
									<input
										{...getInputProps()}
										name="media"
										id="media"
										accept="image/*"
									/>
									<div className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-50 mt-1 mb-4 dark:bg-gray-900">
										<UploadCloudIcon size={24} className="text-gray-500" />
									</div>
									<p className="text-gray-500 text-center">
										<span className="inline-block text-violet-500 cursor-pointer hover:underline underline-offset-2">
											Pilih file
										</span>{" "}
										atau drag and drop file di sini
									</p>
									<p className="text-gray-500 text-center">
										SVG, PNG, atau JPG (maks. 3MB)
									</p>
								</div>
							</div>
							{errors.media && (
								<p className="mt-2.5 text-red-500">
									{errors.media.message?.toString()}
								</p>
							)}
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default AddAdmin;
