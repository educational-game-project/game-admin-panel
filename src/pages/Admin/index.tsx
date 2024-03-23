import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setBreadcrumb } from "../../features/breadcrumbSlice";
import Breadcrumb from "../../components/Breadcrumb";
import HeaderContainer from "../../components/HeaderContainer";
import AdminTable from "./components/AdminTable";

function Admin() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		const newBreadcrumb = [
			{
				icon: "admin",
				label: "Admin",
				path: "/admin",
			},
		];
		dispatch(setBreadcrumb(newBreadcrumb));
	}, [dispatch]);

	return (
		<div>
			<div className="mb-6">
				<Breadcrumb />
				<HeaderContainer
					title="Admin"
					subtitle="Kelola admin yang dapat mengakses dashboard."
					btnHref="/admin/add"
					btnText="Tambah Admin"
				/>
			</div>
			<div className="bg-white p-5 rounded-xl dark:bg-gray-800">
				<AdminTable />
			</div>
		</div>
	);
}

export default Admin;
