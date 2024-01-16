import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser } from '../features/authSlice';
import { useMemo } from 'react';

export const useAuth = () => {
  const user = useSelector(selectCurrentUser);
  return useMemo(() => ({ user }), [user]);
};

export const useToken = () => {
  const token = useSelector(selectCurrentToken);
  return useMemo(() => ({ token }), [token]);
};
