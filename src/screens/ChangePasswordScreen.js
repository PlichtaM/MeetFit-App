import React from "react";
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../components/Input';
import LoginButton from '../components/LoginButton';
import { colors } from '../components/Colors';
import LoginStyles from "../styles/LoginStyles";

function ChangePasswordScreen() {
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
        <Text style={LoginStyles.LoginText}>ZMIANA HASŁA</Text>
      </View>
      <View style={LoginStyles.inputContainer}>       
        <Input placeholder="Podaj nowe hasło" />
        <Input placeholder="Podaj ponownie hasło" />
        <LoginButton onPress={() => console.log("Zmień hasło")} title="Zmień hasło" />
      </View>
    </LinearGradient>
  );
}

export default ChangePasswordScreen;
