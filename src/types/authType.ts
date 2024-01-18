interface User {
  _id: string;
  name: string;
  role: string;
  email: string;
  phoneNumber: string;
  images: string[];
  school: string;
}
interface Token {
  accessToken: string;
  refreshToken: string;
}
interface LoginSuccessData {
  user: User;
  tokens: Token;
}
interface LoginSuccessResponse {
  status_code: number;
  success: true;
  status: string;
  message: string;
  server_time: string;
  data: LoginSuccessData;
}
interface LogoutSuccessResponse {
  status_code: number;
  success: boolean;
  status: string;
  server_time: string;
  message: string;
}
interface AuthState {
  user: User | null;
  token: Token | null;
  isAuth: boolean | null;
}
interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}
interface LoginErrorResponse {
  statusCode: number;
  status: string;
  server_time: string;
  message: string;
}

export type {
  LoginErrorResponse,
  LoginSuccessData,
  LogoutSuccessResponse,
  LoginSuccessResponse,
  User,
  Token,
  AuthState,
  LoginRequest,
};
