import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hook/authHooks';

function AuthMiddleware() {
  const { isAuth } = useAuth();
  const location = useLocation();
  const prevPath =
    location.state?.from === '/login' ? '/' : location.state?.from || '/';

  return (
    <>
      {isAuth ? (
        <Navigate
          to={prevPath}
          replace
        />
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default AuthMiddleware;
