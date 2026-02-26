// 로그인 요청
export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface LoginResponse {
  tokenResponse: {
    accessToken: string;
    refreshToken: string;
    accessExpireIn: number;
    refreshExpireIn: number;
    isFirstLogin: boolean;
  };
  userResponse: {
    id: number;
    oauthId: string;
    loginId: string;
    email: string;
    nickname: string;
    studentId: string;
    imageUrl: string;
    departmentResponse: string[];
  };
}
