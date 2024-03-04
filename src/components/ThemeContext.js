import React, { createContext, useContext, useState, useEffect } from 'react';
import { getColorScheme, getCurrentColors, setColorScheme } from './Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = 'appCurrentTheme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('');

  const changeTheme = async (newTheme) => {
    setCurrentTheme(newTheme);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    setColorScheme(newTheme);
  };

  useEffect(() => {
    const loadThemeFromStorage = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (storedTheme) {
          setCurrentTheme(storedTheme);
          setColorScheme(storedTheme);
        } else {
          // If no theme is stored, use the default theme
          setCurrentTheme(getColorScheme());
        }
      } catch (error) {
        console.error('Error loading theme from storage:', error);
      }
    };

    loadThemeFromStorage();
  }, []); // Empty dependency array ensures useEffect runs only once

  useEffect(() => {
    // Add any additional logic you may need when the theme changes globally
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
