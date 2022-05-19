import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  ImageBackground,
} from "react-native";
import trackerApi from "../api/tracker";
import { Context as AuthContext } from "./../context/AuthContext";
import io from "socket.io-client";
import KeyboardAvoidingWrapper from "./../components/KeyboardAvoidingWrapper";
import { Ionicons } from "@expo/vector-icons";

// Current url is localhost, after deployment will change to url where application is deployed
// Variables needed for socket.io
// const ENDPOINT = "http://localhost:3000";
// var socket, selectedChatCompare;

const image = require("../assets/images/background1.jpg");

const INITIAL_STATE = [
  {
    _id: 1,
    msg: "Copium",
  },
  {
    _id: 2,
    msg: "Faze",
  },
  {
    _id: 3,
    msg: "CS",
  },
  {
    _id: 4,
    msg: "sdsds",
  },
  {
    _id: 5,
    msg: "lul",
  },
  {
    _id: 6,
    msg: "Huff that",
  },
]

const Chatroom = ({ navigation }) => {
  const { state } = useContext(AuthContext);
  //const {state} = useState(INITIAL_STATE);
  const route = useRoute();
  navigation.setOptions({ title: route.params.InterestName });

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();

  const fetchMessages = async () => {
    // if the 'unique id' doesnt match, its not user so exit
    if (!route.params._id) return;

    try {
      const response = await trackerApi.get(
        `/api/Messages/${route.params._id}`
      );

      setMessages(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchMessages();
  }, [route.params._id]);

  // useEffect to connect socket.io-client to socket.io server side
  // useEffect(() => {
  //   console.log("running");
  //   socket = io(ENDPOINT);
  // }, [])

  const sendMessage = async () => {
    if (newMessage != null || newMessage != "") {
      try {
        setNewMessage("");
        const response = await trackerApi.post("/api/Messages/", {
          sender: state.user._id,
          content: newMessage,
          chatId: route.params._id,
        });

        setMessages([...messages, response.data]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onChangeMessageHandler = (message) => {
    setNewMessage(message);
  };

  return (
    <SafeAreaView style={styles.main_container}>
      <ImageBackground source={image} style={styles.bg_image}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.member_btn}
            onPress={() => setVisible(true)}
          >
            <Ionicons 
            name={"basketball"}
            size={70}
            color="#d62828"
            style={mb_styles.left_icon}></Ionicons>
            <Text style={styles.appButtonText}>Members</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={() => navigation.navigate("CreateEvent")}
          >
            <Text style={styles.appButtonText}>Make Event</Text>
          </TouchableOpacity>
        </View>

        {/* container for chat messages area */}
        <View style={styles.chat_area}>
          <FlatList
            data={messages}
            style={styles.ChatMessages}
            renderItem={({ item }) => (
              <View
                style={{
                  alignSelf: `${
                    item.sender._id === state.user._id
                      ? "flex-end"
                      : "flex-start"
                  }`,
                  backgroundColor: `${
                    item.sender._id === state.user._id ? "#B9F5D0" : "#BEE3F8"
                  }`,
                  borderRadius: 20,
                  maxWidth: "75%",
                  margin: 3,
                  flex: 1,
                }}
              >
                <Text style={styles.chatMessagesText}>{item.content[0]}</Text>
              </View>
            )}
          />
        </View>
        <KeyboardAvoidingView>
          <View style={styles.sendMessageArea}>
            <TextInput
              style={styles.typeMessage}
              placeholder="Send a Message..."
              onChangeText={onChangeMessageHandler}
              value={newMessage}
            />
            <TouchableOpacity
              style={styles.appSendButtonContainer}
              onPress={sendMessage}
            >
              <Text style={styles.appSendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

// style sheet for chatroom page
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: "#90e0ef",
    flexDirection: "column",
  },
  bg_image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    opacity: 0.6,
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
    backgroundColor: "transparent",
    margin: 10,
    flex: 4,
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
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#ece6dd",
  },
  touchables_arrow: {
    backgroundColor: "#db5f4d",
    width: 100,
    borderRadius: 5,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    padding: Platform.OS === "android" ? 45 : 0,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 2,
    width: "49%",
  },
  appButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  appSendButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 0,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignSelf: "flex-end",
    margin: 2,
  },
  appSendButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  sendMessageArea: {
    flexDirection: "row",
  },
  typeMessage: {
    backgroundColor: "transparent",
    width: "75%",
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: "#009688",
  },
  ChatMessages: {
    width: "100%",
  },
  chatMessagesBackground: {},
  chatMessagesText: {
    fontSize: 16,
    padding: 10,
    flexWrap: "wrap",
  },
});

export default Chatroom;
