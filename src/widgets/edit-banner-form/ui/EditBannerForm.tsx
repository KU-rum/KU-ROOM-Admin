import { useEditBannerForm } from '@/features/edit-banner';
import { Button, Card, FileInput, Input } from '@/shared/ui';

export function EditBannerForm() {
  const {
    link,
    selectedFile,
    handleChangeLink,
    handleFileChange,
    handleSubmit,
    handleReset,
    isValid,
    isPendingAddBanner,
  } = useEditBannerForm();

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          id="link"
          label="링크"
          type="link"
          required
          value={link}
          onChange={handleChangeLink}
          placeholder="연결할 링크 입력하세요"
          disabled={isPendingAddBanner}
        />

        <FileInput
          id="banner-image"
          label="배너 이미지"
          required
          accept="image/*"
          onChange={handleFileChange}
          disabled={isPendingAddBanner}
          helperText="JPG, PNG, GIF 형식의 이미지 파일을 선택할 수 있습니다"
        />

        {selectedFile !== null && (
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              <div className="relative">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt={'선택된 배너 이미지'}
                  className="h-24 w-full rounded object-cover"
                />
                <div className="mt-1">
                  <p className="truncate text-xs font-medium text-gray-900">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 버튼 */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            type="submit"
            variant="primary"
            disabled={!isValid}
            isLoading={isPendingAddBanner}
          >
            {isPendingAddBanner ? '추가 중...' : '추가하기'}
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            disabled={isPendingAddBanner}
          >
            초기화
          </Button>
        </div>
      </form>
    </Card>
  );
}
