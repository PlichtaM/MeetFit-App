import React, { useEffect, useRef } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { markers } from '../map/markers';

const INITIAL_REGION = {
	latitude: 52.4,
	longitude: 16.92,
	latitudeDelta: 0.2,
	longitudeDelta: 0.2
};

function Mapa() {
  const navigation = useNavigation();
  const mapRef = useRef<MapView>(null);  
  const onMarkerSelected = (marker: any) => {
		Alert.alert(
      'Szczegóły Wydarzenia',
      `Wydarzenie: ${marker.name}\nDodatkowe informacje`, 
    )
	};

	const calloutPressed = (ev: any) => {
		console.log(ev);
	};

  return (    
    <View style={{ flex: 1 }}>
			<MapView
				style={StyleSheet.absoluteFillObject}
				initialRegion={INITIAL_REGION}
				showsUserLocation
				showsMyLocationButton
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
		</View>
  );
}

export default Mapa;
