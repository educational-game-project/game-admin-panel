import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectIsAllowedToast,
  setNotAllowedToast,
} from '../features/toastSlice';

import type { ToastProviderProps } from '../types';

const ToastProvider = ({ children }: ToastProviderProps) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isAllowed = useAppSelector(selectIsAllowedToast);

  useEffect(() => {
    if (!isAllowed) {
      toast.clearWaitingQueue();
      toast.dismiss();
    } else {
      setTimeout(() => {
        dispatch(setNotAllowedToast());
      }, 3000);
    }
  }, [dispatch, isAllowed, location.key]);

  return <>{children}</>;
};

export default ToastProvider;
