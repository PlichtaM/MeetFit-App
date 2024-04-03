import React, { useState, useEffect} from "react";
import { useNavigation  } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Slider from "@react-native-community/slider";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Checkbox } from "expo-checkbox";
import style from "../styles/EventAddStyles";
import { getColorScheme } from "../components/Colors";
import { getEventById, updateEvent} from "../../services/api";
const colors = getColorScheme();

function EventEdit({ route }) {
  const navigation = useNavigation();
  const { eventId } = route.params;
 
  const handleCheckboxChange = (option) => {
    setSelectedOption(option === selectedOption ? "" : option);
  };
  const [Event, setEvent] = useState([]);
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEventById(eventId);
        setEvent(response.data);
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


  const handleEditEvent = async () => {
    try {
      const eventData = {
        name: eventName,// Póżniej dodać,żeby było co najmniej kilka znaków
        description: "", //Dodać do formularza
        date: new Date(selected).toISOString(), //dodać Input godziny
        mapPointGoogleId: Event.mapPointId,
        limit: limitMiejsc, //dodać możliwość "Bez limitu"
        private: selectedOption === "Prywatne", // ztego chyba rezygnujemy
        active: true
      };
      
      const response = await updateEvent(eventId, eventData);
      console.log(response);
      navigation.navigate('Event', { eventId: eventId });
    } catch (error) {
      console.error('Error creating event:', error.response);
      console.error('Error creating event:', error);
    }
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