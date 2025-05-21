import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function GraciasScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FontAwesome name="check-circle" size={80} color="#00838f" />
      <Text style={styles.titulo}>¡Gracias por tu calificación!</Text>
      <Text style={styles.subtitulo}>
        Tu opinión ayuda a otros a elegir servicios confiables.
      </Text>

      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.botonTexto}>Volver al inicio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00838f',
    marginTop: 20,
    textAlign: 'center'
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center'
  },
  boton: {
    backgroundColor: '#00838f',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 30
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
