import React from 'react';
import { View } from 'react-native'
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
import LoginScreen from './src/screens/LoginScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
import CorrectChangedPasswordScreen from './src/screens/CorrectChangedPasswordScreen ';
import VerifiedScreen from './src/screens/VerifiedScreen';
import Footer from './src/components/Footer';
const Stack = createStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <View style={{ flex: 1 }}>
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
          <Stack.Screen name="Ekran Logowania" component={LoginScreen} options={{ title: '' }} />
          <Stack.Screen name="Ekran Przywracania" component={ForgotPasswordScreen} options={{ title: '' }} />
          <Stack.Screen name="Ekran Zmiany Hasła" component={ChangePasswordScreen} options={{ title: '' }} />
          <Stack.Screen name="Ekran Pomyślnej Zmiany Hasła" component={CorrectChangedPasswordScreen} options={{ title: '' }} />
          <Stack.Screen name="Ekran Zweryfikowanego Konta" component={VerifiedScreen} options={{ title: '' }} />
        </Stack.Navigator>
      </NavigationContainer>
      <Footer />  
      </View>
    </AppProvider>
  );
}
