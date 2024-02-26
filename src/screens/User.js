import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import UserStyles from "../styles/UserStyles";

function User({navigation}) {
  return (
    <View>
      <View style={UserStyles.container}>
        <View style={UserStyles.top}></View>
        <View style={UserStyles.UserIcon}></View>
        <View style={UserStyles.UserNameContainer}>
          <Text style={UserStyles.UserName}>Adam Nowak</Text>
          <Text>kroki</Text>
          <Text style={UserStyles.StepsNumber}>2566/5000</Text>
        </View>
        <View style={UserStyles.MenuContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Moje Wydarzenia')} style={UserStyles.UserButton}>
            <Image style={UserStyles.ButtonImage} source={require("../../assets/iconChat.png")}/> 
            <Text style={UserStyles.buttonText}>Moje Wydarzenia</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Moje Wydarzenia')} style={UserStyles.UserButton}>
            <Image style={UserStyles.ButtonImage} source={require("../../assets/iconMap.png")}/> 
            <Text style={UserStyles.buttonText}>Moje Wydarzenia</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Moje Wydarzenia')} style={UserStyles.UserButton}>
            <Image style={UserStyles.ButtonImage} source={require("../../assets/IconCalendar.png")}/> 
            <Text style={UserStyles.buttonText}>Moje Wydarzenia</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Moje Wydarzenia')} style={UserStyles.UserButton}>
            <Image style={UserStyles.ButtonImage} source={require("../../assets/iconTrophy.png")}/> 
            <Text style={UserStyles.buttonText}>Moje Wydarzenia</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Ciekawostki')} style={UserStyles.UserButton}>
            <Image style={UserStyles.ButtonImage} source={require("../../assets/iconFunFacts.png")}/> 
            <Text style={UserStyles.buttonText}>Ciekawostki</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default User;
