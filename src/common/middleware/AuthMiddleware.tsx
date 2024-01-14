import { Navigate, Outlet } from 'react-router-dom';
import { useToken } from '../../hook/authHooks';

function AuthMiddleware() {
  const { token } = useToken();

  return (
    <>
      {token ? (
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

export default AuthMiddleware;
