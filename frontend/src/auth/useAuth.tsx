// src/auth/useAuth.ts
import { useState, useContext, createContext } from 'react';

type User = { role: 'user' | 'dev'; /* otros campos */ };
const AuthContext = createContext<{ user: User | null }>({ user: null });

export function AuthProvider({ children }: any) {
  // simulamos un developer logueado:
  const [user] = useState<User>({ role: 'dev' });
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
