import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, Alert } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import PopupComponent from '../components/MapEvent';
import { markers } from '../map/markers';

const INITIAL_REGION = {
  latitude: 52.4,
  longitude: 16.92,
  latitudeDelta: 0.2,
  longitudeDelta: 0.2,
};

function Mapa() {
  const navigation = useNavigation();
  const [popupVisible, setPopupVisible] = useState(false);

  const onMarkerSelected = (marker: any) => {
    setPopupVisible(true);
    //Alert.alert('Szczegóły Wydarzenia', `Wydarzenie: ${marker.name}\nDodatkowe informacje`);
  };

  const calloutPressed = () => {
    // Handle callout press if needed
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
        // customMapStyle={mapstyle} // Uncomment if needed
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            title={marker.name}
            coordinate={marker}
            onPress={() => onMarkerSelected(marker)}
          >
            <Callout onPress={calloutPressed}>
              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 24 }}>{marker.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <PopupComponent isVisible={popupVisible} onClose={closePopup} />
    </View>
  );
}

export default Mapa;
