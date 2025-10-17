import { useState, useEffect } from "react";
import { Contract } from "soroban-client";
import { useLanguage } from "../context/LanguageContext";

const QuestList = () => {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const contractId = "CB2QQGEKXLGPHU77IUNQSRAOGMW2SC5ZZHWZ3ZVUJ3ZHG74GXIQVAR26";
        const contract = new Contract(contractId, {
          rpcUrl: "https://soroban-rpc.futurenet.stellar.org:443",
          allowHttp: true,
        });

        // NOT: Akıllı kontratımızda henüz "tüm görevleri getir" fonksiyonu yok.
        // Bu yüzden şimdilik sadece ID'si 0 olan ilk görevi çekmeye çalışacağız.
        // Bu görev henüz oluşturulmadığı için bir hata almayı bekliyoruz.
        // Bu beklenen hata, backend ile bağlantımızın çalıştığını kanıtlayacaktır.

        const response = await contract.call("get_quest", 0);
        
        // Buradaki scValToNative, Soroban'dan gelen veriyi JavaScript'in anlayacağı
        // formata çevirir. Henüz import etmedik, bir sonraki adımda ekleyeceğiz.
        // const questData = scValToNative(response.result); 
        // setQuests([questData]);

      } catch (err) {
        console.error(t('questList.fetchError'), err);
        setError(t('questList.error'));
      } finally {
        setLoading(false);
      }
    };

    fetchQuests();
  }, []);

  if (loading) {
    return <p className="text-gray-400">{t('questList.loading')}</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{t('questList.availableQuests')}</h2>
      {/* Görevler buraya listelenecek */}
    </div>
  );
};

export default QuestList;