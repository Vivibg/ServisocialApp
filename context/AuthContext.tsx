import React, { createContext, useContext, useState } from 'react';
import { signOut, getAuth } from 'firebase/auth';
import { app } from '../config/firebaseConfig';
import { navigate } from './NavigationService';

interface AuthContextProps {
  usuario: any;
  registrar: (nombre: string) => void;
  salir: () => Promise<void>;
}
const AuthContext = createContext<AuthContextProps>({
  usuario: null,
  registrar: () => {},
  salir: async () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<any>(null);

  const registrar = (nombre: string) => {
    setUsuario(nombre);
  };

  const salir = async () => {
    const auth = getAuth(app);
    await signOut(auth);
    setUsuario(null);
    navigate('Login');
  };

  return (
    <AuthContext.Provider value={{ usuario, registrar, salir }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
