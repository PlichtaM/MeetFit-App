import React, { useLayoutEffect, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Pressable  } from "react-native";
import { getColorScheme  } from "../components/Colors";
const colors = getColorScheme()
import UserStyles from "../styles/UserStyles";
import tempuser from "../tempAPI/user.json"
import { Entypo, MaterialCommunityIcons, MaterialIcons  } from '@expo/vector-icons';
import * as Progress from 'react-native-progress'; //https://github.com/oblador/react-native-progress
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from "../../services/api";
import LoadingScreen from "./Loading";

function User({ navigation }) {
  const [user, setUser] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        //dane z AsyncStorage - dostepne po zalogowaniu
        const token = await AsyncStorage.getItem('token');
        const userName = await AsyncStorage.getItem('userName');
        const userId = await AsyncStorage.getItem('userId');
        const tempId = "5fdd66f8-797e-4a0c-9285-83e3fde4cfdb";
        //dane z api
        const response = await getUser(tempId);//ZMIENIC POZNIEJ TEMP ID
        setUser(response.data);
        //console.log("response: ",response.data);
  
      } catch (error) {
        console.error('Błąd odczytu danych:', error);
      }
    };
  
    fetchData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title:  'MeetFit',
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate('Settings')}>
          <MaterialIcons name="settings" size={28}  color="white" style={{height: 25, marginRight: 15}} />
        </Pressable>
      ),
      headerTitleAlign: 'center',
      headerTintColor: "white",
    });
  }, [navigation]);
  const tempUserData = tempuser[0];
  //const progress = (tempUserData.liczba_kroków / user.cel_kroków) * 100;
  // https://docs.expo.dev/versions/latest/sdk/pedometer/
  
 const progress = user ? (user.stepsCount / user.stepsGoal) * 100 : 0;

  if (!user) {
    return (
      <LoadingScreen/>
    );
  }

  return (
      <View style={UserStyles.container}>
        <View style={UserStyles.top}></View>
        <Image style={UserStyles.UserIcon} source={{uri: tempUserData.zdjecie_profilowe}}/>
        <View style={UserStyles.UserNameContainer}>
          <Text style={UserStyles.UserName}>{`${user.userName}`}</Text>
          {/*<Icon name="footsteps" size={24} color={colors.primary} />*/}
          <MaterialCommunityIcons name="foot-print" size={30} color={colors.primary}  style={UserStyles.stepIcon} />
          {/*<Image style={UserStyles.stepIcon} source={require("../../assets/iconFunFacts.png")}/>  */}          
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
          <TouchableOpacity onPress={() => navigation.navigate('Map')} style={UserStyles.UserButton}>
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
        </View>
      </View>
  );
}

export default User;
