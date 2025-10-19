import { useState, useCallback } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import Button from "../../ui/Button";

const FreighterConnect = ({ onConnect }) => {
  const [publicKey, setPublicKey] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const connectWallet = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Lazy load Freighter API
      const { requestAccess, getAddress, isConnected } = await import("@stellar/freighter-api");
      
      const installed = await isConnected();
      if (!installed?.isConnected) {
        setError(t('wallet.extensionNotInstalled'));
        return;
      }

      console.log(t('wallet.freighterFound'));
      await requestAccess();
      const address = await getAddress();
      console.log(t('wallet.addressReceived'), address);
      const key = address.address || address;
      setPublicKey(key);
      onConnect(key);

    } catch (err) {
      console.error("HATA:", err);
      setError(t('wallet.connectionError') + ": " + err.message);
    } finally {
      setLoading(false);
    }
  }, [onConnect]);

  return (
    <div>
      <Button
        onClick={connectWallet}
        loading={loading}
        variant="primary"
        size="lg"
        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 cursor-pointer"
      >
        {t('home.connectWallet')}
      </Button>

      {error && (
        <p className="mt-2 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
};

export default FreighterConnect;