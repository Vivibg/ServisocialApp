import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../config/firebaseConfig';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, LayoutAnimation, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5, MaterialCommunityIcons, Feather, MaterialIcons } from '@expo/vector-icons';
import { useService } from '../context/ServiceContext';
import { useAuth } from '../context/AuthContext';

const windowWidth = Dimensions.get('window').width;

const iconosPorTipo = {
  Gasfitería: <MaterialCommunityIcons name="pipe-wrench" size={48} color="#00838f" />,
  Reparaciones: <FontAwesome5 name="tools" size={48} color="#00838f" />,
  Electricidad: <MaterialCommunityIcons name="flash" size={48} color="#00838f" />,
  Carpintería: <MaterialCommunityIcons name="hammer" size={48} color="#00838f" />,
  Limpieza: <MaterialCommunityIcons name="broom" size={48} color="#00838f" />,
  Pintura: <MaterialCommunityIcons name="format-paint" size={48} color="#00838f" />,
};

const tiposDisponibles = Object.keys(iconosPorTipo);

export default function HomeScreen() {
  const [usuario, setUsuario] = useState(null);
  const { salir } = useAuth();
  const navigation = useNavigation();

  const [cargandoUsuario, setCargandoUsuario] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUsuario(user);
      setCargandoUsuario(false);
    });
    return () => {
      setCargandoUsuario(false);
      unsubscribe();
    };
  }, []);

  // Datos de servicios para mostrar en el grid
  const serviciosGrid = [
    { tipo: 'Gasfitería', icon: iconosPorTipo['Gasfitería'] },
    { tipo: 'Reparaciones', icon: iconosPorTipo['Reparaciones'] },
    { tipo: 'Electricidad', icon: iconosPorTipo['Electricidad'] },
    { tipo: 'Carpintería', icon: iconosPorTipo['Carpintería'] },
    { tipo: 'Limpieza', icon: iconosPorTipo['Limpieza'] },
    { tipo: 'Pintura', icon: iconosPorTipo['Pintura'] },
  ];

  const renderServicio = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('Lista', { tipoServicio: item.tipo })}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        {item.icon}
      </View>
      <Text style={styles.cardText}>{item.tipo}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      {cargandoUsuario ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#00838f', fontSize: 18 }}>Cargando usuario...</Text>
        </View>
      ) : (
        <>
          {(!usuario || !usuario.uid) && (
            <Button
              title="Iniciar sesión"
              onPress={() => navigation.navigate('Login')}
              color="#00838f"
            />
          )}
          <View style={styles.container}>
            {/* Header azul */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>ServiSocial</Text>
              {usuario && usuario.email && (
                <Text style={{ color: '#fff', fontSize: 14, marginTop: 4 }}>
                  Bienvenido, {usuario.email}
                </Text>
              )}
            </View>
            <FlatList
              data={serviciosGrid}
              renderItem={renderServicio}
              keyExtractor={(item) => item.tipo}
              numColumns={2}
              contentContainerStyle={styles.grid}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafb',
  },
  header: {
    width: '100%',
    backgroundColor: '#0097a7',
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  grid: {
    padding: 12,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 10,
    flex: 1,
    minWidth: (windowWidth / 2) - 36,
    maxWidth: (windowWidth / 2) - 36,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 28,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    position: 'relative',
  },
  cardActive: {
    borderWidth: 2,
    borderColor: '#00bcd4',
  },
  iconContainer: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  checkCircle: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 2,
  },
  cardText: {
    fontSize: 16,
    color: '#00838f',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 4,
  },
  subtitulo: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
  },
  logoutButton: {
    alignSelf: 'flex-end',
    padding: 8,
    marginBottom: 10,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 12,
  },
  chip: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 8,
    margin: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipText: {
    fontSize: 16,
    marginLeft: 8,
  },
});
