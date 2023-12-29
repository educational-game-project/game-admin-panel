import { Navigate, Outlet } from 'react-router-dom';

function ProtectedMiddleware() {
  const token = import.meta.env.VITE_AUTH_TOKEN ? true : false;

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
