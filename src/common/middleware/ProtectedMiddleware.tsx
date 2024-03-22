import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hook/authHooks";

function ProtectedMiddleware() {
	const { isAuth } = useAuth();
	const location = useLocation();

	return (
		<>
			{isAuth ? (
				<Outlet />
			) : (
				<Navigate to="/login" state={{ from: location.pathname }} replace />
			)}
		</>
	);
}

export default ProtectedMiddleware;
