import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity, Switch } from "react-native";
import { Checkbox } from "expo-checkbox";
import style from "../styles/SettingsStyles";
import { colors } from "../components/Colors";

function Settings() {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState("");

  const handleCheckboxChange = (option) => {
    setSelectedOption(option === selectedOption ? "" : option);
  };
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View style={style.container}>

      <Text style={style.text}>Motyw apliakcji:</Text>
      <View style={style.Checkboxes}>
        <Checkbox
          value={selectedOption === "Ciemny"}
          onValueChange={() => handleCheckboxChange("Ciemny")}
        />
        <Text style={{ fontSize: 16, marginHorizontal: 10 }}>Ciemny</Text>
        <Checkbox
          value={selectedOption === "Jasny"}
          onValueChange={() => handleCheckboxChange("Jasny")}
        />
        <Text style={{ fontSize: 16, marginHorizontal: 10 }}>Jasny</Text>
      </View>
     
      <View style={style.switchContainer}>
        <Text style={style.text}>Powiadomienia:</Text>
        <Switch
          trackColor={{ true: colors.primary, false: "#767577" }}
          thumbColor={isEnabled ? '#8A23AD' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={style.switchContainer}>
        <Text style={style.text}>Dźwięk:</Text>
        <Switch
          trackColor={{ true: colors.primary, false: "#767577" }}
          thumbColor={isEnabled ? '#8A23AD' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <TouchableOpacity style={style.addEventButton}>
          <Text style={style.addEventButtonText}>Zapisz Ustawienia</Text>
        </TouchableOpacity>
    </View>
  );
}

export default Settings;
