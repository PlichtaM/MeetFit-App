import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

// Importuj schematy kolorów z pliku Colors.js
import { colorSchemes } from './Colors';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Ustaw początkowy motyw na podstawie systemowego motywu lub motywu zapisanego w AsyncStorage
  const [theme, setTheme] = useState(Appearance.getColorScheme() || 'light');

  useEffect(() => {
    // Załaduj zapisany motyw podczas inicjalizacji
    const loadStoredTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme) {
        setTheme(storedTheme);
      }
    };

    loadStoredTheme();
  }, []);

  // Funkcja do zmiany motywu
  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme); // Zapisz nowy motyw w AsyncStorage
  };

  // Pobierz aktualny schemat kolorów na podstawie wybranego motywu
  const themeStyles = colorSchemes[theme];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, themeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook do używania kontekstu motywu
export const useTheme = () => useContext(ThemeContext);
