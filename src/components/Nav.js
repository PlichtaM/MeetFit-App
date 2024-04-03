import React, { useState, useEffect } from "react";
import { Image, View, useColorScheme, ActivityIndicator } from "react-native";
import { NavigationContainer, DefaultTheme, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GetCountPeople } from "../../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { MaterialCommunityIcons, MaterialIcons, FontAwesome  } from '@expo/vector-icons';
import FooterStyles from "../styles/FooterStyles";
import { getColorScheme ,light, dark  } from "../components/Colors";
const colors = getColorScheme()

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
import OtherScreens from "../screens/OtherScreens"; //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import LoadingScreen from '../screens/Loading';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import CorrectChangedPasswordScreen from '../screens/CorrectChangedPasswordScreen ';
import VerifiedScreen from '../screens/VerifiedScreen';
import MyEvents from "../screens/myEvents";



export default function Nav() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {// sprawdzanie czy token jest wazny przez Request GetCountPeople
          const response = await GetCountPeople(token); 
          
          setIsLoggedIn(true);
          if (response.status='200') {
            //navigation.navigate('MapStackScreen');
            setIsLoggedIn(true);
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error while verifying token:", error);
        setIsLoading(false);
      }
    };

    checkTokenValidity();
  }, [AsyncStorage.getItem("token")]);
 
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
        <MapStack.Screen name="EventAdd" component={EventAdd}
          options={{ title: "Utwórz wydarzenie", ...headerOptions }}
        />
        <MapStack.Screen name="EventEdit" component={EventEdit}
          options={{ ...headerOptions }}
        />
        <MapStack.Screen name="Login" component={LoginScreen}
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
        <UserStack.Screen name="Map" component={Map}  options={{ title: "Mapa", ...headerOptions }}/>
        <UserStack.Screen name="Calendar" component={Calendar}  options={{ title: "Kalendarz", ...headerOptions }} />
        <UserStack.Screen name="Ranking" component={Ranking}  options={{ title: "Ranking", ...headerOptions }} />
        <UserStack.Screen name="FunFacts" component={FunFacts}  options={{ title: "Ciekawostki", ...headerOptions }}/>
        <UserStack.Screen name="Settings" component={Settings}  options={{ title: "Ustawienia", ...headerOptions }}/>

        
        <UserStack.Screen name="OtherScreens" component={OtherScreens}  options={{ title: "Ekrany Logowania", ...headerOptions }}/>
         <UserStack.Screen name='Loading' component={LoadingScreen}/>
         <UserStack.Screen name='RegisterScreen' component={RegisterScreen}/>
         <UserStack.Screen name='LoginScreen' component={LoginScreen}/>
         <UserStack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen}/>
         <UserStack.Screen name='ChangePasswordScreen' component={ChangePasswordScreen}/>
         <UserStack.Screen name='CorrectChangedPasswordScreen' component={CorrectChangedPasswordScreen}/>
         <UserStack.Screen name='VerifiedScreen' component={VerifiedScreen}/>
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
          color={focused ? colors.secondary : colors.primary}
          style={iconStyle}
        />
      );
    } else if (routeName === "Ranking") {
      iconComponent = (
        <MaterialCommunityIcons
          name="trophy"
          size={26}
          color={focused ? colors.secondary : colors.primary}
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
          color={focused ? colors.secondary : colors.primary}
          style={iconStyle}
        />
      );
    } else if (routeName === "UserStackScreen") {
      iconComponent = (
        <FontAwesome
          name="user"
          size={26}
          color={focused ? colors.secondary : colors.primary}
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
  };

  const Tab = createBottomTabNavigator();
  const MainNavigator =() =>{
    return (
      <Tab.Navigator
        initialRouteName={isLoggedIn ? "MapStackScreen" : "LoginScreen"}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            return getTabBarIcon(route.name, focused);
          },
          backgroundColor: colors.Background,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.secondary,
          tabBarLabel: () => null,
          tabBarStyle: { backgroundColor: colors.Background }
        })}
      >
        {isLoggedIn ? (
          <>
            <Tab.Screen
              name="Settings"
              component={Settings}
              options={{ title: "Ustawienia", ...headerOptions }}
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
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Tab.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
      </Tab.Navigator>
    );
  };

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <View style={{ flex: 1 }}>
    <MainNavigator />
    </View>
  );
}
