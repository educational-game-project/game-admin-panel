import { toast, ToastOptions } from "react-toastify";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  InfoIcon,
} from "lucide-react";

const toastConfig: ToastOptions = {
  position: toast.POSITION.BOTTOM_CENTER,
  autoClose: 3000,
  theme: "dark",
  hideProgressBar: true,
};

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    ...toastConfig,
    icon: <CheckCircle2 size={20} />,
    className: "toastify-containers toastify-success",
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    ...toastConfig,
    icon: <AlertCircle size={20} />,
    className: "toastify-containers toastify-error",
  });
};

export const showInfoToast = (message: string) => {
  toast.info(message, {
    ...toastConfig,
    icon: <InfoIcon size={20} />,
    className: "toastify-containers toastify-info",
  });
};

export const showWarningToast = (message: string) => {
  toast.warn(message, {
    ...toastConfig,
    icon: <AlertTriangle size={20} />,
    className: "toastify-containers toastify-warning",
  });
};

export const showDefaultToast = (message: string) => {
  toast.info(message, {
    ...toastConfig,
    icon: <CheckCircle2 size={20} />,
    className: "toastify-containers toastify-info",
  });
};
