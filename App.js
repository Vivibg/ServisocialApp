import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './context/NavigationService';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import DetailScreen from './screens/DetailScreen';
import GraciasScreen from './screens/GraciasScreen';
import RegisterScreen from './components/RegisterScreen';
import CreateServiceScreen from './screens/CreateServiceScreen';

import { AuthProvider } from './context/AuthContext';
import { ServiceProvider } from './context/ServiceContext';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <ServiceProvider>
        <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName="Registro">
          <Stack.Screen name="Registro" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Lista" component={ListScreen} />
          <Stack.Screen name="Detalle" component={DetailScreen} />
          <Stack.Screen name="Gracias" component={GraciasScreen} />
          <Stack.Screen name="NuevoServicio" component={CreateServiceScreen} /> 
        </Stack.Navigator>
      </NavigationContainer>
      </ServiceProvider>
    </AuthProvider>
  );
}

