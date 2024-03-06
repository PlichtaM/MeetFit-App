import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import Checkbox from 'expo-checkbox';
import LoginButton from '../components/LoginButton';
import LoginStyles from "../styles/LoginStyles";
import { getColorScheme  } from "../components/Colors";
const colors = getColorScheme()

function LoginScreen({ navigation }) {
  const [isChecked, setChecked] = useState(false);

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
        <TextInput placeholder="Podaj adres email" style={LoginStyles.textInput} />
        </View>
        <View style={LoginStyles.inputContainer}>
        <TextInput placeholder="Podaj hasło" secureTextEntry={true} style={LoginStyles.textInput} />
        </View>
        <View style={LoginStyles.CheckboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            tintColor={colors.text}
          />
          <Text style={LoginStyles.CheckboxLabel}>Zapamiętaj dane</Text>
        </View>
        <LoginButton onPress={() => console.log("Zaloguj się")} title="Zaloguj się" />
        <LoginButton onPress={() => navigation.navigate('Ekran Rejestracji')} title="Zarejestruj się" />
        <TouchableOpacity onPress={() => navigation.navigate('Ekran Przywracania') }>
        <Text style={LoginStyles.ForgotLabel}>Zapomniałeś hasła? [Kliknij tutaj]</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LoginScreen;
