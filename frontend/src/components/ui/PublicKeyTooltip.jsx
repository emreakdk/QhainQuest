import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { truncatePublicKey } from '../../utils/truncatePublicKey';

/**
 * Component that displays a truncated public key with a tooltip showing the full key on hover/long-press
 * @param {string} publicKey - The full Stellar public key
 * @param {string} className - Additional CSS classes for the container
 * @param {string} textClassName - Additional CSS classes for the text element
 * @param {string} tooltipClassName - Additional CSS classes for the tooltip
 */
const PublicKeyTooltip = ({ 
  publicKey, 
  className = '', 
  textClassName = '',
  tooltipClassName = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0, placement: 'bottom' });
  const touchTimerRef = useRef(null);
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);

  // Calculate tooltip position to stay within viewport
  const updateTooltipPosition = useCallback(() => {
    if (!containerRef.current || !tooltipRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    const padding = 8;
    const gap = 8; // Gap between trigger and tooltip

    // Estimate tooltip dimensions if not yet measured (fallback)
    const estimatedHeight = 60; // Approximate height for tooltip
    const estimatedWidth = Math.min(400, viewportWidth - (padding * 2));

    const tooltipHeight = tooltipRect.height || estimatedHeight;
    const tooltipWidth = tooltipRect.width || estimatedWidth;

    // Try bottom placement first (preferred)
    let top = containerRect.bottom + scrollY + gap;
    let left = containerRect.left + scrollX + (containerRect.width / 2) - (tooltipWidth / 2);
    let placement = 'bottom';

    // Check available space
    const spaceBelow = viewportHeight - containerRect.bottom;
    const spaceAbove = containerRect.top;

    // If not enough space below but enough above, flip to top
    if (spaceBelow < tooltipHeight + gap + padding && spaceAbove > tooltipHeight + gap + padding) {
      top = containerRect.top + scrollY - tooltipHeight - gap;
      placement = 'top';
    }

    // Keep tooltip within viewport horizontally
    if (left < scrollX + padding) {
      left = scrollX + padding;
    } else if (left + tooltipWidth > scrollX + viewportWidth - padding) {
      left = scrollX + viewportWidth - tooltipWidth - padding;
    }

    setTooltipPosition({ top, left, placement });
  }, []);

  // Update position when tooltip becomes visible
  useEffect(() => {
    if (isHovered) {
      // Use requestAnimationFrame to ensure tooltip is rendered
      const rafId = requestAnimationFrame(() => {
        // Small delay to ensure tooltip has dimensions
        setTimeout(() => {
          updateTooltipPosition();
        }, 10);
      });
      
      // Update on scroll/resize
      const handleUpdate = () => {
        if (tooltipRef.current) {
          updateTooltipPosition();
        }
      };
      window.addEventListener('scroll', handleUpdate, true);
      window.addEventListener('resize', handleUpdate);

      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener('scroll', handleUpdate, true);
        window.removeEventListener('resize', handleUpdate);
      };
    }
  }, [isHovered, updateTooltipPosition]);

  // Handle long-press on mobile
  const handleTouchStart = () => {
    touchTimerRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 500); // 500ms for long-press
  };

  const handleTouchEnd = () => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
      touchTimerRef.current = null;
    }
    // Keep tooltip visible for a moment after touch ends
    setTimeout(() => {
      setIsHovered(false);
    }, 2000);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (touchTimerRef.current) {
        clearTimeout(touchTimerRef.current);
      }
    };
  }, []);

  // Close tooltip when clicking outside (for mobile)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target) &&
          tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setIsHovered(false);
      }
    };

    if (isHovered) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isHovered]);

  if (!publicKey) {
    return null;
  }

  const truncatedKey = truncatePublicKey(publicKey);

  const tooltipContent = isHovered ? (
    <div
      ref={tooltipRef}
      className={`fixed z-[9999] px-3 py-2 rounded-lg shadow-xl border backdrop-blur-sm pointer-events-none transition-opacity duration-200 ${
        tooltipClassName || 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100'
      }`}
      style={{
        top: `${tooltipPosition.top}px`,
        left: `${tooltipPosition.left}px`,
        minWidth: '200px',
        maxWidth: 'min(90vw, 400px)',
        opacity: isHovered ? 1 : 0,
      }}
    >
      <div className="font-mono text-xs sm:text-sm break-all text-center whitespace-normal">
        {publicKey}
      </div>
      {/* Tooltip arrow */}
      {tooltipPosition.placement === 'bottom' ? (
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white dark:bg-slate-800 border-l border-t border-slate-200 dark:border-slate-700 rotate-45"></div>
      ) : (
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white dark:bg-slate-800 border-r border-b border-slate-200 dark:border-slate-700 rotate-45"></div>
      )}
    </div>
  ) : null;

  return (
    <>
      <div
        ref={containerRef}
        className={`relative inline-block ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <span className={`cursor-help select-none ${textClassName}`}>
          {truncatedKey}
        </span>
      </div>
      {typeof document !== 'undefined' && createPortal(tooltipContent, document.body)}
    </>
  );
};

export default PublicKeyTooltip;

