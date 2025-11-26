import { useState, useRef } from "react";

const SpotlightCard = ({ children, className = "" }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setOpacity(1);
  };

  const handleBlur = () => {
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Light Mode Spotlight - Top Layer Overlay */}
      <div
        className="pointer-events-none absolute -inset-px transition duration-300 z-20 dark:hidden"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, 
            rgba(139, 92, 246, 0.12), 
            transparent 40%
          )`,
        }}
      />
      
      {/* Dark Mode Spotlight - Top Layer Overlay */}
      <div
        className="pointer-events-none absolute -inset-px transition duration-300 z-20 hidden dark:block"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, 
            rgba(139, 92, 246, 0.25), 
            transparent 40%
          )`,
        }}
      />
      
      {/* Content Layer */}
      <div className="relative h-full">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;

