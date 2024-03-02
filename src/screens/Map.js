import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, Alert } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';//https://github.com/react-native-maps/react-native-maps?tab=readme-ov-file
import { useNavigation } from '@react-navigation/native';
import Place from '../components/Place';
import { markers } from '../tempAPI/markers';
import mapstyle from '../styles/mapstyle.json' //https://mapstyle.withgoogle.com/


const INITIAL_REGION = {
  latitude: 52.4,
  longitude: 16.92,
  latitudeDelta: 0.2,
  longitudeDelta: 0.2,
};

function Mapa() {
  const navigation = useNavigation();
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedMarkerName, setSelectedMarkerName] = useState(null);


  const onMarkerSelected = (markerName) => {
    setSelectedMarkerName(markerName);
    setPopupVisible(true)
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
        provider={PROVIDER_GOOGLE}
         customMapStyle={mapstyle}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker}
            onPress={() => onMarkerSelected(marker.name)}
          >            
          </Marker>
        ))}
      </MapView>
      <Place isVisible={popupVisible} onClose={closePopup} selectedMarkerName={selectedMarkerName} />
    </View>
  );
}

export default Mapa;
