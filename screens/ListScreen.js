import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export default function ListScreen({ navigation }) {
  const [servicios, setServicios] = useState([]);
  const [tipoFiltro, setTipoFiltro] = useState('');
  const [fuenteFiltro, setFuenteFiltro] = useState('');
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
    const coincideTipo = tipoFiltro === '' || item.tipo === tipoFiltro;
    const coincideFuente = fuenteFiltro === '' || item.fuente === fuenteFiltro;
    return coincideBusqueda && coincideTipo && coincideFuente;
  });

  const renderItem = ({ item }) => {
    const estrellas = obtenerPromedio(item.calificaciones);
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Detalle', { servicio: item })}
      >
        <Text style={styles.title}>{item.nombre}</Text>
        <Text>{item.tipo}</Text>
        <Text>{item.descripcion}</Text>
        <Text>⭐ {estrellas} estrellas</Text>
        <Text style={styles.ubicacion}>📍 {item.ubicacion}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Servicios disponibles</Text>

      <TextInput
        placeholder="Buscar por nombre..."
        style={styles.input}
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <Text style={styles.section}>Filtrar por tipo:</Text>
      <View style={styles.filterRow}>
        {["Gasfitería", "Electricidad", "Construcción"].map((tipo) => (
          <TouchableOpacity
            key={tipo}
            style={[styles.chip, tipoFiltro === tipo && styles.chipSelected]}
            onPress={() => setTipoFiltro(tipoFiltro === tipo ? '' : tipo)}
          >
            <MaterialCommunityIcons
              name={
                tipo === "Gasfitería" ? "tools" :
                tipo === "Electricidad" ? "flash" :
                "hammer"
              }
              size={16}
              color="#fff"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.chipText}>{tipo}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.section}>Filtrar por red social:</Text>
      <View style={styles.filterRow}>
        {["Instagram", "Facebook", "WhatsApp"].map((fuente) => (
          <TouchableOpacity
            key={fuente}
            style={[styles.chip, fuenteFiltro === fuente && styles.chipSelected]}
            onPress={() => setFuenteFiltro(fuenteFiltro === fuente ? '' : fuente)}
          >
            <FontAwesome
              name={
                fuente === "Instagram" ? "instagram" :
                fuente === "Facebook" ? "facebook" :
                "whatsapp"
              }
              size={16}
              color="#fff"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.chipText}>{fuente}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={serviciosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}
