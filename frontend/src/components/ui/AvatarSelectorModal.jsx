'use client';

import { useLanguage } from '../../context/LanguageContext';
import { useUser } from '../../context/UserContext';
import { TbX } from 'react-icons/tb';
import { AVATARS } from '../../data/avatarData';

const AvatarSelectorModal = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const { selectedAvatarId, setSelectedAvatarId } = useUser();

  if (!isOpen) return null;

  const handleAvatarSelect = (avatarId) => {
    setSelectedAvatarId(avatarId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-4 sm:p-6 w-[90vw] sm:w-full max-w-lg mx-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 flex-shrink-0">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {language === 'tr' ? 'Avatarını Seç' : 'Choose Your Avatar'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0"
            aria-label={language === 'tr' ? 'Kapat' : 'Close'}
          >
            <TbX className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" />
          </button>
        </div>

        {/* Avatar Grid - Scrollable Container */}
        <div className="flex-1 overflow-y-auto min-h-0 p-2">
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
          {AVATARS.map((avatar) => {
            const isSelected = selectedAvatarId === avatar.id;
            return (
              <button
                key={avatar.id}
                onClick={() => handleAvatarSelect(avatar.id)}
                className={`
                  relative p-3 sm:p-4 rounded-xl transition-all duration-200 min-h-[120px] sm:min-h-[140px]
                  ${isSelected 
                    ? 'ring-2 sm:ring-4 ring-indigo-500 ring-offset-1 sm:ring-offset-2 ring-offset-slate-900 bg-indigo-500/20 scale-105' 
                    : 'bg-slate-800/50 hover:bg-slate-800 hover:scale-105'
                  }
                `}
              >
                {/* Avatar SVG */}
                <div 
                  className="w-full aspect-square mb-1 sm:mb-2 flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: avatar.svg }}
                />
                
                {/* Avatar Name */}
                <div className="text-xs sm:text-sm font-medium text-center text-slate-300 line-clamp-2">
                  {language === 'tr' ? avatar.nameTr : avatar.name}
                </div>

                {/* Selected Indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarSelectorModal;

