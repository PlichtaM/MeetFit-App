import React, { useState } from "react";
import { View, Text, Image, TextInput } from 'react-native';
import LoginButton from '../components/LoginButton';
import LoginStyles from "../styles/LoginStyles";
import { forgotPassword } from "../../services/api";

function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");

  const handleForgotPassword = () => {  
    const userCredentials = {
      email: email
    };

    forgotPassword(userCredentials)
      .then((response) => {       
          console.log("Logowanie udane:", response.data);
      })
      .catch((error) => {
        console.log("Status odpowiedzi:", error.response.status);
        console.log("Nagłówki odpowiedzi:", error.response.headers);
        console.log("odpowiedzi:", error.response.data);
        console.log("dane:", userCredentials);
        console.log(" ");
      });
  };

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
          <TextInput placeholder="Podaj adres email" style={LoginStyles.textInput}  onChangeText={setEmail} />
        </View>
        <LoginButton onPress= {handleForgotPassword} title="Przywróć hasło" />
      </View>
    </View>
  );
}

export default ForgotPasswordScreen;