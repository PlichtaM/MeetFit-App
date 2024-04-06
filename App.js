import React, { useState, useEffect } from "react";
import { View } from 'react-native'
import { ThemeProvider } from './src/components/ThemeContext';
import Nav from './src/components/Nav';

export default function App() {
 
  return (
    <ThemeProvider>
      <View style={{ flex: 1}}>
        <Nav /> 
      </View>
    </ThemeProvider>
  );
}
