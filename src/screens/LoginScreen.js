import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import LoginButton from '../components/LoginButton';
import LoginStyles from "../styles/LoginStyles";
import { loginUser } from "../../services/api";
import { getColorScheme  } from "../components/Colors";
const colors = getColorScheme()

function LoginScreen({ navigation }) {
  const [isChecked, setChecked] = useState(false);  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {  
    const userCredentials = {
      email: email,
      password: password
    };

    loginUser(userCredentials)
      .then((response) => {       
          console.log("Logowanie udane:", response.data);
      })
      .catch((error) => {
        console.log("Status odpowiedzi:", error.response.status);
        console.log("Nagłówki odpowiedzi:", error.response.headers);   
        Alert.alert("Błąd", "Nieprawidłowy adres email lub hasło");     
        console.log("dane:", userCredentials);
      });
  };

  return (
    <View style={LoginStyles.container}>
      <View style={LoginStyles.LoginContainer}>        
        <View style={LoginStyles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={LoginStyles.logo} />
        </View>
        <Text style={LoginStyles.LoginText}>LOGOWANIE</Text>
      </View>
      <View style={LoginStyles.bottomBox}>       
      <View style={LoginStyles.inputContainer}>       
        <TextInput placeholder="Podaj adres email" style={LoginStyles.textInput} onChangeText={setEmail}/> 
        </View>
        <View style={LoginStyles.inputContainer}>
        <TextInput placeholder="Podaj hasło" secureTextEntry={true} style={LoginStyles.textInput} onChangeText={setPassword}/>
        </View>
        <View style={LoginStyles.CheckboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            tintColor={colors.text}
          />
          <Text style={LoginStyles.CheckboxLabel}>Zapamiętaj dane</Text>
        </View>
        <LoginButton onPress={handleLogin} title="Zaloguj się" />
        <LoginButton onPress={() => navigation.navigate('RegisterScreen')} title="Zarejestruj się" />
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen') }>
        <Text style={LoginStyles.ForgotLabel}>Zapomniałeś hasła? [Kliknij tutaj]</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LoginScreen;
