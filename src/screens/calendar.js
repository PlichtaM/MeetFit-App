import React, { useState, Appearance } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import getCalendarStyles from '../styles/CalendarStyles';
import user from "../tempAPI/user.json";
import { Entypo } from '@expo/vector-icons';
import { useTheme } from '../components/ThemeContext';

function Calendar() {
  const navigation = useNavigation();
  const { themeStyles } = useTheme();
  const dynamicStyles = getCalendarStyles(themeStyles);
  const events = user[0].Wydarzenia || [];

  const [currentDate, setCurrentDate] = useState(new Date());

  const goToPreviousWeek = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7));
  };

  const goToNextWeek = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7));
  };

  const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 3);
  const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 3, 23, 59, 59);

  const filteredEvents = events.filter(
    event => new Date(event.data) >= startDate && new Date(event.data) <= endDate
  );
  const sortedEvents = filteredEvents.sort((a, b) => new Date(a.data) - new Date(b.data));

  return (
    <View style={[dynamicStyles.container, {backgroundColor: themeStyles.Background}]}>
          <View style={dynamicStyles.dateContainer}>
            <TouchableOpacity onPress={goToPreviousWeek}>
              <Entypo name="chevron-left" size={60} color={themeStyles.secondary} />
            </TouchableOpacity>
        <View>
          <Text style={dynamicStyles.dates}>
            {startDate.toLocaleDateString('en-GB')} - {endDate.toLocaleDateString('en-GB')}
          </Text>
        </View>
        <TouchableOpacity onPress={goToNextWeek}>
        <Entypo name="chevron-right" size={60} color={themeStyles.secondary} />
        </TouchableOpacity>
      </View>
      <View>
        {sortedEvents.map((event, index) => (
          <TouchableOpacity
            key={index}
            style={[dynamicStyles.eventButton, index % 2 === 0 ? dynamicStyles.evenEvent : null]}
            onPress={() => navigation.navigate("Event")}
          >
            <Text style={[dynamicStyles.eventText, index % 2 === 0 ? dynamicStyles.evenText : null]}>
              {new Date(event.data).toLocaleDateString('en-GB')} -<Text style={{fontWeight:'bold'}}> {event.Nazwa}</Text> - {event.godzina}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default Calendar;
