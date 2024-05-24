import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getEventById,
  GetCountPeople,
  createUserEvent,
  GetUserEventByUserId,
  deleteUserEvent,
} from "../../services/api";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getColorScheme } from "../components/Colors";
import styles from "../styles/EventStyles";
const colors = getColorScheme();
import { GOOGLE_API_KEY } from "../../env";
import axios from "axios";

const MAX_WIDTH = 1425;
const MAX_HEIGHT = 750;

const Event = ({ navigation }) => {
  const route = useRoute();
  const { eventId } = route.params;
  const [Event, setEvent] = useState([]);
  const [CountPeople, setCountPeople] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [user_Id, setUser_Id] = useState([]);
  const [isUserSignedUp, setIsUserSignedUp] = useState(false);
  const [mapPointData, setMapPointData] = useState(null);
  const fetchEventRef = useRef();

  // get event info
  useEffect(() => {
    fetchEventRef.current = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        setUser_Id(userId);
        const response = await getEventById(eventId);
        const ppl = await GetCountPeople(eventId);
        setCountPeople(ppl.data);
        setEvent(response.data);
        fetchUserEvents(userId);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventRef.current();

    // Set interval to fetch every 10 seconds
    const intervalId = setInterval(fetchEventRef.current, 10000);

    return () => clearInterval(intervalId);
  }, [eventId, navigation]);

  // get user events
  useEffect(() => {
    fetchUserEvents(user_Id);
  }, [user_Id, eventId]);
  
  const fetchUserEvents = async (userId) => {
    const response = await GetUserEventByUserId(userId);
    setUserEvents(response.data);
    setIsUserSignedUp(response.data.some((event) => event.eventId === eventId));
  };

  // get google Place info
  useEffect(() => {
    const fetchPlaceInfo = async () => {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${Event.mapPointGoogleId}&key=${GOOGLE_API_KEY}`
        );
          setMapPointData(response.data.result);
    };
    fetchPlaceInfo();
  }, [Event.mapPointGoogleId]);

  // formatting Event Date
  const eventDate = new Date(Event.date);
  const formattedDate = `${eventDate.getDate()}.${
    eventDate.getMonth() + 1
  }.${eventDate.getFullYear()}`;
  const formattedTime = `${eventDate.getHours()}:${eventDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  // Sign user for Event
  const handleSignUp = async () => {
    try {
      await createUserEvent({
        userId: user_Id,
        eventId: eventId,
      });
      fetchUserEvents(user_Id);
      fetchEventRef.current();
    } catch (error) {
      console.error("Error signing up for event:", error);
    }
  };
  
  const handleSignOut = async () => {
    try {
      await deleteUserEvent(user_Id, eventId);
      const updatedUserEvents = await GetUserEventByUserId(user_Id);
      setUserEvents(updatedUserEvents.data);
      fetchUserEvents(user_Id);
      setIsUserSignedUp(false)
      fetchEventRef.current();
    } catch (error) {
      console.error("Error signing out from event:", error);
    }
  };
  

  const isUserCreator = user_Id === Event.createdBy;

  // set google Photo and place name
  const { photos, name } = mapPointData || {};
  let pictureUrl = "https://meetfitapp.pl/avatars/default-avatar.jpg";
  if (photos) {
    const PHOTO_REFERENCE = photos[0].photo_reference;
    pictureUrl = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${PHOTO_REFERENCE}&sensor=false&maxheight=${MAX_HEIGHT}&maxwidth=${MAX_WIDTH}&key=${GOOGLE_API_KEY}`;
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: Event.name,
      headerTitleAlign: "center",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTitleStyle: {
        fontWeight: "bold",
        color: "white",
        fontSize: 25,
      },
      headerRight: () => (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.popToTop()}
        >
          <MaterialCommunityIcons
            name="close-circle"
            size={36}
            color={"white"}
          />
        </TouchableOpacity>
      ),
      headerLeft: () => null,
    });
  }, [navigation, Event, handleSignOut]);

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        {photos && (
          <Image style={styles.eventImage} source={{ uri: pictureUrl || "" }} />
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Opis: {Event.description}</Text>
          <Text style={styles.infoText}>Data: {formattedDate}</Text>
          <Text style={styles.infoText}>Godzina: {formattedTime}</Text>
          {name && <Text style={styles.infoText}>Miejsce: {name}</Text>}
          <Text style={styles.infoText}>
            Zapisani użytkownicy: {CountPeople} / {Event.limit}
          </Text>
          <Text style={styles.infoText}>
            Wydarzenie {Event.private ? "Prywatne" : "Publiczne"}
          </Text>
        </View>
        {isUserCreator && (
          <TouchableOpacity
            style={styles.createEventButton}
            onPress={() =>
              navigation.navigate("EventEdit", { eventId: eventId })
            }
          >
            <Text style={styles.createEventButtonText}>Edytuj wydarzenie</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.singUp} onPress={handleSignUp}>
          <Text style={styles.createEventButtonText}>
            {isUserSignedUp
              ? "Jesteś już zapisany na to wydarzenie"
              : "Zapisz mnie na wydarzenie"}
          </Text>
        </TouchableOpacity>
        {isUserSignedUp && (
          <TouchableOpacity style={styles.SignOut} onPress={handleSignOut}>
            <Text style={styles.createEventButtonText}>
              Wypisz mnie z wydarzenia
            </Text>
          </TouchableOpacity>
        )}
        {isUserSignedUp && (
          <TouchableOpacity
            style={[styles.chatButton, styles.marginBottom]}
            onPress={() => navigation.navigate("ChatScreen", { eventId, eventName: Event.name })}
          >
            <Text style={styles.createEventButtonText}>Przejdź do czatu</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default Event;
