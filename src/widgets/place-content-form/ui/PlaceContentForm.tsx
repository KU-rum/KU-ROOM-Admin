import {
  CHIP_LABELS,
  type ChipCategory,
} from '@/entities/place';
import { usePlaceContentForm } from '@/features/place-content';
import { Alert, Button, Card, Select, Textarea } from '@/shared/ui';

// 칩 카테고리 옵션
const chipOptions = Object.entries(CHIP_LABELS).map(([value, label]) => ({
  value,
  label,
}));

export function PlaceContentForm() {
  const {
    selectedChip,
    handleChipChange,
    places,
    isLoadingPlaces,
    placeId,
    handlePlaceChange,
    content,
    setContent,
    selectedPlace,
    isValid,
    isPending,
    isSuccess,
    isError,
    error,
    handleSubmit,
    handleReset,
  } = usePlaceContentForm();

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
        {selectedPlace && (
          <div className="rounded-lg bg-primary-50 p-4">
            <h4 className="text-sm font-medium text-primary-800">
              선택된 장소 정보
            </h4>
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
              <div className="flex gap-2">
                <dt className="font-medium">현재 내용:</dt>
                <dd>{selectedPlace.content ?? '(없음)'}</dd>
              </div>
            </dl>
          </div>
        )}

        {/* 변경할 내용 입력 */}
        <Textarea
          id="content"
          label="변경할 내용"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="변경할 내용을 입력하세요"
          rows={6}
          disabled={isPending || !placeId}
        />

        {/* 결과 메시지 */}
        {isSuccess && (
          <Alert variant="success">
            장소 내용이 성공적으로 수정되었습니다.
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
