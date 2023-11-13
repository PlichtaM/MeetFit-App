import React from "react";
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LoginButton from '../components/LoginButton';
import { colors } from '../components/Colors';

function CorrectChangedPasswordScreen() {
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
        <Text style={styles.registrationText}>POMYŚLNIE{"\n"}ZMIENIONE HASŁO</Text>
      </View>
      <View style={styles.inputContainer}>              
        <LoginButton onPress={() => console.log("Zaloguj się")} title="Zaloguj się" />
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
    marginTop: 293,
  },
  inputContainer: {
    flex: 1,
    padding: 30,
  },
});

export default CorrectChangedPasswordScreen;
