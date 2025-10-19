import { useEffect, useState } from 'react';

const ProgressRing = ({ 
  progress, 
  size = 120, 
  strokeWidth = 8, 
  color = "#8b5cf6",
  backgroundColor = "#e5e7eb",
  showPercentage = true,
  className = ""
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;

  useEffect(() => {
    const duration = 1000; // 1 second animation
    const startTime = Date.now();
    const startProgress = animatedProgress;
    const endProgress = Math.max(0, Math.min(100, progress));

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const animationProgress = Math.min(elapsed / duration, 1);
      
      const easedProgress = 1 - Math.pow(1 - animationProgress, 3);
      const currentProgress = startProgress + (endProgress - startProgress) * easedProgress;
      
      setAnimatedProgress(currentProgress);
      
      if (animationProgress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [progress]);

  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

  return (
    <div className={`relative ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-out"
        />
      </svg>
      
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {Math.round(animatedProgress)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressRing;
