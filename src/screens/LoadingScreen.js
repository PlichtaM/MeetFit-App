import React from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../components/Colors';

function LoadingScreen() {
  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.text}>MeetFit</Text>
      </View>
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.text} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 113, 
    height: 165,
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
