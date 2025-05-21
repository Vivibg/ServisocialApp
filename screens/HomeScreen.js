import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import servicios from '../data/services';

const iconosPorTipo = {
  Gasfitería: <MaterialCommunityIcons name="pipe-wrench" size={28} color="#00838f" />,
  Reparaciones: <FontAwesome5 name="tools" size={28} color="#00838f" />,
  Electricidad: <MaterialCommunityIcons name="flash" size={28} color="#00838f" />,
  Carpintería: <MaterialCommunityIcons name="hammer" size={28} color="#00838f" />,
  Limpieza: <MaterialCommunityIcons name="broom" size={28} color="#00838f" />,
  Pintura: <MaterialCommunityIcons name="format-paint" size={28} color="#00838f" />,
};

const tiposDisponibles = Object.keys(iconosPorTipo);

export default function HomeScreen() {
  const { usuario, salir } = useAuth();
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const navigation = useNavigation();
  const serviciosFiltrados = tipoSeleccionado
    ? servicios.filter(s => s.tipo === tipoSeleccionado)
    : servicios;

  const irADetalle = (servicio) => {
    navigation.navigate('Detalle', { servicio });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.saludo}>
    ¡Hola {usuario || 'invitado'}! 👋
    </Text>
    <TouchableOpacity onPress={() => navigation.navigate('NuevoServicio')}>
      <Text style={styles.newServiceText}>¿Tienes un nuevo servicio? ¡Publica aquí!</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={salir} style={styles.logoutButton}>
      <Text style={styles.logoutText}>Cerrar sesión</Text>
    </TouchableOpacity>

    <Text style={styles.subtitulo}>Selecciona un tipo de servicio</Text>

      <FlatList
        data={tiposDisponibles}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsContainer}
        renderItem={({ item }) => {
          const seleccionado = tipoSeleccionado === item;
          return (
            <TouchableOpacity
              style={[styles.chipBox, seleccionado && styles.chipBoxActivo]}
              onPress={() =>
                setTipoSeleccionado(seleccionado ? null : item)
              }
            >
              {iconosPorTipo[item]}
              {seleccionado && (
                <Feather
                  name="check-circle"
                  size={16}
                  color="#00838f"
                  style={styles.checkIcon}
                />
              )}
              <Text style={[styles.chipText, seleccionado && styles.chipTextActivo]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item}
      />

      {/* Lista de servicios filtrados */}
      <FlatList
        data={serviciosFiltrados}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.servicio}
            onPress={() => irADetalle(item)}
          >
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.descripcion}>{item.descripcion}</Text>
            <Text style={styles.contacto}>{item.contacto}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00838f',
    marginBottom: 10,
    textAlign: 'center',
  },
  chipsContainer: { paddingBottom: 10 },
  chipBox: {
    width: 72,
    height: 72,
    backgroundColor: '#e0f7fa',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    position: 'relative'
  },
  chipBoxActivo: {
    borderWidth: 2,
    borderColor: '#00838f',
  },
  chipText: {
    fontSize: 11,
    color: '#444',
    fontWeight: '500',
    marginTop: 4
  },
  chipTextActivo: {
    color: '#00838f',
    fontWeight: 'bold'
  },
  checkIcon: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  servicio: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  saludo: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#00838f',
  marginBottom: 6
},
subtitulo: {
  fontSize: 16,
  color: '#555',
  marginBottom: 12
},
logoutButton: {
  alignSelf: 'flex-end',
  padding: 8,
  marginBottom: 10,
},

logoutText: {
  color: '#d32f2f',
  fontSize: 14,
  fontWeight: 'bold'
},

  newServiceText: {
    color: '#00838f',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4
  },

  nombre: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  descripcion: { fontSize: 14, color: '#666', marginTop: 4 },
  contacto: { fontSize: 14, color: '#999', marginTop: 2 },
});
