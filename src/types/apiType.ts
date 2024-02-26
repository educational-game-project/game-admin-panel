// BASE
interface UserAddBy {
  _id: string;
  name: string;
  role: string;
  email: string;
  phoneNumber: string;
  image: Image | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  __v: number;
}
interface User {
  _id: string;
  name: string;
  role: string;
  email: string;
  phoneNumber: string;
  image: Image | null;
  school: School | null;
  addedBy: UserAddBy | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
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
  addedBy?: UserAddBy | null;
  image: Image | null;
  school: School | null;
  createdAt: string;
  deletedAt: string | null;
  createdAtString?: string;
  updatedAtString?: string;
  __v: number;
}
interface Admin {
  _id: string;
  name: string;
  role: string;
  email: string;
  phoneNumber: string;
  password: string;
  image: Image | null;
  school: School | null;
  addedBy: UserAddBy | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: null;
  createdAtString?: string;
  updatedAtString?: string;
}
interface School {
  _id: string;
  name: string;
  address: string;
  adminsCount: number;
  studentsCount: number;
  images: Image[];
  admins?: Admin[] | null;
  addedBy?: UserAddBy | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  createdAtString?: string;
  updatedAtString?: string;
  lastUpdatedBy?: string | null;
  __v: number;
}
interface Game {
  _id: string;
  name: string;
  author: string;
  description: string;
  category: string;
  maxLevel: number;
  maxRetry: number;
  maxTime?: number;
  images: Image[];
  addedBy: UserAddBy;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdAtString?: string;
  updatedAtString?: string;
  __v: number;
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
interface AdminSuccessResponse extends SuccessResponse {
  data: Admin;
}
interface SchoolListSuccessResponse extends SuccessResponse {
  data: School[];
  page: PageResponse;
}
interface SchoolSuccessResponse extends SuccessResponse {
  data: School;
}
interface GameListSuccessResponse extends SuccessResponse {
  data: Game[];
  page: PageResponse;
}
interface GameSuccessResponse extends SuccessResponse {
  data: Game;
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
  Admin,
  AdminListSuccessResponse,
  AdminSuccessResponse,
  ErrorResponse,
  Image,
  Game,
  GameListSuccessResponse,
  GameSuccessResponse,
  PageResponse,
  ProfileSuccessResponse,
  School,
  SchoolListSuccessResponse,
  SchoolSuccessResponse,
  Student,
  StudentListSuccessResponse,
  StudentSuccessResponse,
  SuccessResponse,
  User,
  // CHECK DULU =================
  ScoreProps,
  ScoreResponse,
  StudentProps,
  StudentResponse,
  AdminProps,
  AdminResponse,
};
