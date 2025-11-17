import { useLanguage } from '../../context/LanguageContext';
import { Card, CardContent, CardHeader } from './Card';
import Button from './Button';

const NavigationConfirmDialog = ({ isOpen, onConfirm, onCancel, questName }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4 min-h-screen">
      <div className="w-full max-w-md mx-auto transform transition-all duration-300 scale-100 opacity-100">
        <Card className="w-full bg-white dark:bg-slate-800 border-2 border-orange-200 dark:border-orange-700/50 shadow-2xl">
          <CardHeader className="text-center pb-6 pt-8 px-6">
            <div className="text-6xl mb-6">⚠️</div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              {t('navigation.warning.title')}
            </h2>
            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {t('navigation.warning.message')}
            </p>
            {questName && (
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 font-medium">
                {t('navigation.warning.currentQuest')}: <span className="font-semibold text-slate-900 dark:text-slate-200">{questName}</span>
              </p>
            )}
          </CardHeader>
          <CardContent className="px-6 pb-6 space-y-4">
            <div className="bg-orange-50 dark:bg-orange-900/30 border-2 border-orange-200 dark:border-orange-700/70 rounded-lg p-4 shadow-sm">
              <p className="text-sm font-medium text-orange-900 dark:text-orange-100 leading-relaxed">
                {t('navigation.warning.resetInfo')}
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                onClick={onCancel}
                variant="outline"
                className="flex-1 cursor-pointer border-2 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium py-2.5"
              >
                {t('navigation.warning.stay')}
              </Button>
              <Button
                onClick={onConfirm}
                className="flex-1 cursor-pointer bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-medium py-2.5 shadow-md hover:shadow-lg transition-all duration-200"
              >
                {t('navigation.warning.leave')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NavigationConfirmDialog;

