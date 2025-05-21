import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useService } from '../context/ServiceContext'; // importa el context

export default function CrearServicioScreen({ navigation }) {
  const { agregarServicio } = useService(); // accede a la función del context

  const [nombre, setNombre] = useState('');
  const [contacto, setContacto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState('');
  const [fuente, setFuente] = useState('');
  const [ubicacion, setUbicacion] = useState('');

  const tipos = ['Gasfitería', 'Electricidad', 'Construcción'];
  const fuentes = ['Instagram', 'Facebook', 'WhatsApp'];

  const handleGuardar = async () => {
    if (!nombre || !descripcion || !tipo || !fuente || !ubicacion || !contacto) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    const nuevoServicio = {
      nombre,
      descripcion,
      tipo,
      fuente,
      contacto,
      ubicacion,
      calificaciones: []
    };

    try {
      await agregarServicio(nuevoServicio);
      Alert.alert('Éxito', 'Servicio creado correctamente');
      navigation.goBack(); // Vuelve a la pantalla anterior
    } catch (error) {
      console.error('Error al guardar servicio:', error);
      Alert.alert('Error', 'No se pudo guardar el servicio.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Crear nuevo servicio</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Juan Gasfiter"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Describe brevemente el servicio"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
      />

      <Text style={styles.label}>Ubicación</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Santiago Centro"
        value={ubicacion}
        onChangeText={setUbicacion}
      />

      <Text style={styles.label}>Tipo de servicio</Text>
      <View style={styles.filterRow}>
        {tipos.map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.chip, tipo === t && styles.chipSelected]}
            onPress={() => setTipo(tipo === t ? '' : t)}
          >
            <MaterialCommunityIcons
              name={
                t === 'Gasfitería' ? 'tools' :
                t === 'Electricidad' ? 'flash' :
                'hammer'
              }
              size={16}
              color="#fff"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.chipText}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Contacto</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: juan@unab.edu"
        value={contacto}
        onChangeText={setContacto}
      />

      <Text style={styles.label}>Red social de contacto</Text>
      <View style={styles.filterRow}>
        {fuentes.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.chip, fuente === f && styles.chipSelected]}
            onPress={() => setFuente(fuente === f ? '' : f)}
          >
            <FontAwesome
              name={
                f === 'Instagram' ? 'instagram' :
                f === 'Facebook' ? 'facebook' :
                'whatsapp'
              }
              size={16}
              color="#fff"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.chipText}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardar}>
        <Text style={styles.botonTexto}>Guardar servicio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff'
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 15
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9e9e9e',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 5
  },
  chipSelected: {
    backgroundColor: '#00838f'
  },
  chipText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  botonGuardar: {
    marginTop: 30,
    backgroundColor: '#00838f',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
