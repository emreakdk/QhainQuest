import { memo } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { Card, CardContent } from '../../ui/Card';
import Badge from '../../ui/Badge';

const CertificateCard = ({ certificate }) => {
  const { t } = useLanguage();

  return (
    <Card hover className="group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              {typeof certificate.title === 'string' ? certificate.title : 
               (typeof certificate.questName === 'string' ? certificate.questName : 'Sertifika')}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
              {typeof certificate.description === 'string' ? certificate.description : 
               (typeof certificate.questName === 'string' ? `${certificate.questName} quest'ini başarıyla tamamladınız` : 'Quest başarıyla tamamlandı')}
            </p>
          </div>
          <div className="ml-4">
            <Badge variant="success" className="flex items-center space-x-1">
              <span>✓</span>
              <span>Sertifika</span>
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">Kategori:</span>
            <Badge variant="outline">{certificate.category || 'Blockchain'}</Badge>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">Nadirliği:</span>
            <span className="font-medium text-slate-900 dark:text-white">
              {certificate.rarity || 'Common'}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">Kazanılan Tarihi:</span>
            <span className="font-medium text-slate-900 dark:text-white">
              {certificate.completedAt ? new Date(certificate.completedAt).toLocaleDateString('tr-TR') : 
               certificate.earnedAt ? new Date(certificate.earnedAt).toLocaleDateString('tr-TR') : 
               t('common.unknown')}
            </span>
          </div>
        </div>

        {/* Certificate Visual */}
        <div className="mt-4 p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border-2 border-dashed border-purple-200 dark:border-purple-700">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">🏆</span>
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Blockchain Sertifikası
            </span>
          </div>
          <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-2">
            {t('certificate.blockchainStored')}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-4">
          <button className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
            Sertifikayı Görüntüle
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(CertificateCard);
