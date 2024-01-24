import { SuccessResponse } from '.';

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
interface LoginSuccessResponse extends SuccessResponse {
  data: LoginSuccessData;
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

export type {
  LoginSuccessData,
  LoginSuccessResponse,
  User,
  Token,
  AuthState,
  LoginRequest,
};
