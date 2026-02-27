import { useEffect, useMemo } from 'react';

import IcCloseBtn from '@/assets/icons/close-btn.svg?react';
import { useEditBannerForm } from '@/features/edit-banner';
import { Alert, Button, Card, FileInput, Input } from '@/shared/ui';

export function EditBannerForm() {
  const {
    bannersData,
    link,
    selectedFile,
    isLoadingBanners,
    isBannersError,
    handleChangeLink,
    handleFileChange,
    handleSubmit,
    handleDeleteBanner,
    handleReset,
    isValid,
    isPendingAddBanner,
    isCompressing,
  } = useEditBannerForm();

  const previewUrl = useMemo(
    () => (selectedFile ? URL.createObjectURL(selectedFile) : null),
    [selectedFile],
  );

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div>
      <div className="mb-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {isLoadingBanners && (
          <span className="text-sm text-primary-600">불러오는 중...</span>
        )}
        {bannersData && (
          <>
            <dt className="mb-3 text-sm font-bold text-gray-700">현재 배너</dt>
            {bannersData && bannersData.length > 0 ? (
              <dd className="flex flex-col flex-wrap gap-3">
                {bannersData.map((banner) => (
                  <div key={banner.bannerId} className="relative w-full">
                    <a
                      key={banner.bannerLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={banner.bannerLink}
                      className="mb-1 block w-full whitespace-normal break-all text-sm text-primary-600 underline"
                    >
                      {banner.bannerLink}
                    </a>
                    <img
                      src={banner.bannerImageUrl}
                      alt={`장소 이미지 ${banner.bannerId}`}
                      className="w-full max-w-[600px] rounded object-cover"
                    />
                    <button
                      type="button"
                      aria-label="이미지 삭제"
                      className="absolute right-2 top-8 h-8 w-8"
                      onClick={() => handleDeleteBanner(banner.bannerId)}
                    >
                      <IcCloseBtn className="h-8 w-8" />
                    </button>
                  </div>
                ))}
              </dd>
            ) : (
              <span className="text-sm font-medium text-gray-700">없음</span>
            )}
          </>
        )}
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            id="link"
            label="추가할 링크"
            type="url"
            required
            value={link}
            onChange={handleChangeLink}
            placeholder="연결할 링크 입력하세요"
            disabled={isPendingAddBanner}
          />

          <FileInput
            id="banner-image"
            label="추가할 배너 이미지"
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
                    src={previewUrl ?? ''}
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

          {isBannersError && (
            <Alert variant="error">
              배너를 불러오는 중 오류가 발생했습니다.
            </Alert>
          )}

          {/* 버튼 */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              type="submit"
              variant="primary"
              disabled={!isValid}
              isLoading={isPendingAddBanner || isCompressing}
            >
              {isCompressing
                ? '압축 중...'
                : isPendingAddBanner
                  ? '추가 중...'
                  : '추가하기'}
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
    </div>
  );
}
