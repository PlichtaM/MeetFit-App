import React, { useState, useEffect } from "react";
import { View, Modal, TouchableOpacity, Text, Image, FlatList } from "react-native";
import styles from "../styles/PlaceStyles";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { getMapPointId } from "../../services/api";
import { getColorScheme } from "../components/Colors";

const colors = getColorScheme();

const Place = ({ isVisible, onClose, selectedMarkerId }) => {
  const navigation = useNavigation();
  const [mapPointData, setMapPointData] = useState(null);

  useEffect(() => {
    const fetchMapPointData = async () => {
      try {
        if (selectedMarkerId) {
          const response = await getMapPointId(selectedMarkerId);
          setMapPointData(response.data);
        }
      } catch (error) {
        console.error('Error fetching map point data:', error);
      }
    };

    fetchMapPointData();
  }, [selectedMarkerId]);

  if (!isVisible || !mapPointData) {
    return null;
  }

  const {
    name,
    address,
    //openingHours,
    description,
    latitude,
    longitude,
    photo, // assuming the API response contains a 'photo' field
    events, // assuming the API response contains an 'events' field
  } = mapPointData;

  return (
    <Modal transparent animationType="slide" visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.overlay} />
        <View style={styles.contentContainer}>
          <View style={styles.topBox}>
            <Text style={styles.placeText}>{name}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialCommunityIcons name="close-circle-outline" size={50} color="white" style={styles.closeButtonIcon} />
            </TouchableOpacity>
            <Image style={styles.PlacePicture} source={{ uri: photo || '' }} />
            <Text style={styles.AdressTextBold}>Lokalizacja</Text>
            <Text style={styles.AdressText}>{address}</Text>
            <Text style={styles.AdressTextBold}>Godziny otwarcia</Text>
            {/*Object.entries(openingHours).map(([day, hours]) => (
              <Text key={day} style={styles.AdressText}>
                {`${day}: ${hours}`}
              </Text>
            ))*/}
          </View>

          <View style={styles.bottomBox}>
            <Text style={styles.EventListText}>Lista Wydarzeń</Text>

            <View style={styles.ListBox}>
              {events && events.length > 0 ? (
                <FlatList
                  data={events}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => {
                    const limit = parseInt(item.limit_osob, 10) || 1;
                    const currentCount = item.zapisani_uzytkownicy ? item.zapisani_uzytkownicy.length : 0;
                    const percentComplete = (currentCount / limit) * 100;

                    const getLimitColor = () => {
                      if (percentComplete >= 100) {
                        return "red";
                      } else if (percentComplete >= 80) {
                        return "orange";
                      } else {
                        return "green";
                      }
                    };

                    return (
                      <View>
                        <View style={styles.EventListList}>
                          <Entypo name="circle-with-plus" size={24} color={colors.secondary} />
                          <Text
                            style={{
                              ...styles.ListLimit,
                              color: getLimitColor(),
                            }}
                          >
                            {`${currentCount}/${limit}`}
                          </Text>
                          <Text style={styles.EventListItemText}>
                            {new Date(item.data).toLocaleDateString("pl-PL", {
                              day: "2-digit",
                              month: "2-digit",
                            })}
                          </Text>
                          <Text style={styles.EventListItemText}>
                            {`${item.godzina}`}
                          </Text>
                          <Text style={styles.EventListItemText}>
                            {`${item.Nazwa}`}
                          </Text>
                        </View>
                        <View style={styles.line} />
                      </View>
                    );
                  }}
                />
              ) : (
                <Text style={styles.noEvents}>Brak wydarzeń</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.addEventButton}
              onPress={() => { navigation.navigate("EventAdd"); onClose(); }}
            >
              <Text style={styles.addEventButtonText}>
                Utwórz nowe wydarzenie
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Place;
