import { CHIP_LABELS, type ChipCategory } from '@/entities/place';
import { usePlaceSubnameForm } from '@/features/place-subname';
import { Alert, Button, Card, Input, Select } from '@/shared/ui';

const chipOptions = Object.entries(CHIP_LABELS).map(([value, label]) => ({
  value,
  label,
}));

export function PlaceSubnameForm() {
  const {
    selectedChip,
    handleChipChange,
    places,
    isLoadingPlaces,
    placeId,
    handlePlaceChange,
    subName,
    setSubName,
    selectedPlace,
    placeDetail,
    isLoadingPlaceDetail,
    isValid,
    isPending,
    isSuccess,
    isError,
    error,
    handleSubmit,
    handleReset,
  } = usePlaceSubnameForm();

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
                <div className="flex gap-2">
                  <dt className="font-medium">현재 부가 이름:</dt>
                  <dd>{placeDetail.subName || '(없음)'}</dd>
                </div>
                {placeDetail.content && (
                  <div className="flex gap-2">
                    <dt className="font-medium">내용:</dt>
                    <dd className="whitespace-pre-line">
                      {placeDetail.content}
                    </dd>
                  </div>
                )}
                <div className="flex gap-2">
                  <dt className="font-medium">위치:</dt>
                  <dd>
                    위도 {placeDetail.latitude.toFixed(6)}, 경도{' '}
                    {placeDetail.longitude.toFixed(6)}
                  </dd>
                </div>
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
                  <div className="flex gap-2">
                    <dt className="font-medium">현재 부가 이름:</dt>
                    <dd>{selectedPlace.subName || '(없음)'}</dd>
                  </div>
                </dl>
              )
            )}
          </div>
        )}

        {/* 변경할 부가 이름 입력 */}
        <Input
          id="subName"
          label="변경할 부가 이름"
          required
          value={subName}
          onChange={(e) => setSubName(e.target.value)}
          placeholder="변경할 부가 이름을 입력하세요"
          disabled={isPending || !placeId}
        />

        {/* 결과 메시지 */}
        {isSuccess && (
          <Alert variant="success">
            장소 부가 이름이 성공적으로 수정되었습니다.
          </Alert>
        )}

        {isError && (
          <Alert variant="error">
            오류가 발생했습니다:{' '}
            {error instanceof Error ? error.message : '알 수 없는 오류'}
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
            {isPending ? '수정 중...' : '수정하기'}
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
