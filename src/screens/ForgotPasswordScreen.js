import React, { useState } from "react";
import { View, Text, Image, TextInput } from 'react-native';
import LoginButton from '../components/LoginButton';
import LoginStyles from "../styles/LoginStyles";
import { forgotPassword } from "../../services/api";
import { getColorScheme } from "../components/Colors";
const colors = getColorScheme();

function ForgotPasswordScreen(navigation) {
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
        console.log("operacja udana:", response.data);
        navigation.navigate("LoginScreen")
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
          <Image source={require('../../assets/logo2.png')} style={LoginStyles.logo} />
        </View>
        <Text style={LoginStyles.LoginText}>ZAPOMNIAŁEŚ{"\n"}HASŁA?</Text>
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
            cursorColor={colors.primary}
          />          
        </View>
        <LoginButton onPress={handleForgotPassword} title="Zresetuj hasło" />
      </View>
    </View>
  );
}

export default ForgotPasswordScreen;
