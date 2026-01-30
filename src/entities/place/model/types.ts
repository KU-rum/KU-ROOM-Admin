// 장소 내용 수정 요청
export interface UpdatePlaceContentRequest {
  placeId: string;
  content: string;
}

// 장소 내용 수정 요청 바디
export interface UpdatePlaceContentBody {
  content: string;
}
