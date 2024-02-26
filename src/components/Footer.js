import React from "react";
import { Image, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
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
    if (routeName === "MyEvents") {
      iconSource = require("../../assets/iconChat.png");
    } else if (routeName === "Settings") {
      iconSource = require("../../assets/iconTrophy.png");
    } else if (routeName === "Mapa") {
      iconSource = require("../../assets/favicon.png");
    } else if (routeName === "User") {
      iconSource = require("../../assets/IconCalendar.png");
    } else if (routeName === "FunFacts") {
      iconSource = require("../../assets/iconFunFacts.png");
    }
    return <Image source={iconSource} style={FooterStyles.Icon} />;
  };

  return (
    <View style={FooterStyles.container}>
        <Tab.Navigator
          initialRouteName="Mapa"
          screenOptions={({ route }) => ({
            tabBarIcon: ({}) => getTabBarIcon(route.name),
          })}
        >
          <Tab.Screen name="MyEvents" component={MyEvents} />
          <Tab.Screen name="Settings" component={Settings} />
          <Tab.Screen name="Mapa" component={Mapa} />
          <Tab.Screen name="User" component={User} />
          <Tab.Screen name="FunFacts" component={FunFacts} />
        </Tab.Navigator>
    </View>
  );
};

export default Footer;
