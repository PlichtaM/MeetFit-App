import React, { useEffect, useReducer, useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import style from "../styles/SettingsStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from '../components/ThemeContext';

function Settings() {
  const { theme, toggleTheme, themeStyles } = useTheme();
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const storedSettings = await AsyncStorage.getItem("appSettings");
        if (storedSettings) {
          const parsedSettings = JSON.parse(storedSettings);
          setNotificationsEnabled(parsedSettings.notifications);
          setSoundEnabled(parsedSettings.sound);
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    }

    loadSettings();
  }, []);

  const toggleNotificationsSwitch = () => {
    setNotificationsEnabled(previousState => !previousState);
  };

  const toggleSoundSwitch = () => {
    setSoundEnabled(previousState => !previousState);
  };

  const saveSettings = async () => {
    try {
      const settingsToSave = {
        theme,
        notifications: notificationsEnabled,
        sound: soundEnabled,
      };
      await AsyncStorage.setItem("appSettings", JSON.stringify(settingsToSave));
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  return (
    <View style={[style.screen, { backgroundColor: themeStyles.background }]}>
          <View style={style.container}>
            <Text style={[style.text, { color: themeStyles.text }]}>Motyw aplikacji:</Text>
            <Switch
              trackColor={{ false: "#767577", true: themeStyles.secondary }}
              thumbColor={theme === 'dark' ? themeStyles.text2 : themeStyles.text}
              onValueChange={toggleTheme}
              value={theme === 'dark'}
            />
            <View style={style.switchContainer}>
              <Text style={[style.text, { color: themeStyles.text }]}>Powiadomienia:</Text>
              <Switch
                trackColor={{ false: "#767577", true: themeStyles.secondary }}
                thumbColor={notificationsEnabled ? themeStyles.primary : themeStyles.disabled}
                onValueChange={toggleNotificationsSwitch}
                value={notificationsEnabled}
              />
            </View>
            <View style={style.switchContainer}>
              <Text style={[style.text, { color: themeStyles.text }]}>Dźwięk:</Text>
              <Switch
                trackColor={{ false: "#767577", true: themeStyles.secondary }}
                thumbColor={soundEnabled ? themeStyles.primary : themeStyles.disabled}
                onValueChange={toggleSoundSwitch}
                value={soundEnabled}
              />
            </View>
            <TouchableOpacity style={[style.addEventButton, { borderColor: themeStyles.buttonBorder, backgroundColor: themeStyles.buttonBackground }]}>
              <Text style={[style.addEventButtonText, { color: themeStyles.text }]}>Zapisz Ustawienia</Text>
            </TouchableOpacity>
          </View>
        </View>
  );
}

export default Settings;
