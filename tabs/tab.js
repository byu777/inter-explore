import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screens/Profile";
import MessageBoardPage from "../screens/messageboard";
import Chatroom from "../screens/chatroom";
import LandingPage from "../screens/landing_page";
import Admin from "../screens/admin";

import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

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

const Tabs = () => {
  return (
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          style: {
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: "#ffffff",
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
            tabBarIcon: ({ focused }) => (
              <View>
                <Image
                  source={require("../assets/navbar/baseline_home_black_24dp.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#e32f45" : "#748c94",
                    alignSelf: 'center',
                  }}
                />
                <Text style={{
                    color: focused ? "#e32f45" : "#748c94",
                    fontSize: 12,
                  }}>
                  Home
                </Text>
              </View>
            ), 
            // tabBarButton: (props) => (
            //   <CustomTabBarButtons {...props} />
            // )
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <Image
                  source={require("../assets/navbar/baseline_home_black_24dp.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#e32f45" : "#748c94",
                    alignSelf: 'center',
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#e32f45" : "#748c94",
                    fontSize: 12,
                  }}
                >
                  Profile
                </Text>
              </View>
            ),
            // tabBarButton: (props) => (
            //   <CustomTabBarButtons {...props} />
            // )
          }}
        />
        <Tab.Screen
          name="Admin and User Management"
          component={Admin}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <Image
                  source={require("../assets/navbar/baseline_home_black_24dp.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#e32f45" : "#748c94",
                    alignSelf: 'center',
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#e32f45" : "#748c94",
                    fontSize: 12,
                  }}
                >
                  Admin
                </Text>
              </View>
            ), 
            // tabBarButton: (props) => (
            //   <CustomTabBarButtons {...props} />
            // )
          }}
        />

        <Tab.Screen
          name="Chatrooms"
          component={Chatroom}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <Image
                  source={require("../assets/navbar/baseline_home_black_24dp.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#e32f45" : "#748c94",
                    alignSelf: 'center',
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#e32f45" : "#748c94",
                    fontSize: 12,
                  }}
                >
                  Chat
                </Text>
              </View>
            ), 
            // tabBarButton: (props) => (
            //   <CustomTabBarButtons {...props} />
            // )
          }}
        />

        <Tab.Screen
          name="Event"
          component={MakeEventPage}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <Image
                  source={require("../assets/navbar/baseline_home_black_24dp.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#e32f45" : "#748c94",
                    alignSelf: 'center',
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#e32f45" : "#748c94",
                    fontSize: 12,
                  }}
                >
                  Event
                </Text>
              </View>
            ), 
            // tabBarButton: (props) => (
            //   <CustomTabBarButtons {...props} />
            // )
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
