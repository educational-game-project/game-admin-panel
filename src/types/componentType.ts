import type { ReactNode } from 'react';
import type {
  ScoreSuccessResponse,
  Student,
  StudentSuccessResponse,
  User,
} from './apiType';

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

// header
interface HeaderContainerProps {
  title: string;
  subtitle: string;
  btnHref?: string;
  btnText?: string;
}

// student
interface StudentTableProps {
  student: Student[];
  refetchStudent: () => void;
}

// score
interface ScoreTableProps {
  scores: ScoreSuccessResponse | undefined;
  isLoading: boolean;
  isLargeView: boolean;
  isSuccess: boolean;
  isError: boolean;
  fetchScore: () => void;
}
interface UserScoreProps {
  isLoading: boolean;
  isLoadingGet: boolean;
  students: StudentSuccessResponse | undefined;
}
interface GameTableProps {
  scores: ScoreSuccessResponse | undefined;
  isLoading: boolean;
  isLargeView: boolean;
  isError: boolean;
  fetchScore: () => void;
  studentId: string | undefined;
}
interface GameTableState {
  id: string;
  name: string;
}

// profile
interface ProfileUserProps {
  user: User;
}
interface HeaderProfileProps {
  isProfilePage: boolean;
}

interface ModalDisplayProps {
  children: ReactNode;
  isOpen: boolean;
  closeModal: () => void;
  title: string;
}

export type {
  AlertDialogProps,
  Breadcrumb,
  BreadcrumbState,
  BreadcrumbIconProps,
  ButtonClipboardProps,
  GameTableProps,
  GameTableState,
  HeaderContainerProps,
  HeaderProfileProps,
  ModalDisplayProps,
  ProfileUserProps,
  ScoreTableProps,
  StudentTableProps,
  ToastState,
  ToastProviderProps,
  UserScoreProps,
};
