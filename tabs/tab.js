import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screens/Profile";
import MessageBoardPage from "../screens/messageboard";
import Chatroom from "../screens/chatroom";
import LandingPage from "../screens/landing_page";
import MakeEventPage from "../screens/create_event";
import EventList from "../screens/event_list";
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditProfile from "../screens/EditProfile";

import { StyleSheet, Text, View, Image } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack } from "react-bootstrap";

const Tab = createBottomTabNavigator();

// const CustomTabBarButtons = ({ children, onPress }) => (
//   <TouchableOpacity
//     style={{
//       top: -30,
//       justifyContent: "center",
//       alignItems: "center",
//       ...tabStyles.shadow,
//     }}
//     onPress={onPress}
//   >
//     <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: '#e32f45' }}>
//       {children}
//     </View>
//   </TouchableOpacity>
// );

const MessageToChatStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="Groups" component={MessageBoardPage} />
      <Stack.Screen name="Chats" component={Chatroom} />
    </Stack.Navigator>
  );
};

const Tabs = () => {
  return (
      <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: true,
        tabBarStyle: {backgroundColor: '#530127'},
        tabBarActiveTintColor: '#ece6dd',
        tabBarInactiveTintColor: '#db5f4d',
      }}
        id='our_tab'
        tabBarOptions={{
          showLabel: false,
          style: {
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: '#00bcd4',
            borderRadius: 15,
            height: 90,
            ...tabStyles.shadow,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={LandingPage}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ), 
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ), 
          }}
        />
        <Tab.Screen
          name="Groups"
          component={MessageBoardPage}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons name="account-group" color={color} size={size} />
            ), 
          }}
        />

        <Tab.Screen
          name="Chats"
          component={Chatroom}
          options={{
            tabBarBadge: 5,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name="md-chatbox-outline" color={color} size={size} />
            ), 
          }}
        />

        <Tab.Screen
          name="Event"
          component={EventList}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialIcons name="event" color={color} size={size} />
            ), 
          }}
        />
      </Tab.Navigator>
  );
};

const tabStyles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
