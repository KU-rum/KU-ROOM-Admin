// 칩 카테고리 타입
export type ChipCategory =
  | 'BUILDING'
  | 'COLLEGE'
  | 'K_CUBE'
  | 'K_HUB'
  | 'CONVENIENCE_STORE'
  | 'CAFE_RESTIO'
  | 'CAFE_1847'
  | 'STUDENT_CAFETERIA'
  | 'DORMITORY'
  | 'BANK'
  | 'POST_OFFICE';

// 칩 카테고리 라벨
export const CHIP_LABELS: Record<ChipCategory, string> = {
  BUILDING: '건물',
  COLLEGE: '단과대',
  K_CUBE: 'K-Cube',
  K_HUB: 'K-Hub',
  CONVENIENCE_STORE: '편의점',
  CAFE_RESTIO: '레스티오',
  CAFE_1847: '1847',
  STUDENT_CAFETERIA: '학생식당',
  DORMITORY: '기숙사',
  BANK: '은행',
  POST_OFFICE: '우체국',
};

// 친구 정보
export interface Friend {
  nickname: string;
  profileUrl: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

// 장소 정보 (지도 칩 API)
export interface Place {
  placeId: number;
  name: string;
  subName: string;
  content: string | null;
  latitude: number;
  longitude: number;
  friends: string[];
}

// 장소 상세 정보 (장소 정보 조회 API)
export interface PlaceDetail {
  placeId: number;
  name: string;
  subName: string;
  content: string;
  latitude: number;
  longitude: number;
  friends: Friend[];
  ranks: null;
  imageUrls: string[];
}

export interface PlaceImage {
  placeImageId: number;
  imageUrl: string;
}

// 장소 목록 조회 요청
export interface GetPlacesRequest {
  chip: ChipCategory;
}

// 장소 내용 수정 요청
export interface UpdatePlaceContentRequest {
  placeId: string;
  content: string;
}

// 장소 내용 수정 요청 바디
export interface UpdatePlaceContentBody {
  content: string;
}

// 장소 이미지 추가 요청
export interface AddPlaceImagesRequest {
  placeId: string;
  images: File[];
}

// 장소 이미지 삭제 요청
export interface DeletePlaceImageRequest {
  placeId: string;
  placeImageId: number;
}

// 장소 부가 이름 수정 요청
export interface UpdatePlaceSubnameRequest {
  placeId: string;
  subName: string;
}

// 장소 부가 이름 수정 요청 바디
export interface UpdatePlaceSubnameBody {
  subName: string;
}

// 장소 추가 요청
export interface CreatePlaceRequest extends Location {
  categoryChip: ChipCategory;
  name: string;
  subName: string;
  content: string;
}

// 장소 위치 수정 요청
export interface UpdateLocationRequest extends Location {
  placeId: number;
}

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
