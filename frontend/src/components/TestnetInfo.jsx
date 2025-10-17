import { useState, useEffect } from 'react';
import { testTestnetConnection, getTestnetSummary } from '../utils/testnetConnection.js';
import { useLanguage } from '../context/LanguageContext';

const TestnetInfo = () => {
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [testnetSummary, setTestnetSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    const checkTestnetConnection = async () => {
      try {
        setLoading(true);
        const [connectionResult, summary] = await Promise.all([
          testTestnetConnection(),
          getTestnetSummary()
        ]);
        
        setConnectionStatus(connectionResult);
        setTestnetSummary(summary);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkTestnetConnection();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Testnet Bağlantı Durumu</h3>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-400 mb-4">Testnet Bağlantı Hatası</h3>
        <p className="text-red-300">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Testnet Bağlantı Durumu</h3>
      
      {/* Overall Status */}
      <div className={`p-3 rounded-lg mb-4 ${
        connectionStatus?.success ? 'bg-green-900/20 border border-green-500' : 'bg-yellow-900/20 border border-yellow-500'
      }`}>
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-3 ${
            connectionStatus?.success ? 'bg-green-500' : 'bg-yellow-500'
          }`}></div>
          <span className={`font-medium ${
            connectionStatus?.success ? 'text-green-400' : 'text-yellow-400'
          }`}>
            {connectionStatus?.success ? 'Testnet Bağlantısı Başarılı' : 'Testnet Konfigürasyonu Eksik'}
          </span>
        </div>
      </div>

      {/* Environment Info */}
      <div className="mb-4">
        <h4 className="text-md font-medium text-gray-300 mb-2">{t('testnet.environmentInfo')}</h4>
        <div className="bg-gray-700 rounded p-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-400">{t('testnet.environment')}:</span>
              <span className="text-white ml-2">{testnetSummary?.environment}</span>
            </div>
            <div>
              <span className="text-gray-400">RPC URL:</span>
              <span className="text-white ml-2 text-xs">{testnetSummary?.rpcUrl}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contract Status */}
      <div className="mb-4">
        <h4 className="text-md font-medium text-gray-300 mb-2">Kontrat Durumu</h4>
        <div className="space-y-2">
          {Object.entries(testnetSummary?.contracts || {}).map(([name, address]) => (
            <div key={name} className="flex items-center justify-between bg-gray-700 rounded p-2">
              <span className="text-gray-300 capitalize">{name}:</span>
              <span className={`text-xs ${
                address.includes('HERE') ? 'text-yellow-400' : 'text-green-400'
              }`}>
                {address.includes('HERE') ? 'Deploy Edilmeli' : 'Konfigüre Edilmiş'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Test Results */}
      <div className="mb-4">
        <h4 className="text-md font-medium text-gray-300 mb-2">Test Sonuçları</h4>
        <div className="space-y-2">
          {connectionStatus?.tests?.map((test, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-700 rounded p-2">
              <span className="text-gray-300 text-sm">{test.name}</span>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  test.success ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className={`text-xs ${
                  test.success ? 'text-green-400' : 'text-red-400'
                }`}>
                  {test.success ? 'Başarılı' : 'Başarısız'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Status */}
      <div>
        <h4 className="text-md font-medium text-gray-300 mb-2">Özellik Durumu</h4>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(testnetSummary?.features || {}).map(([feature, enabled]) => (
            <div key={feature} className="flex items-center justify-between bg-gray-700 rounded p-2">
              <span className="text-gray-300 text-sm capitalize">{feature.replace('enable', '')}:</span>
              <div className={`w-2 h-2 rounded-full ${
                enabled ? 'bg-green-500' : 'bg-gray-500'
              }`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Validation Warnings */}
      {testnetSummary?.validation?.warnings?.length > 0 && (
        <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-500 rounded">
          <h5 className="text-yellow-400 font-medium mb-2">Uyarılar:</h5>
          <ul className="text-yellow-300 text-sm space-y-1">
            {testnetSummary.validation.warnings.map((warning, index) => (
              <li key={index}>• {warning}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Validation Issues */}
      {testnetSummary?.validation?.issues?.length > 0 && (
        <div className="mt-4 p-3 bg-red-900/20 border border-red-500 rounded">
          <h5 className="text-red-400 font-medium mb-2">Sorunlar:</h5>
          <ul className="text-red-300 text-sm space-y-1">
            {testnetSummary.validation.issues.map((issue, index) => (
              <li key={index}>• {issue}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TestnetInfo;
