import React, { useState, useEffect, useRef } from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, Keyboard } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {GOOGLE_API_KEY} from '../../environments';

const {width, height} = Dimensions.get("window");

const ASPECT_RATIO= width / height;
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


  const searchPlaces = async () => {
    if (!searchText.trim().length) return;

    const googleApisUrl =
      "https://maps.googleapis.com/maps/api/place/textsearch/json";
    const input = searchText.trim();
    const location = `${INITIAL_LAT},${INITIAL_LNG}&radius=2000`;
    const url = `${googleApisUrl}?query=${input}&location=${location}&key=${GOOGLE_API_KEY}`;
    const coords = [];
    try {
      const resp =await fetch(url);
      const json = await resp.json();
      // console.log(json);
      if (json && json.results) {
        for (const item of json.results)
              // console.log(item.geometry)
            coords.push({
              latitude: item.geometry.location.lat,
              longitude: item.geometry.location.lng,
            })
      }
        setResults(json.results)
        if (coords.length) {
          map.current?.fitToCoordinates(coords, {
            edgePadding: {
              top: 50,
              right: 50,
              bottom: 50,
              left: 50
            },
            animated: true

          })
          Keyboard.dismiss()
        }
    } catch (e) {
      console.error(e)
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
        {results.length ? results.map((item, i) => {
          const coord = {
            latitude: item.geometry.location.lat,
            longitude: item.geometry.location.lng,
          };
          return (
          <Marker 
          key= {`search-item-${i}`} 
          coordinate={coord} 
          title={item.name} 
          description=""
          />
          );
        })
        : null}
      </MapView>
      <View style={styles.searchBox}>
        <Text style={styles.searchBoxLabel}>Szukaj miejsca</Text>
        <TextInput style={styles.searchBoxField} onChangeText={setSearchText} autoCapitalize='sentences'>

        </TextInput>
        <TouchableOpacity style={styles.buttonContainer} onPress = {searchPlaces}>
          <Text style={styles.buttonLabel}>Wyszukaj miejsce po nazwie</Text>
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
    width: '100%',
    height: '100%',
  },
  searchBox:{
    position: "absolute",
    width: "90%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#aaa",
    backgroundColor: "white",
    padding: 8,
    alignSelf: "center",
    marginTop: 60,
  },
  searchBoxField:{
    borderColor: "#777",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 18,
    marginBottom: 8,
  },
  buttonContainer:{
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    backgroundColor: "#26f",
    borderRadius: 8,
  },
  buttonLabel:{
    fontSize: 18,
    color: "white",
  },
});