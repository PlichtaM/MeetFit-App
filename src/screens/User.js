import React, { useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, Image, Pressable  } from "react-native";
import { colors } from "../components/Colors";
import UserStyles from "../styles/UserStyles";
import user from "../tempAPI/user.json"
//import Icon from 'react-native-vector-icons/Ionicons';
import { Entypo, MaterialCommunityIcons, MaterialIcons  } from '@expo/vector-icons';
import * as Progress from 'react-native-progress'; //https://github.com/oblador/react-native-progress


const CustomTitle = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15 }}>
    <Image source={require("../../assets/logo.png")} style={{ height: 33, width: 23 }} />
    <Text style={{ color: 'white', marginLeft: 8, fontSize: 20 }}>MeetFit</Text>
  </View>
);

function User({ navigation }) {
  useLayoutEffect(() => { 
    navigation.setOptions({
      //title: () => <CustomTitle />,     NIE DZIAŁA!!! 
      title:  'MeetFit',
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate('Settings')}>
          <MaterialIcons name="settings" size={28}  color="white" style={{height: 25, marginRight: 15}} />
          
          {/*<Image style={{height: 25, marginRight: 15}} source={require("../../assets/settingsIcon.png")}/>  */}
        </Pressable>
      ),
      headerTitleAlign: 'center',
      headerTintColor: "white",
    });
  }, [navigation]);

  const userData = user[0];
  const progress = (userData.liczba_kroków / userData.cel_kroków) * 100;
  
  return (
    <View >
      <View style={UserStyles.container}>
        <View style={UserStyles.top}></View>
        <Image style={UserStyles.UserIcon} source={{uri: userData.zdjecie_profilowe}}/>
        <View style={UserStyles.UserNameContainer}>
          <Text style={UserStyles.UserName}>{`${userData.imie} ${userData.Nazwisko}`}</Text>
          {/*<Icon name="footsteps" size={24} color={colors.primary} />*/}
          <MaterialCommunityIcons name="foot-print" size={30} color={colors.secondary}  style={UserStyles.stepIcon} />
          {/*<Image style={UserStyles.stepIcon} source={require("../../assets/iconFunFacts.png")}/>  */}          
            <Progress.Bar
              styleAttr="Horizontal"
              indeterminate={false}
              progress={progress / 100}
              style={{ width: '100%', marginTop: 10, borderRadius: 0, }}
              color={colors.primary}
              unfilledColor={colors.disabled}
              borderWidth={0}
            />          
          <Text style={UserStyles.StepsNumber}>{`${userData.liczba_kroków}/${userData.cel_kroków}`} </Text>
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
    </View>
  );
}

export default User;
