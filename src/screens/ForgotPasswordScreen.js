import React from "react";
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../components/Input';
import LoginButton from '../components/LoginButton';
import LoginStyles from "../styles/LoginStyles";
import { getColorScheme  } from "../components/Colors";
const colors = getColorScheme()
function ForgotPasswordScreen() {
  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={LoginStyles.container}
    >
      <View style={LoginStyles.LoginContainer}>        
        <View style={LoginStyles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={LoginStyles.logo} />
        </View>
        <Text style={LoginStyles.LoginText}>PRZYWRACANIE{"\n"}HASŁA</Text>
      </View>
      <View style={LoginStyles.inputContainer}>       
        <Input placeholder="Podaj adres email" />
        <LoginButton onPress={() => console.log("Przywróć hasło")} title="Przywróć hasło" />
      </View>
    </LinearGradient>
  );
}

export default ForgotPasswordScreen;
