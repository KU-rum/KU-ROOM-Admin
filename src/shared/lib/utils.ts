import imageCompression from 'browser-image-compression';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind CSS 클래스를 조건부로 결합하고 충돌을 해결합니다.
 * @param inputs - 결합할 클래스 값들
 * @returns 최적화된 클래스 문자열
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 이미지 파일 압축 함수
export async function compressImage(files: File[]): Promise<File[]> {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  const compressedFiles = await Promise.all(
    files.map(async (file) => {
      const compressed = await imageCompression(file, options);
      return compressed as File;
    }),
  );

  return compressedFiles;
}
