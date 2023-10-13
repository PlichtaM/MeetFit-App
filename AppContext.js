import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [jasnyMotyw, setJasnyMotyw] = useState(true);
  const [rozmiarCzcionki, setRozmiarCzcionki] = useState(16);

  const toggleMotyw = () => setJasnyMotyw(!jasnyMotyw);

  return (
    <AppContext.Provider value={{ jasnyMotyw, toggleMotyw, rozmiarCzcionki, setRozmiarCzcionki }}>
      {children}
    </AppContext.Provider>
  );
};
