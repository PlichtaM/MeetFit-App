import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const colorSchemes = {
  light: {
    primary: "#B243D8",
    primary2: "#8A23AD",
    secondary: "#466EFC",
    disabled: "#f1f1f1",
    text: "#000",
    text2: "#fff",
    buttonBackground: "#fff",
    buttonBorder: "#000",
    Background:"#fff",
    cancel: "#980107",
  },
  dark: {
    primary: "#466EFC",
    primary2: "#4D6EF6",
    secondary: "#B243D8",
    disabled: "#f1f1f1",
    text: "#fff",
    text2: "#000",
    buttonBackground: "#000",
    buttonBorder: "#fff",
    Background:"#363636",
    cancel: "#980107",
  },
};

const defaultScheme = "light";

const getCurrentColorScheme = () => {
  const appearanceScheme = Appearance.getColorScheme();
  return appearanceScheme || defaultScheme;
};

let currentColorScheme = getCurrentColorScheme();

export const colors = { ...colorSchemes[currentColorScheme] };

export const getColorScheme = () => colors;

export const setColorScheme = async (scheme) => {
  
    await AsyncStorage.setItem("appCurrentTheme", scheme); 
    Appearance.setColorScheme(scheme);
    currentColorScheme = scheme;

    colors.primary = colorSchemes[scheme].primary;
    colors.secondary = colorSchemes[scheme].secondary;
    
};