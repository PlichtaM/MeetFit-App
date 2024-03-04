import React from "react";
import { colors } from "./Colors";
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
} from "react-native";
import styles from "../styles/PlaceStyles";
import placeInfo from "../tempAPI/place.json";
import { useNavigation } from "@react-navigation/native";

const Place = ({ isVisible, onClose, selectedMarkerName }) => {
  const navigation = useNavigation();

  const selectedPlace = placeInfo.find(
    (place) => place.Nazwa === selectedMarkerName
  );
  const placePhotoUri = selectedPlace?.Photo || "";
  const placeInfoState = {
    address: selectedPlace?.Lokalizacja || "",
    openingHours: selectedPlace?.GodzinyOtwarcia || {},
  };
  const placeEvents = selectedPlace?.Wydarzenia || [];

  return (
    <Modal transparent animationType="slide" visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.overlay} />
        <View style={styles.contentContainer}>
          <View style={styles.topBox}>
            <Text style={styles.placeText}>{selectedMarkerName}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Image
                source={require("../../assets/closeButton.png")}
                style={styles.closeButtonIcon}
              />
            </TouchableOpacity>
            <Image
              style={styles.PlacePicture}
              source={{ uri: placePhotoUri }}
            />
            <Text style={styles.AdressTextBold}>Lokalizacja</Text>
            <Text style={styles.AdressText}>{placeInfoState.address}</Text>
            <Text style={styles.AdressTextBold}>Godziny otwarcia</Text>
            {Object.entries(placeInfoState.openingHours).map(([day, hours]) => {
              const todayDay = new Intl.DateTimeFormat("pl-PL", {
                weekday: "long",
              })
                .format(new Date())
                .toLowerCase();
              const formattedDay = day.toLowerCase();
              return (
                todayDay === formattedDay && (
                  <Text key={day} style={styles.AdressText}>
                    {`${day}: ${hours}`}
                  </Text>
                )
              );
            })}
          </View>

          <View style={styles.bottomBox}>
            <Text style={styles.EventListText}>Lista Wydarzeń</Text>

            <View style={styles.ListBox}>
              {placeEvents.length > 0 ? (
                <FlatList
                  data={placeEvents}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => {
                    const limit = parseInt(item.limit_osob, 10) || 1;
                    const currentCount = item.zapisani_uzytkownicy
                      ? item.zapisani_uzytkownicy.length
                      : 0;
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
                          <Image
                            style={{ height: 25, marginRight: 5 }}
                            source={require("../../assets/addIcon.png")}
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
