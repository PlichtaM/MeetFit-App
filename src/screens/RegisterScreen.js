import React, { useState, useEffect } from "react";
import { View, Text, Image, Alert, TextInput, ScrollView } from "react-native";
import Checkbox from "expo-checkbox";
import LoginButton from "../components/LoginButton";
import { getColorScheme } from "../components/Colors";
const colors = getColorScheme();
import { registerUser } from "../../services/api";
import LoginStyles from "../styles/LoginStyles";

function RegisterScreen({ navigation }) {
  const [isChecked, setChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordRequirementsMet, setPasswordRequirementsMet] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false)  
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isAccepted, setIsAccepted] = useState(true);

  useEffect(() => {
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    setPasswordRequirementsMet(
      hasSpecialChar && hasNumber && hasLowerCase && hasUpperCase
    );
    if (password !== confirmPassword) {
      setPasswordMatch(true)      
    }else{setPasswordMatch(false)}
  }, [password, confirmPassword]);


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsEmailValid(emailRegex.test(text));
  };

  const handleRegister = () => {
    setIsAccepted(true)
    if (password !== confirmPassword) {
      Alert.alert("Błąd", "Hasła nie są identyczne");
      return;
    }
    if (!isChecked) {
      setIsAccepted(false)
      return;
    }   

    const userData = {
      userName: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    registerUser(userData)
      .then((response) => {
        if (response.data.status === "Success")
          navigation.navigate("ConfirmMail");
      })
  };

  return (
    <ScrollView style={LoginStyles.container}>
      <View style={LoginStyles.LoginContainer}>
        <View style={LoginStyles.logoContainer}>
          <Image
            source={require("../../assets/logo2.png")}
            style={LoginStyles.logo}
          />
        </View>
        <Text style={LoginStyles.LoginText}>REJESTRACJA</Text>
      </View>

      <View style={LoginStyles.bottomBox}>
        <View style={LoginStyles.inputContainer}>
          <TextInput
            placeholder="Podaj nazwę użytkownika"
            onChangeText={setUsername}
            style={LoginStyles.textInput}
            cursorColor={colors.primary}
          />
        </View>
        {!isEmailValid && (
            <Text style={LoginStyles.errorMessage}>Wprowadź prawidłowy adres e-mail</Text>
          )}
        <View style={LoginStyles.inputContainer}>
          <TextInput
            placeholder="Podaj adres email"
            onChangeText={handleEmailChange}
            style={LoginStyles.textInput}
            cursorColor={colors.primary}
          />
        </View>
        {password !== "" && !passwordRequirementsMet && (
          <Text style={LoginStyles.errorMessage}>
            Hasło musi zawierać przynajmniej jedną cyfrę, znak specjalny, małą i
            wielką literę
          </Text>
        )}
        <View style={LoginStyles.inputContainer}>
          <TextInput
            placeholder="Podaj hasło"
            secureTextEntry={true}
            onChangeText={setPassword}
            style={LoginStyles.textInput}
            cursorColor={colors.primary}
          />
        </View>     
        {confirmPassword !== "" && passwordMatch && (
          <Text style={LoginStyles.errorMessage}>
            Hasła muszą się zgadzać
          </Text>
        )}   
        <View style={LoginStyles.inputContainer}>
          <TextInput
            placeholder="Potwierdź hasło"
            secureTextEntry={true}
            onChangeText={setConfirmPassword}
            style={LoginStyles.textInput}
            cursorColor={colors.primary}
          />
        </View>
        {isChecked !== "" && !isAccepted && (
          <Text style={LoginStyles.errorMessage}>
            wymagana akceptacja regulaminu
          </Text>
        )} 
        <View style={LoginStyles.CheckboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            tintColor={colors.text}
          />
          <Text style={LoginStyles.CheckboxLabel}>
            Akceptuję regulamin aplikacji
          </Text>
        </View>
        <LoginButton onPress={handleRegister} title="Zarejestruj się" />
      </View>
    </ScrollView>
  );
}

export default RegisterScreen;
