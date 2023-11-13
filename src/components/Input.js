import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = ({ placeholder, secureTextEntry }) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    secureTextEntry={secureTextEntry}
  />
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#ffffff',
    fontSize: 20,
    borderRadius: 8,
    height: 40,
    paddingLeft: 16,
    marginBottom: 21,
    color: '#000',
  },
});

export default Input;
