interface UserProps {
  _id: string;
  name: string;
  role: string;
  email: string;
  phoneNumber: string;
  images: string[];
  school: string;
}

interface TokenProps {
  accessToken: string;
  refreshToken: string;
}

interface LoginSuccessResponse {
  status_code: number;
  success: true;
  status: 'success';
  message: 'auth_login_success';
  server_time: string;
  data: {
    user: UserProps;
    tokens: TokenProps;
  };
}

// ========== separate ==========

interface BaseImageProps {
  originalname: string;
  filename: string;
  fileLink: string;
  mimeType: string;
  isDefault: boolean;
  deletedAt: string | null;
  _id: string;
  createdAt: string;
  updatedAt: string;
  size?: number;
}
interface BaseAdminSchoolProps {
  _id: string;
  name: string;
  role: string;
  images: BaseImageProps[];
  email: string;
  phoneNumber: string;
}
interface BaseSchoolAdminProps {
  _id: string;
  name: string;
  address: string;
  images: string | BaseImageProps[];
  adminsCount: number;
  studentsCount: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  createdAtString: string;
  updatedAtString: string;
}

interface ScoreProps {
  id: string;
  name: string;
  score: number;
}
interface StudentProps {
  _id: string;
  name: string;
  role: string;
  images: BaseImageProps;
  email: string;
  phoneNumber: string;
  password: string;
  deletedAt: string;
  school: BaseSchoolAdminProps;
  createdAt: string;
  createdAtString: string;
  updatedAtString: string;
}
interface SchoolProps {
  _id: string;
  name: string;
  address: string;
  images: BaseImageProps[];
  adminsCount: number;
  studentsCount: number;
  deletedAt: string | null;
  admins: BaseAdminSchoolProps[];
  createdAt: string;
  updatedAt: string;
}
interface AdminProps {
  _id: string;
  name: string;
  role: string;
  images: BaseImageProps[];
  email: string;
  phoneNumber: string;
  password: string;
  deletedAt: string | null;
  school: BaseSchoolAdminProps;
  createdAt: string;
  updatedAt: string;
  createdAtString: string;
  updatedAtString: string;
}

interface ScoreResponse {
  data: ScoreProps[];
}
interface StudentResponse {
  data: StudentProps[];
}
interface AdminResponse {
  data: AdminProps[];
}
interface SchoolResponse {
  data: SchoolProps[];
}

// ====================

export type {
  ScoreProps,
  ScoreResponse,
  StudentProps,
  StudentResponse,
  AdminProps,
  AdminResponse,
  SchoolProps,
  SchoolResponse,
  LoginSuccessResponse,
};
