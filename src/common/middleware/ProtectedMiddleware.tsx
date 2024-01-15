import { Navigate, Outlet } from 'react-router-dom';
import { useToken } from '../../hook/authHooks';

function ProtectedMiddleware() {
  const { token } = useToken();
  return (
    <>
      {token ? (
        <Outlet />
      ) : (
        <Navigate
          to="/login"
          replace
        />
      )}
    </>
  );
}

export default ProtectedMiddleware;
