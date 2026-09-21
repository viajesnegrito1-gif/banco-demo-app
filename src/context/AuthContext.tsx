import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

import { TEST_USER } from '../data/mock';
import { getStoredValue, removeStoredValue, setStoredValue } from '../services/storage';

const SESSION_KEY = 'bank-demo-session';

interface SessionUser {
  name: string;
  email: string;
}

interface LoginResult {
  success: boolean;
  error?: string;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: SessionUser | null;
  login: (usernameOrEmail: string, password: string) => Promise<LoginResult>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      const savedUser = await getStoredValue<SessionUser | null>(SESSION_KEY, null);
      if (isMounted) {
        setUser(savedUser);
        setIsLoading(false);
      }
    }

    void restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (usernameOrEmail: string, password: string): Promise<LoginResult> => {
    const normalizedInput = usernameOrEmail.trim().toLowerCase();
    const validUser =
      normalizedInput === TEST_USER.email.toLowerCase() ||
      normalizedInput === TEST_USER.username.toLowerCase();

    if (!validUser || password !== TEST_USER.password) {
      return {
        success: false,
        error: 'Usuario demo o contraseña incorrectos.',
      };
    }

    const sessionUser = {
      name: TEST_USER.name,
      email: TEST_USER.email,
    };

    setUser(sessionUser);
    await setStoredValue(SESSION_KEY, sessionUser);

    return { success: true };
  };

  const logout = async () => {
    setUser(null);
    await removeStoredValue(SESSION_KEY);
  };

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(user),
      isLoading,
      user,
      login,
      logout,
    }),
    [isLoading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
