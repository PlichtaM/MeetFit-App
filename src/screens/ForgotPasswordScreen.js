import React from "react";
import { View, Text, Image, TextInput } from 'react-native';
import LoginButton from '../components/LoginButton';
import LoginStyles from "../styles/LoginStyles";

function ForgotPasswordScreen() {
  return (
    <View style={LoginStyles.container}>
      <View style={LoginStyles.LoginContainer}>        
        <View style={LoginStyles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={LoginStyles.logo} />
        </View>
        <Text style={LoginStyles.LoginText}>PRZYWRACANIE{"\n"}HASŁA</Text>
      </View>
      <View style={LoginStyles.bottomBox}>       
        <View style={LoginStyles.inputContainer}>       
          <TextInput placeholder="Podaj adres email" style={LoginStyles.textInput} />
        </View>
        <LoginButton onPress={() => console.log("Przywróć hasło")} title="Przywróć hasło" />
      </View>
    </View>
  );
}

export default ForgotPasswordScreen;