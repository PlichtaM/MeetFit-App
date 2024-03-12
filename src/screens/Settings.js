import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from '../components/ThemeContext';
import getSettingsStyles from "../styles/SettingsStyles";

function Settings() {
  const { theme, toggleTheme, themeStyles } = useTheme(); // Używamy toggleTheme zamiast setTheme
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

  const saveSettings = async () => {
    try {
      const settingsToSave = {
        notifications: notificationsEnabled,
        sound: soundEnabled,
      };
      await AsyncStorage.setItem("appSettings", JSON.stringify(settingsToSave));
      alert('Ustawienia zostały zapisane.');
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  const styles = getSettingsStyles(themeStyles);

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.text}>Wybierz motyw:</Text>
        <TouchableOpacity
          style={styles.themeButton}
          onPress={toggleTheme}>
          <Text style={styles.themeButtonText}>{theme === 'light' ? 'Ciemny' : 'Jasny'}</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Powiadomienia:</Text>
        <TouchableOpacity
          style={styles.themeButton}
          onPress={() => setNotificationsEnabled(!notificationsEnabled)}>
          <Text style={styles.themeButtonText}>{notificationsEnabled ? 'Włączone' : 'Wyłączone'}</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Dźwięk:</Text>
        <TouchableOpacity
          style={styles.themeButton}
          onPress={() => setSoundEnabled(!soundEnabled)}>
          <Text style={styles.themeButtonText}>{soundEnabled ? 'Włączony' : 'Wyłączony'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addEventButton} onPress={saveSettings}>
          <Text style={styles.addEventButtonText}>Zapisz Ustawienia</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Settings;
