import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setBreadcrumb } from "../../features/breadcrumbSlice";
import Breadcrumb from "../../components/Breadcrumb";
import HeaderContainer from "../../components/HeaderContainer";
import StudentsTable from "./components/StudentsTable";

function Students() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const newBreadcrumb = [
			{
				icon: "student",
				label: "Students",
				path: "/student",
			},
		];
		dispatch(setBreadcrumb(newBreadcrumb));
	}, [dispatch]);

	return (
		<div className="">
			<div className="mb-6">
				<Breadcrumb />
				<HeaderContainer
					title="Siswa"
					subtitle="Lihat daftar siswa yang terdaftar."
					btnHref="/student/add"
					btnText="Tambah Siswa"
				/>
			</div>
			<div className="bg-white p-5 rounded-xl dark:bg-gray-800">
				<StudentsTable />
			</div>
		</div>
	);
}

export default Students;
