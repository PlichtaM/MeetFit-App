import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Place from '../components/Place';
import { getMapPoint, updateEvent, getEvent } from '../../services/api';
import mapstyle from '../styles/mapstyle.json';
import Mapstyles from '../styles/mapStyles';
import { TextInput } from "react-native-gesture-handler";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { GOOGLE_API_KEY } from '../../env.js';
import { StyleSheet, View, TouchableOpacity, Keyboard } from "react-native";
import { getColorScheme } from "../components/Colors";
const colors = getColorScheme();


const INITIAL_REGION = {
  latitude: 52.4,
  longitude: 16.92,
  latitudeDelta: 0.2,
  longitudeDelta: 0.1,
};
const googleApisUrl ="https://maps.googleapis.com/maps/api/place/textsearch/json";
//dostosowac do zmiany lokalizacji na mapie
const location = `${INITIAL_REGION.latitude},${INITIAL_REGION.longitude}&radius=2000`;

function Map({navigation}) {
  const [markers, setMarkers] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const map = useRef(null);

  const searchGym = async () => {
    const gymInput = "gym";
    await search(gymInput);
  };
  const searchHealthyFood = async () => {
    const healthyFoodInput = "healthy food";
    await search(healthyFoodInput);
  };  
  const searchPlaces= async () => {
    await search(searchText);
  };

  const search = async (input) => {
    if (!input.trim().length) return;
    const url = `${googleApisUrl}?query=${input}&location=${location}&key=${GOOGLE_API_KEY}`;
    const coords = [];
    try {
      const resp = await fetch(url);
      const json = await resp.json();
      // console.log(json);
      if (json && json.results) {
        for (const item of json.results)
          coords.push({
            latitude: item.geometry.location.lat,
            longitude: item.geometry.location.lng,
          });
      }
      setResults(json.results);
      if (coords.length) {
        map.current?.fitToCoordinates(coords, {
          edgePadding: {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50,
          },
          animated: true,
        });
        Keyboard.dismiss();
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvent();
        setMarkers(response.data);
      } catch (error) {
        console.error('Error fetching map points:', error);
      }
    };
    fetchEvents();
  }, []);

  
  const searchEvents = async () => {
    const eventsWithMapPoints = markers.filter(marker => marker.mapPointGoogleId);
    
    const newResults = [];
  
    for (const event of eventsWithMapPoints) {
      try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${event.mapPointGoogleId}&fields=name,geometry&key=${GOOGLE_API_KEY}`;
        const response = await fetch(url);
        const json = await response.json();
    
        if (json.result && json.result.geometry && json.result.geometry.location) {
          const { lat, lng } = json.result.geometry.location;
    
          newResults.push({
            place_id: event.mapPointGoogleId,
            latitude: lat,
            longitude: lng,
            name: json.result.name, 
          });
        }
      } catch (error) {
        console.error('Error fetching map point:', error);
      }
    }
    setResults(newResults);
  };
  
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
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapstyle}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
      >
        {results.length
          ? results.map((item, i) => {
            const coord = {
              latitude: item.latitude ? item.latitude : item.geometry.location.lat ,
              longitude: item.longitude ? item.longitude: item.geometry.location.lng,
            };
              return (
                <Marker
                  key={`search-item-${i}`}
                  coordinate={coord}
                  title={item.name}
                  description=""
                  onPress={() => {onMarkerSelected(item.place_id);
                    console.log(item.place_id);}}
                />
              );
            })
          : null}
      </MapView>
      <Place isVisible={popupVisible} onClose={closePopup} selectedMarkerId={selectedMarkerId} />
      <View style={Mapstyles.searchBox}>
        <TouchableOpacity style={Mapstyles.searchIcon} onPress={searchPlaces}>
          <Entypo name="magnifying-glass" size={30} color={colors.Background} />
        </TouchableOpacity>
        <TextInput
          style={Mapstyles.searchBoxField}
          onChangeText={setSearchText}
          autoCapitalize="sentences"
          placeholder="Wyszukaj miejsce po nazwie"
        />
      </View>
      <View style={Mapstyles.categoryBox}>
        <TouchableOpacity style={Mapstyles.buttonContainer} onPress={searchGym}>
          <MaterialCommunityIcons name="dumbbell" size={30} color={colors.secondary} />
        </TouchableOpacity>
        <TouchableOpacity style={Mapstyles.buttonContainer} onPress={searchHealthyFood} >
          <MaterialCommunityIcons name="food-apple" size={30} color={colors.secondary}/>
        </TouchableOpacity>
        <TouchableOpacity style={Mapstyles.buttonContainer} onPress={searchEvents} >
          <MaterialCommunityIcons name="calendar-star" size={30} color={colors.secondary}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Map;
