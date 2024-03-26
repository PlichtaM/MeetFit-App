import React, { useState, useEffect, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Entypo, MaterialCommunityIcons  } from "@expo/vector-icons";
import {GOOGLE_API_KEY} from '../../env';

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUTE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUTE_DELTA * ASPECT_RATIO;
const INITIAL_LAT = 52.4;
const INITIAL_LNG = 16.92;
const INITIAL_POSITION = {
  latitude: INITIAL_LAT,
  longitude: INITIAL_LNG,
  latitudeDelta: LATITUTE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const map = useRef(null);

  const searchPlacesByType = async (placeType) => {
    const googleApisUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json";
    const location = `${INITIAL_LAT},${INITIAL_LNG}&radius=2000`; // Możesz dostosować promień wyszukiwania
    const url = `${googleApisUrl}?query=${placeType}&location=${location}&key=${GOOGLE_API_KEY}`;

    try {
      const resp = await fetch(url);
      const json = await resp.json();
      const coords = [];
      if (json && json.results) {
        for (const item of json.results) {
          coords.push({
            latitude: item.geometry.location.lat,
            longitude: item.geometry.location.lng,
          });
        }
      }
      setResults(json.results); // Aktualizacja stanu z wynikami wyszukiwania
      if (coords.length) {
        map.current?.fitToCoordinates(coords, {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        });
        Keyboard.dismiss();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const searchPlaces = async () => {
    if (!searchText.trim().length) return;

    const googleApisUrl =
      "https://maps.googleapis.com/maps/api/place/textsearch/json";
    const input = searchText.trim();
    const location = `${INITIAL_LAT},${INITIAL_LNG}&radius=2000`;
    const url = `${googleApisUrl}?query=${input}&location=${location}&key=${GOOGLE_API_KEY}`;
    const coords = [];
    try {
      const resp = await fetch(url);
      const json = await resp.json();
      // console.log(json);
      if (json && json.results) {
        // console.log(item.geometry)
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
  return (
    <View style={styles.container}>
      <MapView
        ref={map}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
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
                />
              );
            })
          : null}
      </MapView>
      <View style={styles.searchBox}>
        <TouchableOpacity style={styles.searchIcon} onPress={searchPlaces}>
          <Entypo name="magnifying-glass" size={24} color="black" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchBoxField}
          onChangeText={setSearchText}
          autoCapitalize="sentences"
          placeholder="Wyszukaj miejsce po nazwie"
        />
        </View>
        <View style={styles.categoryBox}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => searchPlacesByType("gym")}>
        <MaterialCommunityIcons name="dumbbell" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => searchPlacesByType("healthy food")}>
        <MaterialCommunityIcons name="food-apple" size={24} color="black" />
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