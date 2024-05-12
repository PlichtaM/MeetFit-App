import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import Checkbox from "expo-checkbox";
import LoginButton from "../components/LoginButton";
import LoginStyles from "../styles/LoginStyles";
import { loginUser } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ADMIN_LOGIN, ADMIN_PASSWORD } from "../../env.js";
import { GetCountPeople } from "../../services/api";
import { getColorScheme } from "../components/Colors";
const colors = getColorScheme();

function LoginScreen({ navigation }) {
  const [isChecked, setChecked] = useState(false);
  const [email, setEmail] = useState(ADMIN_LOGIN);
  const [password, setPassword] = useState(ADMIN_PASSWORD); //temp

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const response = await GetCountPeople(token);
          //console.log("response", response);
          if (response.status === "200") {
            navigation.navigate("MainNavigator");
          }
        }
      } catch (error) {
        //console.error("Error while verifying token:", error);
      }
    };

    checkTokenValidity();
  }, [navigation]);

  const handleLogin = () => {
    const userCredentials = {
      email: email,
      password: password,
    };

    loginUser(userCredentials)
      .then((response) => {
        AsyncStorage.setItem("token", response.data.token);
        AsyncStorage.setItem("userName", response.data.userName);
        AsyncStorage.setItem("userId", response.data.userId);
        Keyboard.dismiss();
        //console.log("Logowanie udane:", response.data);
        console.log("token: ", response.data.token);
        navigation.navigate("MainNavigator");
      })
      .catch((error) => {
        //console.error("Status odpowiedzi:", error);
      });
  };

  return (
    <View style={LoginStyles.container}>
      <View style={LoginStyles.LoginContainer}>
        <View style={LoginStyles.logoContainer}>
          <Image source={require('../../assets/logo2.png')} style={LoginStyles.logo} />
        </View>
        <Text style={LoginStyles.LoginText}>LOGOWANIE</Text>
      </View>
      <View style={LoginStyles.bottomBox}>
        <View style={LoginStyles.inputContainer}>
          <TextInput
            placeholder="Podaj adres email"
            style={LoginStyles.textInput}
            onChangeText={setEmail}
            cursorColor={colors.primary}
          />
        </View>
        <View style={LoginStyles.inputContainer}>
          <TextInput
            placeholder="Podaj hasło"
            secureTextEntry={true}
            style={LoginStyles.textInput}
            onChangeText={setPassword}
            cursorColor={colors.primary}
          />
        </View>
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
    </View>
  );
}

export default LoginScreen;
