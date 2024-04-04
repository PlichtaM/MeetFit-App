import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getEventById, GetCountPeople, createUserEvent, GetUserEventByUserId} from "../../services/api";
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
  const [mapPointData, setMapPointData] = useState(null);
  const fetchEventRef = useRef();

  //get event info
  useEffect(() => {
    fetchEventRef.current = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        setUser_Id(userId);
        const response = await getEventById(eventId);
        const ppl = await GetCountPeople(eventId);
        setCountPeople(ppl.data);
        setEvent(response.data);
        fetchUserEvents();
      } catch (error) {
        console.error("Error fetching map points:", error);
      }
    };
    fetchEventRef.current();
  }, [user_Id, navigation]);

  //get google Place info 
  const googleApisUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${Event.mapPointGoogleId}&key=${GOOGLE_API_KEY}`;
  useEffect(() => {
    const fetchPlaceInfo = async () => {
      try {
        const response = await axios.get(googleApisUrl);
        if (response.data.status === "OK") {
          setMapPointData(response.data.result);
        } else {
          console.error("Failed to fetch place info");
        }
      } catch (error) {
        console.error("Error fetching place info:", error);
      }
    };
    fetchPlaceInfo();
    return () => {};
  }, [Event.mapPointGoogleId]);

  //set google Photo and place name 
  const { photos, name } = mapPointData || {};
  //console.log(photos);
  //const PHOTO_REFERENCE = photos[0].photo_reference;
  //console.log(PHOTO_REFERENCE);
  //const pictureUrl = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${PHOTO_REFERENCE}&sensor=false&maxheight=${MAX_HEIGHT}&maxwidth=${MAX_WIDTH}&key=${GOOGLE_API_KEY}`;
  const pictureUrl = "https://meetfitapp.pl/avatars/default-avatar.jpg" //temp

 
 //formating Event Date
  const eventDate = new Date(Event.date);
  const formattedDate = `${eventDate.getDate()}.${eventDate.getMonth() + 1}.${eventDate.getFullYear()}`;
  const formattedTime = `${eventDate.getHours()}:${eventDate.getMinutes().toString().padStart(2, "0")}`;

  //Sign user for Event
  const handleSignUp = async () => {
    try {
      await createUserEvent({ 
        "userId":user_Id,
        "eventId": eventId });
        fetchUserEvents();
      fetchEventRef.current();
    } catch (error) {
      console.error("Error signing up for event:", error);
    }
  };

  //check if user is signed for event  
    const fetchUserEvents = async () => {
      try {      
        const response = await GetUserEventByUserId(user_Id);
        setUserEvents(response.data)
      } catch (error) {
        console.error("Error fetching user events:", error);
      }
    };
  const isUserSignedUp = userEvents.some(event => event.eventId === eventId);

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
            style={styles.closeButtonIcon}
          />
        </TouchableOpacity>
      ),
      headerLeft: () => null,
    });
  }, [navigation, Event]);

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Image style={styles.eventImage} source={{ uri: pictureUrl || "" }} />
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Opis: {Event.description}</Text>
          <Text style={styles.infoText}>Data: {formattedDate}</Text>
          <Text style={styles.infoText}>Godzina: {formattedTime}</Text>
          {name && (
            <Text style={styles.infoText}>Miejsce: {name}{/* temp */}</Text>
          )}
          <Text style={styles.infoText}>
            Zapisani użytkownicy: {CountPeople} / {Event.limit}
          </Text>
          <Text style={styles.infoText}>
            Wydarzenie {Event.private ? "Prywatne" : "Publiczne"}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.createEventButton}
          onPress={() => navigation.navigate("EventEdit", { eventId: eventId })}
        >
          <Text style={styles.createEventButtonText}>Edytuj wydarzenie</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.singUp} onPress={handleSignUp}>
            <Text style={styles.createEventButtonText}>
              {isUserSignedUp ? "Jesteś już zapisany na to wydarzenie" : "Zapisz mnie na wydarzenie"}
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Event;
