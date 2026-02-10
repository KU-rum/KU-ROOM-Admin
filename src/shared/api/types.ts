// 공통 API 응답 타입
export interface ApiResponse<T = void> {
  code: number;
  status: string;
  message: string;
  data?: T;
}

export interface ApiErrorBody {
  code?: number;
  status?: string;
  message?: string;
}

export class ApiClientError extends Error {
  response: ApiErrorBody;

  constructor(response: ApiErrorBody) {
    super(response.message ?? '요청 실패');
    this.name = 'ApiClientError';
    this.response = response;
  }
}
