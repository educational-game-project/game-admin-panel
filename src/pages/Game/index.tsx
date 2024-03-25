import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useUser } from "../../hook/authHooks";
import Breadcrumb from "../../components/Breadcrumb";
import HeaderContainer from "../../components/HeaderContainer";
import { setBreadcrumb } from "../../features/breadcrumbSlice";
import GameTable from "./components/GameTable";

function Game() {
	const dispatch = useAppDispatch();
	const { user } = useUser();

	useEffect(() => {
		const newBreadcrumb = [
			{
				icon: "game",
				label: "Game",
				path: "/game",
			},
		];
		dispatch(setBreadcrumb(newBreadcrumb));
	}, [dispatch]);

	return (
		<div>
			<div className="mb-6">
				<Breadcrumb />
				{user?.role === "Super Admin" ? (
					<HeaderContainer
						title="Game"
						subtitle="Lihat daftar permainan yang terdaftar."
						btnHref="/game/add"
						btnText="Tambah Game"
					/>
				) : (
					<HeaderContainer
						title="Game"
						subtitle="Lihat daftar permainan yang terdaftar."
					/>
				)}
			</div>
			<div className="bg-white p-5 rounded-xl dark:bg-gray-800">
				<GameTable />
			</div>
		</div>
	);
}

export default Game;
