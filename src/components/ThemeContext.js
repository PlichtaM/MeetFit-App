import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

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
  const [theme, setTheme] = useState('light'); // Domyślny motyw

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  };

  const themeStyles = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
