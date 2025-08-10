import { useEffect, useState } from 'react';
import { signInAnonymously, signOut, getAuth } from 'firebase/auth';
import { firebaseApp } from '../lib/firebase';

const auth = getAuth(firebaseApp);

export function App() {
  const [apiStatus, setApiStatus] = useState<string>('');
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsub();
  }, []);

  async function callPing() {
    try {
      // Lazy import to avoid bundling issues if API isn't generated yet
      const mod: any = await import('../api');
      if (mod?.DefaultService?.ping) {
        const res = await mod.DefaultService.ping();
        setApiStatus(JSON.stringify(res));
      } else {
        setApiStatus('API клиент ещё не сгенерирован. Запустите: npm run gen:api');
      }
    } catch (e: any) {
      setApiStatus(e?.message || 'Ошибка вызова API');
    }
  }

  return (
    <div className="container">
      <h1>FF2</h1>
      <p>React + Firebase + OpenAPI (Swagger)</p>

      <div className="card">
        <button onClick={() => signInAnonymously(auth)}>Анонимный вход</button>
        <button onClick={() => signOut(auth)} disabled={!user}>Выйти</button>
      </div>

      <div className="card">
        <button onClick={callPing}>Проверить API (ping)</button>
        <div className="status">{apiStatus}</div>
      </div>

      <pre className="env">
        baseUrl: {import.meta.env.VITE_API_BASE_URL || '-'}{"\n"}
        swagger: {import.meta.env.VITE_SWAGGER_URL || '-'}
      </pre>
    </div>
  );
}


