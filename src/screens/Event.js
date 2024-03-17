import React, { useLayoutEffect, useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import {View,Text,TouchableOpacity,Image} from "react-native";
import { getColorScheme } from "../components/Colors";
const colors = getColorScheme();

import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../styles/EventStyles";
import { getEventById } from "../../services/api";

const Event = ({ navigation }) => {
  const route = useRoute();
  const { eventId } = route.params;
  const [Event, setEvent] = useState([]);
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEventById(eventId);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching map points:", error);
      }
    };

    fetchEvent();
  }, []);

  const eventDate = new Date(Event.date);
  const formattedDate = `${eventDate.getDate()}.${
    eventDate.getMonth() + 1
  }.${eventDate.getFullYear()}`;
  const formattedTime = `${eventDate.getHours()}:${eventDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

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
        {Event.mapPoint && Event.mapPoint.pictureUrl && (
          <Image
            style={styles.eventImage}
            source={{ uri: Event.mapPoint.pictureUrl }}
          />
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Opis: {Event.description}</Text>
          <Text style={styles.infoText}>Data: {formattedDate}</Text>
          <Text style={styles.infoText}>Godzina: {formattedTime}</Text>
          {Event.mapPoint && (
            <Text style={styles.infoText}>Miejsce: {Event.mapPoint.name}</Text>
          )}
          <Text style={styles.infoText}>
            Zapisani użytkownicy: zapisani_uzytkownicy / {Event.limit}
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
      </View>
    </View>
  );
};

export default Event;
