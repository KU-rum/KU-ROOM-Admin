import { PageHeader } from '@/shared/ui';
import { ApiInfo, PlaceContentForm } from '@/widgets/place-content-form';

export function PlaceContentPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="장소 내용 수정"
        description="장소 ID를 입력하고 변경할 내용을 작성해주세요."
      />
      <PlaceContentForm />
      <ApiInfo />
    </div>
  );
}
