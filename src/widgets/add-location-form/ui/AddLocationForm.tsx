import { CHIP_LABELS, type ChipCategory } from '@/entities/place';
import { useAddLocationForm } from '@/features/add-location';
import { Button, Card, Input, Map, Select, Textarea } from '@/shared/ui';

const chipOptions = Object.entries(CHIP_LABELS)
  .filter((item) => item[0] !== 'BUILDING')
  .map(([value, label]) => ({
    value,
    label,
  }));

export function AddLocationForm() {
  const {
    selectedChip,
    title,
    subName,
    content,
    location,
    handleChipChange,
    handleChangeTitle,
    handleChangeSubName,
    handleChangeContent,
    handleChangeLocationCenter,
    handleSubmit,
    handleReset,
    isValid,
  } = useAddLocationForm();

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
          //   disabled={isPending}
        />

        {/* 제목 입력 */}
        <Input
          id="title"
          label="제목"
          required
          value={title}
          onChange={handleChangeTitle}
          placeholder="제목을 입력하세요"
          //   disabled={isPending || !placeId}
        />

        {/* 부제목 입력 */}
        <Input
          id="subName"
          label="부제목"
          required
          value={subName}
          onChange={handleChangeSubName}
          placeholder="부제목을 입력하세요"
          //   disabled={isPending || !placeId}
        />

        {/* 정보 입력 */}
        <Textarea
          id="content"
          label="내용"
          required
          value={content}
          onChange={handleChangeContent}
          placeholder="내용을 입력하세요"
          rows={6}
          //   disabled={isPending || !placeId}
        />

        <div>
          <label
            id="center"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            위치 : {location?.lat} {location?.lng}
          </label>
          <Map handleChangeCenter={handleChangeLocationCenter} />
        </div>

        {/* 버튼 */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            type="submit"
            variant="primary"
            disabled={!isValid}
            // isLoading={isPending}
          >
            {/* {isPending ? '수정 중...' : '수정하기'} */}
            추가하기
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            // disabled={isPending}
          >
            초기화
          </Button>
        </div>
      </form>
    </Card>
  );
}
