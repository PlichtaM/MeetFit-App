import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
//import { RadioButton } from 'react-native-paper';
import { Checkbox } from "expo-checkbox";
import style from "../styles/EventAddStyles";
import { colors } from "../components/Colors";

function EventAdd() {
  const [limitMiejsc, setLimitMiejsc] = useState(5); // Stan dla Slidera
  return (
    <View style={style.background}>
      <View style={style.container}>
        <Text style={style.text}>Podaj nazwę wydarzenia:</Text>
        <View style={style.inputContainer}>
          <TextInput placeholder="Nazwa" style={style.textInput} />
        </View>
        <Text style={style.text}>Limit miejsc:</Text>
        <View style={style.sliderContainer}>
          <Text style={style.odDo}>1</Text>
          <Slider
            value={limitMiejsc}
            onValueChange={(value) => setLimitMiejsc(value)}
            minimumValue={2}
            maximumValue={10}
            step={1}
            style={style.slider}
            maximumTrackTintColor={colors.disabled}
            minimumTrackTintColor={colors.disabled}
            thumbTintColor= {colors.secondary}
            thumbStyle={style.thumb}
            trackStyle={style.track}
          />
          <Text style={style.odDo}>10</Text>
        </View>
        <Text>Limit miejsc: {limitMiejsc}</Text>
        <Text style={style.text}>Podaj datę wydarzenia:</Text>
        <TouchableOpacity style={{backgroundColor:colors.disabled, width:'90%', height:200, borderRadius:15, marginVertical:15}}>
          <Text>Kalendarz</Text>
        </TouchableOpacity>
        <Text style={style.text}>Podaj rodzaj wydarzenia:</Text>
        <View style={style.Checkboxes}>
          <Checkbox />
          <Text style={{ fontSize: 16, marginHorizontal: 10 }}>Prywatne</Text>
          <Checkbox />
          <Text style={{ fontSize: 16, marginHorizontal: 10 }}>Publiczne</Text>
        </View>
        <TouchableOpacity style={style.addEventButton}>
          <Text style={style.addEventButtonText}>Utwórz wydarzenie</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default EventAdd;
