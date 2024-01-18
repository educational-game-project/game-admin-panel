import { useMemo } from 'react';
import { useAppSelector } from '../app/hooks';
import {
  isAuthenticated,
  selectCurrentToken,
  selectCurrentUser,
} from '../features/authSlice';

export const useUser = () => {
  const user = useAppSelector(selectCurrentUser);
  return useMemo(() => ({ user }), [user]);
};

export const useToken = () => {
  const token = useAppSelector(selectCurrentToken);
  return useMemo(() => ({ token }), [token]);
};

export const useAuth = () => {
  const isAuth = useAppSelector(isAuthenticated);
  return useMemo(() => ({ isAuth }), [isAuth]);
};
