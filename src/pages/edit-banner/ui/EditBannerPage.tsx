import { PageHeader } from '@/shared/ui';
import { EditBannerForm } from '@/widgets/edit-banner-form';

export function EditBannerPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="배너 편집"
        description="기존 배너를 삭제하거나 새로운 배너 이미지와 링크를 추가하세요."
      />
      <EditBannerForm />
    </div>
  );
}
