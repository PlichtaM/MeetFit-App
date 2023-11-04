import React from "react";
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
function VerifiedScreen() {
  
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
        <Text style={styles.registrationText}>KONTO{"\n"}ZWERYFIKOWANE</Text>
      </View>
      <View style={styles.inputContainer}>              
        <TouchableOpacity style={styles.LoginButton}>
          <Text style={styles.LoginButtonText}>Zaloguj się</Text>
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
    marginTop: 293,
  },
  inputContainer: {
    flex: 1,
    padding: 30,
  },
  LoginButton: {
    backgroundColor: 'rgba(255, 255, 255, 0)', 
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  LoginButtonText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default VerifiedScreen;
