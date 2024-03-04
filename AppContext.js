import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider } from './src/components/ThemeContext';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {

  return (
    <AppContext.Provider value={{ }}>
      <ThemeProvider>
      {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
};
