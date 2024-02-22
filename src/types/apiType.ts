// BASE
interface UserAddBy {
  _id: string;
  name: string;
  role: string;
  email: string;
  phoneNumber: string;
  deletedAt: string | null;
  image: Image | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface User {
  _id: string;
  name: string;
  role: string;
  email: string;
  phoneNumber: string;
  deletedAt: string | null;
  addedBy: UserAddBy | null;
  image: Image | null;
  school: School | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface Image {
  _id: string;
  originalName: string;
  fileName: string;
  fileLink: string;
  mimeType: string;
  size: number;
  isDefault: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}
interface Student {
  _id: string;
  name: string;
  role: string;
  email: string;
  phoneNumber: string;
  password?: string;
  addedBy?: {
    _id: string;
    name: string;
    role: string;
    email: string;
    phoneNumber: string;
    deletedAt: string | null;
    image: Image | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  image: Image | null;
  school: {
    _id: string;
    name: string;
    address: string;
    adminsCount: number;
    studentsCount: number;
    deletedAt?: string | null;
    images: Image[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    createdAtString?: string;
    updatedAtString?: string;
  };
  createdAt: string;
  deletedAt: string | null;
  __v: number;
  createdAtString?: string;
  updatedAtString?: string;
}
interface Admin {
  _id: string;
  name: string;
  role: string;
  email: string;
  phoneNumber: string;
  deletedAt: null;
  addedBy: UserAddBy | null;
  image: Image | null;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}
interface AdminState {
  admin: Admin[] | null;
  page: PageResponse | null;
  status: string;
}
interface School {
  _id: string;
  name: string;
  address: string;
  adminsCount: number;
  studentsCount: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  lastUpdatedBy?: string | null;
  admins?: Admin[] | null;
  images: Image[];
  addedBy?: string | null;
  createdAtString?: string;
  updatedAtString?: string;
}

// RESPONSE
interface DefaultResponse {
  statusCode: number;
  status?: string;
  server_time: string;
  message: string;
}
interface PageResponse {
  totalData: number;
  perPage: number;
  currentPage: number;
  totalPage: number;
}
interface SuccessResponse extends DefaultResponse {
  success: true;
}
interface ErrorResponse extends DefaultResponse {}
interface ProfileSuccessResponse extends SuccessResponse {
  data: User;
}
interface StudentListSuccessResponse extends SuccessResponse {
  data: Student[];
  page: PageResponse;
}
interface StudentSuccessResponse extends SuccessResponse {
  data: Student;
}

interface AdminListSuccessResponse extends SuccessResponse {
  data: Admin[];
  page: PageResponse;
}
interface SchoolListSuccessResponse extends SuccessResponse {
  data: School[];
  page: PageResponse;
}
interface SchoolSuccessResponse extends SuccessResponse {
  data: School;
}

// CHECK DULU ========================================
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
  image: BaseImageProps;
  email: string;
  phoneNumber: string;
  password: string;
  deletedAt: string;
  school: BaseSchoolAdminProps;
  createdAt: string;
  createdAtString: string;
  updatedAtString: string;
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

// ====================

export type {
  AdminListSuccessResponse,
  SuccessResponse,
  ErrorResponse,
  ProfileSuccessResponse,
  StudentSuccessResponse,
  StudentListSuccessResponse,
  SchoolListSuccessResponse,
  SchoolSuccessResponse,
  Student,
  School,
  Image,
  User,
  Admin,
  AdminState,
  PageResponse,
  // CHECK DULU =================
  ScoreProps,
  ScoreResponse,
  StudentProps,
  StudentResponse,
  AdminProps,
  AdminResponse,
};
