import React from "react";
import { View, Text, Image } from 'react-native';
import LoginButton from '../components/LoginButton';
import LoginStyles from "../styles/LoginStyles";
import { useNavigation } from "@react-navigation/native";

function CorrectChangedPasswordScreen() {
  const navigation= useNavigation();

  return (
    <View style={LoginStyles.container}>
      <View style={LoginStyles.LoginContainer}>        
        <View style={LoginStyles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={LoginStyles.logo} />
        </View>
        <Text style={LoginStyles.LoginText}>POMYŚLNIE{"\n"}ZMIENIONO HASŁO</Text>
      </View>
      <View style={LoginStyles.bottomBox}>              
        <LoginButton onPress={() =>navigation.navigate("LoginScreen")} title="Zaloguj się" />
      </View>
    </View>
  );
}

export default CorrectChangedPasswordScreen;
