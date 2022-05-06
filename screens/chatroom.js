import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import MakeEventPage from "./create_event";
import Sidebar from "../components/Sidebar";
import MessageForm from "../components/MessageForm";

// ---------------------------Chatroom page ------------------------------
const Chatroom = ({ navigation }) => {
  return (
    <SafeAreaView style={chatroom_styles.main_container}>

      <Sidebar></Sidebar>

      <MessageForm></MessageForm>

      {/* container for member list */}
      <View style={chatroom_styles.member_container}>
        {/* pull names from group collection and populate here */}
        <Text>Eric, Richard, Justin, Gabriel, Johnny...</Text>
        <Button
          title="Members"
          style={{ padding: 10 }}
          onPress={() =>
            Alert.alert("Members", "Members of Basketball", [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel pressed"),
                style: "cancel",
              },
              {
                text: "OK",
                onPress: () => console.log("OK pressed"),
                style: "ok",
              },
            ])
          }
        />
      </View>

      {/* container for chat messages area */}
      <View style={chatroom_styles.chat_area}>
        <View style={chatroom_styles.chat_row}>
          <View style={chatroom_styles.image_container}>
            <Image
              style={chatroom_styles.image_container}
              source={require("../assets/favicon/favicon.png")}
            ></Image>
          </View>
          <Text>
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          </Text>
        </View>

        <View style={chatroom_styles.chat_row}>
          <View style={chatroom_styles.image_container}>
            <Image
              style={chatroom_styles.image_container}
              source={require("../assets/favicon/favicon.png")}
            ></Image>
          </View>
          <Text>
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          </Text>
        </View>

        <View style={chatroom_styles.chat_row}>
          <View style={chatroom_styles.image_container}>
            <Image
              style={chatroom_styles.image_container}
              source={require("../assets/favicon/favicon.png")}
            ></Image>
          </View>
          <Text>
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          </Text>
        </View>

        <View style={chatroom_styles.chat_row}>
          <View style={chatroom_styles.image_container}>
            <Image
              style={chatroom_styles.image_container}
              source={require("../assets/favicon/favicon.png")}
            ></Image>
          </View>
          <Text>
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          </Text>
        </View>

        <View style={chatroom_styles.chat_row}>
          <View style={chatroom_styles.image_container}>
            <Image
              style={chatroom_styles.image_container}
              source={require("../assets/favicon/favicon.png")}
            ></Image>
          </View>
          <Text>
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          </Text>
        </View>
      </View>

      <View style={chatroom_styles.make_event}>
        <Button
          onPress={() => navigation.navigate({ MakeEventPage })} //add dialog box to input details
          title="Make Event"
          color="orange"
        />
      </View>
    </SafeAreaView>
  );
};

// style sheet for chatroom page
const chatroom_styles = StyleSheet.create({
  main_container: {
    // flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
    flex: 1,
    marginTop: 8,
    backgroundColor: "transparent",
    //height: 600,
  },
  member_container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "center",
    alignItems: "center",
    flex: 0.5,
    margin: 10,
    flexWrap: "wrap",
  },
  image_container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
  },
  chat_area: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    margin: 10,
    flex: 4,
    //flex: 40,
  },

  chat_row: {
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    margin: 5,
  },
  make_event: {
    marginBottom: 15,
    width: 150,
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default Chatroom;