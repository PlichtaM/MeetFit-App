import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { getColorScheme  } from "./Colors";
const colors = getColorScheme()

const LoginButton = ({ onPress, title }) => (
  <TouchableOpacity style={styles.LoginButton} onPress={onPress}>
    <Text style={styles.LoginButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  LoginButton: {
    backgroundColor: colors.secondary,
    borderRadius: 85,
    padding: 12,
    marginTop:21,
    alignItems: 'center',
    width: '90%'
  },
  LoginButtonText: {
    fontSize: 20,
    color: 'white',
  },
});

export default LoginButton;
