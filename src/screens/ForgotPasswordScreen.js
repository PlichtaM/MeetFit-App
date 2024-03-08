import React, { useState } from "react";
import { View, Text, Image, TextInput } from 'react-native';
import LoginButton from '../components/LoginButton';
import LoginStyles from "../styles/LoginStyles";
import { forgotPassword } from "../../services/api";

function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsEmailValid(emailRegex.test(text));
  };

  const handleForgotPassword = () => {
    if (!isEmailValid) { console.log("Wprowadź prawidłowy adres e-mail");
      return;
    }
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
      {!isEmailValid && (
            <Text style={LoginStyles.errorMessage}>Wprowadź prawidłowy adres e-mail</Text>
          )}
        <View style={[LoginStyles.inputContainer, !isEmailValid && LoginStyles.inputContainerError]}>
          <TextInput
            placeholder="Podaj adres email"
            style={[LoginStyles.textInput, !isEmailValid && LoginStyles.textInputError]}
            onChangeText={handleEmailChange}
          />          
        </View>
        <LoginButton onPress={handleForgotPassword} title="Przywróć hasło" />
      </View>
    </View>
  );
}

export default ForgotPasswordScreen;
