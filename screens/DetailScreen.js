import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function DetailScreen({ route }) {
  const { servicio } = route.params;
  const { usuario } = useAuth(); 
  const navigation = useNavigation();

  const [puntaje, setPuntaje] = useState(0);
  const [comentario, setComentario] = useState('');
  const [calificaciones, setCalificaciones] = useState(servicio.calificaciones || []);

  const promedio = () => {
    if (calificaciones.length === 0) return 0;
    const total = calificaciones.reduce((sum, c) => sum + c.puntaje, 0);
    return Math.round(total / calificaciones.length);
  };

  const guardarCalificacion = () => {
    if (puntaje === 0 || comentario.trim() === '') return;

    const nueva = {
      usuario: usuario?.nombre || 'Invitado',
      puntaje,
      comentario,
    };

    setCalificaciones([...calificaciones, nueva]);
    setPuntaje(0);
    setComentario('');

    Alert.alert('¡Gracias!', 'Tu calificación fue registrada.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{servicio.nombre}</Text>

      <View style={styles.itemRow}>
        <MaterialCommunityIcons name="tools" size={20} color="#00838f" />
        <Text style={styles.itemText}>{servicio.tipo}</Text>
      </View>

      <View style={styles.itemRow}>
        <FontAwesome name="info-circle" size={18} color="#00838f" />
        <Text style={styles.itemText}>{servicio.descripcion}</Text>
      </View>

      <View style={styles.itemRow}>
        <FontAwesome name="envelope" size={18} color="#00838f" />
        <Text style={styles.itemText}>{servicio.contacto}</Text>
      </View>

      <View style={styles.itemRow}>
        <FontAwesome name="map-marker" size={18} color="#00838f" />
        <Text style={styles.itemText}>{servicio.ubicacion}</Text>
      </View>

      <View style={styles.itemRow}>
        <FontAwesome
          name={
            servicio.fuente === 'Instagram'
              ? 'instagram'
              : servicio.fuente === 'Facebook'
              ? 'facebook'
              : 'whatsapp'
          }
          size={18}
          color="#00838f"
        />
        <Text style={styles.itemText}>{servicio.fuente}</Text>
      </View>

      <Text style={styles.section}>⭐ Promedio:</Text>
      <View style={styles.stars}>
        {[...Array(5)].map((_, i) => (
          <FontAwesome
            key={i}
            name={i < promedio() ? 'star' : 'star-o'}
            size={18}
            color={i < promedio() ? '#ffd700' : '#ccc'}
          />
        ))}
      </View>

      <Text style={styles.section}>💬 Comentarios:</Text>
      {calificaciones.length === 0 ? (
        <Text>No hay calificaciones aún.</Text>
      ) : (
        calificaciones.map((c, i) => (
          <Text key={i} style={styles.comentario}>
            {c.usuario}: "{c.comentario}"
          </Text>
        ))
      )}

      <Text style={styles.section}>📝 Califica este servicio:</Text>
      <View style={styles.stars}>
        {[...Array(5)].map((_, i) => (
          <TouchableOpacity key={i} onPress={() => setPuntaje(i + 1)}>
            <FontAwesome
              name={i < puntaje ? 'star' : 'star-o'}
              size={24}
              color={i < puntaje ? '#ffd700' : '#ccc'}
            />
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        placeholder="Escribe un comentario..."
        value={comentario}
        onChangeText={setComentario}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={guardarCalificacion}>
        <Text style={styles.buttonText}>Guardar calificación</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#ccc' }]}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={[styles.buttonText, { color: '#333' }]}>Volver al inicio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#00838f', marginBottom: 15 },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  itemText: { fontSize: 16, marginLeft: 10 },
  section: { marginTop: 20, fontWeight: 'bold', fontSize: 18, color: '#333' },
  stars: { flexDirection: 'row', marginVertical: 10 },
  comentario: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginTop: 5
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 10
  },
  button: {
    backgroundColor: '#00838f',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center'
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
