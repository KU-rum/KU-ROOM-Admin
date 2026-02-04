import { PageHeader } from '@/shared/ui';
import { UpdateLocationForm } from '@/widgets/update-location-form';

export function UpdateLocationPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="장소 위치 수정"
        description="장소를 선택하고 변경할 위치로 수정해주세요."
      />
      <UpdateLocationForm />
    </div>
  );
}
