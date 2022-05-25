import React, { useState, useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screens/Profile";
import MessageBoardPage from "../screens/messageboard";
import EventList from "../screens/event_list";
import Adminpage from "../screens/adminrequest";
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditProfile from "../screens/EditProfile";
import { StyleSheet, Text, View, Image } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Context as AuthContext } from './../context/AuthContext';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const {state} = useContext(AuthContext);
  let admin;
  if (typeof(state.user) != "undefined") {
    admin = state.user.isAdmin
  }
  return (
      <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: true,
        tabBarStyle: {backgroundColor: '#1D0FB6'},
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#9B92F6',
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
        id='our_tab'
      >
        <Tab.Screen
          name="Home"
          component={MessageBoardPage}
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
          name="Event"
          component={EventList}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialIcons name="event" color={color} size={size} />
            ), 
          }}
        />
        {state.user.isAdmin === true ?         
        <Tab.Screen
          name="Admin"
          component={Adminpage}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialIcons name="admin-panel-settings" color={color} size={size} />
            ), 
          }}
        />
        : null}
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
