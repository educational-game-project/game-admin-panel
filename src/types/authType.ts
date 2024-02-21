import { Image, SuccessResponse } from '.';

interface UserAuth {
  _id: string;
  name: string;
  role: string;
  email: string;
  phoneNumber: string;
  image: Image | null;
  school: string;
}
interface Token {
  accessToken: string;
  refreshToken: string;
}
interface LoginSuccessData {
  user: UserAuth;
  tokens: Token;
}
interface LoginSuccessResponse extends SuccessResponse {
  data: LoginSuccessData;
}
interface AuthState {
  user: UserAuth | null;
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
  UserAuth,
  Token,
  AuthState,
  LoginRequest,
};
