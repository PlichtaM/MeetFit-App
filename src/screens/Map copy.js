import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Place from '../components/Place';
import { getMapPoint, updateEvent } from '../../services/api';
import mapstyle from '../styles/mapstyle.json';

const INITIAL_REGION = {
  latitude: 52.4,
  longitude: 16.92,
  latitudeDelta: 0.2,
  longitudeDelta: 0.2,
};

function Map({navigation}) {
  const [markers, setMarkers] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);

  useEffect(() => {
    // Fetch map points from the API
    const fetchMapPoints = async () => {
      try {
        const response = await getMapPoint();
        setMarkers(response.data);
      } catch (error) {
        console.error('Error fetching map points:', error);
      }
    };

    fetchMapPoints();
  }, []);

  const onMarkerSelected = (markerId) => {
    setSelectedMarkerId(markerId);
    setPopupVisible(true);
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
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            onPress={() => onMarkerSelected(marker.id)}
          />
        ))}
      </MapView>
      <Place isVisible={popupVisible} onClose={closePopup} selectedMarkerId={selectedMarkerId} />
    </View>
  );
}

export default Map;