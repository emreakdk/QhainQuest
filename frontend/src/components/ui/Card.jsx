import { forwardRef } from 'react';

const Card = forwardRef(({ 
  children, 
  className = '', 
  hover = false,
  gradient = false,
  ...props 
}, ref) => {
  const baseClasses = 'bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700';
  
  const hoverClasses = hover ? 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-105' : '';
  
  const gradientClasses = gradient 
    ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700' 
    : '';

  const classes = `${baseClasses} ${hoverClasses} ${gradientClasses} ${className}`;

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

const CardHeader = forwardRef(({ children, className = '', ...props }, ref) => {
  return (
    <div ref={ref} className={`p-6 pb-0 ${className}`} {...props}>
      {children}
    </div>
  );
});

CardHeader.displayName = 'CardHeader';

const CardContent = forwardRef(({ children, className = '', ...props }, ref) => {
  return (
    <div ref={ref} className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
});

CardContent.displayName = 'CardContent';

const CardFooter = forwardRef(({ children, className = '', ...props }, ref) => {
  return (
    <div ref={ref} className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
});

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardContent, CardFooter };
