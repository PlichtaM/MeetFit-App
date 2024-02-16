import React from 'react';
import { Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import FooterStyles from '../styles/FooterStyles';

import MyEvents from '../screens/MyEvents';
import Settings from '../screens/Settings';
import FunFacts from '../screens/FunFacts';
import User from '../screens/User';
import Events from '../screens/Events';

const Tab = createBottomTabNavigator();

const Footer = () => {
  const getTabBarIcon = (routeName) => {
    let iconSource;
    if (routeName === 'MyEvents') {
      iconSource = require('../../assets/favicon.png');
    } else if (routeName === 'Settings') {
      iconSource = require('../../assets/favicon.png');
    } else if (routeName === 'FunFacts') {
      iconSource = require('../../assets/favicon.png');
    } else if (routeName === 'User') {
      iconSource = require('../../assets/favicon.png');
    } else if (routeName === 'Events') {
      iconSource = require('../../assets/favicon.png');
    }

    return <Image source={iconSource} style={FooterStyles.Icon} />;
  };

  return (
    <View style={FooterStyles.container}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({}) => getTabBarIcon(route.name),
          })}
        >
          <Tab.Screen name="MyEvents" component={MyEvents} />
          <Tab.Screen name="Settings" component={Settings} />
          <Tab.Screen name="FunFacts" component={FunFacts} />
          <Tab.Screen name="User" component={User} />
          <Tab.Screen name="Events" component={Events} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Footer;
