import React, { useEffect, useState } from 'react';

const AnimatedCounter = ({ 
  value = 0, 
  duration = 1000, 
  prefix = '', 
  suffix = '', 
  className = '' 
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const safeValue = typeof value === 'number' && !isNaN(value) && isFinite(value) ? Math.max(0, value) : 0;
    
    if (safeValue === displayValue) return;

    const startValue = displayValue;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (safeValue - startValue) * easeOutQuart;
      
      setDisplayValue(Math.round(currentValue));

      if (progress >= 1) {
        setDisplayValue(safeValue);
        clearInterval(timer);
      }
    }, 16); // ~60fps

    return () => clearInterval(timer);
  }, [value, duration, displayValue]);

  return (
    <span className={className}>
      {prefix}{Math.round(displayValue).toLocaleString()}{suffix}
    </span>
  );
};

export default AnimatedCounter;