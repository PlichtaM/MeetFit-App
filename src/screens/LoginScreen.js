import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Checkbox from 'expo-checkbox';
import Input from '../components/Input';
import LoginButton from '../components/LoginButton';
import { colors } from '../components/Colors';

function LoginScreen({ navigation }) {
  const [isChecked, setChecked] = useState(false);

  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <View style={styles.registrationContainer}>        
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.registrationText}>LOGOWANIE</Text>
      </View>
      <View style={styles.inputContainer}>       
        <Input placeholder="Podaj adres email" />
        <Input placeholder="Podaj hasło" secureTextEntry={true} />
        <View style={styles.CheckboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            tintColor={colors.text}
          />
          <Text style={styles.CheckboxLabel}>Zapamiętaj dane</Text>
        </View>
        <LoginButton onPress={() => console.log("Zaloguj się")} title="Zaloguj się" />
        <LoginButton onPress={() => navigation.navigate('Ekran Rejestracji')} title="Zarejestruj się" />
        <TouchableOpacity onPress={() => navigation.navigate('Ekran Przywracania') }>
        <Text style={styles.ForgotLabel}>Zapomniałeś hasła? [Kliknij tutaj]</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  registrationContainer: {
    marginBottom: 20,
  },
  registrationText: {
    fontSize: 32,
    color: colors.text,
    textAlign: 'center',
    marginTop: 24,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 67,
    height: 97,
    marginTop: 148,
  },
  inputContainer: {
    flex: 1,
    padding: 30,
  },
  CheckboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',    
  },
  CheckboxLabel: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 8,    
  },
  ForgotLabel: {
    fontSize: 16,
    color: colors.text,
    marginTop: 12,
    alignSelf: 'center',
  },
});

export default LoginScreen;
