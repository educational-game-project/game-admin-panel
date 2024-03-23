import { useEffect, useMemo } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useGetDashboardQuery } from "../../services/dashboardApi";
import { setBreadcrumb } from "../../features/breadcrumbSlice";
import { showErrorToast } from "../../components/Toast";
import Breadcrumb from "../../components/Breadcrumb";
import PerformanceWidget from "./components/PerformanceWidget";
import PerformanceChart from "./components/PerformanceChart";
import SchoolOverview from "./components/SchoolOverview";
import GameOverview from "./components/GameOverview";
import { BarsScaleFade } from "react-svg-spinners";

import type { School, SchoolChartType } from "../../types";
import { AlertTriangleIcon } from "lucide-react";

function Home() {
	const dispatch = useAppDispatch();
	const {
		data: dashboards,
		isLoading,
		isError,
		isSuccess,
	} = useGetDashboardQuery();

	if (isError) {
		showErrorToast("Gagal memuat data");
	}

	const transformSchoolData = (
		schoolsData: School[] | undefined
	): SchoolChartType[] => {
		if (!schoolsData || !Array.isArray(schoolsData)) {
			return [];
		}
		return schoolsData.map((school) => ({
			name: school.name,
			admin: school.adminsCount,
			student: school.studentsCount,
		}));
	};

	const schoolChart = useMemo(() => {
		return transformSchoolData(dashboards?.data?.schools) || [];
	}, [dashboards?.data?.schools]);

	useEffect(() => {
		dispatch(setBreadcrumb([]));
	}, [dispatch]);

	return (
		<div>
			<div className="mb-6">
				<Breadcrumb />
				<h5 className="font-semibold text-3xl mb-1.5">Home</h5>
				<p className="text-gray-500">Selamat datang di Dashboard Gameon.</p>
			</div>
			<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-6 gap-4">
				<PerformanceWidget
					countItem={dashboards?.data?.gameCount}
					isError={isError}
					name="permainan"
					type="simple"
				/>
				<PerformanceWidget
					countItem={dashboards?.data?.schoolCount}
					isError={isError}
					name="sekolah"
					type="simple"
				/>
				<PerformanceWidget
					activeItem={dashboards?.data?.activeAdmin}
					countItem={dashboards?.data?.adminCount}
					isError={isError}
					name="admin"
					type="advanced"
				>
					<PerformanceChart
						baseColor="#f59e0b"
						currentvalue={dashboards?.data?.activeAdmin}
						totalValue={dashboards?.data?.adminCount}
					/>
				</PerformanceWidget>
				<PerformanceWidget
					activeItem={dashboards?.data?.activeStudents}
					countItem={dashboards?.data?.studentsCount}
					isError={isError}
					name="siswa"
					type="advanced"
				>
					<PerformanceChart
						baseColor="#10b981"
						currentvalue={dashboards?.data?.activeStudents}
						totalValue={dashboards?.data?.studentsCount}
					/>
				</PerformanceWidget>
			</div>
			<div className="grid grid-cols-6 mb-6 gap-4">
				<div className="col-span-full xl:col-span-4">
					{isLoading && (
						<div className="bg-white p-5 rounded-xl dark:bg-gray-800">
							<div className="animate-pulse-fast skeleton-loader skeleton-sm w-48 mb-2" />
							<div className="animate-pulse-fast skeleton-loader skeleton-sm w-2/3 min-w-40 mb-5" />
							<div className="w-full h-80 mb-1.5 flex items-center justify-center">
								<BarsScaleFade
									width="2rem"
									height="2rem"
									color="#6b7280"
									dur={0.5}
								/>
							</div>
						</div>
					)}
					{isSuccess && <SchoolOverview data={schoolChart} />}
					{isError && (
						<div className="bg-white p-5 rounded-xl dark:bg-gray-800">
							<div className="mb-4">
								<h5 className="font-semibold text-lg mb-0.5">
									School Overview
								</h5>
								<p className="text-gray-500">
									Overview of the school's performance.
								</p>
							</div>
							<div className="w-full h-44 flex items-center justify-center flex-col">
								<div className="mb-3">
									<AlertTriangleIcon
										size={42}
										className="stroke-gray-500 dark:stroke-gray-400"
									/>
								</div>
								<p className="text-center text-gray-500">
									No data available. Please try again later.
								</p>
							</div>
						</div>
					)}
				</div>
				<div className="col-span-full xl:col-span-2">
					{isLoading && (
						<div className="bg-white p-5 rounded-xl dark:bg-gray-800">
							<div className="animate-pulse-fast skeleton-loader skeleton-sm w-36 mb-2" />
							<div className="animate-pulse-fast skeleton-loader skeleton-sm w-3/4 min-w-40 mb-5" />
							<div className="w-full h-80 mb-1.5 flex items-center justify-center">
								<BarsScaleFade
									width="2rem"
									height="2rem"
									color="#6b7280"
									dur={0.5}
								/>
							</div>
						</div>
					)}
					{isSuccess && <GameOverview data={dashboards?.data?.games} />}
					{isError && (
						<div className="bg-white p-5 rounded-xl dark:bg-gray-800">
							<div className="mb-4">
								<h5 className="font-semibold text-lg mb-0.5">Game Overview</h5>
								<p className="text-gray-500">
									Overview of the game's performance.
								</p>
							</div>
							<div className="w-full h-44 flex items-center justify-center flex-col">
								<div className="mb-3">
									<AlertTriangleIcon
										size={42}
										className="stroke-gray-500 dark:stroke-gray-400"
									/>
								</div>
								<p className="text-center text-gray-500">
									No data available. Please try again later.
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Home;
