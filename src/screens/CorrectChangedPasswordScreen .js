import React from "react";
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LoginButton from '../components/LoginButton';
import LoginStyles from "../styles/LoginStyles";
import { getColorScheme  } from "../components/Colors";
const colors = getColorScheme()

function CorrectChangedPasswordScreen() {
  return (
    <View style={LoginStyles.container}>
      <View style={LoginStyles.LoginContainer}>        
        <View style={LoginStyles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={LoginStyles.logo} />
        </View>
        <Text style={LoginStyles.LoginText}>POMYŚLNIE{"\n"}ZMIENIONE HASŁO</Text>
      </View>
      <View style={LoginStyles.bottomBox}>              
        <LoginButton onPress={() => console.log("Zaloguj się")} title="Zaloguj się" />
      </View>
    </View>
  );
}

export default CorrectChangedPasswordScreen;
