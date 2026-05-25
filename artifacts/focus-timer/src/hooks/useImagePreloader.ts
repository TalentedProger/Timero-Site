import { useEffect, useState } from 'react';

interface PreloadStatus {
  loaded: number;
  total: number;
  isComplete: boolean;
}

/**
 * Preload images in the background
 * Returns loading status
 */
export function useImagePreloader(imageUrls: string[]) {
  const [status, setStatus] = useState<PreloadStatus>({
    loaded: 0,
    total: imageUrls.length,
    isComplete: false,
  });

  useEffect(() => {
    if (imageUrls.length === 0) {
      setStatus({ loaded: 0, total: 0, isComplete: true });
      return;
    }

    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    imageUrls.forEach((url) => {
      const img = new Image();
      
      img.onload = () => {
        loadedCount++;
        setStatus({
          loaded: loadedCount,
          total: imageUrls.length,
          isComplete: loadedCount === imageUrls.length,
        });
      };

      img.onerror = () => {
        // Still count as "loaded" to not block the UI
        loadedCount++;
        setStatus({
          loaded: loadedCount,
          total: imageUrls.length,
          isComplete: loadedCount === imageUrls.length,
        });
      };

      // Start loading
      img.src = url;
      images.push(img);
    });

    // Cleanup
    return () => {
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [imageUrls]);

  return status;
}

/**
 * Preload a single image
 */
export function preloadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
}

/**
 * Preload multiple images
 */
export function preloadImages(urls: string[]): Promise<void[]> {
  return Promise.all(urls.map(preloadImage));
}
