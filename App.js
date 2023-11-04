import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppProvider } from './AppContext';

import Map from './src/screens/Map';
import User from './src/screens/User';
import Events from './src/screens/Events';
import Settings from './src/screens/Settings';
import MyEvents from './src/screens/MyEvents';
import FunFacts from './src/screens/FunFacts';
import Stats from './src/screens/Stats';
import LoadingScreen from './src/screens/LoadingScreen';
import RegisterScreen from './src/screens/RegisterScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Map" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Mapa" component={Map} />
          <Stack.Screen name="Użytkownik" component={User} />
          <Stack.Screen name="Wydarzenia" component={Events} />
          <Stack.Screen name="Moje Wydarzenia" component={MyEvents} />
          <Stack.Screen name="Ustawienia" component={Settings} />
          <Stack.Screen name="Ciekawostki" component={FunFacts} />
          <Stack.Screen name="Statystyki" component={Stats} />
          <Stack.Screen name="Ekran Ładowania" component={LoadingScreen} options={{ title: '' }} />
          <Stack.Screen name="Ekran Rejestracji" component={RegisterScreen} options={{ title: '' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
