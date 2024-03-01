import React from "react";
import { colors } from "./Colors"; 
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import styles from "../styles/MapPlaceStyles";
import placeInfo  from "../tempAPI/place.json";
import { useNavigation } from "@react-navigation/native";


interface PopupProps {
  isVisible: boolean;
  onClose: () => void;
  selectedMarkerName: string;
}
const PopupComponent: React.FC<PopupProps> = ({ isVisible, onClose,selectedMarkerName }) => {
  const navigation = useNavigation()

  const selectedPlace = placeInfo.find(place => place.Nazwa === selectedMarkerName);  
  const placePhotoUri = selectedPlace?.Photo || '';
  const placeInfoState = {
    address: selectedPlace?.Lokalizacja || "",
    openingHours: selectedPlace?.GodzinyOtwarcia || {},
  };
  

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
            <Image style={styles.PlacePicture}  source={{uri: placePhotoUri }}/>
            <Text style={styles.AdressTextBold}>Lokalizacja</Text>
            <Text style={styles.AdressText}>{placeInfoState.address}</Text>
            <Text style={styles.AdressTextBold}>Godziny otwarcia</Text>
              {Object.entries(placeInfoState.openingHours).map(([day, hours]) => (
                <Text key={day} style={styles.AdressText}>
                      {`${day}: ${hours}`}
                        </Text>
                        ))}
          </View>
          <View style={styles.bottomBox}>
            <Text style={styles.EventListText}>Lista Wydarzeń</Text>
            <View style={styles.EventListList}></View>
            <TouchableOpacity  style={styles.addEventButton}  onPress={() => navigation.navigate('EventAdd')}>
                <Text style={styles.addEventButtonText}>Utwórz nowe wydarzenie</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PopupComponent;