import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { useTheme } from '../components/ThemeContext';
import getCalendarStyles from '../styles/CalendarStyles';
import { getEvent } from '../../services/api';
import LoadingScreen from "./Loading";

function Calendar() {
  const navigation = useNavigation();
  const { themeStyles } = useTheme();
  const dynamicStyles = getCalendarStyles(themeStyles);
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: eventsData } = await getEvent();
        setEvents(eventsData);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const goToPreviousWeek = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7));
  };

  const goToNextWeek = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7));
  };

  const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 3);
  const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 3, 23, 59, 59);
  
  const filteredEvents = events.length > 0 ? events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= startDate && eventDate <= endDate;
  }) : [];


  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={[dynamicStyles.container, { backgroundColor: themeStyles.Background }]}>
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
        {filteredEvents.map((event, index) => (
          <TouchableOpacity
            key={index}
            style={[dynamicStyles.eventButton, index % 2 === 0 ? dynamicStyles.evenEvent : null]}
            onPress={() => navigation.navigate("Event",{eventId: event.id})}
          >
            <Text style={[dynamicStyles.eventText, index % 2 === 0 ? dynamicStyles.evenText : null]}>
              {new Date(event.date).toLocaleDateString('en-GB')} -<Text style={{ fontWeight: 'bold' }}> {event.name}</Text> - {event.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default Calendar;
