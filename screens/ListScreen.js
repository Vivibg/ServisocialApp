import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import services from '../data/services';

export default function ListScreen({ navigation }) {
  const [tipoFiltro, setTipoFiltro] = useState('');
  const [fuenteFiltro, setFuenteFiltro] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const obtenerPromedio = (calificaciones) => {
    if (!calificaciones || calificaciones.length === 0) return 0;
    const total = calificaciones.reduce((sum, c) => sum + c.puntaje, 0);
    return Math.round(total / calificaciones.length);
  };

  const serviciosFiltrados = services.filter((item) => {
    const coincideBusqueda = item.nombre.toLowerCase().includes(busqueda.toLowerCase());
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

      {/* 🔍 Buscador */}
      <TextInput
        placeholder="Buscar por nombre..."
        style={styles.input}
        value={busqueda}
        onChangeText={setBusqueda}
      />

      {/* 🎛️ Filtros por tipo */}
      <Text style={styles.section}>Filtrar por tipo:</Text>
      <View style={styles.filterRow}>
        {["Gasfitería", "Electricidad", "Construcción"].map((tipo) => (
          <TouchableOpacity
            key={tipo}
            style={[
              styles.chip,
              tipoFiltro === tipo && styles.chipSelected
            ]}
            onPress={() => setTipoFiltro(tipoFiltro === tipo ? "" : tipo)}
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

      {/* 🎛️ Filtros por fuente */}
      <Text style={styles.section}>Filtrar por red social:</Text>
      <View style={styles.filterRow}>
        {["Instagram", "Facebook", "WhatsApp"].map((fuente) => (
          <TouchableOpacity
            key={fuente}
            style={[
              styles.chip,
              fuenteFiltro === fuente && styles.chipSelected
            ]}
            onPress={() => setFuenteFiltro(fuenteFiltro === fuente ? "" : fuente)}
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

      {/* 📋 Lista filtrada */}
      <FlatList
        data={serviciosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15
  },
  card: {
    padding: 15,
    backgroundColor: '#f2f2f2',
    marginBottom: 10,
    borderRadius: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  ubicacion: {
    marginTop: 5,
    fontStyle: 'italic'
  },
  section: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
    marginTop: 5,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ccc',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8
  },
  chipSelected: {
    backgroundColor: '#00838f'
  },
  chipText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
