import React, { useLayoutEffect, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Pressable, Platform } from "react-native";
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker from Expo
import { getColorScheme } from "../components/Colors";
const colors = getColorScheme();
import UserStyles from "../styles/UserStyles";
import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser, changeAvatar } from "../../services/api";
import LoadingScreen from "./Loading";

function User({ navigation }) {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const response = await getUser(userId);
        setUser(response.data);
      } catch (error) {
        console.error('Błąd odczytu danych:', error);
      }
    };

    fetchData();
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'MeetFit',
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate('Settings')}>
          <MaterialIcons name="settings" size={28} color="white" style={{ height: 25, marginRight: 15 }} />
        </Pressable>
      ),
      headerTitleAlign: 'center',
      headerTintColor: "white",
      headerShadowVisible: false,
    });
  }, [navigation, handleAvatarChange]);
  async function handleLogOut() {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('LoginStackScreen');
      console.log("Wylogowano");
      return true;
    } catch (error) {
      console.error('Error during logout:', error);
      return false;
    }
  }

  const handleAvatarChange = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Potrzebujemy dostępu do galerii, aby zmienić awatar!");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      const data = new FormData();
      data.append('file', {
        uri: pickerResult.uri,
        name: `user_avatar_${user.id}.jpg`,
        type: 'image/jpeg',
      });

      try {
        await changeAvatar(user.id, data);
        // Jeśli zmiana awatara powiodła się, odświeżamy dane użytkownika
        const response = await getUser(user.id);
        setUser(response.data);
      } catch (error) {
        console.error('Błąd podczas zmiany awatara:', error);
      }
    }
  };

  if (!user) {
    return (
      <LoadingScreen />
    );
  }

  const pictureUrl = "https://meetfitapp.pl" + (user.profilePictureUrl);
  const progress = user ? (user.stepsCount / user.stepsGoal) * 100 : 0;

  return (
    <View style={UserStyles.container}>
      <View style={UserStyles.top}/>
      <TouchableOpacity onPress={handleAvatarChange} style={UserStyles.UserIcon}>
        <Image style={UserStyles.UserIcon} source={{ uri: pictureUrl }} />
      </TouchableOpacity>
      <View style={UserStyles.UserNameContainer}>
        <Text style={UserStyles.UserName}>{`${user.userName}`}</Text>
        <MaterialCommunityIcons name="foot-print" size={30} color={colors.primary} style={UserStyles.stepIcon} />
        <Progress.Bar
          styleAttr="Horizontal"
          indeterminate={false}
          progress={progress / 100}
          style={{ width: 150, marginTop: 10, borderRadius: 0, }}
          color={colors.primary}
          unfilledColor={colors.disabled}
          borderWidth={0}
        />
       <Text style={UserStyles.StepsNumber}>{`${user.stepsCount }/${ user.stepsGoal}`} </Text>
        </View>
        <View style={UserStyles.MenuContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Calendar')} style={UserStyles.UserButton}>
          <Entypo name="chat" size={26} color={colors.secondary} style={UserStyles.ButtonImage} /> 
            <Text style={UserStyles.buttonText}>Moje Wydarzenia</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MapStackScreen')} style={UserStyles.UserButton}>
          <MaterialCommunityIcons name="map" size={26} color={colors.secondary}  style={UserStyles.ButtonImage} />
            <Text style={UserStyles.buttonText}>Mapa z punktami</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Calendar')} style={UserStyles.UserButton}>
          <MaterialCommunityIcons name="calendar-multiselect" size={26} color={colors.secondary}  style={UserStyles.ButtonImage} />
            <Text style={UserStyles.buttonText}>Kalendarz</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Ranking')} style={UserStyles.UserButton}>
          <MaterialCommunityIcons name="trophy" size={26} color={colors.secondary}  style={UserStyles.ButtonImage} />
            <Text style={UserStyles.buttonText}>Ranking</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('FunFacts')} style={UserStyles.UserButton}>
          <MaterialCommunityIcons name="head-question" size={26} color={colors.secondary}  style={UserStyles.ButtonImage} />
            <Text style={UserStyles.buttonText}>Ciekawostki</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OtherScreens')} style={UserStyles.UserButton}>
          <MaterialCommunityIcons name="account-alert" size={26} color={colors.secondary}  style={UserStyles.ButtonImage} />
            <Text style={UserStyles.buttonText}>OtherScreens</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogOut} style={UserStyles.UserButton}>
          <MaterialCommunityIcons name="logout" size={26} color={colors.secondary}  style={UserStyles.ButtonImage} />
            <Text style={UserStyles.buttonText}>Wyloguj</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
}

export default User;
