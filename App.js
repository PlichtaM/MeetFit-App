import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native'
import { ThemeProvider } from './src/components/ThemeContext';
import Nav from './src/components/Nav';
import { NavigationContainer} from "@react-navigation/native";

export default function App() {
 
  return (
    <ThemeProvider>      
      <NavigationContainer >
      <View style={{ flex: 1}}>
        <Nav /> 
      </View>
      </NavigationContainer >
    </ThemeProvider>
  );
}
