import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";

import { Context as AuthContext } from "./../context/AuthContext";

import { Ionicons } from "@expo/vector-icons";

// --------------------------- Message Board page -----------------------------

export default function MessageBoardPage({ navigation }) {
  const { state, signout } = useContext(AuthContext);

  {state.token ? null : navigation.navigate("Login")}

  return (
    <SafeAreaView style={mb_styles.background}>
      <View style={mb_styles.textinput_cont}>
        <TextInput
          style={mb_styles.textinput_search}
          //onChangeText={}
          placeholder="Search..."
        />
      </View>

      <FlatList
        data={state.chatGroups}
        renderItem={({ item }) => (
          <View style={mb_styles.mb_chat_container}>
            <View style={mb_styles.list_item_inbox}>
              <Ionicons
                name="chatbox-ellipses-outline"
                size={70}
                color="#52575D"
                style={mb_styles.left_icon}
              ></Ionicons>

              <View style={mb_styles.list_item_description}>
                <Text style={{ fontSize: 25 }}>{item.InterestName}</Text>
                {/* <Text>For all you basketball lovers!</Text> */}
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate("Chatroom", item)}
                style={mb_styles.touchables_arrow}
              >
                <Ionicons
                  name="arrow-forward"
                  size={25}
                  color="#0c000e"
                ></Ionicons>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={mb_styles.appButtonContainer} onPress={() => signout()}>
        <Text style={mb_styles.appButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// CSS Stylesheet
const mb_styles = StyleSheet.create({
  background: {
     backgroundColor: "#ece6dd",
      flex: 1
  },
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: "lightyellow",
  },
  text_center: {
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  textinput_cont: {
    borderWidth: 1,
    borderColor: "black",
    height: 40,
    width: 300,
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 30,
  },
  textinput_search: {
    flex: 1,
    fontSize: 20,
    alignSelf: "flex-start",
    margin: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    textAlign: "center",
  },
  mb_chat_container: {
    flexDirection: "column",
    justifyContent: "flex-end",
    height: 120,
    margin: 10,
  },
  mb_image_container: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 5,
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
  button_chat: {
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    width: 75,
    marginTop: 30,
  },
  left_icon: {
    flex: 1.5,
    marginLeft: 5,
  },
  touchables_arrow: {
    backgroundColor: "#db5f4d",
    padding: 10,
    width: 50,
    borderRadius: 10,
    position: "relative",
    justifyContent: "flex-end",
    marginRight: 10,
    flex: 0.5,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 2,
    width: '40%',
    alignSelf: "center"
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
