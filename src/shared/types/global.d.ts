/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
  interface Window {
    naver: any;
  }

  namespace naver.maps {
    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
    }

    interface MapOptions {
      center: LatLng;
      zoom?: number;
    }

    class Map {
      constructor(el: HTMLElement, options: MapOptions);
      getCenter(): LatLng;
    }

    namespace Event {
      function addListener(
        target: any,
        eventName: string,
        listener: (...args: any[]) => void,
      ): any;

      function removeListener(listener: any): void;
    }
  }
}
