import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const colorSchemes = {
  light: {
    primary: "#B243D8",
    primary2: "#8A23AD",
    secondary: "#466EFC",
    disabled: "#f1f1f1",
    text: "#000",
    text2: "#fff",
    buttonBackground: "#fff",
    buttonBorder: "#000",
    Background:"#fff"
  },
  dark: {
    primary: "#466EFC",
    primary2: "#4D6EF6",
    secondary: "#B243D8",
    disabled: "#f1f1f1",
    text: "#fff",
    buttonBackground: "#000",
    buttonBorder: "#fff",
    Background:"#363636"
  },
};

const defaultScheme = "light";

const getCurrentColorScheme = () => {
  const appearanceScheme = Appearance.getColorScheme();
  return appearanceScheme || defaultScheme;
};

let currentColorScheme = getCurrentColorScheme();

// Create a new object to store colors based on the current scheme
export const colors = { ...colorSchemes[currentColorScheme] };

export const getColorScheme = () => colors;

export const setColorScheme = async (scheme) => {
  // Save value to AsyncStorage
  try {
    await AsyncStorage.setItem("appCurrentTheme", scheme); // Update key to match ThemeProvider
    Appearance.setColorScheme(scheme);
    currentColorScheme = scheme;

    // Update colors object with the new scheme
    colors.primary = colorSchemes[scheme].primary;
    colors.secondary = colorSchemes[scheme].secondary;
    // Update other color properties as needed
  } catch (error) {
    console.error("Error saving color scheme:", error);
  }
};

const light= {
  primary: "#B243D8",
  primary2: "#8A23AD",
  secondary: "#466EFC",
  disabled: "#f1f1f1",
  text: "#000",
  text2: "#fff",
  buttonBackground: "#fff",
  buttonBorder: "#000",
  Background:"#fff"
}
const dark= {
  primary: "#466EFC",
  primary2: "#4D6EF6",
  secondary: "#B243D8",
  disabled: "#f1f1f1",
  text: "#fff",
  buttonBackground: "#000",
  buttonBorder: "#fff",
  Background:"#363636"
}