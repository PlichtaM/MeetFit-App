import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Checkbox from 'expo-checkbox';
import Input from '../components/Input';
import LoginButton from '../components/LoginButton';
import { colors } from '../components/Colors';
import LoginStyles from "../styles/LoginStyles";

function LoginScreen({ navigation }) {
  const [isChecked, setChecked] = useState(false);

  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={LoginStyles.container}
    >
      <View style={LoginStyles.LoginContainer}>        
        <View style={LoginStyles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={LoginStyles.logo} />
        </View>
        <Text style={LoginStyles.LoginText}>LOGOWANIE</Text>
      </View>
      <View style={LoginStyles.inputContainer}>       
        <Input placeholder="Podaj adres email" />
        <Input placeholder="Podaj hasło" secureTextEntry={true} />
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
    </LinearGradient>
  );
}

export default LoginScreen;
