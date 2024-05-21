import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  ScrollView
} from "react-native";
import Checkbox from "expo-checkbox";
import LoginButton from "../components/LoginButton";
import LoginStyles from "../styles/LoginStyles";
import { loginUser, GetCountPeople } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getColorScheme } from "../components/Colors";
import { ADMIN_LOGIN, ADMIN_PASSWORD, ADMIN_LOGIN2,ADMIN_PASSWORD2 } from "../../env";
const colors = getColorScheme();

function LoginScreen({ navigation }) {
  const [isChecked, setChecked] = useState(true);
  const [isRemebered, setIsRemebered] = useState(false);
  const [email, setEmail] = useState(ADMIN_LOGIN2);
  const [password, setPassword] = useState(ADMIN_PASSWORD2);//temp
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const isRemebered = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem("email");
        const savedPassword = await AsyncStorage.getItem("password");
        if(savedEmail){
          setEmail(savedEmail);
          setPassword(savedPassword);
          setIsRemebered(true)
        }
      } catch (error) {
        console.log("nie zapisano hasla:", error);
      }
    };
    isRemebered();
  }, []);

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const response = await GetCountPeople(token);
          setTimeout(() => {
          if (response.status === "200") {
              console.log("zalogowany");
              navigation.navigate("MainNavigator");
            }
          }, 1000); // 5000 ms = 5 s
        }
      } catch (error) {
        console.log("niezalogowany", error);//temp
      }
    };
  
    checkTokenValidity();
  }, []);

  const handleLogin = () => {
    const userCredentials = {
      email: email,
      password: password,
    };

    loginUser(userCredentials)
      .then((response) => {
        setShowMessage(false);
        AsyncStorage.setItem("token", response.data.token);
        AsyncStorage.setItem("userName", response.data.userName);
        AsyncStorage.setItem("userId", response.data.userId);
        Keyboard.dismiss();
        //console.log("Logowanie udane:", response.data);
        console.log("token: ", response.data.token);
        console.log("Id: ", response.data.userId);
        navigation.replace("MainNavigator");
      })
      .catch((error) => {
        setShowMessage(true);
        console.error("Status odpowiedzi:", error);
      });
  };
  if (isChecked) {
    AsyncStorage.setItem("email", email);
    AsyncStorage.setItem("password", password);
  }
  return (
    <ScrollView style={LoginStyles.container}>
      <View style={LoginStyles.LoginContainer}>
        <View style={LoginStyles.logoContainer}>
          <Image
            source={require("../../assets/logo2.png")}
            style={LoginStyles.logo}
          />
        </View>
        <Text style={LoginStyles.LoginText}>LOGOWANIE</Text>
      </View>
      <View style={LoginStyles.bottomBox}>
        <View style={LoginStyles.inputContainer}>
          <TextInput
            placeholder={isRemebered ? email : "Podaj adres email"}
            style={LoginStyles.textInput}
            onChangeText={setEmail}
            cursorColor={colors.primary}
          />
        </View>
        <View style={LoginStyles.inputContainer}>
          <TextInput
            placeholder={isRemebered ? "************" :"Podaj hasło"}
            secureTextEntry={true}
            style={LoginStyles.textInput}
            onChangeText={setPassword}
            cursorColor={colors.primary}
          />
        </View>
        {showMessage && (
          <Text style={LoginStyles.errorMessage}>
            nieprawidłowy email lub hasło
          </Text>
        )}
        <View style={LoginStyles.CheckboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            tintColor={colors.primary}
          />
          <Text style={LoginStyles.CheckboxLabel}>Zapamiętaj dane</Text>
        </View>
        <LoginButton onPress={handleLogin} title="Zaloguj się" />
        <LoginButton
          onPress={() => navigation.navigate("RegisterScreen")}
          title="Zarejestruj się"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPasswordScreen")}
        >
          <Text style={LoginStyles.ForgotLabel}>
            Zapomniałeś hasła? [Kliknij tutaj]
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default LoginScreen;
