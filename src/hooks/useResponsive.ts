import { useEffect, useState } from 'react';

/**
 * Hook to detect if device is mobile
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}

/**
 * Hook to detect screen size
 */
export function useScreenSize(): {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
} {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile: size.width < 768,
    isTablet: size.width >= 768 && size.width < 1024,
    isDesktop: size.width >= 1024,
    width: size.width,
    height: size.height,
  };
}

/**
 * Hook to check touch device
 */
export function useTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(
        () =>
          navigator.maxTouchPoints > 0 ||
          (navigator as unknown as { msMaxTouchPoints: number }).msMaxTouchPoints > 0
      );
    };

    checkTouch();
    window.addEventListener('touchstart', checkTouch);
    return () => window.removeEventListener('touchstart', checkTouch);
  }, []);

  return isTouch;
}

/**
 * Get breakpoint-aware padding/margin values
 */
export function useResponsiveSpacing(
  mobile: number,
  tablet: number,
  desktop: number
): number {
  const screenSize = useScreenSize();

  if (screenSize.isMobile) return mobile;
  if (screenSize.isTablet) return tablet;
  return desktop;
}
