import { getAuth, onIdTokenChanged } from 'firebase/auth';
import { firebaseApp } from './firebase';

const auth = getAuth(firebaseApp);

export async function getFirebaseIdToken(): Promise<string | undefined> {
  const user = auth.currentUser;
  if (!user) return undefined;
  try {
    return await user.getIdToken(/* forceRefresh */ false);
  } catch {
    return undefined;
  }
}

export function onAuthChange(callback: () => void) {
  return onIdTokenChanged(auth, () => callback());
}


