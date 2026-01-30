import { CHIP_LABELS, type ChipCategory } from '@/entities/place';
import { usePlaceImageForm } from '@/features/place-image';
import { Alert, Button, Card, FileInput, Select } from '@/shared/ui';

// 칩 카테고리 옵션
const chipOptions = Object.entries(CHIP_LABELS).map(([value, label]) => ({
  value,
  label,
}));

export function PlaceImageForm() {
  const {
    selectedChip,
    handleChipChange,
    places,
    isLoadingPlaces,
    placeId,
    handlePlaceChange,
    selectedFile,
    handleFileChange,
    selectedPlace,
    placeDetail,
    isLoadingPlaceDetail,
    isPlacesError,
    isPlaceDetailError,
    isValid,
    handleSubmit,
    handleReset,
  } = usePlaceImageForm();

  // 장소 옵션
  const placeOptions = places.map((place) => ({
    value: place.placeId.toString(),
    label: `${place.name}${place.subName ? ` (${place.subName})` : ''}`,
  }));

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 칩 카테고리 선택 */}
        <Select
          id="chip"
          label="카테고리"
          required
          options={chipOptions}
          value={selectedChip ?? ''}
          onChange={(value) => handleChipChange(value as ChipCategory | '')}
          placeholder="카테고리를 선택하세요"
        />

        {/* 장소 선택 */}
        <Select
          id="place"
          label="장소"
          required
          options={placeOptions}
          value={placeId}
          onChange={handlePlaceChange}
          placeholder={
            isLoadingPlaces
              ? '장소 목록 불러오는 중...'
              : selectedChip
                ? '장소를 선택하세요'
                : '카테고리를 먼저 선택하세요'
          }
          disabled={!selectedChip || isLoadingPlaces}
        />

        {/* 선택된 장소 정보 */}
        {placeId && (
          <div className="rounded-lg bg-primary-50 p-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-primary-800">
                선택된 장소 정보
              </h4>
              {isLoadingPlaceDetail && (
                <span className="text-xs text-primary-600">불러오는 중...</span>
              )}
            </div>

            {placeDetail ? (
              <dl className="mt-2 space-y-2 text-sm text-primary-700">
                <div className="flex gap-2">
                  <dt className="font-medium">ID:</dt>
                  <dd>{placeDetail.placeId}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium">이름:</dt>
                  <dd>{placeDetail.name}</dd>
                </div>
                {placeDetail.subName && (
                  <div className="flex gap-2">
                    <dt className="font-medium">부가 이름:</dt>
                    <dd>{placeDetail.subName}</dd>
                  </div>
                )}
                {placeDetail.imageUrls.length > 0 && (
                  <div>
                    <dt className="mb-1 font-medium">현재 이미지:</dt>
                    <dd className="flex flex-wrap gap-2">
                      {placeDetail.imageUrls.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`장소 이미지 ${index + 1}`}
                          className="h-20 w-20 rounded object-cover"
                        />
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
            ) : (
              selectedPlace && (
                <dl className="mt-2 space-y-1 text-sm text-primary-700">
                  <div className="flex gap-2">
                    <dt className="font-medium">ID:</dt>
                    <dd>{selectedPlace.placeId}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium">이름:</dt>
                    <dd>{selectedPlace.name}</dd>
                  </div>
                  {selectedPlace.subName && (
                    <div className="flex gap-2">
                      <dt className="font-medium">부가 이름:</dt>
                      <dd>{selectedPlace.subName}</dd>
                    </div>
                  )}
                </dl>
              )
            )}
          </div>
        )}

        {/* 이미지 파일 선택 */}
        <FileInput
          id="image"
          label="변경할 이미지"
          required
          accept="image/*"
          onChange={handleFileChange}
          disabled={!placeId}
          helperText="JPG, PNG, GIF 형식의 이미지 파일을 선택해주세요"
        />

        {/* 선택된 파일 미리보기 */}
        {selectedFile && (
          <div className="rounded-lg bg-gray-50 p-4">
            <h4 className="mb-2 text-sm font-medium text-gray-700">
              선택된 파일
            </h4>
            <div className="flex items-center gap-4">
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="선택된 이미지 미리보기"
                className="h-24 w-24 rounded object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 에러 메시지 */}
        {(isPlacesError || isPlaceDetailError) && (
          <Alert variant="error">
            데이터를 불러오는 중 오류가 발생했습니다.
          </Alert>
        )}

        {/* 버튼 */}
        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" variant="primary" disabled={!isValid}>
            수정하기
          </Button>

          <Button type="button" variant="secondary" onClick={handleReset}>
            초기화
          </Button>
        </div>
      </form>
    </Card>
  );
}
