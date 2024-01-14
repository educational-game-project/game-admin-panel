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

interface LoginSuccessResponse {
  status_code: number;
  success: true;
  status: 'success';
  message: 'auth_login_success';
  server_time: string;
  data: {
    user: User;
    tokens: Token;
  };
}

interface AuthState {
  user: User | null;
  token: Token | null;
}

interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export type { LoginSuccessResponse, User, Token, AuthState, LoginRequest };
