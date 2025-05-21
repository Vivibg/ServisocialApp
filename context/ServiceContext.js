import { createContext, useState, useEffect, useContext } from 'react';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { app } from '../config/firebaseConfig'; 

const db = getFirestore(app);
const ServiceContext = createContext();

export function ServiceProvider({ children }) {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const cargarServicios = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'servicios'));
        const datos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Servicios cargados:', datos);
        setServicios(datos);
      } catch (error) {
        console.error('Error cargando servicios:', error);
      }
    };

    cargarServicios();
  }, []);

  const agregarServicio = async (nuevoServicio) => {
    try {
      console.log('Nuevo servicio a agregar:', nuevoServicio);
      const docRef = await addDoc(collection(db, 'servicios'), nuevoServicio);
      setServicios(prev => [...prev, { id: docRef.id, ...nuevoServicio }]);
    } catch (error) {
      console.error('Error al agregar servicio:', error);
    }
  };

  const eliminarServicio = async (id) => {
    try {
      await deleteDoc(doc(db, 'servicios', id));
      setServicios(prev => prev.filter(servicio => servicio.id !== id));
    } catch (error) {
      console.error('Error al eliminar servicio:', error);
    }
  };

  return (
    <ServiceContext.Provider value={{ servicios, agregarServicio, eliminarServicio }}>
      {children}
    </ServiceContext.Provider>
  );
}

export function useService() {
  return useContext(ServiceContext);
}
