import MapIcon from '@/assets/icons/map.svg?react';
import { PageHeader } from '@/shared/ui';

export function MapPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="지도" description="건국대학교 캠퍼스 지도입니다." />
      <div className="mt-6 rounded-lg border border-gray-200 bg-white p-8 text-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <MapIcon className="h-16 w-16 text-gray-300" />
          <p className="text-gray-500">지도 기능 준비 중입니다.</p>
        </div>
      </div>
    </div>
  );
}
