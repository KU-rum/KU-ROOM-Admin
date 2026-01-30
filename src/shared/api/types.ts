// 공통 API 응답 타입
export interface ApiResponse<T = void> {
  code: number;
  status: string;
  message: string;
  data?: T;
}
