import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../app/hooks";
import {
	useGetSchoolByIdMutation,
	useUpdateSchoolMutation,
} from "../../services/schoolApi";
import { setAllowedToast } from "../../features/toastSlice";
import { setBreadcrumb } from "../../features/breadcrumbSlice";
import Breadcrumb from "../../components/Breadcrumb";
import {
	showErrorToast,
	showSuccessToast,
	showWarningToast,
} from "../../components/Toast";
import { Loader2Icon, TrashIcon, UploadCloudIcon, XIcon } from "lucide-react";

import type { School, SchoolUpdateRequest } from "../../types";

const MAX_FILE_SIZE = 3 * 1024 * 1024;
const schema = yup.object().shape({
	name: yup.string().required("Nama harus diisi"),
	address: yup.string().required("Alamat harus diisi"),
	media: yup
		.array()
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		.test("fileSize", "Image must be less than 3MB", (value: any) => {
			if (!value) return true;
			return value.every((file: File) => file.size <= MAX_FILE_SIZE);
		})
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		.test("fileType", "Only image files are allowed", (value: any) => {
			if (!value) return true;
			return value.every((file: File) => file.type.startsWith("image"));
		})
		.nullable(),
});

function EditSchool() {
	const [newImages, setNewImages] = useState<File[]>([]);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { schoolId } = useParams();
	const [getSchoolById, { data: school, isLoading: isLoadingGet }] =
		useGetSchoolByIdMutation();
	const [updateSchool, { isLoading: isLoadingUpdate }] =
		useUpdateSchoolMutation();

	const setFormValue = (response: School) => {
		if (response) {
			setValue("name", response.name);
			setValue("address", response.address);
		}
	};

	const fetchSchoolById = async (id: string) => {
		try {
			const response = await getSchoolById({ id }).unwrap();
			if (response.success) {
				setFormValue(response.data);
			}
		} catch (error) {
			dispatch(setAllowedToast());
			showErrorToast("Data sekolah tidak ditemukan");
			navigate("/school");
		}
	};

	const {
		formState: { errors },
		handleSubmit,
		register,
		setValue,
	} = useForm<SchoolUpdateRequest>({
		mode: "all",
		resolver: yupResolver(schema),
	});

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			setValue("media", acceptedFiles);
			setNewImages(acceptedFiles);
		},
		[setValue]
	);
	const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
		useDropzone({
			onDrop,
			accept: { "image/*": [".png", ".jpg", ".jpeg", ".svg"] },
			maxFiles: 5,
			maxSize: MAX_FILE_SIZE,
		});

	const onRemove = (file: File) => {
		const filteredImg = acceptedFiles.filter((image) => image !== file);
		acceptedFiles.splice(acceptedFiles.indexOf(file), 1);
		setNewImages(filteredImg);
		setValue("media", filteredImg);
	};

	const onSubmit: SubmitHandler<SchoolUpdateRequest> = async (data) => {
		try {
			await updateSchool({ ...data, id: schoolId }).unwrap();
			dispatch(setAllowedToast());
			showSuccessToast("Data sekolah berhasil diperbarui!");
			navigate("/school");
		} catch (error) {
			showErrorToast("Data sekolah gagal disimpan");
		}
	};
	const handleDeletePhoto = () => {
		showWarningToast("Maaf, fitur ini belum tersedia");
	};

	useEffect(() => {
		const newBreadcrumb = [
			{
				icon: "school",
				label: "School",
				path: "/school",
			},
			{
				icon: "edit",
				label: "Edit School",
				path: `/school/edit/${schoolId}`,
			},
		];
		dispatch(setBreadcrumb(newBreadcrumb));
	}, [dispatch, schoolId]);
	useEffect(() => {
		if (schoolId) {
			fetchSchoolById(schoolId);
		}
	}, [schoolId]);

	return (
		<div>
			<div className="mb-6">
				<Breadcrumb />
				<div className="flex items-center justify-between">
					<div>
						<h5 className="font-semibold text-3xl mb-1.5 flex items-center">
							Edit Sekolah
							{isLoadingGet && (
								<span className="translate-y-px">
									<Loader2Icon
										size={22}
										className="ml-3 animate-spin-fast stroke-gray-900 dark:stroke-gray-300"
									/>
								</span>
							)}
						</h5>
						<p className="text-gray-500">Edit data sekolah.</p>
					</div>
					<div className="flex justify-end">
						<Link
							type="button"
							className={`leading-normal inline-flex justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 transition ${
								isLoadingGet || isLoadingUpdate
									? "opacity-50 cursor-not-allowed bg-gray-200 dark:hover:!bg-gray-900"
									: "bg-gray-50 hover:bg-gray-100"
							} dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700`}
							to="/school"
						>
							Kembali
						</Link>
						<button
							type="button"
							className="leading-normal ml-4 inline-flex justify-center rounded-lg border border-transparent bg-violet-600 px-6 py-3 text-sm font-medium text-gray-100 transition hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-violet-500 disabled:focus-visible:ring-2 disabled:focus-visible:ring-violet-500 disabled:focus-visible:ring-offset-2 dark:hover:bg-violet-700 dark:disabled:bg-violet-700"
							disabled={isLoadingGet || isLoadingUpdate}
							onClick={handleSubmit(onSubmit)}
						>
							{isLoadingUpdate ? (
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
							<h4 className="font-semibold text-xl mb-0.5">
								Informasi Sekolah
							</h4>
							<p className="text-gray-500">
								Informasi sekolah yang akan ditambahkan ke dalam sistem.
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
										Nama Sekolah
									</label>
									<input
										id="name"
										type="text"
										className={`px-3 py-2.5 rounded-lg border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 ${
											errors.name
												? "bg-red-50 border-red-400 focus:outline-red-500/30 focus:border-red-500 dark:border-gray-700 dark:focus:outline-red-500/30 dark:focus:border-red-500"
												: ""
										} dark:bg-gray-700 dark:border-gray-700 dark:text-gray-200 dark:disabled:text-gray-300 dark:focus:outline-indigo-500/30 dark:focus:border-indigo-600`}
										placeholder="Masukkan nama sekolah"
										aria-required="true"
										aria-invalid={errors.name ? "true" : "false"}
										disabled={isLoadingGet || isLoadingUpdate}
										{...register("name")}
									/>
									{errors.name && (
										<p className="mt-1 -mb-1.5 text-red-500">
											{errors.name.message}
										</p>
									)}
								</div>
								{/* address */}
								<div className="mb-4">
									<label
										htmlFor="address"
										className="block mb-2 font-medium text-gray-500 dark:text-gray-400"
									>
										Alamat
									</label>
									<textarea
										id="address"
										className={`px-3 py-2.5 rounded-lg border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 ${
											errors.address
												? "bg-red-50 border-red-400 focus:outline-red-500/30 focus:border-red-500 dark:border-gray-700 dark:focus:outline-red-500/30 dark:focus:border-red-500"
												: ""
										} dark:bg-gray-700 dark:border-gray-700 dark:text-gray-200 dark:disabled:text-gray-300 dark:focus:outline-indigo-500/30 dark:focus:border-indigo-600`}
										rows={3}
										placeholder="Masukkan alamat sekolah"
										aria-required="true"
										aria-invalid={errors.address ? "true" : "false"}
										disabled={isLoadingGet || isLoadingUpdate}
										{...register("address")}
									/>
									{errors.address && (
										<p className="mt-1 -mb-1.5 text-red-500">
											{errors.address.message}
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
							<h4 className="font-semibold text-xl mb-0.5">Foto Sekolah</h4>
							<p className="text-gray-500">
								Foto sekolah yang akan ditambahkan ke dalam sistem.
							</p>
						</div>
						<div className="p-5">
							{school?.data?.images && school?.data?.images.length > 0 && (
								<div className="grid grid-cols-6 gap-4 mb-6">
									{school?.data?.images.map((image) => (
										<div
											className="col-span-3 lg:col-span-2 xl:col-span-3"
											key={image?._id}
										>
											<figure className="group overflow-hidden h-36 xl:h-24 w-full rounded-md mr-3 relative">
												<img
													src={image?.fileLink}
													alt={image?.fileName}
													className="w-full h-full object-cover object-center"
												/>
												<div className="-z-10 group-hover:z-10 absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-gray-900/30 transition-all ease-in-out duration-300 dark:bg-gray-900/50">
													<button
														type="button"
														className="scale-75 group-hover:scale-100 flex items-center justify-center w-9 h-9 rounded-full bg-red-500 transition-all duration-200 ease-in-out hover:bg-red-600"
														onClick={handleDeletePhoto}
													>
														<TrashIcon size={18} className="stroke-white" />
													</button>
												</div>
											</figure>
										</div>
									))}
								</div>
							)}
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
							{newImages.length > 0 && (
								<div className="mt-6">
									<div className="grid grid-cols-6 gap-4">
										{newImages.map((file) => (
											<div
												className="col-span-3 lg:col-span-2 xl:col-span-3"
												key={file.name}
											>
												<figure className="h-36 xl:h-24 w-full rounded-md overflow-hidden relative">
													<img
														src={URL.createObjectURL(file)}
														alt={file.name}
														className="object-cover object-center w-full h-full bg-gray-200 dark:bg-gray-700"
													/>
													<button
														className="absolute top-2 right-2 bg-red-500 rounded-full flex items-center justify-center size-7 text-sm text-gray-100 focus:outline-none focus:ring-0 transition hover:bg-red-600 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-red-600"
														type="button"
														onClick={() => onRemove(file)}
													>
														<XIcon size={14} />
													</button>
												</figure>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default EditSchool;
