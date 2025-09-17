import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth, db, googleProvider } from '@/lib/firebase';
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithPopup,
  signOut as fbSignOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import type { Role, UserDoc } from '@/types';

interface AuthContextValue {
  user: FirebaseUser | null;
  profile: UserDoc | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserDoc | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const ref = doc(db, 'users', u.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProfile({ uid: u.uid, ...(snap.data() as Omit<UserDoc, 'uid'>) });
        } else {
          const defaultRoles: Role[] = ['voter'];
          const newDoc: UserDoc & { createdAt: unknown } = {
            uid: u.uid,
            email: u.email,
            displayName: u.displayName,
            roles: defaultRoles,
          } as UserDoc & { createdAt: unknown };
          await setDoc(ref, { ...newDoc, createdAt: serverTimestamp() });
          setProfile(newDoc as UserDoc);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };
  const signInWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };
  const signUpWithEmail = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };
  const signOut = async () => fbSignOut(auth);

  const value = useMemo(
    () => ({ user, profile, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut }),
    [user, profile, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
