import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable  } from "react-native";
import placeInfo from "../tempAPI/place.json";
import event from "../tempAPI/event.json";
import { colors } from "../components/Colors";

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

  useLayoutEffect(() => { 
    navigation.setOptions({
      title: Nazwa,      
      headerTitleAlign: 'center',
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTitleStyle: {
        fontWeight: "bold",
        color: "white",
        fontSize:25,
      },
      headerRight: () => (
        <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.popToTop()}
      >
        <Image
          source={require("../../assets/closeButton.png")}
          style={styles.closeButtonIcon}
        />
      </TouchableOpacity>
      ),
      headerLeft:() =>(null),
    });
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <View style={styles.container}>       
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
          onPress={() => navigation.navigate("EventEdit")}>
          <Text style={styles.createEventButtonText}>
            Edytuj wydarzenie
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Event;
