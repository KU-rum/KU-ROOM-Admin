import { PageHeader } from '@/shared/ui';
import { ApiInfo, PlaceSubnameForm } from '@/widgets/place-subname-form';

export function PlaceSubnamePage() {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="장소 부제목 수정"
        description="장소를 선택하고 변경할 부제목을 작성해주세요."
      />
      <PlaceSubnameForm />
      <ApiInfo />
    </div>
  );
}
