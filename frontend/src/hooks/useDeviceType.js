import { useState, useEffect } from 'react';

/**
 * Custom hook for device type detection using window.matchMedia
 * Replaces react-device-detect to avoid Vite MIME type errors
 * 
 * Breakpoints:
 * - Mobile: max-width 767px
 * - Tablet: 768px - 1023px
 * - Desktop: min-width 1024px
 * 
 * @returns {Object} { device, isMobile, isTablet, isDesktop }
 */
export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState(() => {
    // Initial state calculation (SSR-safe)
    if (typeof window === 'undefined') {
      return { device: 'desktop', isMobile: false, isTablet: false, isDesktop: true };
    }

    const mobileMatch = window.matchMedia('(max-width: 767px)').matches;
    const tabletMatch = window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches;
    const desktopMatch = window.matchMedia('(min-width: 1024px)').matches;

    if (mobileMatch) {
      return { device: 'mobile', isMobile: true, isTablet: false, isDesktop: false };
    } else if (tabletMatch) {
      return { device: 'tablet', isMobile: false, isTablet: true, isDesktop: false };
    } else {
      return { device: 'desktop', isMobile: false, isTablet: false, isDesktop: true };
    }
  });

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const updateDeviceType = () => {
      const mobileMatch = window.matchMedia('(max-width: 767px)').matches;
      const tabletMatch = window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches;
      const desktopMatch = window.matchMedia('(min-width: 1024px)').matches;

      if (mobileMatch) {
        setDeviceType({ device: 'mobile', isMobile: true, isTablet: false, isDesktop: false });
      } else if (tabletMatch) {
        setDeviceType({ device: 'tablet', isMobile: false, isTablet: true, isDesktop: false });
      } else {
        setDeviceType({ device: 'desktop', isMobile: false, isTablet: false, isDesktop: true });
      }
    };

    // Create MediaQueryList objects for efficient listening
    const mobileMQ = window.matchMedia('(max-width: 767px)');
    const tabletMQ = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
    const desktopMQ = window.matchMedia('(min-width: 1024px)');

    // Use modern addEventListener if available, fallback to addListener
    const addListener = (mq, handler) => {
      if (mq.addEventListener) {
        mq.addEventListener('change', handler);
      } else {
        mq.addListener(handler);
      }
    };

    const removeListener = (mq, handler) => {
      if (mq.removeEventListener) {
        mq.removeEventListener('change', handler);
      } else {
        mq.removeListener(handler);
      }
    };

    // Listen to all breakpoints
    addListener(mobileMQ, updateDeviceType);
    addListener(tabletMQ, updateDeviceType);
    addListener(desktopMQ, updateDeviceType);

    // Also listen to window resize as fallback
    window.addEventListener('resize', updateDeviceType);

    // Initial check
    updateDeviceType();

    // Cleanup
    return () => {
      removeListener(mobileMQ, updateDeviceType);
      removeListener(tabletMQ, updateDeviceType);
      removeListener(desktopMQ, updateDeviceType);
      window.removeEventListener('resize', updateDeviceType);
    };
  }, []);

  return deviceType;
};

export default useDeviceType;

