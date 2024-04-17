import React, { useState } from "react";
import { View, Text, Image,  Alert, TextInput } from "react-native";
import Checkbox from "expo-checkbox";
import LoginButton from "../components/LoginButton";
import { getColorScheme } from "../components/Colors";
const colors = getColorScheme();
import { registerUser } from "../../services/api";
import LoginStyles from "../styles/LoginStyles";

function RegisterScreen({navigation}) {
  const [isChecked, setChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert("Błąd", "Hasła nie są identyczne");
      return;
    }
    if (!isChecked) {
      Alert.alert("Błąd", "Musisz zaakceptować regulamin");
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
        console.log("Rejestracja udana:", response.data);
        console.log("Rejestracja udana status:", response.data.status);
        if(response.data.status === "Success")
        navigation.navgate("LoginScreen")
      })
      .catch((error) => {
        console.log("Status odpowiedzi:", error.response.status);
        console.log("Nagłówki odpowiedzi:", error.response.headers);
      });
  };

  return (
    <View style={LoginStyles.container}>
      <View style={LoginStyles.LoginContainer}>
        <View style={LoginStyles.logoContainer}>
          <Image
            source={require("../../assets/logo.png")}
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
        <View style={LoginStyles.inputContainer}>
          <TextInput placeholder="Podaj adres email" onChangeText={setEmail} style={LoginStyles.textInput} cursorColor={colors.primary}/>
        </View>
        <View style={LoginStyles.inputContainer} >
          <TextInput
            placeholder="Podaj hasło"
            secureTextEntry={true}
            onChangeText={setPassword}
            style={LoginStyles.textInput}
            cursorColor={colors.primary}
          />
        </View>
        <View style={LoginStyles.inputContainer}>
          <TextInput
            placeholder="Potwierdź hasło"
            secureTextEntry={true}
            onChangeText={setConfirmPassword}
            style={LoginStyles.textInput}
            cursorColor={colors.primary}
          />
        </View>
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
    </View>
  );
}

export default RegisterScreen;
