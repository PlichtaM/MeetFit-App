import React, { useState, useEffect, useReducer } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { Checkbox } from "expo-checkbox";
import style from "../styles/SettingsStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getColorScheme } from "../components/Colors";
const colors = getColorScheme();

function Settings({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const toggleNotificationsSwitch = () => {
    setNotificationsEnabled((previousState) => !previousState);
  };

  return (
    <View style={style.screen}>
      <View style={style.container}>
        <View style={style.switchContainer}>
          <Text style={style.text}>Powiadomienia:</Text>
          <Switch
            trackColor={{ false: "#767577", true: colors.primary }}
            thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleNotificationsSwitch}
            value={notificationsEnabled}
          />
        </View>
        <TouchableOpacity
          style={style.addEventButton}
          onPress={() => navigation.push("ChangePasswordScreen")}
        >
          <Text style={style.addEventButtonText}>Zmień hasło</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Settings;
