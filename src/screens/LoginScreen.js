import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  ScrollView,
} from "react-native";
import Checkbox from "expo-checkbox";
import LoginButton from "../components/LoginButton";
import LoginStyles from "../styles/LoginStyles";
import { loginUser, GetCountPeople } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getColorScheme } from "../components/Colors";
const colors = getColorScheme();

function LoginScreen({ navigation }) {
  const [isChecked, setChecked] = useState(true);
  const [isRemebered, setIsRemebered] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const isRemebered = async () => {
        const savedEmail = await AsyncStorage.getItem("email");
        const savedPassword = await AsyncStorage.getItem("password");
        if (savedEmail) {
          setEmail(savedEmail);
          setPassword(savedPassword);
          setIsRemebered(true);
        }
    };
    isRemebered();
  }, []);

  useEffect(() => {
    const checkTokenValidity = async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const response = await GetCountPeople(token);
          setTimeout(() => {
            if (response.status === "200") {
              navigation.navigate("MainNavigator");
            }
          }, 1000);
        }
    };

    checkTokenValidity();
  }, []);

  const handleLogin = async () => {
    const userCredentials = {
        email: email,
        password: password,
    };

    try {
        const response = await loginUser(userCredentials);
        setShowMessage(false);
        await AsyncStorage.setItem("token", response.data.token);
        await AsyncStorage.setItem("userName", response.data.userName);
        await AsyncStorage.setItem("userId", response.data.userId);
        if (isChecked) {
            await AsyncStorage.setItem("email", email);
            await AsyncStorage.setItem("password", password);
        }
        Keyboard.dismiss();
        navigation.replace("MainNavigator");
    } catch (error) {
        setShowMessage(true);
    }
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
        <Text style={LoginStyles.LoginText}>LOGOWANIE</Text>
      </View>
      <View style={LoginStyles.bottomBox}>
        <View style={LoginStyles.inputContainer}>
          <TextInput
            placeholder="Podaj adres email"
            style={LoginStyles.textInput}
            onChangeText={setEmail}
            value={email}
            cursorColor={colors.primary}
          />
        </View>
        <View style={LoginStyles.inputContainer}>
          <TextInput
            placeholder="Podaj hasło"
            secureTextEntry={true}
            style={LoginStyles.textInput}
            onChangeText={setPassword}
            value={password}
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
