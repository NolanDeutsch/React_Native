import React from 'react';
import styled from 'styled-components'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo } from '@expo/vector-icons'

import HomeScreen from './components/screens/HomeScreen'
import LiveScreen from './components/screens/LiveScreen'
import ProfileScreen from './components/screens/ProfileScreen'
import GameScreen from './components/screens/GameScreen'


export default function App() {
  const AppStack = createStackNavigator();
  const TabNav = createBottomTabNavigator();

  const tabBarOptions = {
    showLabel: false,
    style: {
      backgroundColor: "#343434",
      borderTopColor: "#343434",
      paddingBottom: 12,
    },
  };

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused }) => {
      let iconName = "";
      //const color = focused ? "#559dff" : "#828282"

      switch (route.name) {
        case "HomeScreen":
          iconName = "home";
          break;

        case "LiveScreen":
          iconName = "game-controller";
          break;

        case "ProfileScreen":
          iconName = "user";
          break;

        default:
          iconName = "home";
          break;
      }
      return (
        <TabBarIconContainer focused={focused}>
          <Entypo name={iconName} size={24} color="#ffffff" />
        </TabBarIconContainer>
      );
    },
  })

  const TabNavScreen = () => {
    return (
      <TabNav.Navigator tabBarOptions={tabBarOptions} screenOptions={screenOptions}>
        <TabNav.Screen name="HomeScreen" component={HomeScreen} />
        <TabNav.Screen name="LiveScreen" component={LiveScreen} />
        <TabNav.Screen name="ProfileScreen" component={ProfileScreen} />
      </TabNav.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <AppStack.Navigator mode="modal" headerMode="none">
        <AppStack.Screen name="App" component={TabNavScreen} />
        <AppStack.Screen name="GameScreen" component={GameScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

const TabBarIconContainer = styled.View`
  background-color: ${(props) => (props.focused ? "#819ee5" : "#343434")};
  padding: 2px 16px;
  border-radius: 32px;
`;