import React from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { getColorScheme  } from "../components/Colors";
const colors = getColorScheme()

function LoadingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.text}>MeetFit</Text>
      </View>
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.text} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.Background
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 113, 
    height: 165,
    tintColor:colors.primary,
  },
  text: {
    fontSize: 64,
    color: colors.text,
    marginTop: 16, 
  },
  loader: {
    marginBottom: 80,
  },
});

export default LoadingScreen;
