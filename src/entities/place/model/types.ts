// 칩 카테고리 타입
export type ChipCategory =
  | 'BUILDING'
  | 'COLLEGE'
  | 'K_CUBE'
  | 'CAFE'
  | 'CONV'
  | 'FOOD'
  | 'LIBRARY'
  | 'PRINT'
  | 'READING_ROOM'
  | 'REST'
  | 'HEALTH'
  | 'BANK';

// 칩 카테고리 라벨
export const CHIP_LABELS: Record<ChipCategory, string> = {
  BUILDING: '건물',
  COLLEGE: '단과대학',
  K_CUBE: 'K-CUBE',
  CAFE: '카페',
  CONV: '편의점',
  FOOD: '식당',
  LIBRARY: '도서관',
  PRINT: '프린트',
  READING_ROOM: '열람실',
  REST: '휴게실',
  HEALTH: '건강',
  BANK: '은행',
};

// 친구 정보
export interface Friend {
  nickname: string;
  profileUrl: string;
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

// 장소 이미지 수정 요청
export interface UpdatePlaceImagesRequest {
  placeId: string;
  images: File[];
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
