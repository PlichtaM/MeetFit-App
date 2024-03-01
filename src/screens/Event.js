import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import placeInfo from "../tempAPI/place.json";
import event from "../tempAPI/event.json";

import styles from "../styles/EventStyles";

const Event = () => {
  const {
    Nazwa,
    data,
    godzina,
    miejsce,
    zapisani_uzytkownicy,
    limit_osob,
    czy_Prywatny,
  } = event;
  const navigation = useNavigation();

  const selectedPlace = placeInfo.find((place) => place.Nazwa === miejsce);
  const placePhotoUri = selectedPlace?.Photo || "";

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>{Nazwa}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.navigate("Footer")}
          >
            <Image
              source={require("../../assets/closeButton.png")}
              style={styles.closeButtonIcon}
            />
          </TouchableOpacity>
        </View>
        <Image style={styles.eventImage} source={{ uri: placePhotoUri }} />
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Data: {data}</Text>
          <Text style={styles.infoText}>Godzina: {godzina}</Text>
          <Text style={styles.infoText}>Miejsce: {miejsce}</Text>
          <Text style={styles.infoText}>
            Zapisani użytkownicy: {zapisani_uzytkownicy.length} / {limit_osob}
          </Text>
          <Text style={styles.infoText}>
            Wydarzenie {czy_Prywatny ? "Prywatne" : "Publiczne"}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.createEventButton}
          onPress={() => navigation.navigate("Footer")}>
          <Text style={styles.createEventButtonText}>
            Utwórz nowe wydarzenie
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Event;
