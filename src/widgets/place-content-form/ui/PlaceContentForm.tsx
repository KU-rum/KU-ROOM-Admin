import { usePlaceContentForm } from '@/features/place-content';
import { Alert, Button, Card, Input, Textarea } from '@/shared/ui';

export function PlaceContentForm() {
  const {
    placeId,
    setPlaceId,
    content,
    setContent,
    isValid,
    isPending,
    isSuccess,
    isError,
    error,
    handleSubmit,
    handleReset,
  } = usePlaceContentForm();

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          id="placeId"
          label="장소 ID"
          required
          value={placeId}
          onChange={(e) => setPlaceId(e.target.value)}
          placeholder="장소 ID를 입력하세요"
          disabled={isPending}
        />

        <Textarea
          id="content"
          label="변경할 내용"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="변경할 내용을 입력하세요"
          rows={6}
          disabled={isPending}
        />

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
