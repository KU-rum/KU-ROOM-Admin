import { PageHeader } from '@/shared/ui';
import { PlaceImageForm } from '@/widgets/place-image-form';

export function PlaceImagePage() {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="장소 이미지 수정"
        description="장소를 선택하고 변경할 이미지를 첨부해주세요."
      />
      <PlaceImageForm />
    </div>
  );
}
