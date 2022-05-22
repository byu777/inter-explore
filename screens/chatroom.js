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
  Dimensions,
  Pressable,
  StatusBar,
} from "react-native";
import trackerApi from "../api/tracker";
import { Context as AuthContext } from "./../context/AuthContext";
import io from "socket.io-client";
import { Ionicons } from "@expo/vector-icons";
import * as Device from "expo-device";

// Current url is localhost, after deployment will change to url where application is deployed
// Variables needed for socket.io
// const ENDPOINT = "http://localhost:3000";
// var socket, selectedChatCompare;

const image = require("../assets/images/bg2.jpg");

const Chatroom = ({ navigation }) => {
  const { state } = useContext(AuthContext);
  const route = useRoute();
  navigation.setOptions({ title: route.params.InterestName });

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [isMemberVisible, setIsMemberVisible] = useState(false);
  const [memberList, setMemberList] = useState([]);

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

  const MemberList = async () => {
    try {
      const response = await trackerApi.get("/api/interests/getAllUsersInInterest")
      console.log('hello?\n', response.data.user);
      const json = await response.json();  //--> why doesnt this work?
      setMemberList(json.user);
      //console.log('got the user list??', res.data);
      // for (let name of res.data) {
      //   setMemberList(memberList => [...memberList, name]);
      // }
      //setMemberList(res.data);
      
    } catch (err) {
      console.log(err);
    }
  }

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
        
        <Modal
          visible={isMemberVisible}
          transparent={true}
          animationType="slide"
          // onDismiss={() => {
          //   setIsVisible(!isVisible);}}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: 'column' }}
          >
            <View
              style={{
                backgroundColor: "white",
                width: "80%",
                paddingHorizontal: 20,
                paddingVertical: 30,
                borderRadius: 20,
              }}
            >
              <Text>Members</Text>
              <FlatList
                data={memberList}
                renderItem={({ item }) => {
                  <View>
                    <Text>{item.firstName}</Text>
                    {/* <Text>{item.desc}</Text>
                    <Text>{item.location}</Text> */}
                  </View>
                }}
              />
              <TouchableOpacity
                
                onPress={() => setIsMemberVisible(!isMemberVisible)}
              >
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.top_area}>
          <TouchableOpacity
            style={styles.top_btn_1}
            onPress={() => {
              MemberList();
              setIsMemberVisible(true);
            }}
          >
            <Ionicons name="people" size={30} color="black"></Ionicons>
            <Text style={styles.top_btn_1_text}>Members</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.top_btn_2}
            onPress={() => navigation.navigate("CreateEvent")}
          >
            <Ionicons name="today-sharp" size={30} color="black"></Ionicons>
            <Text style={styles.top_btn_2_text}>Make Event</Text>
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
            <Ionicons name="send-sharp" size={35} color="#0e0e52"></Ionicons>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

// style sheet for chatroom page
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },
  bg_image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    opacity: 0.5,
  },

  chat_area: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    margin: 10,
    flex: 7,
  },

  top_area: {
    flexDirection: "row",
    flex: 3,
    paddingTop: Device.brand == "Apple" ? StatusBar.currentHeight : 0,
    //paddingTop: StatusBar.currentHeight,
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
    fontSize: 18,
    color: "black",
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
    fontSize: 18,
    color: "black",
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
