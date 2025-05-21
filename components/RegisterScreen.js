import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

export default function RegisterScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const { registrar } = useAuth();

  const handleSubmit = () => {
    if (nombre.trim() === '') return;
    registrar(nombre);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <FontAwesome name="user-circle" size={70} color="#00838f" />
      <Text style={styles.titulo}>Registro de Usuario</Text>

      <TextInput
        placeholder="Ingresa tu nombre"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
      />

      {nombre.trim() === '' && (
        <Text style={styles.error}>El nombre es obligatorio.</Text>
      )}

      <TouchableOpacity
        style={[
          styles.boton,
          { backgroundColor: nombre.trim() ? '#00838f' : '#ccc' }
        ]}
        onPress={handleSubmit}
        disabled={nombre.trim() === ''}
      >
        <Text style={styles.botonTexto}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 30
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00838f',
    marginTop: 15,
    marginBottom: 30
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10
  },
  boton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center'
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});
