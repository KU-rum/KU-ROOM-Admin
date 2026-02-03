import IcCloseBtn from '@/assets/icons/close-btn.svg?react';
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
    isPlacesError,
    placeId,
    handlePlaceChange,
    selectedFiles,
    handleFileChange,
    selectedPlace,
    placeDetail,
    isLoadingPlaceDetail,
    isPlaceDetailError,
    placeImagesData,
    isPendingPlaceImage,
    isPlaceImageError,
    isValid,
    isPending,
    isSuccess,
    isError,
    error,
    handleSubmit,
    handleReset,
    handleDeleteImage,
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
          disabled={isPending}
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
          disabled={isPending || !selectedChip || isLoadingPlaces}
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

        {placeDetail && (
          <div>
            <dt className="mb-3 text-sm font-medium text-gray-700">
              현재 이미지:
            </dt>
            {isPendingPlaceImage && (
              <span className="text-sm text-primary-600">불러오는 중...</span>
            )}
            {placeImagesData && placeImagesData.length > 0 ? (
              <dd className="flex flex-wrap gap-3">
                {placeImagesData.map((image) => (
                  <div key={image.placeImageId} className="relative w-full">
                    <img
                      src={image.imageUrl}
                      alt={`장소 이미지 ${image.placeImageId}`}
                      className="w-full rounded object-cover"
                    />
                    <button
                      type="button"
                      aria-label="이미지 삭제"
                      className="absolute right-2 top-2 h-8 w-8"
                      onClick={() =>
                        handleDeleteImage(placeId, image.placeImageId)
                      }
                    >
                      <IcCloseBtn className="h-8 w-8" />
                    </button>
                  </div>
                ))}
              </dd>
            ) : (
              <span className="text-sm font-medium text-gray-700">없음</span>
            )}
          </div>
        )}

        {/* 이미지 파일 선택 (여러 개) */}
        <FileInput
          id="images"
          label="변경할 이미지"
          required
          multiple
          accept="image/*"
          onChange={handleFileChange}
          disabled={isPending || !placeId}
          helperText="JPG, PNG, GIF 형식의 이미지 파일을 여러 개 선택할 수 있습니다"
        />

        {/* 선택된 파일들 미리보기 */}
        {selectedFiles.length > 0 && (
          <div className="rounded-lg bg-gray-50 p-4">
            <h4 className="mb-3 text-sm font-medium text-gray-700">
              선택된 파일 ({selectedFiles.length}개)
            </h4>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`선택된 이미지 ${index + 1}`}
                    className="h-24 w-full rounded object-cover"
                  />
                  <div className="mt-1">
                    <p className="truncate text-xs font-medium text-gray-900">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 결과 메시지 */}
        {isSuccess && (
          <Alert variant="success">
            장소 이미지가 성공적으로 수정되었습니다.
          </Alert>
        )}

        {isError && (
          <Alert variant="error">
            오류가 발생했습니다:{' '}
            {error instanceof Error ? error.message : '알 수 없는 오류'}
          </Alert>
        )}

        {/* 에러 메시지 */}
        {(isPlacesError || isPlaceDetailError || isPlaceImageError) && (
          <Alert variant="error">
            데이터를 불러오는 중 오류가 발생했습니다.
          </Alert>
        )}

        {/* 버튼 */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            type="submit"
            variant="primary"
            disabled={!isValid}
            isLoading={isPending}
          >
            {isPending ? '추가 중...' : '추가하기'}
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            disabled={isPending}
          >
            초기화
          </Button>
        </div>
      </form>
    </Card>
  );
}
