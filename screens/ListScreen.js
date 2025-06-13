import React, { useEffect, useState } from 'react';
import { Dimensions, Platform } from 'react-native';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { MaterialCommunityIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40,
  },
  homeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00838f',
    marginBottom: 20,
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  },
  gridChip: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    margin: 10,
    alignItems: 'center',
    width: 120,
    height: 120,
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#00838f',
  },
  gridChipSelected: {
    // No cambia el fondo ni el borde, solo se muestra el ticket
  },
  gridIconWrap: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  gridChipCheck: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    backgroundColor: '#00838f',
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#fff',
  },
  gridChipText: {
    fontSize: 14,
    color: '#00838f',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noServiciosMsg: {
    color: '#d32f2f',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 14,
    marginVertical: 10,
    padding: 16,
    elevation: 2,
  },
  iconColumn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigIconContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00838f',
    marginBottom: 4,
  },
  tipo: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  descripcion: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 2,
  },
  rating: {
    fontSize: 13,
    color: '#ffb300',
    marginBottom: 2,
  },
  ubicacion: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 3,
    borderColor: '#00838f',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
  },
  iconCircleSelected: {
    borderColor: '#00838f',
    backgroundColor: '#fff',
  },
  iconBorderOnly: {
    backgroundColor: 'transparent',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00838f',
  },
});

export default function ListScreen({ route, navigation }) {
  const { tipoServicio } = route.params || {};
  const [servicios, setServicios] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const cargarServicios = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'servicios'));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setServicios(data);
      } catch (error) {
        console.error('Error al cargar servicios:', error);
      }
    };

    cargarServicios();
  }, []);

  const obtenerPromedio = (calificaciones) => {
    if (!calificaciones || calificaciones.length === 0) return 0;
    const total = calificaciones.reduce((sum, c) => sum + c.puntaje, 0);
    return Math.round(total / calificaciones.length);
  };

  const serviciosFiltrados = servicios.filter((item) => {
    const coincideBusqueda = item.nombre?.toLowerCase().includes(busqueda.toLowerCase());
    return tipoServicio ? item.tipo === tipoServicio : true;
  });

  const renderItem = ({ item }) => {
    const estrellas = obtenerPromedio(item.calificaciones);
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Detalle', { proveedor: item })}
      >
        <Text style={styles.title}>{item.nombre}</Text>
        <Text style={styles.tipo}>{item.tipo}</Text>
        <Text style={styles.descripcion}>{item.descripcion}</Text>
        <Text style={styles.rating}>⭐ {estrellas} estrellas</Text>
        <Text style={styles.ubicacion}>📍 {item.ubicacion}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.homeContainer}>
      {/* Header con botón de retroceso */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Home')}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#00838f" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {tipoServicio ? `${tipoServicio}s disponibles` : 'Todos los servicios'}
        </Text>
      </View>

      {/* Resto del contenido */}
      {serviciosFiltrados.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="handyman" size={50} color="#ccc" />
          <Text style={styles.emptyText}>
            {tipoServicio 
              ? `No hay ${tipoServicio.toLowerCase()}s disponibles` 
              : 'No hay servicios por el momento'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={serviciosFiltrados}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
    </View>
  );
}