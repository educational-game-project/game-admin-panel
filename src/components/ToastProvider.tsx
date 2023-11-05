import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

type ToastProviderProps = {
  children: ReactNode;
};

const ToastProvider = ({ children }: ToastProviderProps) => {
  const location = useLocation();

  useEffect(() => {
    toast.clearWaitingQueue();
    toast.dismiss();
  }, [location.key]);

  return <>{children}</>;
};

export default ToastProvider;
