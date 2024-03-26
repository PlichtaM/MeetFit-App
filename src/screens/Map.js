import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Place from '../components/Place';
import { getMapPoint, updateEvent } from '../../services/api';
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

  const onMarkerSelected = (markerId) => {
    setSelectedMarkerId(markerId);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };
  const searchEvents = () => {};

  return (
    <View style={styles.container}>
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
                latitude: item.geometry.location.lat,
                longitude: item.geometry.location.lng,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  searchBox: {
    position: "absolute",
    width: "90%",
    borderRadius: 20,
    borderColor: "#aaa",
    backgroundColor: "white",
    padding: 8,
    alignSelf: "center",
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center",
  },
  searchIcon: {
    marginRight: 8,
  },

  searchBoxField: {
    flex: 1,
    borderRadius: 4,
    backgroundColor: "grey",
    width: '80%',
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 18,
    marginBottom: 8,

  },
  categoryBox:{
    position: "absolute",
    marginTop: 130,
    marginLeft:'10%',
    flexDirection: 'row',
    alignItems: 'center',
    gap:10,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    backgroundColor: "#26f",
    borderRadius: 50,

  },
  buttonLabel: {
    fontSize: 18,
    color: "white",
  },
  mapLabel: {},
});