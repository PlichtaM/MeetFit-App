import React, { useState, useEffect } from "react";
import { View } from 'react-native';
import { ThemeProvider } from './src/components/ThemeContext';
import Nav from './src/components/Nav';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import { navigationRef } from './src/components/RootNavigation';
import { api } from './services/api'; // Dodaj import do api.js

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      if (token) {
        setExpoPushToken(token);
        savePushTokenToSecureStore(token);
      }
    });

    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log("Notification received:", notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("Notification response received:", response);
      const { eventId } = response.notification.request.content.data;
      navigationRef.current?.navigate('ChatScreen', { eventId });
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const savePushTokenToSecureStore = async (token) => {
    try {
      const userId = await SecureStore.getItemAsync('userId');
      if (userId) {
        await SecureStore.setItemAsync(`expoPushToken-${userId}`, token);
        console.log(`Saved push token for user ${userId}`);
      }
    } catch (error) {
      console.error('Failed to save push token to secure store:', error);
    }
  };

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.expoProjectId,
      })).data;
      console.log("Push token:", token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  return (
    <ThemeProvider>
      <View style={{ flex: 1 }}>
        <Nav />
      </View>
    </ThemeProvider>
  );
}
