import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Checkbox from 'expo-checkbox';
import Input from '../components/Input';
import LoginButton from '../components/LoginButton';
import { colors } from '../components/Colors';
//import api from '../../services/api';

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

  // Logika wysyłania żądania rejestracji
     api.post('/api/user/register', {
       userName,
       email,
       password,
       confirmPassword
     })
     .then(response => {
       console.log('Rejestracja udana:', response.data);
       // Tutaj można dodać działania po pomyślnej rejestracji
     })
     .catch(error => {
       console.error('Błąd podczas rejestracji:', error);
       // Obsługa błędów
     });
   };


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
        <Text style={styles.registrationText}>REJESTRACJA</Text>
      </View>
      <View style={styles.inputContainer}>
        <Input placeholder="Podaj nazwę użytkownika" onChangeText={setUsername} />
        <Input placeholder="Podaj adres email" onChangeText={setEmail} />
        <Input placeholder="Podaj hasło" secureTextEntry={true} onChangeText={setPassword} />
        <Input placeholder="Potwierdź hasło" secureTextEntry={true} onChangeText={setConfirmPassword} />
        <View style={styles.CheckboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            tintColor={colors.text}
          />
          <Text style={styles.CheckboxLabel}>Akceptuję regulamin aplikacji</Text>
        </View>
        <LoginButton onPress={handleRegister} title="Zarejestruj się" />
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
    marginTop: 89,
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
});

export default RegisterScreen;
