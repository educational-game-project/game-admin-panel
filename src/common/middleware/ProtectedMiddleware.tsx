import { Navigate, Outlet } from 'react-router-dom';

function ProtectedMiddleware() {
  const token = true;

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
