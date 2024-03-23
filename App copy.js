import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native'
import { ThemeProvider } from './src/components/ThemeContext';
import Nav from './src/components/Nav';
import LoadingScreen from "./src/screens/Loading";
import { GetCountPeople } from "./services/api"; 
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
//import LoginStack from "./src/components/LoginStack";import { LoginStackScreen } from "./src/components/Nav";

import { useNavigation } from '@react-navigation/native';


export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();



  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {// sprawdzanie czy token jest wazny przez Request GetCountPeople
          const response = await GetCountPeople(token); 
          if (response.status='200') {
            //navigation.navigate('MapStackScreen');
            setIsLoggedIn(true);
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error while verifying token:", error);
        setIsLoading(false);
      }
    };

    checkTokenValidity();
  }, []);
  

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      
      <NavigationContainer >
      <View style={{ flex: 1}}>
        {isLoggedIn ? <Nav /> : <LoginStackScreen />} 
      </View>
      </NavigationContainer >
    </ThemeProvider>
  );
}
