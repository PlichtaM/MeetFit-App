import React from "react";
import { View, Text, Image } from 'react-native';
import LoginButton from '../components/LoginButton';
import LoginStyles from "../styles/LoginStyles";

function VerifiedScreen() {
  
  return (
    <View style={LoginStyles.container}>
      <View style={LoginStyles.LoginContainer}>        
        <View style={LoginStyles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={LoginStyles.logo} />
        </View>
        <Text style={LoginStyles.LoginText}>KONTO{"\n"}ZWERYFIKOWANE</Text>
      </View>
      <View style={LoginStyles.bottomBox}>              
        <LoginButton onPress={() => console.log("Zaloguj się")} title="Zaloguj się" />
      </View>
    </View>
  );
}
export default VerifiedScreen;
