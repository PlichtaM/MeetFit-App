import React, { useState, useEffect, useReducer } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { Checkbox } from "expo-checkbox";
import style from "../styles/SettingsStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../components/ThemeContext"; // Upewnij się, że ścieżka do ThemeContext jest poprawna

function Settings() {
  const { themeStyles, changeTheme, currentTheme } = useTheme();

  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [selectedOption, setSelectedOption] = useState(currentTheme);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const storedSettings = await AsyncStorage.getItem("appSettings");
        if (storedSettings) {
          const parsedSettings = JSON.parse(storedSettings);
          setSelectedOption(parsedSettings.theme);
          setNotificationsEnabled(parsedSettings.notifications);
          setSoundEnabled(parsedSettings.sound);
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    }

    loadSettings();
  }, []);

  const handleCheckboxChange = option => {
    setSelectedOption(option);
    changeTheme(option); // Zmieniamy motyw za pomocą funkcji changeTheme
    forceUpdate();
  };

  const toggleNotificationsSwitch = () => {
    setNotificationsEnabled(previousState => !previousState);
  };

  const toggleSoundSwitch = () => {
    setSoundEnabled(previousState => !previousState);
  };

  const saveSettings = async () => {
    try {
      const settingsToSave = {
        theme: selectedOption,
        notifications: notificationsEnabled,
        sound: soundEnabled,
      };
      console.log("Saving settings:", settingsToSave);

      // Zapisujemy ustawienia w AsyncStorage
      await AsyncStorage.setItem("appSettings", JSON.stringify(settingsToSave));
      console.log("Settings saved.");
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  return (
    <View style={style.screen}>
      <View style={style.container}>
        <Text style={style.text}>Motyw aplikacji:</Text>
        <View style={style.Checkboxes}>
          <Checkbox
            value={selectedOption === "dark"}
            onValueChange={() => handleCheckboxChange("dark")}
          />
          <Text
            style={{
              fontSize: 16,
              marginHorizontal: 10,
              color: themeStyles.text,
            }}
          >
            Ciemny
          </Text>
          <Checkbox
            value={selectedOption === "light"}
            onValueChange={() => handleCheckboxChange("light")}
          />
          <Text
            style={{
              fontSize: 16,
              marginHorizontal: 10,
              color: themeStyles.text,
            }}
          >
            Jasny
          </Text>
        </View>

        <View style={style.switchContainer}>
          <Text style={style.text}>Powiadomienia:</Text>
          <Switch
            trackColor={{ false: "#767577", true: themeStyles.primary }}
            thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleNotificationsSwitch}
            value={notificationsEnabled}
          />
        </View>

        <View style={style.switchContainer}>
          <Text style={style.text}>Dźwięk:</Text>
          <Switch
            trackColor={{ false: "#767577", true: themeStyles.primary }}
            thumbColor={soundEnabled ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleSoundSwitch}
            value={soundEnabled}
          />
        </View>

        <TouchableOpacity style={style.addEventButton} onPress={saveSettings}>
          <Text style={style.addEventButtonText}>Zapisz Ustawienia</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Settings;
