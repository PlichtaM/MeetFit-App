import React from "react";
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import Checkbox from 'expo-checkbox';

function ChangePasswordScreen() {
  const [isChecked, setChecked] = React.useState(false);

  return (
    <LinearGradient
      colors={["#B243D8", "#466EFC"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <View style={styles.registrationContainer}>        
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.registrationText}>ZMIANA HASŁA</Text>
      </View>
      <View style={styles.inputContainer}>       
        <TextInput
          style={styles.input}
          placeholder="Podaj nowe hasło"
        /> 
        <TextInput
          style={styles.input}
          placeholder="Podaj ponownie hasło"
        /> 
        <TouchableOpacity style={styles.RestoreButton}>
          <Text style={styles.RestoreButtonText}>Zmień hasło</Text>
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
    color: '#fff',
    textAlign: 'center',
    marginTop:24,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 67,
    height: 97,
    marginTop: 249,
  },
  inputContainer: {
    flex: 1,
    padding: 30,
  },
  input: {
    backgroundColor: '#ffffff',
    fontSize: 20,
    borderRadius: 8,
    height: 40,
    paddingLeft: 16,
    color: '#000',
    marginBottom: 21,
  }, 
  RestoreButton: {
    backgroundColor: 'rgba(255, 255, 255, 0)', 
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  RestoreButtonText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default ChangePasswordScreen;
