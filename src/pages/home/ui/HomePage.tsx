import { Link } from 'react-router-dom';

import ImageIcon from '@/assets/icons/image.svg?react';
import LocationPinIcon from '@/assets/icons/location-pin.svg?react';
import MapIcon from '@/assets/icons/map.svg?react';
import TagIcon from '@/assets/icons/tag.svg?react';

export function HomePage() {
  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-900">관리자 대시보드</h2>
      <p className="mt-2 text-gray-600">
        KUROOM 관리자 페이지에 오신 것을 환영합니다.
      </p>

      {/* Quick Stats */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/place-content"
          className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/10"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-600 transition-colors duration-200 group-hover:bg-primary-100">
              <LocationPinIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                각 장소의 정보 부분 수정
              </p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                장소 정보 관리
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/place-image"
          className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/10"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-600 transition-colors duration-200 group-hover:bg-primary-100">
              <ImageIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                각 장소 이미지 수정
              </p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                이미지 관리
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/place-subname"
          className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/10"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-600 transition-colors duration-200 group-hover:bg-primary-100">
              <TagIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                각 장소 부제목 수정
              </p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                부제목 관리
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/add-location"
          className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/10"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-600 transition-colors duration-200 group-hover:bg-primary-100">
              <MapIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                새로운 위치 정보 추가
              </p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                위치 정보 관리
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
