import React from "react";
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import Checkbox from 'expo-checkbox';

function LoginScreen() {
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
        <Text style={styles.registrationText}>LOGOWANIE</Text>
      </View>
      <View style={styles.inputContainer}>       
        <TextInput
          style={styles.input}
          placeholder="Podaj adres email"
        />
        <TextInput
          style={styles.input}
          placeholder="Podaj hasło"
          secureTextEntry={true}
        />
        <View style={styles.CheckboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            tintColor={"#ffffff"} //to powinno zmienić kolor checkboxa w środku ale nie działa xD https://github.com/react-native-checkbox/react-native-checkbox 
          />
          <Text style={styles.CheckboxLabel}>Zapamiętaj dane</Text>
        </View>
        <TouchableOpacity style={styles.LoginButton}>
          <Text style={styles.LoginButtonText}>Zaloguj się</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.LoginButton}>
          <Text style={styles.LoginButtonText}>Zarejestruj się</Text>
        </TouchableOpacity>
        <Text style={styles.ForgotLabel}>Zapomniałeś hasła? [Kliknij tutaj]</Text>
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
    marginTop: 148,
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
    marginBottom: 21,
    color: '#000',
  },
  CheckboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',    
  },
  CheckboxLabel: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,    
  },
  ForgotLabel: {
    fontSize: 16,
    color: '#fff',
    marginTop: 12,
    alignSelf: 'center',
  },
  LoginButton: {
    backgroundColor: 'rgba(255, 255, 255, 0)', 
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    marginTop:21,
    alignItems: 'center',
  },
  LoginButtonText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default LoginScreen;
