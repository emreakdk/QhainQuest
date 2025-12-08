import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * Advanced scroll-to-top mechanism that forces window to (0,0) on every route change
 * 
 * Features:
 * - Disables browser's default scroll restoration
 * - Immediate scroll on path change OR search params change
 * - Fallback scroll after 50ms to handle delayed DOM rendering
 * - Proper cleanup to prevent memory leaks
 */
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Disable browser's default scroll restoration behavior
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Immediate scroll to top on path or search params change
    window.scrollTo(0, 0);

    // Fallback: Scroll again after a short delay to handle cases where
    // the new page content renders after the initial scroll
    // This prevents "white screen" scroll jumps
    const fallbackTimer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);

    // Additional fallback for slower renders (e.g., when data is loading)
    const secondFallbackTimer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 150);

    // Cleanup: Clear the timeouts to prevent memory leaks
    return () => {
      clearTimeout(fallbackTimer);
      clearTimeout(secondFallbackTimer);
    };
  }, [location.pathname, location.search]); // Listen to both pathname and search params

  return null;
};

export default ScrollToTop;

