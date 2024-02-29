import React from 'react';
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppProvider } from './AppContext';

import Footer from './src/components/Footer';
import Map from './src/screens/Map';
import User from './src/screens/User';
import Events from './src/screens/Events';
import Settings from './src/screens/Settings';
import MyEvents from './src/screens/MyEvents';
import FunFacts from './src/screens/FunFacts';
import Ranking from './src/screens/Ranking';
import LoadingScreen from './src/screens/LoadingScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
import CorrectChangedPasswordScreen from './src/screens/CorrectChangedPasswordScreen ';
import VerifiedScreen from './src/screens/VerifiedScreen';
import Calendar from './src/screens/calendar';

import OtherScreens from './src/screens/OtherScreens';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <View style={{ flex: 1 , backgroundColor:'white'}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Footer" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Footer" component={Footer} options={{ title: '' }} />
          <Stack.Screen name="Mapa" component={Map} options={{ title: '' }} />
          <Stack.Screen name="Calendar" component={Calendar} options={{ title: '' }} />
          <Stack.Screen name="Użytkownik" component={User} options={{ title: '' }} />
          <Stack.Screen name="Wydarzenia" component={Events} options={{ title: '' }} />
          <Stack.Screen name="Moje Wydarzenia" component={MyEvents} options={{ title: '' }} />
          <Stack.Screen name="Ustawienia" component={Settings} options={{ title: '' }} />
          <Stack.Screen name="Ciekawostki" component={FunFacts} options={{ title: '' }} />
          <Stack.Screen name="Ranking" component={Ranking} options={{ title: '' }} />
          <Stack.Screen name="Ekran Ładowania" component={LoadingScreen} options={{ title: '' }} />
          <Stack.Screen name="Ekran Rejestracji" component={RegisterScreen} options={{ title: '' }} />
          <Stack.Screen name="Ekran Logowania" component={LoginScreen} options={{ title: '' }} />
          <Stack.Screen name="Ekran Przywracania" component={ForgotPasswordScreen} options={{ title: '' }} />
          <Stack.Screen name="Ekran Zmiany Hasła" component={ChangePasswordScreen} options={{ title: '' }} />
          <Stack.Screen name="Ekran Pomyślnej Zmiany Hasła" component={CorrectChangedPasswordScreen} options={{ title: '' }} />
          <Stack.Screen name="Ekran Zweryfikowanego Konta" component={VerifiedScreen} options={{ title: '' }} />
          <Stack.Screen name="OtherScreens" component={OtherScreens} options={{ title: '' }} />
        </Stack.Navigator>
      </NavigationContainer>
      </View>
    </AppProvider>
  );
}
