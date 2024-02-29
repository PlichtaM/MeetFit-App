import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {

  return (
    <AppContext.Provider value={{ }}>
      {children}
    </AppContext.Provider>
  );
};
