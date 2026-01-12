/**
 * Image Optimization Utilities
 * 
 * Provides utilities for lazy loading images and optimizing image performance
 */

import { useRef, useState, useEffect } from 'react';

/**
 * Hook for lazy loading images
 * Uses Intersection Observer API for optimal performance
 */
export function useImageLazyLoad() {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.onload = () => setIsLoaded(true);
          observer.unobserve(img);
        }
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return { imageRef, isLoaded };
}

/**
 * Responsive image component with lazy loading
 */
interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function ResponsiveImage({
  src,
  alt,
  width,
  height,
  className,
}: ResponsiveImageProps) {
  const { imageRef, isLoaded } = useImageLazyLoad();

  return (
    <img
      ref={imageRef}
      data-src={src}
      src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width || 1} ${height || 1}'%3E%3C/svg%3E`}
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
      loading='lazy'
    />
  );
}

/**
 * Image optimization tips:
 * 
 * 1. Use WebP format when possible
 *    - Reduces file size by 25-35% compared to PNG/JPG
 *    - Use <picture> tag with fallbacks
 * 
 * 2. Implement lazy loading
 *    - Use loading="lazy" attribute for native lazy loading
 *    - Use Intersection Observer API for advanced control
 * 
 * 3. Optimize SVG files
 *    - Inline critical SVGs to avoid extra HTTP requests
 *    - Minify SVG code using tools like SVGO
 *    - Use <use> tags to reuse SVG elements
 * 
 * 4. Responsive images
 *    - Use srcset for different screen sizes
 *    - Use sizes attribute to specify layout widths
 * 
 * 5. Image compression
 *    - Use tools like TinyPNG, ImageOptim, or ImageMagick
 *    - Compress before adding to project
 * 
 * 6. CDN delivery
 *    - Use CDN for image delivery
 *    - Enable caching headers
 * 
 * 7. Modern formats
 *    - Use AVIF when supported (even smaller than WebP)
 *    - Provide fallbacks for older browsers
 */
