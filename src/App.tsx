import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import { type Action, KBarProvider } from "kbar";
import {
	ActivityIcon,
	AppWindowIcon,
	Gamepad2Icon,
	HomeIcon,
	Share2Icon,
	UserSquare2Icon,
} from "lucide-react";
import { useUser } from "./hook/authHooks";
import { useResponsiveLayout } from "./hook/responsiveHooks";

import Layout from "./common/Layout";
import AuthMiddleware from "./common/middleware/AuthMiddleware";
import ProtectedMiddleware from "./common/middleware/ProtectedMiddleware";
import SecureGuardMiddleware from "./common/middleware/SecureGuardMiddleware";
import AutoTopProvider from "./components/AutoTopProvider";
import ToastProvider from "./components/ToastProvider";
import ButtonClipboard from "./components/ButtonClipboard";
import GlobalSearch from "./components/GlobalSearch";

import Activity from "./pages/Activity";
import AddAdmin from "./pages/Admin/AddAdmin";
import AddGame from "./pages/Game/AddGame";
import AddSchool from "./pages/School/AddSchool";
import AddStudent from "./pages/Students/AddStudent";
import Admin from "./pages/Admin";
import ChangePassword from "./pages/Profile/ChangePassword";
import DetailGame from "./pages/Game/DetailGame";
import DetailSchool from "./pages/School/DetailSchool";
import EditAdmin from "./pages/Admin/EditAdmin";
import EditGame from "./pages/Game/EditGame";
import EditSchool from "./pages/School/EditSchool";
import EditStudent from "./pages/Students/EditStudent";
import ErrorPage from "./pages/Error";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Leaderboard from "./pages/Game/Leaderboard";
import Login from "./pages/Auth/Login";
import Profile from "./pages/Profile";
import Score from "./pages/Score";
import Students from "./pages/Students";
import School from "./pages/School";

import socials from "./data/social";
import featuresData from "./data/features.json";
import images from "./assets/img";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
	const isDesktopView = useResponsiveLayout();
	const navigate = useNavigate();
	const { user } = useUser();

	const onClickLink = (url: string) => navigate(url);

	const searchActions: Action[] = [
		{
			id: "home",
			name: "Home",
			keywords: "home dashboard root",
			shortcut: ["h"],
			perform: () => onClickLink("/"),
			section: "Pages",
			icon: <HomeIcon size={18} />,
		},
		{
			id: "game",
			name: "Game",
			shortcut: ["g"],
			keywords: "game permainan",
			perform: () => onClickLink("/game"),
			section: "Pages",
			icon: <Gamepad2Icon size={18} />,
		},
		{
			id: "student",
			name: "Siswa",
			shortcut: ["t"],
			keywords: "siswa student user",
			perform: () => onClickLink("/student"),
			section: "Pages",
			icon: <UserSquare2Icon size={18} />,
		},
		{
			id: "activity",
			name: "Aktivitas",
			shortcut: ["a"],
			keywords: "aktivitas activity",
			perform: () => onClickLink("/activity"),
			section: "Pages",
			icon: <ActivityIcon size={18} />,
		},
		{
			id: "features",
			name: "Features",
			keywords: "features fitur",
			section: "Pages",
			icon: <AppWindowIcon size={18} />,
		},
	];

	socials.map((social) => {
		searchActions.push({
			id: social.id,
			name: social.name,
			perform: () => window.open(social.url),
			section: "Socials",
			icon: social.icon,
		});
	});

	featuresData.features
		.filter(
			(feature) =>
				user?.role === "Super Admin" || feature.role !== "Super Admin"
		)
		.map((feature) => {
			searchActions.push({
				id: feature.id,
				name: feature.title,
				perform: () => onClickLink(`/${feature.slug}`),
				parent: "features",
				keywords: feature.keywords,
			});
		});

	return (
		<>
			{isDesktopView ? (
				<>
					<AutoTopProvider />
					<KBarProvider actions={searchActions}>
						<GlobalSearch />
						<ToastProvider>
							<ToastContainer
								limit={3}
								transition={Slide}
								draggable={false}
								closeOnClick={true}
							/>
							<Routes>
								{/* routes with layout */}
								<Route path="/" element={<Layout />}>
									<Route element={<ProtectedMiddleware />}>
										<Route index element={<Home />} />
										<Route element={<SecureGuardMiddleware />}>
											<Route path="/admin" element={<Admin />} />
											<Route path="/admin/add" element={<AddAdmin />} />
											<Route
												path="/admin/edit/:adminId"
												element={<EditAdmin />}
											/>
											<Route path="/game/add" element={<AddGame />} />
											<Route path="/game/edit/:gameId" element={<EditGame />} />
											<Route path="/school" element={<School />} />
											<Route path="/school/add" element={<AddSchool />} />
											<Route
												path="/school/edit/:schoolId"
												element={<EditSchool />}
											/>
											<Route
												path="/school/:schoolId"
												element={<DetailSchool />}
											/>
										</Route>
										<Route path="/game" element={<Game />} />
										<Route path="/game/:gameId" element={<DetailGame />} />
										<Route
											path="/game/leaderboard/:gameId"
											element={<Leaderboard />}
										/>
										<Route path="/student" element={<Students />} />
										<Route path="/student/add" element={<AddStudent />} />
										<Route
											path="/student/edit/:studentId"
											element={<EditStudent />}
										/>
										<Route
											path="/student/score/:studentId"
											element={<Score />}
										/>
										<Route path="/profile/account" element={<Profile />} />
										<Route path="/activity" element={<Activity />} />
										<Route
											path="/profile/change-password"
											element={<ChangePassword />}
										/>
									</Route>
								</Route>
								{/* routes without layout */}
								<Route element={<AuthMiddleware />}>
									<Route path="/login" element={<Login />} />
								</Route>
								{/* not exist routes */}
								<Route path="*" element={<Navigate to="/404" replace />} />
								<Route path="/404" element={<ErrorPage />} />
							</Routes>
						</ToastProvider>
					</KBarProvider>
				</>
			) : (
				<ToastProvider>
					<ToastContainer
						limit={3}
						transition={Slide}
						draggable={false}
						closeOnClick={true}
					/>
					<main className="w-full min-h-screen bg-gradient-to-br from-indigo-400 from-20% via-sky-400 via-40% to-emerald-400 to-90% px-6 dark:from-indigo-600 dark:via-sky-600 dark:to-emerald-600">
						<div className="h-full w-full min-h-screen flex justify-center items-center">
							<div className="bg-white p-6 sm:p-8 rounded-xl w-auto sm:w-96 dark:bg-gray-800">
								<p className="mb-4">
									<img
										src={images.desktopIcon}
										alt="desktop icon"
										className="h-14"
									/>
								</p>
								<h4 className="mb-20 sm:mb-24 font-bold text-2xl text-gray-700 dark:text-gray-200">
									Gameon is only available on desktop for now.
								</h4>
								<p className="text-center mb-3 text-gray-400">
									Open this link on your desktop to access
								</p>
								<ButtonClipboard linkToCopy={window.location.href}>
									<Share2Icon
										size={20}
										className="inline-block mr-2.5"
										strokeWidth={3}
									/>
									<span>Share</span>
								</ButtonClipboard>
							</div>
						</div>
					</main>
				</ToastProvider>
			)}
		</>
	);
}

export default App;
