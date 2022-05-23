import React, { useState, useEffect, useContext, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  Dimensions,
  ScrollView,
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

const Event = ({ title, date, time, desc, location, item }) => (
  <TouchableOpacity
    style={styles.row_container}
    // onPress={async () => {
    //   await schedulePushNotification("You clicked on");
    // }}
  >
    <View style={styles.date_time}>
      <View>
        <Text style={styles.time_text}>{date}</Text>
      </View>

      <View>
        <Text style={styles.time_text}>{time}</Text>
      </View>
    </View>

    <View style={styles.desc_area}>
      <Text style={styles.desc_title}>{title}</Text>
      <Text style={styles.desc_text}>{location}</Text>
    </View>
  </TouchableOpacity>
);

export default function EventList() {
  const { state } = useContext(AuthContext);

  let [fontsLoaded] = useFonts({
    Asap_400Regular,
    Montserrat_400Regular,
    Montserrat_700Bold,
    Rajdhani_400Regular,
  });

  // ----------------- Commented out section is the EXPO notifications --------------------
  // const [expoPushToken, setExpoPushToken] = useState("");
  // //const [isSubscribed, setIsSubscribed] = useState(false);
  // const [notification, setNotification] = useState(false);
  // const notiListener = useRef();
  // const respListener = useRef();

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) =>
  //     setExpoPushToken(token)
  //   );

  //   notiListener.current = Notifications.addNotificationReceivedListener(
  //     (notification) => {
  //       setNotification(notification);
  //     }
  //   );

  //   respListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response);
  //     });

  //   return () => {
  //     Notifications.removeNotificationSubscription(notiListener.current);
  //     Notifications.removeNotificationSubscription(respListener.current);
  //   };
  // }, []);

  // async function schedulePushNotification(item) {
  //   await Notifications.scheduleNotificationAsync({
  //     identifier: "upcoming-event",
  //     content: {
  //       title: "Event upcoming!",
  //       body: "Make sure to mark this down on your calendar!",
  //       data: { data: item },
  //     },
  //     trigger: { seconds: 2, repeats: false },
  //   });
  // }

  // async function registerForPushNotificationsAsync() {
  //   let token;
  //   if (Device.isDevice) {
  //     const { status: existingStatus } =
  //       await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== "granted") {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== "granted") {
  //       alert("Failed to get push token for push notification!");
  //       return;
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data;
  //     console.log(token);
  //   } else {
  //     alert("Must use physical device for Push Notifications");
  //   }

  //   if (Platform.OS === "android") {
  //     Notifications.setNotificationChannelAsync("default", {
  //       name: "default",
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: "#FF231F7C",
  //     });
  //   }

  //   return token;
  // }

  const renderItem = ({ item }) => (
    <Event
      title={item.title}
      location={item.location}
      date={item.date}
      time={item.time}
      desc={item.desc}
    />
  );

  // ------------------------ end of Expo notif -----------------------------

  const [eventList, setEventList] = useState("");

  // >>>>>>>>>>>>>>> event list back-end   >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const fetchEventList = () => {
    // get all users
    const listUsers = trackerApi.get("/api/interests/getAllUsers");

    //users that have the primary/secondary interest
    const relevantUsers = [];
    for (let i = 0; i < listUsers.length; i++) {
      const interest1 = listUsers[i].primaryInterest;
      const interest2 = listUsers[i].secondaryInterest;
      if (
        interest1 == state.user.primaryInterest ||
        interest2 == state.user.secondaryInterest
      ) {
        relevantUsers.push(listUsers[i]);
      }
    }

    //get all events
    const listEvents = trackerApi.get("/api/interests/getEventsForUser");
    setEventList(listEvents);
  };

  // >>>>>>>>>>>>>>> END event list back-end   >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // dummy data ---> can use setEvents() to replace this list with events retrieved from back-end
  const [events, setEvents] = useState([
    {
      title: "Basketball game",
      location:
        "Lorem ipsum yoyoyoyoyoyo Lorem ipsum yoyoyoyoyoyoLorem ipsum yoyoyoyoyoyoLorem ipsum yoyoyoyoyoyoLorem ipsum yoyoyoyoyoyoLorem ipsum yoyoyoyoyoyoLorem ipsum yoyoyoyoyoyoLorem ipsum yoyoyoyoyoyoLorem ipsum yoyoyoyoyoyoLorem ipsum yoyoyoyoyoyo",
      date: "May 25, 2022",
      time: "6 PM",
      desc: "etc.",
      key: 1,
    },
    {
      title: "Tennis",
      location: "asd",
      date: "May 25, 2022",
      time: "6 PM",
      desc: "etc.",
      key: 2,
    },
    {
      title: "Counter Strike",
      location: "asd",
      date: "May 25, 2022",
      time: "6 PM",
      desc: "etc.",
      key: 3,
    },
    {
      title: "LoL",
      location: "asd",
      date: "May 25, 2022",
      time: "6 PM",
      desc: "etc.",
      key: 4,
    },
    {
      title: "Church meeting",
      location: "asd",
      date: "May 25, 2022",
      time: "6 PM",
      desc: "etc.",
      key: 5,
    },
    {
      title: "Beer Pong",
      location: "asd",
      date: "May 25, 2022",
      time: "6 PM",
      desc: "etc.",
      key: 6,
    },
    {
      title: "Volleyball",
      location: "asd",
      date: "May 25, 2022",
      time: "6 PM",
      desc: "etc.",
      key: 7,
    },
    {
      title: "Concert",
      location: "asd",
      date: "May 25, 2022",
      time: "6 PM",
      desc: "etc.",
      key: 8,
    },
    {
      title: "Movie",
      location: "asd",
      date: "May 25, 2022",
      time: "6 PM",
      desc: "etc.",
      key: 9,
    },
    {
      title: "Bowling",
      location: "asd",
      date: "May 25, 2022",
      time: "6 PM",
      desc: "etc.",
      key: 10,
    },
  ]);

  if (!fontsLoaded) {
    return <Apploading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={{ fontSize: 10 }}>Push token: {expoPushToken} </Text> */}

      <Text style={styles.header}>Upcoming Events</Text>

      {/* <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>Title: {notification && notification.request.content.title}</Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>
          Data:
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View> */}

      <FlatList
        style={styles.event_container}
        keyExtractor={(item) => item.key}
        data={events}
        renderItem={renderItem}
      />
      {/* {expoPushToken && (
        
      )} */}
    </SafeAreaView>
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
    //alignSelf: "flex-start",
    fontFamily: "Montserrat_400Regular",
    color: "#03045e",
  },
  row_container: {
    flexDirection: "row",
    backgroundColor: "#E6E6FB",
    borderRadius: 10,
    paddingTop: 15,
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
    fontFamily: 'Montserrat_400Regular',
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
    alignItems: 'center',
  },
  desc_title: {
    fontSize: 25,
    flex: 1,
    flexWrap: "wrap",
    alignSelf: "center",
    justifyContent: "flex-start",
    alignItems: "center",
    fontFamily: 'Montserrat_400Regular',
    color: "#150578",
    paddingTop: 5,
  },
  desc_text: {
    fontSize: 14,
    flex: 5,
    color: "#449dd1",
    flexWrap: "wrap",
    fontFamily: 'Rajdhani_400Regular',
    padding: 5,
    marginLeft: 5,
  },
});
