import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const iconosPorTipo = {
  Gasfitería: <MaterialCommunityIcons name="pipe-wrench" size={28} color="#00838f" />,
  Reparaciones: <FontAwesome5 name="tools" size={28} color="#00838f" />,
  Electricidad: <MaterialCommunityIcons name="flash" size={28} color="#00838f" />,
  Carpintería: <MaterialCommunityIcons name="hammer" size={28} color="#00838f" />,
  Limpieza: <MaterialCommunityIcons name="broom" size={28} color="#00838f" />,
  Pintura: <MaterialCommunityIcons name="format-paint" size={28} color="#00838f" />,
};

export default function FilterChip({ tipo, activo, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.chipBox, activo && styles.chipBoxActivo]}>
        {iconosPorTipo[tipo]}
        {activo && (
          <Feather
            name="check-circle"
            size={16}
            color="#00838f"
            style={styles.checkIcon}
          />
        )}
      </View>
      <Text style={[styles.texto, activo && styles.textoActivo]}>{tipo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 12,
  },
  chipBox: {
    width: 60,
    height: 60,
    backgroundColor: '#e0f7fa',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  chipBoxActivo: {
    borderWidth: 2,
    borderColor: '#00838f',
    backgroundColor: '#e0f7fa',
  },
  checkIcon: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  texto: {
    marginTop: 4,
    fontSize: 12,
    color: '#444',
    fontWeight: '500'
  },
  textoActivo: {
    color: '#00838f',
    fontWeight: 'bold'
  }
});
