import React from "react";
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
} from "react-native";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";

// --------------------------- Message Board page -----------------------------

export default function MessageBoardPage({ onPress }) {
  return (
    <SafeAreaView style={{ backgroundColor: "#ece6dd", marginBottom: 25 }}>
      <View style={mb_styles.textinput_cont}>
        {/* <TextInput
          style={mb_styles.textinput_search}
          onChangeText={onChangeText}
          placeholder="search.."
          value={text} //allows alphanumeric input into TextInput
        /> */}
      </View>

      {/* inbox container */}
      <View style={mb_styles.mb_chat_container}>
        {/* can pull chat groups from database later and put in flatlist */}
        {/* <FlatList/>   */}

        <View style={mb_styles.list_item_inbox}>
          <Ionicons
            name="basketball"
            size={70}
            color="#52575D"
            style={mb_styles.left_icon}
          ></Ionicons>

          <View style={mb_styles.list_item_description}>
            <Text style={{ fontSize: 25 }}>BASKETBALL</Text>
            <Text>For all you basketball lovers!</Text>
          </View>

          <TouchableOpacity
            onPress={onPress}
            style={mb_styles.touchables_arrow}
          >
            <Ionicons name="arrow-forward" size={25} color="#0c000e"></Ionicons>
          </TouchableOpacity>
        </View>

        <View style={mb_styles.list_item_inbox}>
          <Ionicons name="baseball" size={70} color="#52575D" style={mb_styles.left_icon}></Ionicons>

          <View style={mb_styles.list_item_description}>
            <Text style={{ fontSize: 25 }}>BASEBALL</Text>
            <Text>For all you baseball lovers!</Text>
          </View>

          <TouchableOpacity
            onPress={onPress}
            style={mb_styles.touchables_arrow}
          >
            <Ionicons name="arrow-forward" size={25} color="#0c000e"></Ionicons>
          </TouchableOpacity>
        </View>

        <View style={mb_styles.list_item_inbox}>
          <Ionicons name="bicycle" size={70} color="#52575D" style={mb_styles.left_icon}></Ionicons>

          <View style={mb_styles.list_item_description}>
            <Text style={{ fontSize: 25 }}>BIKING</Text>
            <Text>For all you bikers!</Text>
          </View>

          <TouchableOpacity
            onPress={onPress}
            style={mb_styles.touchables_arrow}
          >
            <Ionicons name="arrow-forward" size={25} color="#0c000e"></Ionicons>
          </TouchableOpacity>
        </View>

        <View style={mb_styles.list_item_inbox}>
          <Ionicons name="golf" size={70} color="#52575D" style={mb_styles.left_icon}></Ionicons>

          <View style={mb_styles.list_item_description}>
            <Text style={{ fontSize: 25 }}>GOLF</Text>
            <Text>For all you golf lovers!</Text>
          </View>

          <TouchableOpacity
            onPress={onPress}
            style={mb_styles.touchables_arrow}
          >
            <Ionicons name="arrow-forward" size={25} color="#0c000e"></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// ***------------------------------- STYLING ---------------------------------*********************

const mb_styles = StyleSheet.create({
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
    height: 600,
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
});

// export default MessageBoardPage;
