import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform } from 'react-native';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../config/firebaseConfig';

const auth = getAuth(app);

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setLoading(true);
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('Registro exitoso', '¡Bienvenido!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert('Login exitoso', '¡Bienvenido de nuevo!');
      }
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      // Solo soportado en web
      if (Platform.OS === 'web') {
        await signInWithPopup(auth, provider);
        Alert.alert('Login exitoso', '¡Bienvenido con Google!');
        navigation.goBack();
      } else {
        Alert.alert('Solo disponible en web', 'El login con Google solo está habilitado en la web para esta demo.');
      }
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegister ? 'Crear cuenta' : 'Iniciar sesión'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title={loading ? 'Procesando...' : isRegister ? 'Registrarse' : 'Ingresar'}
        onPress={handleAuth}
        disabled={loading || !email || !password}
        color="#00838f"
      />
      <View style={{ height: 20 }} />
      <Button
        title="Iniciar sesión con Google"
        onPress={handleGoogleLogin}
        color="#db4437"
      />
      <View style={{ height: 20 }} />
      <Button
        title={isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
        onPress={() => setIsRegister(!isRegister)}
        color="#555"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 32, color: '#00838f', textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 16 }
});
