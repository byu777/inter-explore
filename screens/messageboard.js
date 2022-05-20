import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Context as AuthContext } from "./../context/AuthContext";
import { useFonts } from "expo-font";

const Room = ({ title, navigation, chat }) => (
  <View style={mb_styles.row_container}>
    <Ionicons
      name={"basketball"}
      size={70}
      color="#d62828"
      style={mb_styles.left_icon}
    ></Ionicons>
    <Text style={mb_styles.room_title}>{title}</Text>
    <TouchableOpacity
      onPress={() => navigation.navigate("Chatroom", chat)}
      style={mb_styles.touchables_arrow}
    >
      <Ionicons name="arrow-forward" size={50} color="#d62828"></Ionicons>
    </TouchableOpacity>
  </View>
);

// --------------------------- Message Board page -----------------------------

export default function MessageBoardPage({ navigation }) {
  const { state } = useContext(AuthContext);
  const [name, setName] = useState("");

  useEffect(() => {
    setName(state.user.firstName);
  }, []);

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
    <Room title={item.InterestName} navigation={navigation} chat={item} />
  );

  return (
    <SafeAreaView style={mb_styles.container}>
      <View style={mb_styles.top_section}>
        <Text style={mb_styles.welcome_title}>Welcome back, {name}</Text>
      </View>

      <View style={mb_styles.notice}>
        <Text style={{ color: "#03045e" }}>Here are your chats</Text>
      </View>
      <FlatList
        style={mb_styles.mb_chat_container}
        keyExtractor={(item) => item.key}
        data={state.chatGroups}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

// ***------------------------------- STYLING ---------------------------------*********************

let fullWidth = Dimensions.get("window").width;

const mb_styles = StyleSheet.create({
  background: {
    backgroundColor: "#ece6dd",
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#90e0ef",
    flexDirection: "column",
  },
  top_section: {
    flexDirection: "row",
    padding: 5,
    alignSelf: "center",
    width: fullWidth,
    color: "white",
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
    //fontFamily: "Asap-Regular",
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
    fontWeight: "bold",
  },
  welcome_title: {
    fontSize: 40,
    flexWrap: "wrap",
    //fontFamily: "Asap-Regular",
    color: "#03045e",
    fontWeight: "bold",
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 2,
    width: "40%",
    alignSelf: "center",
  },
  appButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});

// export default MessageBoardPage;
