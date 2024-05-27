import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Slider from "@react-native-community/slider";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Checkbox } from "expo-checkbox";
import style from "../styles/EventAddStyles";
import { getColorScheme } from "../components/Colors";
import { createEvent } from "../../services/api";
import DateTimePicker from '@react-native-community/datetimepicker';
const colors = getColorScheme();

LocaleConfig.defaultLocale = 'pl';
const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours() + 2;
  const minutes = now.getMinutes();
  return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};

function EventAdd({ route }) {
  const navigation = useNavigation();
  const { selectedMarkerId } = route.params;  
  const [limitMiejsc, setLimitMiejsc] = useState(5);
  const [selected, setSelected] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [time, setTime] = useState(getCurrentTime());
  const [warning, setWarning] = useState(false);
  const [dateWarning, setDateWarning] = useState(false);

  const handleCheckboxChange = (option) => {
    setSelectedOption(option === selectedOption ? "" : option);
  };

  const isDateInFuture = (selectedDate) => {
    const currentDate = new Date();
    const selectedDateObj = new Date(selectedDate);
  
    return selectedDateObj.getTime() > currentDate.getTime();
  };

  const handleCreateEvent = async () => {
    setWarning(false)
    setDateWarning(false)
    
    if (!selected){
      setWarning(true)
      return
    };

    const selectedDateInFuture = isDateInFuture(new Date(selected + ' ' + time).toISOString());
    
    if (selectedDateInFuture) {
    try {
      const eventData = {
        name: eventName,
        description: description,
        date: new Date(selected + ' ' + time).toISOString(),
        mapPointGoogleId: selectedMarkerId,
        limit: limitMiejsc,
        private: selectedOption === "Prywatne",
        active: true
      };
      
      const response = await createEvent(eventData);      
      const locationHeader = response.headers.location;
      const eventIdFromLocation = locationHeader.split("/").pop();
      navigation.navigate('Event', { eventId: eventIdFromLocation });
    } catch (error) {
      setWarning(true)
    }}else setDateWarning(true);
  };

  const showPicker = () => {
    setIsPickerShow(true);
  };
  const onChange = (event, selectedTime) => {
    if (event.type === 'set') {
      const hours = selectedTime.getHours();
      const minutes = selectedTime.getMinutes();
      const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
      setTime(formattedTime);
    }
    setIsPickerShow(false);    
  };  
  
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
            cursorColor={colors.primary}
          />
        </View>
        <Text style={style.text}>Podaj opis wydarzenia:</Text>
        <View style={style.inputContainer}>
          <TextInput
            placeholder="Opis"
            style={style.textInput}
            value={description}
            onChangeText={setDescription} 
            cursorColor={colors.primary}
          />
        </View>
        <Text style={style.text}>Limit miejsc:</Text>
        <View style={style.sliderContainer}>
          <Text style={style.odDo}>2</Text>
          <Slider
            value={limitMiejsc}
            onValueChange={(value) => setLimitMiejsc(value)}
            minimumValue={2}
            maximumValue={10}
            step={1}
            maximumTrackTintColor={colors.disabled}
            minimumTrackTintColor={colors.disabled}
            thumbTintColor={colors.secondary}
            style={style.slider}
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
              arrowColor: colors.secondary
            }}
            hideArrows={false}
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
        {dateWarning && <Text style={style.warning}>Podaj prawidłową datę!</Text> }
        <Text style={style.text}> Godzina wydarzenia:</Text>
        <Text style={style.text}>{time}</Text>
        <TouchableOpacity style={style.addEventButton} onPress={showPicker}>
          <Text style={style.addEventButtonText}>Wybierz godzinę wydarzenia</Text>
        </TouchableOpacity>
        {isPickerShow && (
        <DateTimePicker  mode="time" value={new Date()} is24Hour={true} onChange={onChange} />)}
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
        {warning && <Text style={style.warning}>Uzupełnij wszystkie pola!</Text> }
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
