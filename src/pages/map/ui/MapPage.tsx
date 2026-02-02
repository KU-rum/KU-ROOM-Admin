import { PageHeader } from '@/shared/ui';

export function MapPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="지도" description="건국대학교 캠퍼스 지도입니다." />
      <div className="mt-6 rounded-lg border border-gray-200 bg-white p-8 text-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          <p className="text-gray-500">지도 기능 준비 중입니다.</p>
        </div>
      </div>
    </div>
  );
}
