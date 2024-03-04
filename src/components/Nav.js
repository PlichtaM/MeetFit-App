import React from "react";
import { Image, View, Pressable } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppProvider } from "../../AppContext";
import { Entypo, MaterialCommunityIcons, MaterialIcons, FontAwesome  } from '@expo/vector-icons';

import FooterStyles from "../styles/FooterStyles";
import { colors } from "../components/Colors";

import MyEvents from "../screens/MyEvents";
import Map from "../screens/Map";
import User from "../screens/User";
import Events from "../screens/Events";
import Settings from "../screens/Settings";
import FunFacts from "../screens/FunFacts";
import Ranking from "../screens/Ranking";
import Calendar from "../screens/Calendar";
import Event from "../screens/Event";
import EventAdd from "../screens/EventAdd";
import EventEdit from "../screens/EventEdit";
import Place from "../components/Place";

import OtherScreens from "../screens/OtherScreens";

const Tab = createBottomTabNavigator();
export default function Nav() {
  const headerOptions = {
    headerStyle: {
      backgroundColor: colors.primary,
    },
    headerTitleStyle: {
      fontWeight: "bold",
      color: "white",
      fontSize: 30,
    },
    headerTitleAlign: "center",
    headerTintColor: "white",
  };

  const MapStack = createStackNavigator();
  function MapStackScreen() {
    return (
      <MapStack.Navigator>
        <MapStack.Screen
          name="Map"
          component={Map}
          options={{ headerShown: false }}
        />
        <MapStack.Screen name="Place" component={Place} />
        <MapStack.Screen name="Event" component={Event} />
        <MapStack.Screen
          name="EventAdd"
          component={EventAdd}
          options={{ title: "Utwórz wydarzenie", ...headerOptions }}
        />
        <MapStack.Screen
          name="EventEdit"
          component={EventEdit}
          options={{ ...headerOptions }}
        />
      </MapStack.Navigator>
    );
  }

  const UserStack = createStackNavigator();
  function UserStackScreen() {
    return (
      <UserStack.Navigator>
        <UserStack.Screen
          name="User"
          component={User}
          options={{ ...headerOptions }}
        />
        <UserStack.Screen name="Events" component={Events} />
        <UserStack.Screen name="Map" component={Map} />
        <UserStack.Screen name="Calendar" component={Calendar} />
        <UserStack.Screen name="Ranking" component={Ranking} />
        <UserStack.Screen name="FunFacts" component={FunFacts} />
        <UserStack.Screen name="OtherScreens" component={OtherScreens} />
        <UserStack.Screen name="Settings" component={Settings} />
      </UserStack.Navigator>
    );
  }
  const CalendarStack = createStackNavigator();
  function CalendarStackScreen() {
    return (
      <CalendarStack.Navigator>
        <CalendarStack.Screen
          name="Kalendarz"
          component={Calendar}
          options={{ ...headerOptions }}
        />
        <CalendarStack.Screen name="Event" component={Event} />
        <CalendarStack.Screen name="EventEdit" component={EventEdit} />
      </CalendarStack.Navigator>
    );
  }

  const getTabBarIcon = (routeName, focused) => {
    let iconComponent;
    let iconStyle = FooterStyles.Icon;
  
    if (routeName === "Settings") {
      iconComponent = (
        <MaterialIcons
          name="chat"
          size={26}
          color={focused ? colors.primary : colors.secondary}
          style={iconStyle}
        />
      );
    } else if (routeName === "Ranking") {
      iconComponent = (
        <MaterialCommunityIcons
          name="trophy"
          size={26}
          color={focused ? colors.primary : colors.secondary}
          style={iconStyle}
        />
      );
    } else if (routeName === "MapStackScreen") {
      iconComponent = (
        <Image  source={require("../../assets/LogoIcon.png")} style={FooterStyles.MapIconStyle} /> );
    } else if (routeName === "CalendarStackScreen") {
      iconComponent = (
        <MaterialCommunityIcons
          name="calendar-multiselect"
          size={26}
          color={focused ? colors.primary : colors.secondary}
          style={iconStyle}
        />
      );
    } else if (routeName === "UserStackScreen") {
      iconComponent = (
        <FontAwesome
          name="user"
          size={26}
          color={focused ? colors.primary : colors.secondary}
          style={iconStyle}
        />
      );
    }
  
    return iconComponent;
  };


  const MyTheme = {
    dark: false,
    colors: {
      primary: "rgb(255, 45, 85)",
      background: "rgb(242, 242, 242)",
      card: "rgb(255, 255, 255)",
      text: "rgb(28, 28, 30)",
      border: "rgb(199, 199, 204)",
      notification: "rgb(255, 69, 58)",
      secondary: "#466EFC",
      disabled: "#f1f1f1",
      text: "#000",
      buttonBackground: "#fff",
      buttonBorder: "#000",
    },
  };

  return (
    <AppProvider>
    <View style={{ flex: 1 }}>
      <NavigationContainer theme={MyTheme}>
        <Tab.Navigator
         initialRouteName="MapStackScreen"
         screenOptions={({ route }) => ({
           tabBarIcon: ({ focused, color, size }) => {
             return getTabBarIcon(route.name, focused);
           },
           tabBarActiveTintColor: colors.primary,
           tabBarInactiveTintColor: colors.secondary,
           tabBarLabel: () => null, // Usunięcie napisu pod ikoną
         })}
        >
          <Tab.Screen
            name="Settings" component={Settings}
            options={{ title: "Ustawienia", ...headerOptions }}
            
          />
          <Tab.Screen
            name="Ranking" component={Ranking}
            options={{ title: "Ranking", ...headerOptions }}
          />
          <Tab.Screen
            name="MapStackScreen" component={MapStackScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="CalendarStackScreen" component={CalendarStackScreen}
            options={{ headerShown: false, ...headerOptions }}
          />
          <Tab.Screen
            name="UserStackScreen" component={UserStackScreen}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
    </AppProvider>
  );
}
