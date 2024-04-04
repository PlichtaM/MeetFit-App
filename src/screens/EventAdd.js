import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Slider from "@react-native-community/slider";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Checkbox } from "expo-checkbox";
import style from "../styles/EventAddStyles";
import { getColorScheme } from "../components/Colors";
import { createEvent } from "../../services/api";

LocaleConfig.defaultLocale = 'pl';

const colors = getColorScheme();

function EventAdd({ route }) {
  const navigation = useNavigation();
  const { selectedMarkerId } = route.params;
  
  const [limitMiejsc, setLimitMiejsc] = useState(5);
  const [selected, setSelected] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");

  const handleCheckboxChange = (option) => {
    setSelectedOption(option === selectedOption ? "" : option);
  };

  const handleCreateEvent = async () => {
    try {
      const eventData = {
        name: eventName,// Póżniej dodać,żeby było co najmniej kilka znaków
        description: description,
        date: new Date(selected).toISOString(), //dodać Input godziny
        mapPointGoogleId: selectedMarkerId,
        limit: limitMiejsc, //dodać możliwość "Bez limitu"
        private: selectedOption === "Prywatne", // ztego chyba rezygnujemy
        active: true
      };

      
      const response = await createEvent(eventData);
      //wzięcie ID wydarzenia od response API i użycie w przekierowaniu do ekranu wydarzenia
      const locationHeader = response.headers.location;
      const eventIdFromLocation = locationHeader.split("/").pop();
      console.log("eventAdd",eventIdFromLocation);
      navigation.navigate('Event', { eventId: eventIdFromLocation });
    } catch (error) {
      console.error('Error creating event:', error.response);
      console.error('Error creating event:', error);
    }
  };
  console.log(selected);
  return (
    <ScrollView style={style.background}>
      <View style={style.container}>
        <Text style={style.text}>Podaj nazwę wydarzenia:</Text>
        <View style={style.inputContainer}>
          <TextInput
            placeholder="Nazwa"
            style={style.textInput}
            value={eventName}
            onChangeText={setEventName} 
          />
        </View>
        <Text style={style.text}>Podaj opis wydarzenia:</Text>
        <View style={style.inputContainer}>
          <TextInput
            placeholder="Opis"
            style={style.textInput}
            value={description}
            onChangeText={setDescription} 
          />
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
          <Text style={{ fontSize: 16, marginHorizontal: 10, color: colors.text }}>Prywatne</Text>
          <Checkbox
            value={selectedOption === "Publiczne"}
            onValueChange={() => handleCheckboxChange("Publiczne")}
          />
          <Text style={{ fontSize: 16, marginHorizontal: 10, color: colors.text }}>Publiczne</Text>
        </View>
        <TouchableOpacity style={style.addEventButton} onPress={handleCreateEvent}>
          <Text style={style.addEventButtonText}>Utwórz wydarzenie</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default EventAdd;


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
