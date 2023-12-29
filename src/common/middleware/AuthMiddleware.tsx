import { Navigate, Outlet } from 'react-router-dom';

function AuthMiddleware() {
  const token = import.meta.env.VITE_AUTH_TOKEN ? true : false;

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
