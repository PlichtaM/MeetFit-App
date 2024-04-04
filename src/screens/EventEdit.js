import React, { useState, useEffect} from "react";
import { useNavigation  } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Slider from "@react-native-community/slider";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Checkbox } from "expo-checkbox";
import style from "../styles/EventAddStyles";
import { getColorScheme } from "../components/Colors";
import { getEventById, updateEvent} from "../../services/api";
import DateTimePicker from '@react-native-community/datetimepicker';
import LoadingScreen from "./Loading";

const colors = getColorScheme();

function EventEdit({ route }) {
  const navigation = useNavigation();
  const { eventId } = route.params;
  const [Event, setEvent] = useState([]);
  const [isPickerShow, setIsPickerShow] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEventById(eventId);
        setEvent(response.data);
        setLimitMiejsc(response.data.limit);
        setSelected(response.data.date && response.data.date.slice(0, 10));
        setSelectedOption(response.data.private === "Prywatne");
        setEventName(response.data.name);
        setTime(response.data.date && response.data.date.slice(11, 16));
        setDescription(response.data.description);
      } catch (error) {
        console.error('Error fetching map points:', error);
      }
    };
    fetchEvent();
  }, []);
  

  const [limitMiejsc, setLimitMiejsc] = useState(Event.limit);
  const [selected, setSelected] = useState(Event.date && Event.date.slice(0, 10));
  const [selectedOption, setSelectedOption] = useState(Event.private  === "Prywatne");
  const [eventName, setEventName] = useState(Event.name);
  const [time, setTime] = useState(Event.date && Event.date.slice(11, 16)); //"date": "2024-04-04T21:55:16.688Z",
  const [description, setDescription] = useState(Event.description);
  

  const handleCheckboxChange = (option) => {
    setSelectedOption(option === selectedOption ? "" : option);
  };

  const handleEditEvent = async () => {
    try {
      const eventData = {
        name: eventName,// Póżniej dodać,żeby było co najmniej kilka znaków
        description: "", //Dodać do formularza
        date: new Date(selected + ' ' + time).toISOString(),
        mapPointGoogleId: Event.mapPointId,
        limit: limitMiejsc, //dodać możliwość "Bez limitu"
        private: selectedOption === "Prywatne", // ztego chyba rezygnujemy
        active: true
      };      
      const response = await updateEvent(eventId, eventData);
      navigation.navigate('Event', { eventId: eventId });
    } catch (error) {
      console.error('Error creating event:', error.response);
      console.error('Error creating event:', error);
    }
  };

  const showPicker = () => {
    setIsPickerShow(true);
  };
  const onChange = (event, selectedTime) => {
    if (event.type === 'set') { // Dodaj sprawdzenie, czy użytkownik wybrał czas
      const hours = selectedTime.getHours();
      const minutes = selectedTime.getMinutes();
      const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
      setTime(formattedTime);
    }
    setIsPickerShow(false);    
  };

  if (!Event) {
    return (
      <LoadingScreen/>
    );
  }
  return (
    <ScrollView style={style.background}>
      <View style={style.container}>
        <Text style={style.text}>Nazwa wydarzenia:</Text>
        <View style={style.inputContainer}>
          <TextInput
            placeholder="Nazwa"
            style={style.textInput}
            value={eventName}
            onChangeText={setEventName} 
          />
        </View>
        <Text style={style.text}>Opis wydarzenia:</Text>
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
        <TouchableOpacity style={style.addEventButton} onPress={handleEditEvent}>
          <Text style={style.addEventButtonText}>Aktualizuj wydarzenie</Text>
        </TouchableOpacity>
         <TouchableOpacity style={style.cancelEventButton}>
          <Text style={style.addEventButtonText} onPress={() => console.log('anuluj')/* navigation.popToTop()*/ }>Anuluj wydarzenie</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default EventEdit;



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