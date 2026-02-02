import { PageHeader } from '@/shared/ui';
import { AddLocationForm } from '@/widgets/add-location-form/ui/AddLocationForm';

export function AddLocationPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="위치 정보 추가"
        description="제목, 부제목, 정보, 위치를 입력하여 추가하세요."
      />
      <AddLocationForm />
    </div>
  );
}
