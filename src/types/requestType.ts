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
  school: string;
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
interface GameAddRequest {
  name: string;
  author: string;
  description: string;
  category: string;
  maxLevel: number;
  maxRetry: number;
  maxTime: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  media: File[] | any[];
}
interface GameUpdateRequest {
  id?: string;
  name: string;
  author: string;
  description: string;
  category: string;
  maxLevel: number;
  maxRetry: number;
  maxTime: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  media?: File[] | any[] | undefined | null;
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
interface StudentUpdateRequest {
  id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  school: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  media?: File | Blob | any | undefined;
}
interface ScoreGetRequest {
  userId: string;
}
interface LeaderboardGetRequest {
  gameId: string;
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
  GameAddRequest,
  GameIdRequest,
  GameUpdateRequest,
  LeaderboardGetRequest,
  SchoolAddRequest,
  SchoolIdRequest,
  SchoolUpdateRequest,
  ScoreGetRequest,
  StudentAddRequest,
  StudentIdRequest,
  StudentUpdateRequest,
};
