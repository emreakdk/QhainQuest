import { useLanguage } from '../../context/LanguageContext';
import { Card, CardContent, CardHeader } from './Card';
import Button from './Button';

const ExitWarningModal = ({ isOpen, onConfirm, onCancel }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4 min-h-screen">
      <div className="w-full max-w-md mx-auto transform transition-all duration-300 scale-100 opacity-100">
        <Card className="w-full bg-white dark:bg-slate-800 border-2 border-red-200 dark:border-red-700/50 shadow-2xl">
          <CardHeader className="text-center pb-6 pt-8 px-6">
            <div className="text-6xl mb-6">⚠️</div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              {t('test.exit.title')}
            </h2>
            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {t('test.exit.message')}
            </p>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="flex gap-3 pt-2">
              <Button
                onClick={onCancel}
                variant="outline"
                className="flex-1 cursor-pointer border-2 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium py-2.5"
              >
                {t('test.exit.cancel')}
              </Button>
              <Button
                onClick={onConfirm}
                className="flex-1 cursor-pointer bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-medium py-2.5 shadow-md hover:shadow-lg transition-all duration-200"
              >
                {t('test.exit.confirm')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExitWarningModal;

