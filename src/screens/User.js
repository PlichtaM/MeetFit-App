import React from "react";
import { View, Text, TouchableOpacity, Image ,ProgressBarAndroid, ProgressViewIOS } from "react-native";
import { colors } from "../components/Colors";
import UserStyles from "../styles/UserStyles";
import user from "../tempAPI/user.json"
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';



function User({navigation}) {
  const userData = user[0];
  const progress = (userData.liczba_kroków / userData.cel_kroków) * 100;
  
  return (
    <View>
      <View style={UserStyles.container}>
        <View style={UserStyles.top}></View>
        <Image style={UserStyles.UserIcon} source={{uri: userData.zdjecie_profilowe}}/>
        <View style={UserStyles.UserNameContainer}>
          <Text style={UserStyles.UserName}>{`${userData.imie} ${userData.Nazwisko}`}</Text>
          {/*<Icon name="footsteps" size={24} color={colors.primary} />*/}
          <Image style={UserStyles.stepIcon} source={require("../../assets/iconFunFacts.png")}/> 
           {Platform.OS === 'android' ? (
            <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={false}
              progress={progress / 100}
              style={{ width: '100%', marginTop: 10 }}
              color={colors.primary}
            />
          ) : (
            <ProgressViewIOS
              progress={progress / 100}
              style={{ width: '100%', marginTop: 10 }}
            />
          )}
          <Text style={UserStyles.StepsNumber}>{`${userData.liczba_kroków}/${userData.cel_kroków}`} </Text>
        </View>
        <View style={UserStyles.MenuContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Moje Wydarzenia')} style={UserStyles.UserButton}>
            <Image style={UserStyles.ButtonImage} source={require("../../assets/iconChat.png")}/> 
            <Text style={UserStyles.buttonText}>Moje Wydarzenia</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Mapa')} style={UserStyles.UserButton}>
            <Image style={UserStyles.ButtonImage} source={require("../../assets/iconMap.png")}/> 
            <Text style={UserStyles.buttonText}>Mapa z punktami</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Calendar')} style={UserStyles.UserButton}>
            <Image style={UserStyles.ButtonImage} source={require("../../assets/IconCalendar.png")}/> 
            <Text style={UserStyles.buttonText}>Kalendarz</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Ranking')} style={UserStyles.UserButton}>
            <Image style={UserStyles.ButtonImage} source={require("../../assets/iconTrophy.png")}/> 
            <Text style={UserStyles.buttonText}>Ranking</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Ciekawostki')} style={UserStyles.UserButton}>
            <Image style={UserStyles.ButtonImage} source={require("../../assets/iconFunFacts.png")}/> 
            <Text style={UserStyles.buttonText}>Ciekawostki</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OtherScreens')} style={UserStyles.UserButton}>
            <Image style={UserStyles.ButtonImage} source={require("../../assets/LogoIcon.png")}/> 
            <Text style={UserStyles.buttonText}>OtherScreens</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default User;
