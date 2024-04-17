import React from "react";
import { View, Text, Image, TextInput } from 'react-native';
import LoginButton from '../components/LoginButton';
import LoginStyles from "../styles/LoginStyles";
import { getColorScheme } from "../components/Colors";
const colors = getColorScheme();

function ChangePasswordScreen() {
  return (
    <View style={LoginStyles.container}>
      <View style={LoginStyles.LoginContainer}>        
        <View style={LoginStyles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={LoginStyles.logo} />
        </View>
        <Text style={LoginStyles.LoginText}>ZMIANA HASŁA</Text>
      </View>
      <View style={LoginStyles.bottomBox}>       
      <View style={LoginStyles.inputContainer}>
        <TextInput placeholder="Podaj nowe hasło" style={LoginStyles.textInput} cursorColor={colors.primary} />
        </View>
        <View style={LoginStyles.inputContainer}>
        <TextInput placeholder="Podaj ponownie hasło" style={LoginStyles.textInput} cursorColor={colors.primary}/>
        </View>
        <LoginButton onPress={() => console.log("Zmień hasło")} title="Zmień hasło" />
      </View>
    </View>
  );
}

export default ChangePasswordScreen;
