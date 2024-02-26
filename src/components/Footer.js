import React from "react";
import { Image, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "./Colors";
import FooterStyles from "../styles/FooterStyles";

import MyEvents from "../screens/MyEvents";
import Settings from "../screens/Settings";
import Mapa from "../screens/Map";
import FunFacts from "../screens/FunFacts";
import User from "../screens/User";

const Tab = createBottomTabNavigator();

const Footer = () => {
  const getTabBarIcon = (routeName) => {
    let iconSource;
    let iconStyle = FooterStyles.Icon; 
  
    if (routeName === "MyEvents") {
      iconSource = require("../../assets/iconChat.png");
    } else if (routeName === "Settings") {
      iconSource = require("../../assets/iconTrophy.png");
    } else if (routeName === "Mapa") {
      iconSource = require("../../assets/LogoIcon.png");
      iconStyle = FooterStyles.MapIconStyle; 
    } else if (routeName === "User") {
      iconSource = require("../../assets/IconCalendar.png");
    } else if (routeName === "FunFacts") {
      iconSource = require("../../assets/iconFunFacts.png");
    }
  
    return <Image source={iconSource} style={iconStyle} />;
  };
  

  return (
    <View style={FooterStyles.container}>
        <Tab.Navigator
          initialRouteName="Mapa"
          screenOptions={({ route }) => ({
            tabBarIcon: ({}) => getTabBarIcon(route.name),
          })}
        >
          <Tab.Screen name="MyEvents" component={MyEvents} options={{ title: '' }} />
          <Tab.Screen name="Settings" component={Settings} options={{ title: '' }} />
          <Tab.Screen name="Mapa" component={Mapa} options={{ title: '' }} />
          <Tab.Screen name="User" component={User} options={{ title: '', headerStyle:{ backgroundColor:colors.primary }}} />
          <Tab.Screen name="FunFacts" component={FunFacts} options={{ title: '' }} />
        </Tab.Navigator>
    </View>
  );
};

export default Footer;
