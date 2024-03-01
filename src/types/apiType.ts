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
  isActive?: boolean;
  addedBy?: UserAddBy | null;
  image: Image | null;
  school: School;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
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
  __v?: number;
}
interface GameLite {
  _id: string;
  name: string;
  author: string;
  description: string;
  category: string;
  maxLevel: number;
  maxRetry: number;
  maxTime?: number;
  deletedAt: string | null;
  images: string[];
  addedBy: string;
  createdAt: string;
  updatedAt: string;
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
interface Score {
  level: number;
  value: number;
  createdAt: string;
  gamePlayed?: number;
}
interface Leaderboard {
  _id: string;
  value: number;
  user: {
    _id: string;
    name: string;
    role: string;
    email: string | null;
    phoneNumber: string | null;
    image: Image;
    school: string;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
  };
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
interface ScoreResponse {
  scores: Score[];
  game: GameLite;
}
interface ScoreSuccessResponse extends SuccessResponse {
  data: ScoreResponse[];
}
interface ScoreChartSuccessResponse extends SuccessResponse {
  data: {
    scores: Score[][];
    game: GameLite;
  };
}
interface LeaderboardResponse {
  game: GameLite;
  school: School;
  leaderboard: Leaderboard[];
}
interface LeaderboardSuccessResponse extends SuccessResponse {
  data: LeaderboardResponse[];
}
interface DashboardSuccessResponse extends SuccessResponse {
  studentsCount: number;
  activeStudents: number;
  adminCount: number;
  activeAdmin: number;
  gameCount: number;
  games: Game[];
  schoolCount: number;
  schools: School[];
}

export type {
  Admin,
  AdminListSuccessResponse,
  AdminSuccessResponse,
  DashboardSuccessResponse,
  ErrorResponse,
  Image,
  Game,
  GameListSuccessResponse,
  GameSuccessResponse,
  LeaderboardResponse,
  LeaderboardSuccessResponse,
  PageResponse,
  ProfileSuccessResponse,
  School,
  SchoolListSuccessResponse,
  SchoolSuccessResponse,
  Score,
  ScoreResponse,
  ScoreChartSuccessResponse,
  ScoreSuccessResponse,
  Student,
  StudentListSuccessResponse,
  StudentSuccessResponse,
  SuccessResponse,
  User,
};
