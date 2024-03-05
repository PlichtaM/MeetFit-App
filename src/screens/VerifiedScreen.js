import React from "react";
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getColorScheme  } from "../components/Colors";
const colors = getColorScheme()
import LoginButton from '../components/LoginButton';
import LoginStyles from "../styles/LoginStyles";

function VerifiedScreen() {
  
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
        <Text style={LoginStyles.LoginText}>KONTO{"\n"}ZWERYFIKOWANE</Text>
      </View>
      <View style={LoginStyles.inputContainer}>              
        <LoginButton onPress={() => console.log("Zaloguj się")} title="Zaloguj się" />
      </View>
    </LinearGradient>
  );
}
export default VerifiedScreen;
