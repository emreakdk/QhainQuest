import { useState, useEffect } from 'react';
import { requestAccess, isAllowed, getPublicKey } from '@stellar/freighter-api';

function App() {
  const [publicKey, setPublicKey] = useState('');

  useEffect(() => {
    const checkConnection = async () => {
      if (await isAllowed()) {
        const key = await getPublicKey();
        setPublicKey(key);
      }
    };
    checkConnection();
  }, []);

  const connectWallet = async () => {
    try {
      await requestAccess();
      const key = await getPublicKey();
      setPublicKey(key);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="mb-8 text-4xl font-bold">
        ChainQuest
      </h1>

      {publicKey ? (
        <div className="text-center">
          <p className="mb-4">Hoş Geldin!</p>
          <p className="max-w-md break-all rounded-lg bg-slate-700 px-4 py-2 font-mono text-sm">
            {publicKey}
          </p>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
        >
          Cüzdanı Bağla
        </button>
      )}
    </div>
  );
}

export default App;