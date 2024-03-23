import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../app/hooks";
import { useGetGameByIdMutation } from "../../services/gameApi";
import { setAllowedToast } from "../../features/toastSlice";
import { setBreadcrumb } from "../../features/breadcrumbSlice";
import ImageGallery from "../../components/ImageGallery";
import Breadcrumb from "../../components/Breadcrumb";
import { showErrorToast } from "../../components/Toast";
import { AlertTriangleIcon, Loader2Icon } from "lucide-react";

import type { GameAddRequest } from "../../types";

function DetailGame() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { gameId } = useParams();
	const [getGameById, { data: game, isLoading }] = useGetGameByIdMutation();

	const { register, setValue } = useForm<GameAddRequest>();

	const fetchGameById = async (id: string) => {
		try {
			const response = await getGameById({ id }).unwrap();
			if (response.success) {
				setValue("author", response.data.author);
				setValue("category", response.data.category);
				setValue("description", response.data.description);
				setValue("maxLevel", response.data.maxLevel);
				setValue("maxRetry", response.data.maxRetry);
				setValue("maxTime", response.data.maxTime || 0);
				setValue("name", response.data.name);
			}
		} catch (error) {
			dispatch(setAllowedToast());
			showErrorToast("Data permainan tidak ditemukan");
			navigate("/game");
		}
	};

	useEffect(() => {
		const newBreadcrumb = [
			{
				icon: "game",
				label: "Game",
				path: "/game",
			},
			{
				icon: "detail",
				label: "Detail Game",
				path: `/game/${gameId}`,
			},
		];
		dispatch(setBreadcrumb(newBreadcrumb));
	}, [dispatch, gameId]);
	useEffect(() => {
		if (gameId) {
			fetchGameById(gameId);
		}
	}, [gameId]);

	return (
		<div>
			<div className="mb-6">
				<Breadcrumb />
				<div className="flex items-center justify-between">
					<div>
						<h5 className="font-semibold text-3xl mb-1.5 flex items-center">
							Detail Game
							{isLoading && (
								<span className="translate-y-px">
									<Loader2Icon
										size={22}
										className="ml-3 animate-spin-fast stroke-gray-900 dark:stroke-gray-300"
									/>
								</span>
							)}
						</h5>
						<p className="text-gray-500">
							Lihat informasi permainan {game?.data?.name || "..."}
						</p>
					</div>
					<div className="flex justify-end">
						<Link
							type="button"
							className={`leading-normal inline-flex justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 transition ${
								isLoading
									? "opacity-50 cursor-not-allowed bg-gray-200 dark:hover:!bg-gray-900"
									: "bg-gray-50 hover:bg-gray-100"
							} dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700`}
							to="/game"
						>
							Kembali
						</Link>
						<Link
							to={`/game/leaderboard/${gameId}`}
							type="button"
							className={`leading-normal ml-4 inline-flex justify-center rounded-lg border border-transparent px-6 py-3 text-sm font-medium text-gray-50 dark:text-gray-100 transition ${
								isLoading
									? "opacity-50 cursor-not-allowed bg-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:bg-amber-700"
									: "bg-gradient-to-br from-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 dark:from-yellow-500 dark:to-amber-600 dark:hover:from-amber-500 dark:hover:to-yellow-700"
							}`}
						>
							Leaderboard
						</Link>
					</div>
				</div>
			</div>
			<form className="grid grid-cols-12 gap-6">
				<div className="col-span-full xl:col-span-6">
					<div className="bg-white rounded-xl dark:bg-gray-800">
						<div className="px-5 pt-4">
							<h4 className="font-semibold text-xl mb-0.5">
								Informasi Permainan
							</h4>
							<p className="text-gray-500">
								Informasi permainan yang terdaftar di dalam sistem.
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
										Nama Permainan
									</label>
									<input
										id="name"
										type="text"
										className="px-3 py-2.5 rounded-lg border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-200 dark:disabled:text-gray-300 dark:focus:outline-indigo-500/30 dark:focus:border-indigo-600"
										placeholder="Masukkan nama permainan"
										aria-required="true"
										{...register("name")}
										disabled
									/>
								</div>
								{/* author */}
								<div className="mb-4">
									<label
										htmlFor="author"
										className="block mb-2 font-medium text-gray-500 dark:text-gray-400"
									>
										Nama Pembuat
									</label>
									<input
										id="author"
										type="text"
										className="px-3 py-2.5 rounded-lg border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-200 dark:disabled:text-gray-300 dark:focus:outline-indigo-500/30 dark:focus:border-indigo-600"
										placeholder="Masukkan nama pembuat permainan"
										aria-required="true"
										{...register("author")}
										disabled
									/>
								</div>
								{/* category */}
								<div className="mb-4">
									<label
										htmlFor="category"
										className="block mb-2 font-medium text-gray-500 dark:text-gray-400"
									>
										Kategori
									</label>
									<input
										id="category"
										type="text"
										className="px-3 py-2.5 rounded-lg border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-200 dark:disabled:text-gray-300 dark:focus:outline-indigo-500/30 dark:focus:border-indigo-600"
										placeholder="Masukkan kategori permainan"
										aria-required="true"
										{...register("category")}
										disabled
									/>
								</div>
								{/* description */}
								<div className="mb-4">
									<label
										htmlFor="description"
										className="block mb-2 font-medium text-gray-500 dark:text-gray-400"
									>
										Deskripsi
									</label>
									<textarea
										id="description"
										className="px-3 py-2.5 rounded-lg border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-200 dark:disabled:text-gray-300 dark:focus:outline-indigo-500/30 dark:focus:border-indigo-600"
										rows={3}
										placeholder="Masukkan deskripsi permainan"
										aria-required="true"
										{...register("description")}
										disabled
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-span-full xl:col-span-6">
					<div className="bg-white rounded-xl dark:bg-gray-800">
						<div className="px-5 pt-4">
							<h4 className="font-semibold text-xl mb-0.5">Aturan Permainan</h4>
							<p className="text-gray-500">
								Aturan permainan yang berlaku di dalam permainan.
							</p>
						</div>
						<div className="p-5">
							<div>
								{/* maxLevel */}
								<div className="mb-4">
									<label
										htmlFor="maxLevel"
										className="block mb-2 font-medium text-gray-500 dark:text-gray-400"
									>
										Maksimal Level
									</label>
									<input
										id="maxLevel"
										type="text"
										className="px-3 py-2.5 rounded-lg border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-200 dark:disabled:text-gray-300 dark:focus:outline-indigo-500/30 dark:focus:border-indigo-600"
										placeholder="Masukkan maksimal level permainan"
										aria-required="true"
										{...register("maxLevel")}
										disabled
									/>
								</div>
								{/* maxRetry */}
								<div className="mb-4">
									<label
										htmlFor="maxRetry"
										className="block mb-2 font-medium text-gray-500 dark:text-gray-400"
									>
										Maksimal Retry
									</label>
									<input
										id="maxRetry"
										type="text"
										className="px-3 py-2.5 rounded-lg border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-200 dark:disabled:text-gray-300 dark:focus:outline-indigo-500/30 dark:focus:border-indigo-600"
										placeholder="Masukkan maksimal retry permainan"
										aria-required="true"
										{...register("maxRetry")}
										disabled
									/>
								</div>
								{/* maxTime */}
								<div className="mb-4">
									<label
										htmlFor="maxTime"
										className="block mb-2 font-medium text-gray-500 dark:text-gray-400"
									>
										Maksimal Waktu
									</label>
									<input
										id="maxTime"
										type="text"
										className="px-3 py-2.5 rounded-lg border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-200 dark:disabled:text-gray-300 dark:focus:outline-indigo-500/30 dark:focus:border-indigo-600"
										placeholder="Masukkan maksimal waktu permainan"
										aria-required="true"
										{...register("maxTime")}
										disabled
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-span-full">
					<div className="bg-white rounded-xl dark:bg-gray-800">
						<div className="px-5 pt-4">
							<h4 className="font-semibold text-xl mb-0.5">
								Foto Permainan ({game?.data.images?.length || 0})
							</h4>
							<p className="text-gray-500">
								Foto permainan yang terdaftar dalam sistem.
							</p>
						</div>
						<div className="p-5">
							<ImageGallery images={game?.data?.images} height={128} />
							{game?.data?.images?.length === 0 && (
								<div className="w-full flex items-center p-3 rounded-md bg-gray-100 dark:bg-gray-900/90">
									<p className="font-medium text-gray-500 flex items-center">
										<AlertTriangleIcon
											size={18}
											className="mr-2 stroke-gray-500"
										/>
										Foto belum diunggah.
									</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default DetailGame;
