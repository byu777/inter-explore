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
  ScrollView,
  ImageBackground,
  Dimensions,
  Pressable,
  StatusBar,
  Button,
} from "react-native";
import trackerApi from "../api/tracker";
import { Context as AuthContext } from "./../context/AuthContext";
import io from "socket.io-client";
import { Ionicons } from "@expo/vector-icons";
import { Modal, Portal, Provider } from "react-native-paper";

// Current url is localhost, after deployment will change to url where application is deployed
// Variables needed for socket.io
// const ENDPOINT = "http://localhost:3000";
// var socket, selectedChatCompare;

const image = require("../assets/images/bg2.jpg");

const MembersList = ({ firstName }) => (
  <View>
    <Text>{firstName}</Text>
  </View>
);

const Chatroom = ({ navigation }) => {
  const { state } = useContext(AuthContext);
  //const {state} = useState(INITIAL_STATE);
  const route = useRoute();
  navigation.setOptions({ title: route.params.InterestName });

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [events, setEvents] = useState([
    { title: "Event 1", desc: "Description here", location: "Location here" },
    { title: "Event 2", desc: "Description here", location: "Location here" },
    { title: "Event 3", desc: "Description here", location: "Location here" },
  ]);
  const userId = state.user._id;

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
  console.log(events);
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

  const getEvents = async () => {
    try {
      console.log(state.user._id);
      console.log(route.params.InterestName);
      console.log("type of id: " + typeof state.user._id);
      const response = await trackerApi.post("/api/events/getEventsForUser", {
        id: state.user._id,
        primaryInterest: route.params.InterestName,
        secondaryInterest: state.user._id,
        room: "chatroom",
      });
      if (response.data.response == "undefined") {
        setEvents([
          { title: "Unable to fetch title", desc: "n/a", location: "n/a" },
        ]);
      } else {
        console.log(response.data);
        console.log("Response successful! Response of events below:");
        setEvents(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Provider>
      <SafeAreaView style={styles.main_container}>
        <ImageBackground source={image} style={styles.bg_image}>
          <View style={styles.top_area}>
            <TouchableOpacity style={styles.top_btn_1}>
              <Ionicons name="people" size={30} color="#ecebf3"></Ionicons>
              <Text style={styles.top_btn_1_text}>Members</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.top_btn_2}
              onPress={() => navigation.navigate("CreateEvent")}
            >
              <Ionicons name="today-sharp" size={30} color="#ecebf3"></Ionicons>
              <Text style={styles.top_btn_2_text}>Make Event</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.top_btn_2}
              onPress={() => {
                console.log(userId);
                getEvents();
                setIsVisible(true);
              }}
            >
              <Ionicons
                name="calendar-sharp"
                size={30}
                color="#ecebf3"
              ></Ionicons>
              <Text style={styles.top_btn_2_text}>Event List</Text>
            </TouchableOpacity>
          </View>

          <Portal>
            {/* Modal here is used from react-native-paper */}
            <Modal
              visible={isVisible}
              contentContainerStyle={{ backgroundColor: "white", padding: 20 }}
            >
              <Text>Inside modal</Text>
              <ScrollView>
                <Text>User ID: {state.user._id}</Text>
                {events.map((item) => (
                  <View style={{ borderColor: "black", borderWidth: 10 }}>
                    <Text>{item.title}</Text>
                    <Text>{item.desc}</Text>
                    <Text>{item.location}</Text>
                  </View>
                ))}
              </ScrollView>
              <Button
                title="close"
                onPress={() => setIsVisible(!isVisible)}
              ></Button>
            </Modal>
          </Portal>
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
                      item.sender._id === state.user._id ? "#c7d6d5" : "#6d7275"
                    }`,
                    borderRadius: 20,
                    borderWidth: 1.5,
                    borderColor: "black",
                    maxWidth: Dimensions.get("window").width * 0.75,
                    margin: 3,
                    flex: 1,
                  }}
                >
                  <Text style={styles.chatMessagesText}>{item.content[0]}</Text>
                </View>
              )}
            />
          </View>

          <View style={styles.sendMessageArea}>
            <TextInput
              style={styles.typeMessage}
              placeholder="Message..."
              onChangeText={onChangeMessageHandler}
              value={newMessage}
            />
            <TouchableOpacity style={styles.send_msg} onPress={sendMessage}>
              <Ionicons name="send-sharp" size={35} color="#d00000"></Ionicons>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </Provider>
  );
};

// style sheet for chatroom page
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: "#90e0ef",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 600,
  },
  bg_image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    opacity: 0.7,
    width: 600,
  },

  chat_area: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    margin: 10,
    flex: 8,
    width: 600,
  },

  top_area: {
    flexDirection: "row",
    flex: 2,
    paddingTop: StatusBar.currentHeight,
    width: 200,
  },
  top_btn_1: {
    flex: 3,
    flexDirection: "column",
    backgroundColor: "transparent",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  top_btn_1_text: {
    fontSize: 14,
    color: "#ecebf3",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  top_btn_2: {
    flex: 3,
    flexDirection: "column",
    backgroundColor: "transparent",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  top_btn_2_text: {
    fontSize: 14,
    color: "#ecebf3",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },

  sendMessageArea: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "white",
    maxWidth: Dimensions.get("window").width * 0.95,
    padding: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  typeMessage: {
    backgroundColor: "transparent",
    alignSelf: "flex-start",
    justifyContent: "flex-end",
    alignContent: "center",
    alignItems: "center",
    flex: 8,
    color: "#000001",
  },
  send_msg: {
    flex: 2,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  ChatMessages: {
    width: "100%",
  },
  chatMessagesText: {
    fontSize: 16,
    padding: 10,
    flexWrap: "wrap",
  },
  left_icon: {
    flex: 2,
    marginLeft: 5,
  },
});

export default Chatroom;
