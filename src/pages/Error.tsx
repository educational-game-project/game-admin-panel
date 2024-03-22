import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectTheme } from "../features/themeSlice";
import images from "../assets/img";

function ErrorPage() {
	const theme = useAppSelector(selectTheme);

	return (
		<div
			className="w-full container max-w-7xl mx-auto h-full min-h-screen bg-cover bg-center"
			style={{
				backgroundImage: `url(${
					theme === "dark" ? images.bgErrorDark : images.bgError
				})`,
			}}
		>
			<div className="w-full flex justify-center pt-24 pb-4">
				<img
					src="https://res.cloudinary.com/sningratt/image/upload/v1709561256/assets/kognitif_game_logo.svg"
					className="w-36"
					alt="logo admin panel"
				/>
			</div>
			<div className="w-full h-full min-h-[calc(100vh-153px)] flex items-center justify-center">
				<div className="text-center max-w-112.5 mb-12">
					<p className="text-3xl mb-5">😞</p>
					<h5 className="font-bold text-4xl mb-6">Ooups, page not found</h5>
					<p className="text-gray-600 dark:text-gray-500 mb-6">
						Mohon maaf atas ketidaknyamanannya, kami tidak dapat menemukan
						halaman yang Anda cari. Sepertinya Anda mencoba mengakses halaman
						yang tidak ada atau telah dihapus.
					</p>
					<Link
						type="button"
						className="leading-normal ml-4 inline-flex justify-center rounded-lg border border-transparent bg-violet-600 px-4 py-2.5 text-sm font-medium text-gray-100 hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-violet-500 disabled:focus-visible:ring-2 disabled:focus-visible:ring-violet-500 disabled:focus-visible:ring-offset-2 dark:bg-violet-700 dark:hover:bg-violet-600"
						to="/"
					>
						Kembali ke Dashboard
					</Link>
				</div>
			</div>
		</div>
	);
}

export default ErrorPage;
