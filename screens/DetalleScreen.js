import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, Button, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { app } from '../config/firebaseConfig';
import { MaterialIcons } from '@expo/vector-icons';

const auth = getAuth(app);
const db = getFirestore(app);

// Componente de estrellas compatible web
const StarRating = ({ rating, onRate, size = 24 }) => (
  <View style={{ flexDirection: 'row', marginVertical: 5 }}>
    {[1,2,3,4,5].map(star => (
      <TouchableOpacity key={star} onPress={() => onRate && onRate(star)} disabled={!onRate}>
        <MaterialIcons
          name={star <= rating ? 'star' : 'star-border'}
          size={size}
          color="#FFD700"
        />
      </TouchableOpacity>
    ))}
  </View>
);

export default function DetalleScreen({ route, navigation }) {
  // Log de usuario en cada render para debug
  useEffect(() => {
    console.log('Usuario detectado en render:', usuario);
  });
  const [proveedor, setProveedor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comentario, setComentario] = useState('');
  const [calificacion, setCalificacion] = useState(0);
  const [sending, setSending] = useState(false);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUsuario(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    async function loadProveedor() {
      try {
        const id = route?.params?.proveedor?.id;
        if (!id) {
          Alert.alert('Error', 'No se encontró el proveedor');
          navigation.goBack();
          return;
        }
        const docSnap = await getDoc(doc(db, 'servicios', id));
        if (docSnap.exists()) {
          setProveedor({ id, ...docSnap.data() });
        } else {
          Alert.alert('Error', 'Proveedor no encontrado en la base de datos');
          navigation.goBack();
        }
      } catch (e) {
        Alert.alert('Error', 'No se pudo cargar el proveedor');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    }
    loadProveedor();
    // eslint-disable-next-line
  }, []);

  const handleCalificar = async () => {
    console.log('Intentando comentar...');
    if (!comentario.trim() || calificacion === 0) {
      Alert.alert('Error', 'Por favor, escribe un comentario y selecciona una calificación');
      return;
    }
    setSending(true);
    try {
      const user = auth.currentUser;
      console.log('Usuario actual:', user);
      if (!user) {
        Alert.alert('Error', 'Debes iniciar sesión para comentar');
        setSending(false);
        return;
      }
      const nuevoComentario = {
        texto: comentario,
        puntaje: calificacion,
        usuarioId: user.uid,
        usuarioNombre: user.displayName || 'Usuario',
        fecha: new Date().toLocaleString('es-ES', {
          day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
        }),
        usuarioFoto: user.photoURL || null
      };
      await updateDoc(doc(db, 'servicios', proveedor.id), {
        calificaciones: arrayUnion(nuevoComentario)
      });
      // Recargar el documento actualizado de Firestore
      const docSnap = await getDoc(doc(db, 'servicios', proveedor.id));
      if (docSnap.exists()) {
        setProveedor({ id: proveedor.id, ...docSnap.data() });
      }
      setComentario('');
      setCalificacion(0);
      Alert.alert('¡Gracias!', 'Tu comentario fue enviado');
    } catch (e) {
      Alert.alert('Error', 'No se pudo guardar el comentario');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#00838f" /></View>;
  }
  if (!proveedor) {
    return <View style={styles.center}><Text>Error cargando proveedor</Text></View>;
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>
      <View style={styles.profileHeader}>
        <Text style={styles.name}>{proveedor.nombre}</Text>
        <Text style={styles.service}>{proveedor.tipo}</Text>
        <StarRating rating={proveedor.promedio || 0} size={30} />
        <Text style={styles.ratingText}>({proveedor.calificaciones?.length || 0} reseñas)</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Información de contacto</Text>
        <Text style={styles.detail}>Tel: {proveedor.telefono || 'No disponible'}</Text>
        <Text style={styles.detail}>Ubicación: {proveedor.ubicacion || 'No especificada'}</Text>
        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.description}>{proveedor.descripcion || 'Sin descripción'}</Text>
      </View>
      <Text style={styles.seccionTitulo}>Comentarios</Text>
      {proveedor.calificaciones?.length > 0 ? (
        proveedor.calificaciones.map((coment, idx) => (
          <View key={idx} style={styles.comentarioContainer}>
            <View style={styles.comentarioHeader}>
              <Text style={styles.comentarioNombre}>
                <MaterialIcons name="person" size={16} color="#00838f" /> {coment.usuarioNombre}
              </Text>
              <Text style={styles.comentarioFecha}>{coment.fecha}</Text>
            </View>
            <StarRating rating={coment.puntaje} size={18} />
            <Text style={styles.comentarioTexto}>{coment.texto}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.sinComentarios}>No hay comentarios aún</Text>
      )}
      <Text style={styles.seccionTitulo}>Deja tu comentario</Text>
      {(!usuario || !usuario.uid) && (
        <>
          <Text style={{ color: 'red', marginBottom: 10 }}>
            Debes iniciar sesión para dejar un comentario.
          </Text>
          <Button
            title="Ir a Login"
            onPress={() => navigation.navigate('Login')}
            color="#00838f"
          />
        </>
      )}
      <StarRating rating={calificacion} onRate={setCalificacion} size={30} />
      <TextInput
        style={styles.comentarioInput}
        placeholder="Escribe tu comentario..."
        value={comentario}
        onChangeText={setComentario}
        multiline
      />
      <Button
        title={sending ? 'Enviando...' : 'Enviar comentario'}
        onPress={handleCalificar}
        disabled={sending || calificacion === 0 || !comentario.trim() || !usuario || !usuario.uid}
        color="#00838f"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#fff' },
  backButton: { alignSelf: 'flex-start', marginBottom: 20 },
  backText: { color: '#00838f', fontSize: 16 },
  profileHeader: { alignItems: 'center', marginBottom: 30 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  service: { fontSize: 18, color: '#00838f', marginBottom: 15 },
  ratingText: { marginLeft: 10, color: '#666' },
  detailsContainer: { marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10, marginTop: 15 },
  detail: { fontSize: 16, color: '#555', marginBottom: 8 },
  description: { fontSize: 16, color: '#555', lineHeight: 24 },
  seccionTitulo: { fontSize: 18, fontWeight: 'bold', marginVertical: 15, color: '#00838f' },
  comentarioContainer: { backgroundColor: '#f8f9fa', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#e0e0e0' },
  comentarioHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  comentarioNombre: { fontWeight: 'bold', color: '#00838f' },
  comentarioFecha: { color: '#666', fontSize: 12 },
  comentarioTexto: { color: '#333', fontSize: 14, lineHeight: 20 },
  sinComentarios: { color: '#666', fontStyle: 'italic', textAlign: 'center', marginVertical: 20 },
  comentarioInput: { minHeight: 100, borderColor: '#ddd', borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 15, textAlignVertical: 'top' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
