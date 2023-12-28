import { Navigate, Outlet } from 'react-router-dom';

function AuthMiddleware() {
  const token = true;

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
