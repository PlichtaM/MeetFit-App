import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Slider from "@react-native-community/slider";
import { Calendar, LocaleConfig } from "react-native-calendars"; //https://github.com/wix/react-native-calendars
//import DateTimePicker from '@react-native-community/datetimepicker'
//import { RadioButton } from 'react-native-paper';
import { Checkbox } from "expo-checkbox";
import style from "../styles/EventAddStyles";
import { colors } from "../components/Colors";

LocaleConfig.locales['pl'] = {
  monthNames: [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień'
  ],
  monthNamesShort: ['Sty.', 'Lut.', 'Mar.', 'Kwi.', 'Maj', 'Cze.', 'Lip.', 'Sie.', 'Wrz.', 'Paź.', 'Lis.', 'Gru.'],
  dayNames: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
  dayNamesShort: ['Niedz.', 'Pon.', 'Wt.', 'Śr.', 'Czw.', 'Pt.', 'Sob.'],
  today: "Dziś"
};

LocaleConfig.defaultLocale = 'pl';


function EventEdit() {  
  const navigation = useNavigation();
  const [limitMiejsc, setLimitMiejsc] = useState(5);
  const [selected, setSelected] = useState("");
  const [selectedOption, setSelectedOption] = useState("");


  const handleCheckboxChange = (option) => {
    setSelectedOption(option === selectedOption ? "" : option);
  };
  return (
    <ScrollView style={style.background}>
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
            thumbTintColor={colors.secondary}
            thumbStyle={style.thumb}
            trackStyle={style.track}
          />
          <Text style={style.odDo}>10</Text>
        </View>
        <Text>Limit miejsc: {limitMiejsc}</Text>
        <Text style={style.text}>Podaj datę wydarzenia:</Text>
        <TouchableOpacity>
          <Calendar
            style={style.calendar}
            theme={{
              calendarBackground: colors.disabled,
              textSectionTitleColor: colors.primary,
              selectedDayBackgroundColor: colors.primary,
              selectedDayTextColor: "white",
              todayTextColor: colors.primary,
              dayTextColor: "black",
            }}
            onDayPress={(day) => {
              setSelected(day.dateString);
            }}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: colors.primary,
              },
            }}
          />
        </TouchableOpacity>
        <Text style={style.text}>Podaj rodzaj wydarzenia:</Text>
        <View style={style.Checkboxes}>
          <Checkbox
            value={selectedOption === "Prywatne"}
            onValueChange={() => handleCheckboxChange("Prywatne")}
          />
          <Text style={{ fontSize: 16, marginHorizontal: 10 }}>Prywatne</Text>
          <Checkbox
            value={selectedOption === "Publiczne"}
            onValueChange={() => handleCheckboxChange("Publiczne")}
          />
          <Text style={{ fontSize: 16, marginHorizontal: 10 }}>Publiczne</Text>
        </View>
        <TouchableOpacity style={style.addEventButton}>
          <Text style={style.addEventButtonText} onPress={() => navigation.navigate("Event")}>Aktualizuj wydarzenie</Text>
        </TouchableOpacity>
         <TouchableOpacity style={style.cancelEventButton}>
          <Text style={style.addEventButtonText} onPress={() => navigation.popToTop()}>Anuluj wydarzenie</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default EventEdit;
