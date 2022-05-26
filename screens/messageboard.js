import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Context as AuthContext } from "./../context/AuthContext";

// fonts
import Apploading from "expo-app-loading";
import { useFonts } from "expo-font";
import { Asap_400Regular } from "@expo-google-fonts/asap";
import {
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { Rajdhani_400Regular } from "@expo-google-fonts/rajdhani";

const Room = ({ title, navigation, chat, img }) => (
  <View style={mb_styles.row_container}>
    <Ionicons
      name={img}
      size={55}
      color="#2323D1"
      style={mb_styles.left_icon}
    ></Ionicons>
    <Text style={mb_styles.room_title}>{title}</Text>
    <TouchableOpacity
      onPress={() => navigation.navigate("Chatroom", chat)}
      style={mb_styles.touchables_arrow}
      elevation={10}
    >
      <Ionicons name="arrow-forward" size={50} color="#2323D1"></Ionicons>
    </TouchableOpacity>
  </View>
);

// --------------------------- Message Board page -----------------------------

export default function MessageBoardPage({ navigation }) {
  const { state, signout } = useContext(AuthContext);
  const [name, setName] = useState("");

  {state.token == null ? navigation.navigate("Login") : null}

  function handleLogout() {
    {navigation.navigate("Login")}
    signout();
  }

  useEffect(() => {
    setName(state.user.firstName);
  }, []);

  let [fontsLoaded] = useFonts({
    Asap_400Regular,
    Montserrat_400Regular,
    Montserrat_700Bold,
    Rajdhani_400Regular,
  });

  const renderItem = ({ item }) => (
    <Room
      title={item.InterestName}
      navigation={navigation}
      chat={item}
      img={item.icon_string}
    />
  );

  if (!fontsLoaded) {
    return <Apploading />;
  }

  return (
    <SafeAreaView style={mb_styles.container}>
      <View style={mb_styles.top_section}>
        <Text style={mb_styles.welcome_title}>Welcome back, {name}</Text>
      </View>

      <View style={mb_styles.notice}>
        <Text style={{ color: "#8E8D91" }}>Chatrooms...</Text>
      </View>
      <FlatList
        justifyContent="center"
        style={mb_styles.mb_chat_container}
        keyExtractor={(item) => item.key}
        data={state.chatGroups}
        renderItem={renderItem}
      />
      <TouchableOpacity style={mb_styles.logutButton} onPress={() => handleLogout()} >
        <Text style={mb_styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ***------------------------------- STYLING ---------------------------------*********************

const mb_styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },
  top_section: {
    padding: 5,
    marginTop: 10,
    paddingBottom: 30,
    color: "white",
    textAlign: "center",
    fontFamily: "Asap_400Regular",
  },
  mb_chat_container: {
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 5,
    flexGrow: 0,
    padding: 10,
    margin: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 10,
  },
  left_icon: {
    flex: 2,
    marginLeft: 5,
  },
  touchables_arrow: {
    flex: 2,
    justifyContent: "flex-end",
    alignSelf: "center",
    left: 25,
  },
  notice: {
    marginLeft: 15,
    alignItems: "flex-start",
    fontFamily: "Asap_400Regular",
    fontSize: 20,
    color: "#C1C1C3",
  },
  row_container: {
    flexDirection: "row",
    backgroundColor: "#E6E6FB",
    borderRadius: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 15,
    marginBottom: 15,
    marginHorizontal: 10,
    textAlign: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 5,
  },
  room_title: {
    flex: 4,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
    fontFamily: "Rajdhani_400Regular",
    fontSize: 20,
    padding: 5,
    position: "relative",
    fontWeight: "bold",
  },
  welcome_title: {
    fontSize: 28,
    flexWrap: "wrap",
    fontFamily: "Montserrat_700Bold",
    color: "#1D0FB6",
    fontWeight: "bold",
    textAlign: "center",
  },
  logutButton: {
    padding: 15,
    backgroundColor: "#1D0FB6",
    justifyContent: 'center',
    borderRadius: 15,
    marginBottom: 5,
    height: 50,
    alignItems: 'center',
    width: "40%",
    alignSelf: 'center', 

  }, 
  logoutText: {
    color: '#ffffff',
    fontSize: 16
  }
});
