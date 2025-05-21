import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const RatingForm = ({ onRate }) => {
  const [puntaje, setPuntaje] = useState(0);
  const [comentario, setComentario] = useState('');

  const enviar = () => {
    if (puntaje > 0 && comentario.trim()) {
      onRate({ puntaje, comentario });
      setPuntaje(0);
      setComentario('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar calificación</Text>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((n) => (
          <TouchableOpacity key={n} onPress={() => setPuntaje(n)}>
            <FontAwesome
              name={n <= puntaje ? 'star' : 'star-o'}
              size={28}
              color={n <= puntaje ? '#ffd700' : '#ccc'}
              style={{ marginHorizontal: 4 }}
            />
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        multiline
        placeholder="Comentario"
        value={comentario}
        onChangeText={setComentario}
      />

      <TouchableOpacity style={styles.button} onPress={enviar}>
        <Text style={styles.buttonText}>Calificar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 20, paddingHorizontal: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  stars: { flexDirection: 'row', justifyContent: 'center', marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  },
  button: {
    backgroundColor: '#00838f',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});

export default RatingForm;
