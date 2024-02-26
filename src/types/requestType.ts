interface idRequest {
  id: string;
}
interface AdminIdRequest extends idRequest {}
interface GameIdRequest extends idRequest {}
interface SchoolIdRequest extends idRequest {}
interface StudentIdRequest extends idRequest {}
interface StudentAddRequest {
  name: string;
  email: string;
  phoneNumber: string;
  schoolId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  media?: File | Blob | any;
}
interface SchoolAddRequest {
  name: string;
  address: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  media?: File | Blob | any;
}
interface AdminAddRequest {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  school: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  media?: File | Blob | any;
}
interface SchoolUpdateRequest {
  id?: string;
  name: string;
  address: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  media?: File | Blob | any | undefined;
}
interface AdminUpdateRequest {
  id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  school: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  media?: File | Blob | any | undefined;
}
interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
interface DataTableGetRequest {
  search: string;
  schoolId?: string;
  page?: number;
  limit?: number;
}

export type {
  AdminAddRequest,
  AdminIdRequest,
  AdminUpdateRequest,
  ChangePasswordRequest,
  DataTableGetRequest,
  GameIdRequest,
  SchoolAddRequest,
  SchoolIdRequest,
  SchoolUpdateRequest,
  StudentAddRequest,
  StudentIdRequest,
};
