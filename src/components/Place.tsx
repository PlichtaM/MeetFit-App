import React, { useState, useEffect } from "react";
import { View, Modal, TouchableOpacity, Text, Image, FlatList,} from "react-native";
import styles from "../styles/PlaceStyles";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { getEventsByMapPointGoogleId, GetCountPeople, } from "../../services/api";
import { getColorScheme } from "../components/Colors";
import { GOOGLE_API_KEY } from "../../env";
import axios from "axios";
const colors = getColorScheme();

const MAX_WIDTH = 1425;
const MAX_HEIGHT = 750;

const Place = ({ isVisible, onClose, selectedMarkerId }) => {
  const navigation = useNavigation();
  const [mapPointData, setMapPointData] = useState(null);
  const [EventsData, setEventsData] = useState(null);
  const [CountPeople, setCountPeople] = useState([]);

  const googleApisUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${selectedMarkerId}&key=${GOOGLE_API_KEY}`;

  useEffect(() => {
    const fetchPlaceInfo = async () => {
      if (selectedMarkerId) {
          const response = await axios.get(googleApisUrl);
          const eventResponse = await getEventsByMapPointGoogleId(
            selectedMarkerId
          );
          setEventsData(eventResponse.data);
          
          const countPromises = eventResponse.data.map(async (event) => {
            const countResponse = await GetCountPeople(event.id);
            return { eventId: event.id, count: countResponse.data };
          });
          const counts = await Promise.all(countPromises);
          setCountPeople(counts);
          if (response.data.status === "OK") {
            setMapPointData(response.data.result);
          }
      }
    };
    fetchPlaceInfo();
    return () => {};
  }, [selectedMarkerId, isVisible]);


  if (!isVisible || !mapPointData) {
    return null;
  }

  const { name, formatted_address, opening_hours, photos } = mapPointData || {};

  const PHOTO_REFERENCE = photos[0].photo_reference;
  const pictureUrl = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${PHOTO_REFERENCE}&sensor=false&maxheight=${MAX_HEIGHT}&maxwidth=${MAX_WIDTH}&key=${GOOGLE_API_KEY}`;

  const addressParts = formatted_address.split(", ");
  const address = addressParts.slice(0, -1).join(", ");

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const dzis = new Date().toLocaleDateString("pl-PL", { weekday: "long" });
  let todayHours = "Zamknięte";

  if (opening_hours && opening_hours.weekday_text) {
    const todaySchedule = opening_hours.weekday_text.find((schedule) =>
      schedule.includes(today)
    );
    if (todaySchedule) {

      if (todaySchedule.includes("Closed")) {
        todayHours = "Zamknięte";
      }else if (todaySchedule.includes("Open 24")) {
        todayHours = "czynne całą dobę";
      } else {
        todayHours = todaySchedule.split(": ")[1];
      }
    }
  }

  return (
    <Modal transparent animationType="slide" visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.overlay} />
        <View style={styles.contentContainer}>
          <View style={styles.topBox}>
            <Text style={styles.placeText}>{name}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialCommunityIcons name="close-circle-outline" size={50} color="white"/>
            </TouchableOpacity>
            <Image
              style={styles.PlacePicture}
              source={{ uri: pictureUrl || "" }}
            />
            <Text style={styles.AdressTextBold}>Lokalizacja</Text>
            <Text style={styles.AdressText}>{address}</Text>
            <Text style={styles.AdressTextBold}>Godziny otwarcia</Text>
            <Text style={styles.AdressText}>
              {dzis}, {todayHours}
            </Text>
          </View>

          <View style={styles.bottomBox}>
            <Text style={styles.EventListText}>Lista Wydarzeń</Text>
            <View style={styles.ListBox}>
              {EventsData && EventsData.length > 0 ? (
                <FlatList
                  data={EventsData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => {
                    const limit = item.limit || 1;
                    const eventId = item.id;
                    const countData = CountPeople.find(
                      (data) => data.eventId === eventId
                    );
                    const currentCount = countData ? countData.count : 0;
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
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("Event", { eventId: item.id }),
                            onClose();
                        }}
                      >
                        <View style={styles.EventListList}>
                          <Entypo
                            name="circle-with-plus"
                            size={24}
                            color={colors.secondary}
                          />
                          <Text
                            style={{
                              ...styles.ListLimit,
                              color: getLimitColor(),
                            }}
                          >
                            {`${currentCount}/${limit}`}
                          </Text>
                          <Text style={styles.EventListItemText}>
                            {new Date(item.date).toLocaleDateString("pl-PL", {
                              day: "2-digit",
                              month: "2-digit",
                            })}
                          </Text>
                          <Text style={styles.EventListItemText}>
                            {`${item.date.substring(11, 16)}`}
                          </Text>
                          <Text style={styles.EventListItemText}>
                            {`${item.name}`}
                          </Text>
                        </View>
                        <View style={styles.line} />
                      </TouchableOpacity>
                    );
                  }}
                />
              ) : (
                <Text style={styles.noEvents}>Brak wydarzeń</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.addEventButton}
              onPress={() => {
                navigation.navigate("EventAdd", {
                  selectedMarkerId: selectedMarkerId,
                });
                onClose();
              }}
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
