import React, { useState, useEffect, useLayoutEffect } from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getUser } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import FooterStyles from "../styles/FooterStyles";
import { getColorScheme } from "../components/Colors";
const colors = getColorScheme();

import Map from "../screens/Map";
import User from "../screens/User";
import Settings from "../screens/Settings";
import FunFacts from "../screens/FunFacts";
import Ranking from "../screens/Ranking";
import Calendar from "../screens/Calendar";
import Event from "../screens/Event";
import EventAdd from "../screens/EventAdd";
import EventEdit from "../screens/EventEdit";
import Place from "../components/Place";
import OtherScreens from "../screens/OtherScreens"; //temp
import LoadingScreen from "../screens/Loading";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import CorrectChangedPasswordScreen from "../screens/CorrectChangedPasswordScreen ";
import VerifiedScreen from "../screens/VerifiedScreen";
import MyEvents from "../screens/myEvents";
import ConfirmMail from "../screens/ConfirmMail";
import ChatScreen from "../screens/ChatScreen"; 
import { navigationRef } from './RootNavigation';

export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const response = await getUser(userId);

        setTimeout(() => {
          if (response.status === 200) {
            setIsLoggedIn(true);
          } else {
            console.log("Invalid token or no token:", response);
          }
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.log("Error checking token:", error);
        setIsLoading(false);
      }
    };

    checkTokenValidity();
  }, []);

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
          options={{ title: "Create Event", ...headerOptions }}
        />
        <MapStack.Screen
          name="EventEdit"
          component={EventEdit}
          options={{ ...headerOptions }}
        />
        <MapStack.Screen
          name="ChatScreen" 
          component={ChatScreen}
          options={{ title: "Chat", ...headerOptions }}
        />
        <MapStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
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
        <UserStack.Screen
          name="Map"
          component={Map}
          options={{ title: "Map", ...headerOptions }}
        />
        <UserStack.Screen
          name="Calendar"
          component={Calendar}
          options={{ title: "Calendar", ...headerOptions }}
        />
        <UserStack.Screen
          name="Ranking"
          component={Ranking}
          options={{ title: "Ranking", ...headerOptions }}
        />
        <UserStack.Screen
          name="FunFacts"
          component={FunFacts}
          options={{ title: "Fun Facts", ...headerOptions }}
        />
        <UserStack.Screen
          name="Settings"
          component={Settings}
          options={{ title: "Settings", ...headerOptions }}
        />
        <UserStack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
        />
        <UserStack.Screen
          name="OtherScreens"
          component={OtherScreens}
          options={{ title: "Login Screens", ...headerOptions }}
        />
        <UserStack.Screen name="Loading" component={LoadingScreen} />
        <UserStack.Screen name="RegisterScreen" component={RegisterScreen} />
        <UserStack.Screen name="LoginScreen" component={LoginScreen} />
        <UserStack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <UserStack.Screen name="CorrectChangedPasswordScreen"
          component={CorrectChangedPasswordScreen}
        />
        <UserStack.Screen name="VerifiedScreen" component={VerifiedScreen} />
        <UserStack.Screen name="ConfirmMail" component={ConfirmMail} />
        <UserStack.Screen
          name="ChatScreen" 
          component={ChatScreen}
          options={{ title: "Chat", ...headerOptions }}
        />
      </UserStack.Navigator>
    );
  }

  const CalendarStack = createStackNavigator();
  function CalendarStackScreen() {
    return (
      <CalendarStack.Navigator>
        <CalendarStack.Screen
          name="Calendar"
          component={Calendar}
          options={{ ...headerOptions }}
        />
        <CalendarStack.Screen name="Event" component={Event} />
        <CalendarStack.Screen name="EventEdit" component={EventEdit} />
        <CalendarStack.Screen
          name="ChatScreen" 
          component={ChatScreen}
          options={{ title: "Chat", ...headerOptions }}
        />
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
        <Image
          source={require("../../assets/LogoIcon.png")}
          style={FooterStyles.MapIconStyle}
        />
      );
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
    headerShadowVisible: false,
  };

  const Tab = createBottomTabNavigator();
  const MainNavigator = () => {
    return (
      <Tab.Navigator
        initialRouteName="MapStackScreen"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            return getTabBarIcon(route.name, focused);
          },
          backgroundColor: colors.Background,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.secondary,
          tabBarLabel: () => null,
          tabBarStyle: { backgroundColor: colors.Background },
        })}
      >
        <Tab.Screen
          name="Settings"
          component={MyEvents}
          options={{ title: "My Events", ...headerOptions }}
        />
        <Tab.Screen
          name="Ranking"
          component={Ranking}
          options={{ title: "Ranking", ...headerOptions }}
        />
        <Tab.Screen
          name="MapStackScreen"
          component={MapStackScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="CalendarStackScreen"
          component={CalendarStackScreen}
          options={{ headerShown: false, ...headerOptions }}
        />
        <Tab.Screen
          name="UserStackScreen"
          component={UserStackScreen}
          options={{ headerShown: false, ...headerOptions }}
        />
      </Tab.Navigator>
    );
  };

  const LoginStack = createStackNavigator();
  function LoginStackScreen() {
    return (
      <LoginStack.Navigator screenOptions={{ headerShown: false }}>
        <LoginStack.Screen name="LoginScreen" component={LoginScreen} />
        <LoginStack.Screen name="RegisterScreen" component={RegisterScreen} />
        <LoginStack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <LoginStack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
        />
        <LoginStack.Screen
          name="CorrectChangedPasswordScreen"
          component={CorrectChangedPasswordScreen}
        />
        <LoginStack.Screen name="VerifiedScreen" component={VerifiedScreen} />
      </LoginStack.Navigator>
    );
  }

  const Stack = createStackNavigator();

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? "MainNavigator" : "LoginStackScreen"}
      >
        <Stack.Screen
          name="MainNavigator"
          component={MainNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginStackScreen"
          component={LoginStackScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
