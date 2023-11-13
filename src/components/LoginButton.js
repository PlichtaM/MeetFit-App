import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from './Colors';

const LoginButton = ({ onPress, title }) => (
  <TouchableOpacity style={styles.LoginButton} onPress={onPress}>
    <Text style={styles.LoginButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  LoginButton: {
    backgroundColor: colors.buttonBackground,
    borderColor: colors.buttonBorder,
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    marginTop:21,
    alignItems: 'center',
  },
  LoginButtonText: {
    fontSize: 20,
    color: colors.text,
  },
});

export default LoginButton;
