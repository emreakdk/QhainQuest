import { useState } from "react";
import {
  requestAccess,
  getAddress,
  isConnected
} from "@stellar/freighter-api";
import { useLanguage } from "../../context/LanguageContext";
import Button from "../ui/Button";

const FreighterConnect = ({ onConnect }) => {
  const [publicKey, setPublicKey] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const connectWallet = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const installed = await isConnected();
      if (!installed?.isConnected) {
        setError("Freighter uzantısı kurulu değil veya çalışmıyor.");
        return;
      }

      console.log("Freighter bulundu, bağlantı isteniyor...");
      await requestAccess();
      const address = await getAddress();
      console.log("Adres geldi:", address);
      const key = address.address || address;
      setPublicKey(key);
      onConnect(key);

    } catch (err) {
      console.error("HATA:", err);
      setError("Bağlantı sırasında hata: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={connectWallet}
        loading={loading}
        variant="primary"
        size="sm"
      >
        {t('wallet.connect')}
      </Button>

      {error && (
        <p className="mt-2 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
};

export default FreighterConnect;