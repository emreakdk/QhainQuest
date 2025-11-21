import { forwardRef } from 'react';

/**
 * Minimal, modern icon-only button component for utility controls
 * Designed for header utility buttons (theme toggle, language switcher, etc.)
 */
const IconButton = forwardRef(({ 
  children,
  className = '',
  size = 'md',
  variant = 'default',
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center transition-all duration-200 ease-in-out cursor-pointer flex-shrink-0';
  
  const sizes = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-8 h-8 sm:w-9 sm:h-9 rounded-lg',
    lg: 'w-10 h-10 rounded-xl',
  };

  const variants = {
    default: 'bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 shadow-sm dark:shadow-none hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md dark:hover:shadow-lg active:bg-slate-100 dark:active:bg-slate-800 active:border-slate-400 dark:active:border-slate-500 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0',
    minimal: 'bg-transparent dark:bg-slate-800/50 border border-transparent dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-200 dark:hover:border-slate-600 active:bg-slate-100 dark:active:bg-slate-800 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0',
    noFocus: 'bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm dark:hover:shadow-none active:bg-slate-100 dark:active:bg-slate-800 active:border-slate-400 dark:active:border-slate-500 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0',
  };

  const classes = `${baseClasses} ${sizes[size]} ${variants[variant]} ${className}`.trim();

  return (
    <button
      ref={ref}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
});

IconButton.displayName = 'IconButton';

export default IconButton;

