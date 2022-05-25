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
  ScrollView,
  ImageBackground,
  Dimensions,
  StatusBar,
  Alert,
} from "react-native";
import trackerApi from "../api/tracker";
import { Button, Modal, Portal } from "react-native-paper";
import { Context as AuthContext } from "./../context/AuthContext";

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


const image = require("../assets/images/bg2.jpg");



const Chatroom = ({ navigation }) => {
  const { state } = useContext(AuthContext);
  const route = useRoute();
  navigation.setOptions({ title: route.params.InterestName });

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [isMemberVisible, setIsMemberVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [events, setEvents] = useState([]);
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

  let [fontsLoaded] = useFonts({
    Asap_400Regular,
    Montserrat_400Regular,
    Montserrat_700Bold,
    Rajdhani_400Regular,
  });

  useEffect(() => {
    fetchMessages();
  }, [route.params._id]);
  console.log(events);

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

  const addUserToEvent = async (id) => {
    const addedUser = await trackerApi.post("/api/events/createEventadd", {
      eventID: id,
      userId: state.user._id,
    });
    console.log(addedUser.data);
  };

  const onChangeMessageHandler = (message) => {
    setNewMessage(message);
  };

  const users = route.params.user;

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
          {
            title: "Unable to fetch events! Please try again.",
            desc: "",
            location: "",
          },
        ]);
      } else {
        if (response.data.length == 0) {
          setEvents([
            {
              title: "No events scheduled! Create one to interact with others.",
              desc: "",
              location: "",
            },
          ]);
        } else {
          console.log(response.data);
          console.log("Response successful! Response of events below:");
          setEvents(response.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!fontsLoaded) {
    return <Apploading />;
  }

  return (
    <SafeAreaView style={styles.main_container}>
      <ImageBackground source={image} style={styles.bg_image}>
        {/* MODAL */}

        <Portal>
          <Modal
            visible={isMemberVisible}
            contentContainerStyle={styles.modal_container}
          >
            <Text style={styles.modal_title}>
              Members in {route.params.InterestName}{" "}
            </Text>

            <ScrollView>
              {users.map((item) => (
                <View style={styles.modal_rows}>
                  <View style={styles.profileImage}>
                    <Image
                      source={{ uri: item.pic }}
                      style={styles.img_size}
                    ></Image>
                  </View>
                  <Text style={styles.each_modal_text}> {item.firstName} </Text>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.modal_close_btn}
              onPress={() => setIsMemberVisible(!isMemberVisible)}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontFamily: "Montserrat_400Regular",
                }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </Modal>
        </Portal>

        <View style={styles.top_area}>
          <TouchableOpacity
            style={styles.top_btn_2}
            onPress={() => setIsMemberVisible(true)}
          >
            <Ionicons name="people" size={30} color="black"></Ionicons>
            <Text style={styles.top_btn_2_text}>Members</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.top_btn_2}
            onPress={() => navigation.navigate("CreateEvent", route.params)}
          >
            <Ionicons name="ios-create-outline" size={30} color="black"></Ionicons>
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
            <Ionicons name="calendar-sharp" size={30} color="black"></Ionicons>
            <Text style={styles.top_btn_2_text}>Event List</Text>
          </TouchableOpacity>
        </View>

        <Portal>
          {/* Modal here is used from react-native-paper */}
          <Modal
            visible={isVisible}
            contentContainerStyle={styles.modal_container}
          >
            <Text style={styles.modal_title}>Upcoming Events</Text>
            <ScrollView>
              {events.map((item) => (
                <View style={styles.modal_rows}>
                  <Text style={styles.eventTitle}>{item.title}</Text>
                  <Text style={styles.eventDescription}>{item.desc}</Text>
                  <Text style={styles.eventLocation}>{item.location}</Text>
                  {/* Display users that are part of that event - new endpoint required*/}
                  <TouchableOpacity
                    onPress={() => {
                      console.log(item._id);
                      if (item.user.length == 0) {
                        console.log("no users in event");
                      }else {
                        for (let person = 0; person < item.user.length; person++) {
                          console.log(item.user[person].firstName)
                        }
                      }
                    }}
                  >
                    <Text>Members</Text>
                  </TouchableOpacity>
                  <Button
                    icon={"check"}
                    mode="contained"
                    onPress={() => {
                      //Adds user ID to the list of users in that array - COMPLETE
                      console.log("User ID: " + state.user._id);
                      console.log("Event ID: " + item._id);
                      addUserToEvent(item._id);
                      Alert.alert(
                        "Added to event!",
                        "You have been successfully added to this event!"
                      );
                    }}
                  ></Button>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.modal_close_btn}
              onPress={() => setIsVisible(!isVisible)}
            >
              <Text>Close</Text>
            </TouchableOpacity>
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
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#edf6f9",
    borderRadius: 10,
    borderWidth: 1,
    elevation: 20,
    width: "90%",
    marginTop: 50,
    marginBottom: 50,
  },
  each_modal_text: {
    textAlign: "center",
    fontFamily: "Rajdhani_400Regular",
    fontSize: 18,
  },
  modal_title: {
    textAlign: "center",
    fontFamily: "Montserrat_400Regular",
    fontWeight: "300",
    marginVertical: 20,
    paddingVertical: 15,
    fontSize: 22,
  },
  modal_rows: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#023e8a',
    padding: 10,
    margin: 10,
    height: 60,
    textAlign: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 5,
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
  },
  img_size: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileImage: {
    width: 50,
    height: 50,
  },
  modal_close_btn: {
    borderRadius: 5,
    backgroundColor: "#023e8a",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    height: 50,
    width: 80,
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  eventTitle: {
    textAlign: "left",
    fontFamily: "Rajdhani_400Regular",
    fontSize: 20,
    color: "#150578",
  },
  eventDescription: {
    textAlign: "left",
    fontFamily: "Rajdhani_400Regular",
    fontSize: 18,
  },
  eventLocation: {
    textAlign: "left",
    fontFamily: "Rajdhani_400Regular",
    fontSize: 18,
  },
});

export default Chatroom;
