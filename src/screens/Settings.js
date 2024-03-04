import React, { useState, useEffect, useReducer } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { Checkbox } from "expo-checkbox";
import style from "../styles/SettingsStyles";
import { getCurrentColors, getColorScheme, setColorScheme } from "../components/Colors";

import AsyncStorage from "@react-native-async-storage/async-storage";

function Settings() {
  const navigation = useNavigation();
  const [, forceUpdate] = useReducer((x) => x + 1, 0); // Create a forceUpdate function
  const [selectedOption, setSelectedOption] = useState(getColorScheme().type);
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

  const handleCheckboxChange = (option) => {
    setSelectedOption(option);
    forceUpdate(); // Trigger a re-render to update the theme immediately
  };

  const toggleNotificationsSwitch = () => {
    setNotificationsEnabled((previousState) => !previousState);
  };

  const toggleSoundSwitch = () => {
    setSoundEnabled((previousState) => !previousState);
  };

  const saveSettings = async () => {
    try {
      const settingsToSave = {
        theme: selectedOption,
        notifications: notificationsEnabled,
        sound: soundEnabled,
      };
      console.log("Saving settings:", settingsToSave);

      await setColorScheme(selectedOption);

      // Save other settings to AsyncStorage
      await AsyncStorage.setItem("appSettings", JSON.stringify(settingsToSave));

      // Add a console.log to check if the color scheme is updated
      console.log("Color scheme updated to:", selectedOption);

      forceUpdate(); // Trigger a re-render to update the theme immediately
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.text}>Motyw aplikacji:</Text>
      <View style={style.Checkboxes}>
        <Checkbox
          value={selectedOption === "dark"}
          onValueChange={() => handleCheckboxChange("dark")}
        />
        <Text style={{ fontSize: 16, marginHorizontal: 10 }}>Ciemny</Text>
        <Checkbox
          value={selectedOption === "light"}
          onValueChange={() => handleCheckboxChange("light")}
        />
        <Text style={{ fontSize: 16, marginHorizontal: 10 }}>Jasny</Text>
      </View>

      <View style={style.switchContainer}>
        <Text style={style.text}>Powiadomienia:</Text>
        <Switch
          trackColor={{ true: getCurrentColors().primary, false: "#767577" }}
          thumbColor={notificationsEnabled ? "#8A23AD" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleNotificationsSwitch}
          value={notificationsEnabled}
        />
      </View>
      <View style={style.switchContainer}>
        <Text style={style.text}>Dźwięk:</Text>
        <Switch
          trackColor={{ true: getCurrentColors().primary, false: "#767577" }}
          thumbColor={soundEnabled ? "#8A23AD" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSoundSwitch}
          value={soundEnabled}
        />
      </View>

      <TouchableOpacity style={style.addEventButton} onPress={saveSettings}>
        <Text style={style.addEventButtonText}>Zapisz Ustawienia</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Settings;
