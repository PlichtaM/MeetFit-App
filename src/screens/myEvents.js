import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons';
import { useTheme } from '../components/ThemeContext';
import getCalendarStyles from '../styles/CalendarStyles';
import { getEventsByUserId } from '../../services/api';
import LoadingScreen from "./Loading";

function MyEvents() {
  const navigation = useNavigation();
  const { themeStyles } = useTheme();
  const dynamicStyles = getCalendarStyles(themeStyles);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const { data: eventsData } = await getEventsByUserId(userId);
        setEvents(eventsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <View style={[dynamicStyles.container, { backgroundColor: themeStyles.Background }]}>
     
      <View>
        {events.map((event, index) => (
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

export default MyEvents;
