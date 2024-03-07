import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = 'appCurrentTheme';

const ThemeContext = createContext();

// Definicje jasnego i ciemnego motywu
const lightTheme = {
  primary: "#B243D8",
    primary2: "#8A23AD",
    secondary: "#466EFC",
    disabled: "#f1f1f1",
    text: "#000",
    text2: "#fff",
    buttonBackground: "#fff",
    buttonBorder: "#000",
    background:"#fff"
};

const darkTheme = {
  primary: "#466EFC",
    primary2: "#4D6EF6",
    secondary: "#B243D8",
    disabled: "#f1f1f1",
    text: "#fff",
    buttonBackground: "#000",
    buttonBorder: "#fff",
    background:"#363636"
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light'); // Domyślnie ustawiamy jasny motyw

  // Funkcja zmieniająca motyw
  const changeTheme = async (newTheme) => {
    setCurrentTheme(newTheme);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    // Funkcja setColorScheme może być nadal używana, jeśli ma wpływ poza React (np. na natywne komponenty)
  };

  // Ładowanie motywu z AsyncStorage przy starcie
  useEffect(() => {
    const loadThemeFromStorage = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        console.log("Stored Theme:", storedTheme);
        if (storedTheme) {
          setCurrentTheme(storedTheme);
        }
      } catch (error) {
        console.error('Error loading theme from storage:', error);
      }
    };

    loadThemeFromStorage();
  }, []);

  // Przygotowanie stylów na podstawie aktualnego motywu
  const themeStyles = currentTheme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme, themeStyles }}>
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
