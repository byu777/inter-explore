import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions
} from "react-native";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Context as AuthContext } from "./../context/AuthContext";
import { useFonts } from "expo-font";

const Room = ({ title, icon_string, num_members, navigation }) => (
  <View style={mb_styles.row_container}>
    <Ionicons
      name={icon_string}
      size={70}
      color="#d62828"
      style={mb_styles.left_icon}
    ></Ionicons>
    <Text style={mb_styles.room_title}>{title}</Text>
    <TouchableOpacity
      onPress={() => navigation.navigate("Chatroom")}
      style={mb_styles.touchables_arrow}
    >
      <Ionicons name="arrow-forward" size={50} color="#d62828"></Ionicons>
    </TouchableOpacity>
  </View>
);

// --------------------------- Message Board page -----------------------------

export default function MessageBoardPage({ navigation }) {
  const { state } = useContext(AuthContext);

  //later, retrieve interests data from back-end
  const [interests, setInterests] = useState([
    {
      title: "BASKETBALL",
      num_members: "asd",
      icon_string: "basketball",
      key: 1,
    },
    {
      title: "FOOTBALL",
      num_members: "asd",
      icon_string: "american-football",
      key: 2,
    },
    { title: "BIKING", num_members: "asd", icon_string: "bicycle", key: 3 },
    {
      title: "BASEBALL",
      num_members: "asd",
      icon_string: "baseball-outline",
      key: 4,
    },
  ]);

  let [fontsLoaded] = useFonts({
    "Asap-Bold": require("../assets/fonts/Asap-Bold.ttf"),
    "Asap-Medium": require("../assets/fonts/Asap-Medium.ttf"),
    "Asap-Regular": require("../assets/fonts/Asap-Regular.ttf"),
    "Rajdhani-Bold": require("../assets/fonts/Rajdhani-Bold.ttf"),
    "Rajdhani-Light": require("../assets/fonts/Rajdhani-Light.ttf"),
    "Rajdhani-Medium": require("../assets/fonts/Rajdhani-Medium.ttf"),
    "Rajdhani-Regular": require("../assets/fonts/Rajdhani-Regular.ttf"),
    "Koulen-Regular": require("../assets/fonts/Koulen-Regular.ttf"),
    "Montserrat-Black": require("../assets/fonts/Montserrat-Black.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "SourceSansPro-Bold": require("../assets/fonts/SourceSansPro-Bold.ttf"),
    "SourceSansPro-Light": require("../assets/fonts/SourceSansPro-Light.ttf"),
  });

  const renderItem = ({ item }) => (
    <Room
      title={item.title}
      icon_string={item.icon_string}
      navigation={navigation}
    />
  );

  return (
    <SafeAreaView style={mb_styles.container}>
      <View style={mb_styles.top_section}>
        <Text style={mb_styles.welcome_title}>Welcome back, Justinssssss</Text>
      </View>

      <View style={mb_styles.notice}>
        <Text style={{color: '#03045e'}}>Here are your chats</Text>
      </View>

      <FlatList
        style={mb_styles.mb_chat_container}
        keyExtractor={(item) => item.key}
        data={interests}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

// ***------------------------------- STYLING ---------------------------------*********************

let fullWidth = Dimensions.get('window').width;

const mb_styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#90e0ef",
    flexDirection: "column",
  },
  top_section: {
    flexDirection: 'row',
    padding: 5,
    alignSelf: "center",
    width: fullWidth,
    color: 'white',
  },
  mb_chat_container: {
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1.5,
    height: 700,
    padding: 5,
  },
  list_item_description: {
    flexWrap: "wrap",
    justifyContent: "center",
    flexShrink: 1,
    flex: 4,
  },
  list_item_inbox: {
    flexDirection: "row",
    flex: 1,
    margin: 10,
    backgroundColor: "#e6b700",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 10,
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
    margin: 5,
    alignItems: "flex-start",
    fontFamily: "Asap-Regular",
    fontSize: 20,
  },
  row_container: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 5,
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: "center",
  },
  room_title: {
    flex: 4,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
    fontFamily: "Rajdhani-Regular",
    fontSize: 20,
    padding: 5,
    position: "relative",
    fontWeight: 'bold',
  },
  welcome_title: {
    fontSize: 40,
    flexWrap: "wrap",
    fontFamily: "Asap-Regular",
    color: '#03045e',
    fontWeight: 'bold',
  },
});

// export default MessageBoardPage;
