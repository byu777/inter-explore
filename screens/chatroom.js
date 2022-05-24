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
  StatusBar,
  Alert,
} from "react-native";
import trackerApi from "../api/tracker";
import { Modal, Portal, Provider } from "react-native-paper";
import { Context as AuthContext } from "./../context/AuthContext";
import io from "socket.io-client";
import { Ionicons } from "@expo/vector-icons";
import * as Device from "expo-device";

// fonts
import Apploading from "expo-app-loading";
import { useFonts } from "expo-font";
import { Asap_400Regular } from "@expo-google-fonts/asap";
import {
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { Rajdhani_400Regular } from "@expo-google-fonts/rajdhani";

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
  //const memberList = route.params.user;

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

  let [fontsLoaded] = useFonts({
    Asap_400Regular,
    Montserrat_400Regular,
    Montserrat_700Bold,
    Rajdhani_400Regular,
  });

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

  const users = route.params.user;
  console.log("is this users?", users);

  if (!fontsLoaded) {
    return <Apploading />;
  }

  return (
    <Provider>
      <SafeAreaView style={styles.main_container}>
        <Portal>
          <Modal
            visible={isMemberVisible}
            contentContainerStyle={styles.modal_container}
          >
            <Text style={styles.modal_title}>
              Members in {route.params.InterestName}{" "}
            </Text>

            <ScrollView>
              {/* <Text>User ID: {route.params._id}</Text> */}
              {users.map((item) => (
                <View>
                  <Text>{item.firstName}</Text>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={() => setIsMemberVisible(!isMemberVisible)}
            >
              <Text>Close</Text>
            </TouchableOpacity>
            {/* <View style={styles.modal_container}>
            <View style={styles.modalView}>
              <Text style={styles.modal_title}>
                Members in {route.params.InterestName}{" "}
              </Text>

              
              <SafeAreaView style={styles.modal_flatlist}>
                <FlatList
                  data={users}
                  keyExtractor={(item) => `${item._id}`}
                  renderItem={({ item }) => {
                    <View>
                      <Text>{item.firstName}</Text>
                    </View>;
                  }}
                />
              </SafeAreaView>

              <TouchableOpacity
                onPress={() => setIsMemberVisible(!isMemberVisible)}
              >
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View> */}
          </Modal>
        </Portal>

        <ImageBackground source={image} style={styles.bg_image}>
          {/* MODAL */}

          <View style={styles.top_area}>
            <TouchableOpacity
              style={styles.top_btn_1}
              onPress={() => {
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
                    elevation: 5,
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
              <Ionicons name="send-sharp" size={30} color="#0e0e52"></Ionicons>
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
  modal_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    width: 450,
  },
  modalView: {
    margin: 5,
    flex: 1,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modal_flatlist: {
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "center",
    width: 200,
    borderRadius: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 7,
  },
  modal_title: {
    textAlign: "center",
    fontFamily: "Montserrat_400Regular",
  },
  modal_rows: {
    flexDirection: "row",
    backgroundColor: "#E6E6FB",
    borderRadius: 10,
    height: 50,
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
});

export default Chatroom;
