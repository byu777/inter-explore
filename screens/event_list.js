import React, { useState, useEffect, useContext, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import trackerApi from "../api/tracker";
import { Context as AuthContext } from "./../context/AuthContext";

// fonts
import Apploading from "expo-app-loading";
import { useFonts } from "expo-font";
import { Asap_400Regular } from "@expo-google-fonts/asap";
import {
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { Rajdhani_400Regular } from "@expo-google-fonts/rajdhani";
import { Button, Modal, Portal, Provider } from "react-native-paper";
import { useFocusEffect } from '@react-navigation/native';

// // expo notifications imports
// import * as Device from "expo-device";
// import * as Notifications from "expo-notifications";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// Part of notification handler
// onPress={async () => {
//   await schedulePushNotification("You clicked on");
// }}

export default function EventList() {
  const { state } = useContext(AuthContext);
  const [eventList, setEventList] = useState([]);

  let [fontsLoaded] = useFonts({
    Asap_400Regular,
    Montserrat_400Regular,
    Montserrat_700Bold,
    Rajdhani_400Regular,
  });

  // useEffect(() => {
  //   fetchEventList();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchEventList();
    }, [])
  );
  // -------------------expo notification----------------------------
  const [expoPushToken, setExpoPushToken] = useState("");
  //const [isSubscribed, setIsSubscribed] = useState(false);
  const [notification, setNotification] = useState(false);
  const notiListener = useRef();
  const respListener = useRef();
  const [memberListVisible, setMemberListVisible] = useState(false);
  const [members, setMembers] = useState([]);

  // ------------------------ end of Expo notif -----------------------------

  // >>>>>>>>>>>>>>> event list back-end   >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const fetchEventList = async () => {
    try {
      const listEvents = await trackerApi.post("/api/events/getEventsForUser", {
        id: state.user._id,
        primaryInterest: state.user.primaryInterest,
        secondaryInterest: state.user.secondaryInterest,
        room: "events",
      });
      if (listEvents.data.response == "undefined") {
        setEventList([
          {
            title: "No events available.",
            location: "",
            date: "",
            time: "",
            desc: "",
          },
        ]);
      } else {
        setEventList(listEvents.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromEvent = async (id) => {
    try {
      const leaveEvent = await trackerApi.put("/api/events/removeFromEvent", {
        eventID: id,
        userID: state.user._id,
      });
      if (leaveEvent.status == 404) {
        Alert.alert(
          "Removal from event",
          "Unable to leave this event. Please try again."
        );
      } else {
        console.log(leaveEvent.data);
        const remainingEvents = eventList.filter((item) => item._id != id);
        console.log(remainingEvents);
        setEventList(remainingEvents);
        Alert.alert(
          "Removed from event",
          "You have successfully left the event"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!fontsLoaded) {
    return <Apploading />;
  }

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Upcoming events</Text>

        <ScrollView>
          {eventList.map((item) => (
            <View style={styles.row_container}>
              <Text style={styles.desc_title}>{item.title}</Text>
              <Text style={styles.desc_location}>{item.location}</Text>
              <Text style={styles.desc_text}>{item.desc}</Text>
              <Button
                icon={"close"}
                color={"red"}
                onPress={() => {
                  console.log(item._id);
                  console.log("User ID: " + state.user._id);
                  removeFromEvent(item._id);
                }}
              >
                Leave
              </Button>
              <Button
                icon={"account"}
                color={"#023e8a"}
                onPress={() => {
                  console.log(state.user._id);
                  console.log("People part of this event");
                  for (let person = 0; person < item.user.length; person++) {
                    members.push(item.user[person].firstName);
                  }
                  console.log(members);
                  setMemberListVisible(true);
                }}
              >
                Members
              </Button>
              <Portal>
                <Modal
                  visible={memberListVisible}
                  contentContainerStyle={styles.modal_container}
                >
                  <Text style={styles.modal_title}>
                    People attending this event
                  </Text>
                  <ScrollView>
                    {members.map((item) => (
                      <View style={styles.membersModalRow}>
                        <Text style={styles.each_modal_text}>{item}</Text>
                      </View>
                    ))}
                  </ScrollView>
                  <Button
                    icon={"close"}
                    color={"#023e8a"}
                    onPress={() => {
                      setMemberListVisible(!memberListVisible);
                      setMembers([]);
                    }}
                  >
                    Close
                  </Button>
                </Modal>
              </Portal>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },
  event_container: {
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 5,
    flexGrow: 0,
    padding: 10,
    margin: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 10,
  },
  header: {
    paddingLeft: 20,
    marginTop: 25,
    textAlign: "center",
    alignItems: "center",
    fontSize: 25,
    fontFamily: "Montserrat_400Regular",
    color: "#03045e",
  },
  row_container: {
    flexDirection: "column",
    backgroundColor: "#E6E6FB",
    borderRadius: 10,
    paddingTop: 15,
    paddingLeft: 10,
    paddingBottom: 15,
    marginTop: 15,
    marginBottom: 15,
    marginHorizontal: 10,
    margin: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 10,
  },
  time_text: {
    textAlign: "center",
    color: "#150578",
    fontFamily: "Montserrat_400Regular",
    fontSize: 20,
    paddingBottom: 10,
  },
  date_time: {
    flexDirection: "column",
    flex: 2,
    paddingTop: 5,
  },
  desc_area: {
    flex: 4,
    flexDirection: "column",
    fontSize: 24,
    width: 250,
    textAlign: "center",
    justifyContent: "space-around",
    alignItems: "center",
  },
  desc_location: {
    fontSize: 20,
    flex: 1,
    textAlign: "left",
    fontFamily: "Montserrat_400Regular",
  },
  desc_title: {
    fontSize: 25,
    flex: 1,
    flexWrap: "wrap",
    textAlign: "left",
    justifyContent: "flex-start",
    alignItems: "center",
    fontFamily: "Montserrat_400Regular",
    color: "#150578",
    paddingTop: 5,
  },
  desc_text: {
    fontSize: 14,
    flex: 5,
    color: "#449dd1",
    flexWrap: "wrap",
    fontFamily: "Rajdhani_400Regular",
    padding: 5,
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
  modal_rows: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#023e8a",
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
  modal_title: {
    textAlign: "center",
    fontFamily: "Montserrat_400Regular",
    fontWeight: "300",
    marginVertical: 20,
    paddingVertical: 15,
    fontSize: 22,
  },
  membersModalRow: {
    flexDirection: "column",
    backgroundColor: "#E6E6FB",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    height: 50,
    textAlign: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
  },
  each_modal_text: {
    textAlign: "center",
    fontFamily: "Rajdhani_400Regular",
    fontSize: 18,
  },
});
