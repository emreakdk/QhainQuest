import { useState, useEffect } from 'react';
import { TbCheck, TbX, TbAlertTriangle, TbInfoCircle } from 'react-icons/tb';

const Notification = ({ type = 'info', title, message, duration = 2500, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success': return <TbCheck size={28} className="text-green-500" />;
      case 'error': return <TbX size={28} className="text-red-500" />;
      case 'warning': return <TbAlertTriangle size={28} className="text-yellow-500" />;
      case 'info': return <TbInfoCircle size={28} className="text-blue-500" />;
      default: return <TbInfoCircle size={28} className="text-blue-500" />;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success': return 'border-green-500 shadow-green-900/10';
      case 'error': return 'border-red-500 shadow-red-900/10';
      case 'warning': return 'border-yellow-500 shadow-yellow-900/10';
      case 'info': return 'border-blue-500 shadow-blue-900/10';
      default: return 'border-blue-500 shadow-blue-900/10';
    }
  };

  if (!visible) return null;

  return (
    <div className={`fixed top-20 right-4 z-[100] flex items-center gap-4 px-6 py-4 rounded-xl shadow-2xl border-l-4 transition-all duration-500 transform bg-white dark:bg-slate-800 ${getBorderColor()} ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
      {/* Icon Section */}
      <div>
        {getIcon()}
      </div>
      
      {/* Text Section */}
      <div className="flex-1">
        <h4 className="font-bold text-slate-900 dark:text-white text-sm">
          {title}
        </h4>
        <p className="text-slate-600 dark:text-slate-300 text-sm mt-0.5">
          {message}
        </p>
      </div>
      
      {/* Close Button */}
      <button 
        onClick={() => {
          setVisible(false);
          setTimeout(onClose, 300);
        }}
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
      >
        <TbX size={18} />
      </button>
    </div>
  );
};

export default Notification;
