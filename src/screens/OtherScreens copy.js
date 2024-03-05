import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoadingScreen from './LoadingScreen';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import ChangePasswordScreen from './ChangePasswordScreen';
import CorrectChangedPasswordScreen from './CorrectChangedPasswordScreen ';
import VerifiedScreen from './VerifiedScreen';

function OtherScreens() {

  
  const navigation = useNavigation();
  const Others = createStackNavigator();
  function OtherScreensStack() {
    return (
      <Others.Navigator>
        <Others.Screen name='OtherScreensScreen' component={OtherScreensScreen}/>
        <Others.Screen name='Loading' component={LoadingScreen}/>
        <Others.Screen name='RegisterScreen' component={RegisterScreen}/>
        <Others.Screen name='LoginScreen' component={LoginScreen}/>
        <Others.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen}/>
        <Others.Screen name='ChangePasswordScreen' component={ChangePasswordScreen}/>
        <Others.Screen name='CorrectChangedPasswordScreen' component={CorrectChangedPasswordScreen}/>
        <Others.Screen name='VerifiedScreen' component={VerifiedScreen}/>
      </Others.Navigator>
    );
  }

  function OtherScreensScreen() {
    return (
      <View style={{ margin: 50 }}>
        <Button title="Ekran Ładowania" onPress={() => navigation.navigate('Loading')} />
        <Button title="Ekran Rejestracji" onPress={() => navigation.navigate('RegisterScreen')} />
        <Button title="Ekran Logowania" onPress={() => navigation.navigate('LoginScreen')} />
        <Button title="Ekran Przywracania" onPress={() => navigation.navigate('ForgotPasswordScreen')} />
        <Button title="Ekran Zmiany Hasła" onPress={() => navigation.navigate('ChangePasswordScreen')} />
        <Button title="Ekran Pomyślnej Zmiany Hasła" onPress={() => navigation.navigate('CorrectChangedPasswordScreen')} />
        <Button title="Ekran Zweryfikowanego Konta" onPress={() => navigation.navigate('VerifiedScreen')} />
      </View>
    );
  }
  return (    
    <OtherScreensStack/>
  );
}

export default OtherScreens;
