import React, { useState, useEffect, useContext, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  Platform,
} from "react-native";
import trackerApi from "../api/tracker";
import { Context as AuthContext } from "./../context/AuthContext";

// // imports using LogRocket youtuber way
// import createSender from "../utils/register";

// expo notifications imports
import * as Device from 'expo-device';
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function EventList() {
  const { state } = useContext(AuthContext);
  // // from youtuber;
  // const [sender, setSender] = useState(null);

  // -------------------expo notification----------------------------
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notiListener = useRef();
  const respListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notiListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    respListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notiListener.current);
      Notifications.removeNotificationSubscription(respListener.current);
    }
  }, []);

  async function schedulePushNotification(message) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'You got a notification bruh',
        body: message,
        data: { data: message.data},
      },
      trigger: { seconds: 2 },
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

  // ------------------------ end of Expo notif -----------------------------

  // const primaryInterest = state.user.primaryInterest;
  // const secondaryInterest = state.user.secondaryInterest;

  const [eventList, setEventList] = useState("events");
  // const [prInterest, setPrInterest] = useState('basketball');
  // const [seInterest, setSeInterest] = useState('soccer');

  // // --------------------  Youtuber method ---------------------------------
  // // useEffect to generate the push token and add that function to our state
  // useEffect(() => {
  //   //create send function promise
  //   const s = createSender();
  //   // add notification listener to trigger event when notification is sent
  //   addNotificationReceivedListener((notification) => {
  //     console.log('Notification coming!');
  //     console.log(notification);
  //   });

  //   //add function to state when send promise is complete
  //   s.then((sendFunc) => {
  //     console.log(typeof sendFunc);
  //     setSender({ sendFunc });
  //   });
  // }, []);

  // //another useEffect that will SEND push alert
  // // this function will run anytime the 'sender' state changes
  // useEffect(() => {
  //   //if the send function exists, send a notification
  //   if (sender && sender.sendFunc instanceof Function) {
  //     console.log(sender);
  //     sender.sendFunc('hello');
  //   }
  // }, [sender]);

  // const handleNotifications = (item) => {
  //   PushNotification.localNotification({
  //     channelId: 'test-channel',
  //     title: 'You clicked on ' + item.title,
  //     message: item.desc,
  //   })
  // }

  // const displayUsersForEvent = () => {

  // }

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

    // const list = trackerApi.get('/api/events/getEvents');
    // setEventList(list);
  };
  const [events] = useState([
    {
      desc: "Basketball game",
      location: "asd",
      day: 25,
      month: 5,
      year: 2022,
      time: "6 PM",
      key: 1,
    },
    {
      desc: "Tennis match",
      location: "asd",
      day: 25,
      month: 5,
      year: 2022,
      time: "6 PM",
      key: 2,
    },
    {
      desc: "Dr Strange 2",
      location: "asd",
      day: 25,
      month: 5,
      year: 2022,
      time: "6 PM",
      key: 3,
    },
    {
      desc: "MSI watch party",
      location: "asd",
      day: 25,
      month: 5,
      year: 2022,
      time: "6 PM",
      key: 4,
    },
    {
      desc: "Watch Tottenham Hotspurs game",
      location: "asd",
      day: 25,
      month: 5,
      year: 2022,
      time: "6 PM",
      key: 5,
    },
    {
      desc: "Chess game",
      location: "asd",
      day: 25,
      month: 5,
      year: 2022,
      time: "6 PM",
      key: 6,
    },
    {
      desc: "Church prayer meeting",
      location: "asd",
      day: 25,
      month: 5,
      year: 2022,
      time: "6 PM",
      key: 7,
    },
    {
      desc: "Bowling game",
      location: "asd",
      day: 25,
      month: 5,
      year: 2022,
      time: "6 PM",
      key: 8,
    },
    {
      desc: "Karaoke",
      location: "asd",
      day: 25,
      month: 5,
      year: 2022,
      time: "6 PM",
      key: 9,
    },
    {
      desc: "Super Smash tourney",
      location: "asd",
      day: 25,
      month: 5,
      year: 2022,
      time: "6 PM",
      key: 10,
    },
  ]);

  // probably want to order the events from closest to furthest dates

  return (
    <View style={styles.container}>
      {/* better for large arrays because it loads the item as you scroll down; not all at once */}
      <Text>Your expo push token: {expoPushToken} </Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      {/* <FlatList
        keyExtractor={(item) => item._id}
        data={events}
        renderItem={({ item }) => (
          <TouchableOpacity
          onPress={() => {handleNotifications(item)}}>
            <View style={styles.row_container}>
              <View style={styles.time_style}>
                <Text
                  style={{ textAlign: "center", fontSize: 16, color: "white" }}
                >
                  {item.time}
                </Text>
              </View>
              <View style={styles.desc_location}>
                <Text
                  style={{
                    fontSize: 20,
                    marginLeft: 10,
                    bottom: 5,
                    flexWrap: "wrap",
                    color: "#db5f4d",
                  }}
                >
                  {item.desc}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    marginLeft: 10,
                    bottom: 5,
                    color: "#db5f4d",
                  }}
                >
                  {item.location}
                </Text>
              </View>

              <View style={styles.date}>
                <Text
                  style={{ textAlign: "center", fontSize: 16, color: "black" }}
                >
                  {item.month} / {item.day}
                </Text>
                <Text
                  style={{ textAlign: "center", fontSize: 16, color: "black" }}
                >
                  {item.year}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      /> */}
      <Button 
      title="Press to schedule a notification"
      onPress={async () => {
        await schedulePushNotification();
      }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  row_container: {
    flexDirection: "row",
    backgroundColor: "#ece6dd",
    marginTop: 24,
    padding: 30,
    borderRadius: 20,
  },
  time_style: {
    backgroundColor: "#530127",
    borderRadius: 5,
    justifyContent: "center",
    fontFamily: "",
    width: 60,
    height: 60,
  },
  desc_location: {
    flexDirection: "column",
    fontSize: 24,
    width: 250,
    flexWrap: "wrap",
  },
  date: {
    flexDirection: "column",
    borderColor: "black",
    borderWidth: 3,
    width: 60,
    height: 60,
    borderRadius: 5,
    justifyContent: "center",
    position: "absolute",
    right: 30,
    top: 30,
    backgroundColor: "#e6b700",
  },
});
