import React, { createContext, useContext, useState } from 'react';
//import { navigate } from '../navigation/NavigationService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  //const navigation = useNavigation();

  const registrar = (nombre) => {
    setUsuario(nombre);
  };

  const salir = () => {
  setUsuario(null);
  navigate('Registro'); 
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
