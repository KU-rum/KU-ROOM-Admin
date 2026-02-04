import { useEffect, useMemo, useRef } from 'react';

import PinIcon from '@/assets/icons/location-pin-color.svg?react';
import type { LatLng } from '@/shared/types';

interface MapProps {
  handleChangeCenter: (center: LatLng) => void;
  initialLocation?: LatLng;
}

export function Map({ handleChangeCenter, initialLocation }: MapProps) {
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<naver.maps.Map | null>(null);

  const initialLat = useMemo(
    () => initialLocation?.lat || 37.5423,
    [initialLocation],
  );
  const initialLng = useMemo(
    () => initialLocation?.lng || 127.0765,
    [initialLocation],
  );
  const initialZoom = useMemo(
    () => (initialLocation ? 16 : 15),
    [initialLocation],
  );

  useEffect(() => {
    if (!mapDivRef.current) return;

    if (!window.naver?.maps) {
      alert('Naver Maps script not loaded. index.html script를 확인하세요.');
      return;
    }

    // map은 한 번만 생성
    if (!mapRef.current) {
      const initialCenter = new window.naver.maps.LatLng(
        initialLat,
        initialLng,
      );
      mapRef.current = new window.naver.maps.Map(mapDivRef.current, {
        center: initialCenter,
        zoom: initialZoom,
      });
    }

    const map = mapRef.current;
    if (!map) return; // 타입 안정 장치 (사실상 안 타지만 TS 만족용)

    const updateCenter = () => {
      const c = map.getCenter();
      handleChangeCenter({ lat: c.lat(), lng: c.lng() });
    };

    updateCenter();

    // 이동/줌 끝난 뒤 한 번만 업데이트(추천)
    const idleListener = window.naver.maps.Event.addListener(
      map,
      'idle',
      updateCenter,
    );

    return () => {
      window.naver.maps.Event.removeListener(idleListener);
    };
  }, [handleChangeCenter, initialLat, initialLng, initialZoom]);

  return (
    <div className="relative">
      <div
        ref={mapDivRef}
        className="h-[250px] w-full rounded-lg border border-gray-200"
      />
      <PinIcon className="absolute bottom-1/2 left-1/2 w-8 translate-x-[-50%]" />
    </div>
  );
}
