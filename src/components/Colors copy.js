import { Appearance } from 'react-native';

const colorSchemes = {
  light: {
    primary: "#B243D8",
    secondary: "#466EFC",
    disabled: "#f1f1f1",
    text: "#000",
    buttonBackground: "#fff",
    buttonBorder: "#000",
  },
  dark: {
    primary: "#466EFC",
    secondary: "#B243D8",
    disabled: "#f1f1f1",
    text: "#fff",
    buttonBackground: "#000",
    buttonBorder: "#fff",
  },
};

const defaultScheme = 'light';

const getCurrentColorScheme = () => {
  const appearanceScheme = Appearance.getColorScheme();
  return appearanceScheme || defaultScheme;
};

const currentColorScheme = getCurrentColorScheme();

export const colors = colorSchemes[currentColorScheme];

export const getColorScheme = () => colors;

export const setColorScheme = (scheme) => {
  // Tutaj możesz dodatkowo zapisywać aktualny motyw w AsyncStorage lub innym mechanizmie przechowywania danych
  // W tym przykładzie zapisujemy w Appearance i nadpisujemy aktualny schemat kolorów
  Appearance.setColorScheme(scheme);
};

export const getCurrentColors = () => {
  const currentScheme = getCurrentColorScheme();
  return colorSchemes[currentScheme];
};
