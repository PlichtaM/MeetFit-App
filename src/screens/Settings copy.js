import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity, Switch } from "react-native";
import { Checkbox } from "expo-checkbox";
import style from "../styles/SettingsStyles";
import { colors, getColorScheme, setColorScheme } from "../components/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Settings() {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(getColorScheme().type);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    // Pobierz ustawienia z AsyncStorage przy pierwszym renderowaniu komponentu
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
  };

  const toggleNotificationsSwitch = () => {
    setNotificationsEnabled((previousState) => !previousState);
  };

  const toggleSoundSwitch = () => {
    setSoundEnabled((previousState) => !previousState);
  };

  const saveSettings = async () => {
    // Zapisz ustawienia do AsyncStorage
    try {
      const settingsToSave = {
        theme: selectedOption,
        notifications: notificationsEnabled,
        sound: soundEnabled,
      };
      await AsyncStorage.setItem("appSettings", JSON.stringify(settingsToSave));
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
          trackColor={{ true: colors.primary, false: "#767577" }}
          thumbColor={notificationsEnabled ? "#8A23AD" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleNotificationsSwitch}
          value={notificationsEnabled}
        />
      </View>
      <View style={style.switchContainer}>
        <Text style={style.text}>Dźwięk:</Text>
        <Switch
          trackColor={{ true: colors.primary, false: "#767577" }}
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
