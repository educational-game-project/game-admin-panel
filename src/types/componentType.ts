import { ReactNode } from 'react';
import { Student } from '.';
import { User } from './apiType';

// alert dialog
interface AlertDialogProps {
  isOpen: boolean;
  message: string;
  isLoading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

// button clipboard
interface ButtonClipboardProps {
  linkToCopy: string;
  children: ReactNode;
}

// breadcrumb
interface Breadcrumb {
  icon: string;
  label: string | undefined;
  path: string;
}
interface BreadcrumbState {
  breadcrumbs: Breadcrumb[];
}
interface BreadcrumbIconProps {
  name: string | undefined;
}

// toast
interface ToastState {
  isAllowed: boolean;
}
interface ToastProviderProps {
  children: ReactNode;
}

// student
interface StudentTable {
  student: Student[];
  refetchStudent: () => void;
}

// profile
interface ProfileUserProps {
  user: User;
}
interface HeaderProfileProps {
  isProfilePage: boolean;
}

export type {
  AlertDialogProps,
  ButtonClipboardProps,
  Breadcrumb,
  BreadcrumbState,
  BreadcrumbIconProps,
  HeaderProfileProps,
  ProfileUserProps,
  ToastState,
  ToastProviderProps,
  StudentTable,
};
