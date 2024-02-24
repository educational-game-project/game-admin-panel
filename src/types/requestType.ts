interface DataTableGetRequest {
  search: string;
  schoolId?: string;
  page?: number;
  limit?: number;
}
interface StudentAddRequest {
  name: string;
  email: string;
  phoneNumber: string;
  schoolId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  media?: File | Blob | any;
}
interface StudentIdRequest {
  id: string;
}
interface SchoolAddRequest {
  name: string;
  address: string;
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
interface SchoolIdRequest {
  id: string;
}
interface AdminIdRequest {
  id: string;
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

export type {
  AdminAddRequest,
  AdminUpdateRequest,
  AdminIdRequest,
  ChangePasswordRequest,
  DataTableGetRequest,
  StudentAddRequest,
  StudentIdRequest,
  SchoolAddRequest,
  SchoolUpdateRequest,
  SchoolIdRequest,
};
