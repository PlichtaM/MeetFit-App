import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, Alert, ScrollView } from "react-native";
import LoginButton from "../components/LoginButton";
import LoginStyles from "../styles/LoginStyles";
import { getColorScheme } from "../components/Colors";
import { changePassword } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const colors = getColorScheme();

function ChangePasswordScreen({ navigation }) {
  const [email, setEmail] = useState("Podaj email");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordRequirementsMet, setPasswordRequirementsMet] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  useEffect(() => {
    const isRemebered = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem("email");
        console.log(savedEmail);
        if(savedEmail){
          setEmail(savedEmail);
        }
      } catch (error) {
        console.log("nie zapisano hasla:", error);
      }
    };
    isRemebered();
  }, []);

  useEffect(() => {
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    setPasswordRequirementsMet(
      hasSpecialChar && hasNumber && hasLowerCase && hasUpperCase
    );
    if (password !== confirmPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }, [password, confirmPassword]);

  const handleChangePassword = () => {
    if (password !== confirmPassword) {
      Alert.alert("Błąd", "Hasła nie są identyczne");
      return;
    }

    const data = {
      "email": email,
      "oldPassword": oldPassword,
      "password": password,
    };

    changePassword(data)
      .then((response) => {
        console.log("Zmiana hasła udana:", response);
        navigation.navigate("CorrectChangedPasswordScreen");
      })
      .catch((error) => {
        console.log("Status odpowiedzi:", error.response.status);
        console.log("Nagłówki odpowiedzi:", error.response.headers);
      });
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
        <Text style={LoginStyles.LoginText}>ZMIANA HASŁA</Text>
      </View>

      <View style={LoginStyles.bottomBox}>
        <View style={LoginStyles.inputContainer}>
          <TextInput
            placeholder= {email}
            onChangeText={setEmail}
            style={LoginStyles.textInput}
            cursorColor={colors.primary}
          />
        </View>
        <View style={LoginStyles.inputContainer}>
          <TextInput
            placeholder="Podaj stare hasło"
            secureTextEntry={true}
            onChangeText={setOldPassword}
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
            placeholder="Podaj nowe hasło"
            secureTextEntry={true}
            onChangeText={setPassword}
            style={LoginStyles.textInput}
            cursorColor={colors.primary}
          />
        </View>
        {confirmPassword !== "" && passwordMatch && (
          <Text style={LoginStyles.errorMessage}>Hasła muszą się zgadzać</Text>
        )}
        <View style={LoginStyles.inputContainer}>
          <TextInput
            placeholder="Potwierdź nowe hasło"
            secureTextEntry={true}
            onChangeText={setConfirmPassword}
            style={LoginStyles.textInput}
            cursorColor={colors.primary}
          />
        </View>
        <LoginButton onPress={handleChangePassword} title="Zmień hasło" />
      </View>
    </ScrollView>
  );
}

export default ChangePasswordScreen;