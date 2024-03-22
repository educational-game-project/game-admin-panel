import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { useGetScoreMutation } from "../../services/scoreApi";
import { useGetStudentByIdMutation } from "../../services/studentApi";
import { setAllowedToast } from "../../features/toastSlice";
import { setBreadcrumb } from "../../features/breadcrumbSlice";
import { showErrorToast } from "../../components/Toast";
import Breadcrumb from "../../components/Breadcrumb";
import ScoreTable from "./components/ScoreTable";
import GameTable from "./components/GameTable";
import UserScore from "./components/UserScore";
import { Loader2Icon } from "lucide-react";

import type { Score } from "../../types";

function Score() {
	const [isLargeView, setIsLargeView] = useState<boolean>(
		window.innerWidth > 1024
	);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { studentId } = useParams();

	const [getScore, { data: scores, isSuccess, isError, isLoading }] =
		useGetScoreMutation();
	const [getStudentById, { data: students, isLoading: isLoadingGet }] =
		useGetStudentByIdMutation();

	const fetchScore = async () => {
		try {
			await getScore({ userId: studentId || "" }).unwrap();
		} catch (error) {
			dispatch(setAllowedToast());
			showErrorToast("Data skor tidak ditemukan");
			navigate("/student");
		}
	};
	const fetchStudentById = async () => {
		try {
			await getStudentById({ id: studentId || "" }).unwrap();
		} catch (error) {
			dispatch(setAllowedToast());
			showErrorToast("Data siswa tidak ditemukan");
			navigate("/student");
		}
	};

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
		const newBreadcrumb = [
			{
				icon: "student",
				label: "Student",
				path: "/student",
			},
			{
				icon: "score",
				label: "Score",
				path: `/student/score/${studentId}`,
			},
		];
		dispatch(setBreadcrumb(newBreadcrumb));
	}, [dispatch, studentId]);
	useEffect(() => {
		if (studentId) {
			fetchScore();
			fetchStudentById();
		}
	}, [studentId]);

	return (
		<div>
			<div className="mb-5">
				<Breadcrumb />
				<div className="flex items-center justify-between">
					<div className="">
						<h5 className="font-semibold text-3xl mb-1.5 flex items-center">
							Skor
							{isLoading || isLoadingGet ? (
								<span className="translate-y-px">
									<Loader2Icon
										size={22}
										className="ml-3 animate-spin-fast stroke-gray-900 dark:stroke-gray-300"
									/>
								</span>
							) : (
								""
							)}
						</h5>
						<p className="text-gray-500">
							Lihat riwayat skor dan permainan pemain di sini.
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
							to="/student"
						>
							Kembali
						</Link>
					</div>
				</div>
			</div>
			<div className="mb-5 flex">
				<UserScore
					isLoading={isLoading}
					isLoadingGet={isLoadingGet}
					students={students}
				/>
			</div>
			<ScoreTable
				fetchScore={fetchScore}
				isError={isError}
				isLoading={isLoading}
				isLargeView={isLargeView}
				isSuccess={isSuccess}
				scores={scores}
			/>
			<GameTable
				fetchScore={fetchScore}
				isError={isError}
				isLoading={isLoading}
				isLoadingUser={isLoadingGet}
				isLargeView={isLargeView}
				scores={scores}
				studentId={studentId}
				userData={students}
			/>
		</div>
	);
}

export default Score;
