import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../../hook/authHooks";

function SecureGuardMiddleware() {
	const { user } = useUser();
	const location = useLocation();

	return (
		<>
			{user?.role !== "Super Admin" ? (
				<Navigate to="/" state={{ from: location.pathname }} replace />
			) : (
				<Outlet />
			)}
		</>
	);
}

export default SecureGuardMiddleware;
