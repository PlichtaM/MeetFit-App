import React from "react";
import { Image, View, Text,Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "./Colors";
import FooterStyles from "../styles/FooterStyles";

import Settings from "../screens/Settings";
import Ranking from "../screens/Ranking";
import Mapa from "../screens/Map";
import Calendar from "../screens/Calendar";
import User from "../screens/User";

const Tab = createBottomTabNavigator();

const Footer = () => {
  const getTabBarIcon = (routeName) => {
    let iconSource;
    let iconStyle = FooterStyles.Icon; 
  
    if (routeName === "Settings") {
      iconSource = require("../../assets/iconChat.png");
    } else if (routeName === "Ranking") {
      iconSource = require("../../assets/iconTrophy.png");
    } else if (routeName === "Mapa") {
      iconSource = require("../../assets/LogoIcon.png");
      iconStyle = FooterStyles.MapIconStyle; 
    } else if (routeName === "Calendar") {
      iconSource = require("../../assets/IconCalendar.png");
    } else if (routeName === "User") {
      iconSource = require("../../assets/iconFunFacts.png");
    }
  
    return <Image source={iconSource} style={iconStyle} />;
  };

  const headerOptions = {
    headerLeft: () => (
      <Pressable onPress={() => console.log('pressed')}>
        <Image style={{height: 25, marginLeft: 15}} source={require("../../assets/goBackArrow.png")}/>
      </Pressable>
    ),
    headerStyle: {
      backgroundColor: colors.primary,
    },
    headerTitleStyle: {
      fontWeight: "bold",
      color: "white",
      fontSize:30,
    },
    headerTitleAlign: 'center',
    headerTintColor: "white",
    
  };

  return (
    <View style={FooterStyles.container}>
      <Tab.Navigator
        initialRouteName="Mapa"
        screenOptions={({ route }) => ({
          tabBarIcon: ({}) => getTabBarIcon(route.name),
        })}
      >
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{ title: 'Ustawienia', ...headerOptions }}
        />
        <Tab.Screen
          name="Ranking"
          component={Ranking}
          options={{ title:  'Ranking', ...headerOptions }}
        />
        <Tab.Screen
          name="Mapa"
          component={Mapa}
          options={{headerShown: false }}
        />
        <Tab.Screen
          name="Calendar"
          component={Calendar}
          options={{ title: 'Kalendarz', ...headerOptions }}
        />
        <Tab.Screen
          name="User"
          component={User}
          options={{  ...headerOptions }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default Footer;
