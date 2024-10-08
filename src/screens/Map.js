import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Place from '../components/Place';
import { getEvent } from '../../services/api';
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

function Map() {
  const [markers, setMarkers] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(INITIAL_REGION);
  const [selectedIcon, setSelectedIcon] = useState(require('../../assets/pin.png'));

  const map = useRef(null);
  const onRegionChangeComplete = (region) => {
    setCurrentRegion(region);
  };

  const searchGym = async () => {
    const gymInput = "gym";
    await search(gymInput, currentRegion);
    setSelectedIcon(require('../../assets/gymPin.png'));
  };
  const searchHealthyFood = async () => {
    const healthyFoodInput = "healthy food";
    await search(healthyFoodInput, currentRegion);
    setSelectedIcon(require('../../assets/foodPin.png'));
  };  
  const searchPlaces= async () => {
    await search(searchText, currentRegion);
    setSelectedIcon(require('../../assets/pin.png'));
  };

  const search = async (input, region) => {
    if (!input.trim().length) return;
    const { latitude, longitude } = region;
    const url = `${googleApisUrl}?query=${input}&location=${latitude},${longitude}&radius=2000&key=${GOOGLE_API_KEY}`;
    const coords = [];

      const resp = await fetch(url);
      const json = await resp.json();
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
  };

  useEffect(() => {
    const fetchEvents = async () => {
        const response = await getEvent();
        setMarkers(response.data);
    };
    fetchEvents();
  }, []);

  const searchEvents = async () => {
    const eventsWithMapPoints = markers.filter(marker => marker.mapPointGoogleId);    
    const newResults = [];

    for (const event of eventsWithMapPoints) {
      try{
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${event.mapPointGoogleId}&fields=name,geometry&key=${GOOGLE_API_KEY}`;
        const response = await fetch(url);
        const json = await response.json();
    
        if (json.result && json.result.geometry && json.result.geometry.location) {
          const { lat, lng } = json.result.geometry.location;
          setSelectedIcon(require('../../assets/meetPin.png'));
    
          newResults.push({
            place_id: event.mapPointGoogleId,
            latitude: lat,
            longitude: lng,
            name: json.result.name, 
          });
        }}catch{}
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
  
  useEffect(() => {
    if (markers.length > 0) {
      searchEvents(); 
    }
  }, [markers]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapstyle}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
        region={currentRegion}
        onRegionChangeComplete={onRegionChangeComplete}
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
                  onPress={() => {onMarkerSelected(item.place_id);}}
                  image={selectedIcon}
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
          cursorColor={colors.primary}
          onSubmitEditing={() => {
            searchPlaces();
            Keyboard.dismiss();
          }}
        />
      </View>
      <View style={Mapstyles.categoryBox}>
        <TouchableOpacity style={Mapstyles.buttonContainer} onPress={() => { searchGym() }}>
          <MaterialCommunityIcons name="dumbbell" size={30} color={colors.secondary} />
        </TouchableOpacity>
        <TouchableOpacity style={Mapstyles.buttonContainer} onPress={() => { searchHealthyFood() }} >
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
