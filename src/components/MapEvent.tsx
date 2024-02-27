import React from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { colors } from "./Colors";

interface PopupProps {
  isVisible: boolean;
  onClose: () => void;
}
const PopupComponent: React.FC<PopupProps> = ({ isVisible, onClose }) => {
  return (
    <Modal transparent animationType="slide" visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.overlay} />
        <View style={styles.contentContainer}>
          <View style={styles.topBox}>
            <Text style={styles.placeText}>Nazwa Miejsca</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Image
                source={require("../../assets/closeButton.png")}
                style={styles.closeButtonIcon}
              />
            </TouchableOpacity>
            <View style={styles.PlacePicture} />
            <Text style={styles.AdressTextBold}>Lokalizacja</Text>
            <Text style={styles.AdressText}>ul. JakaśTam 21/37 61-900</Text>
            <Text style={styles.AdressTextBold}>Godziny otwarcia</Text>
            <Text style={styles.AdressText}>Dzisiaj: 06:00-21:00</Text>
          </View>
          <View style={styles.bottomBox}>
            <Text style={styles.EventListText}>Lista Wydarzeń</Text>
            <View style={styles.EventListList}></View>
            <TouchableOpacity  style={styles.addEventButton}>
                <Text style={styles.addEventButtonText}>Utwórz nowe wydarzenie</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center", // Center content vertically
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  overlay: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    top: -100,
    flexDirection: "column",
    width: "80%",
    height: "80%",
  },
  topBox: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  bottomBox: {
    flex: 1,
    backgroundColor: "white",
    
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: -20,
    right: -20,
    padding: 10,
  },
  closeButtonIcon: {
    height: 45,
    width: 45,
  },
  placeText: {
    marginTop: 15,
    marginBottom: 25,
    textAlign: "center",
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  PlacePicture: {
    backgroundColor: "grey",
    width: 285,
    height: 150,
    marginBottom: 10,
  },
  AdressText: {
    color: "white",
    fontSize: 12,
  },
  AdressTextBold: {
    marginTop: 5,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  EventListText:{    
    marginTop: 10,
    marginBottom:10,
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center"
  },
  EventListList:{
    height:230,
    width:300,
    backgroundColor: '#F1F1F1'
  },
  addEventButton:{
    marginTop: 15,
    backgroundColor: colors.secondary,
    width:300,
    height:35,
    borderRadius:10,
    justifyContent:'center',
  },
  addEventButtonText:{
    color:'white',
    textAlign:'center',    
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PopupComponent;
