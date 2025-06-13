import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './context/NavigationService';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import DetalleScreen from './screens/DetalleScreen';
import GraciasScreen from './screens/GraciasScreen';
import RegisterScreen from './components/RegisterScreen';
import CreateServiceScreen from './screens/CreateServiceScreen';
import LoginScreen from './screens/LoginScreen';

import { AuthProvider } from './context/AuthContext';
import { ServiceProvider } from './context/ServiceContext';


const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <ServiceProvider>
        <NavigationContainer ref={navigationRef}>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registro" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Lista" component={ListScreen} />
          <Stack.Screen 
            name="Detalle" 
            component={DetalleScreen} 
            options={{ title: 'Detalle del Servicio' }}
          />
          <Stack.Screen name="Gracias" component={GraciasScreen} />
          <Stack.Screen name="NuevoServicio" component={CreateServiceScreen} /> 
        </Stack.Navigator>
      </NavigationContainer>
      </ServiceProvider>
    </AuthProvider>
  );
}
