import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hook/authHooks';

function SecureGuardMiddleware() {
  const { user } = useAuth();

  return (
    <>
      {user?.role !== 'Super Admin' ? (
        <Navigate
          to="/"
          replace
        />
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default SecureGuardMiddleware;
