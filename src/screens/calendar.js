import React, { useState, Appearance } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/CalendarStyles';
import user from "../tempAPI/user.json";
import { Entypo } from '@expo/vector-icons';
import { colors } from '../components/Colors';

function Calendar() {
  const navigation = useNavigation();
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
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={goToPreviousWeek}>
        <Entypo name="chevron-left" size={60} color={colors.secondary} />
        </TouchableOpacity>
        <View>
          <Text style={styles.dates}>
            {startDate.toLocaleDateString('en-GB')} - {endDate.toLocaleDateString('en-GB')}
          </Text>
        </View>
        <TouchableOpacity onPress={goToNextWeek}>
        <Entypo name="chevron-right" size={60} color={colors.secondary} />
        </TouchableOpacity>
      </View>
      <View>
        {sortedEvents.map((event, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.eventButton, index % 2 === 0 ? styles.evenEvent : null]}
            onPress={() => navigation.navigate("Event")}
          >
            <Text style={[styles.eventText, index % 2 === 0 ? styles.evenText : null]}>
              {new Date(event.data).toLocaleDateString('en-GB')} -<Text style={{fontWeight:'bold'}}> {event.Nazwa}</Text> - {event.godzina}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default Calendar;
