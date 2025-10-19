import { forwardRef } from 'react';

const Badge = forwardRef(({ 
  children, 
  variant = 'default', 
  size = 'md', 
  className = '', 
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  const variants = {
    default: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200',
    primary: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    gradient: 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white',
    outline: 'border border-slate-300 text-slate-700 dark:border-slate-600 dark:text-slate-200 dark:bg-slate-700',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <span ref={ref} className={classes} {...props}>
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

export default Badge;
