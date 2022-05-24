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
} from "react-native";
import trackerApi from "../api/tracker";
import { Context as AuthContext } from "./../context/AuthContext";
import { useFonts } from "expo-font";

// expo notifications imports
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Event = ({ title, date, time, desc, location }) => (
  <TouchableOpacity
    style={styles.row_container}
    onPress={async () => {
      await schedulePushNotification("You clicked on");
    }}
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
      <Text style={styles.desc_text}>{title}</Text>
      <Text
        style={{
          fontSize: 14,
          color: "#db5f4d",
        }}
      >
        {location}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: "#db5f4d",
        }}
      >
        {desc}
      </Text>
    </View>
  </TouchableOpacity>
);

export default function EventList() {
  const { state } = useContext(AuthContext);

  // -------------------expo notification----------------------------
  const [expoPushToken, setExpoPushToken] = useState("");
  //const [isSubscribed, setIsSubscribed] = useState(false);
  const [notification, setNotification] = useState(false);
  const notiListener = useRef();
  const respListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notiListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    respListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
    fetchEventList();
    return () => {
      Notifications.removeNotificationSubscription(notiListener.current);
      Notifications.removeNotificationSubscription(respListener.current);
    };
  }, []);

  async function schedulePushNotification(item) {
    await Notifications.scheduleNotificationAsync({
      identifier: "upcoming-event",
      content: {
        title: "Event upcoming!",
        body: "Make sure to mark this down on your calendar!",
        data: { data: item },
      },
      trigger: { seconds: 2, repeats: false },
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

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

  const fetchEventList = async () => {
    //Get all events from user's primary and secondary interests and set to state
    const listEvents = await trackerApi.post("/api/events/getEventsForUser", {
      id: state.user._id,
      primaryInterest: state.user.primaryInterest,
      secondaryInterest: state.user.secondaryInterest,
      room: "events",
    });
    if (listEvents.data.response == "undefined") {
      setEventList([
        {
          title: "Unable to fetch event",
          location: "n/a",
          date: "n/a",
          time: "n/a",
          desc: "n/a",
        },
      ]);
    } else {
      setEventList(listEvents.data);
    }
  };

  // >>>>>>>>>>>>>>> END event list back-end   >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // dummy data ---> can use setEvents() to replace this list with events retrieved from back-end
  // const [events, setEvents] = useState([
  //   {
  //     title: "Basketball game",
  //     location: "asd",
  //     date: "May 25, 2022",
  //     time: "6 PM",
  //     desc: "etc.",
  //     key: 1,
  //   },
  //   {
  //     title: "Tennis",
  //     location: "asd",
  //     date: "May 25, 2022",
  //     time: "6 PM",
  //     desc: "etc.",
  //     key: 2,
  //   },
  //   {
  //     title: "Counter Strike",
  //     location: "asd",
  //     date: "May 25, 2022",
  //     time: "6 PM",
  //     desc: "etc.",
  //     key: 3,
  //   },
  //   {
  //     title: "LoL",
  //     location: "asd",
  //     date: "May 25, 2022",
  //     time: "6 PM",
  //     desc: "etc.",
  //     key: 4,
  //   },
  //   {
  //     title: "Church meeting",
  //     location: "asd",
  //     date: "May 25, 2022",
  //     time: "6 PM",
  //     desc: "etc.",
  //     key: 5,
  //   },
  //   {
  //     title: "Beer Pong",
  //     location: "asd",
  //     date: "May 25, 2022",
  //     time: "6 PM",
  //     desc: "etc.",
  //     key: 6,
  //   },
  //   {
  //     title: "Volleyball",
  //     location: "asd",
  //     date: "May 25, 2022",
  //     time: "6 PM",
  //     desc: "etc.",
  //     key: 7,
  //   },
  //   {
  //     title: "Concert",
  //     location: "asd",
  //     date: "May 25, 2022",
  //     time: "6 PM",
  //     desc: "etc.",
  //     key: 8,
  //   },
  //   {
  //     title: "Movie",
  //     location: "asd",
  //     date: "May 25, 2022",
  //     time: "6 PM",
  //     desc: "etc.",
  //     key: 9,
  //   },
  //   {
  //     title: "Bowling",
  //     location: "asd",
  //     date: "May 25, 2022",
  //     time: "6 PM",
  //     desc: "etc.",
  //     key: 10,
  //   },
  // ]);

  let [fontsLoaded] = useFonts({
    "Asap-Bold": require("../assets/fonts/Asap-Bold.ttf"),
    "Asap-Medium": require("../assets/fonts/Asap-Medium.ttf"),
    "Asap-Regular": require("../assets/fonts/Asap-Regular.ttf"),
    "Rajdhani-Bold": require("../assets/fonts/Rajdhani-Bold.ttf"),
    "Rajdhani-Light": require("../assets/fonts/Rajdhani-Light.ttf"),
    "Rajdhani-Medium": require("../assets/fonts/Rajdhani-Medium.ttf"),
    "Rajdhani-Regular": require("../assets/fonts/Rajdhani-Regular.ttf"),
    "Koulen-Regular": require("../assets/fonts/Koulen-Regular.ttf"),
    "Montserrat-Black": require("../assets/fonts/Montserrat-Black.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "SourceSansPro-Bold": require("../assets/fonts/SourceSansPro-Bold.ttf"),
    "SourceSansPro-Light": require("../assets/fonts/SourceSansPro-Light.ttf"),
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 10 }}>Push token: {expoPushToken} </Text>
      {/* <View style={styles.header}>
        <Text style={{ fontSize: 20, flexWrap: "wrap" }}>
          Welcome back, {state.user.firstName}
        </Text>
      </View> */}
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
        keyExtractor={(item) => item._id}
        data={eventList}
        renderItem={renderItem}
      />
      {/* {expoPushToken && (
        
      )} */}
    </SafeAreaView>
  );
}

let fullHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#90e0ef",
    flexDirection: "column",
  },
  event_container: {
    flexDirection: "column",
    backgroundColor: "#caf0f8",
    borderRadius: 10,
    borderWidth: 1.5,
    height: fullHeight,
    margin: 10,
  },
  header: {
    paddingLeft: 10,
    textAlign: "center",
    alignItems: "center",
    fontSize: 20,
    alignSelf: "flex-start",
    fontFamily: "Montserrat-Bold",
    color: "#03045e",
  },
  row_container: {
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 20,
  },
  time_text: {
    textAlign: "center",
    fontSize: 16,
    color: "#d62828",
    fontFamily: "Koulen-Regular",
    fontSize: 20,
  },
  date_time: {
    flexDirection: "column",
    flex: 2,
  },
  desc_area: {
    flex: 3,
    flexDirection: "column",
    fontSize: 24,
    width: 250,
    flexWrap: "wrap",
    textAlign: "center",
    justifyContent: "space-around",
  },
  desc_text: {
    fontSize: 25,
    flexWrap: "wrap",
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    fontFamily: "SourceSansPro-Bold",
  },
});
