import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import { colorSchemes } from './Colors';
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {  
  const [theme, setTheme] = useState(Appearance.getColorScheme() || 'light');

  useEffect(() => {    
    const loadStoredTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme) {
        setTheme(storedTheme);
      }
    };

    loadStoredTheme();
  }, []);

  
  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme);
  };

  
  const themeStyles = colorSchemes[theme];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, themeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};


export const useTheme = () => useContext(ThemeContext);
