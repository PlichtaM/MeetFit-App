import React, { useEffect } from "react";
import { View, Text, Image, TextInput } from 'react-native';
import LoginStyles from "../styles/LoginStyles";

function ConfirmMail({ navigation }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('LoginScreen');
    }, 3000);

    return () => clearTimeout(timer);
  }, []); 
  
  return (
    <View style={LoginStyles.container}>
      <View style={LoginStyles.LoginContainer}>
        <View style={LoginStyles.logoContainer}>
          <Image source={require('../../assets/logo2.png')} style={LoginStyles.logo} />
        </View>
        <Text style={LoginStyles.LoginText}>POTWIERDŹ{"\n"}REJESTRACJĘ{"\n"}NA{"\n"}MAILU</Text>
      </View>
    </View>
  );
}

export default ConfirmMail;
