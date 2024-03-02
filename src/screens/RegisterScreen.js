import React, { useState } from "react";
import { View, Text, Image,  TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Checkbox from 'expo-checkbox';
import Input from '../components/Input';
import LoginButton from '../components/LoginButton';
import { colors } from '../components/Colors';
import { registerUser } from '../../services/api';
import LoginStyles from "../styles/LoginStyles";

function RegisterScreen() {
  const [isChecked, setChecked] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

// Tutaj jest funkcja do obsługi rejestracji
const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert('Błąd', 'Hasła nie są identyczne');
      return;
    }
    if (!isChecked) {
      Alert.alert('Błąd', 'Musisz zaakceptować regulamin');
      return;
    }

    const userData = {
      userName: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    };
    registerUser(userData)
    .then(response => {
      console.log('Rejestracja udana:', response.data);
      // Działania po pomyślnej rejestracji
    })
    .catch(error => {
      console.log('Status odpowiedzi:', error.response.status);
      console.log('Nagłówki odpowiedzi:', error.response.headers);
      console.log('haslo: ', username);
    });
};
    


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
        <Text style={LoginStyles.LoginText}>REJESTRACJA</Text>
      </View>
      <View style={LoginStyles.inputContainer}>
        <Input placeholder="Podaj nazwę użytkownika" onChangeText={setUsername} />
        <Input placeholder="Podaj adres email" onChangeText={setEmail} />
        <Input placeholder="Podaj hasło" secureTextEntry={true} onChangeText={setPassword} />
        <Input placeholder="Potwierdź hasło" secureTextEntry={true} onChangeText={setConfirmPassword} />
        <View style={LoginStyles.CheckboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            tintColor={colors.text}
          />
          <Text style={LoginStyles.CheckboxLabel}>Akceptuję regulamin aplikacji</Text>
        </View>
        <LoginButton onPress={handleRegister} title="Zarejestruj się" />
      </View>
    </LinearGradient>
  );
}

export default RegisterScreen;
