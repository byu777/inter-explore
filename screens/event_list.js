import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import trackerApi from "../api/tracker";
import { Context as AuthContext } from "./../context/AuthContext";
import PushNotification from "react-native-push-notification";

export default function EventList() {
  const { state } = useContext(AuthContext);
  const primaryInterest = state.user.primaryInterest;
  const secondaryInterest = state.user.secondaryInterest;

  const [eventList, setEventList] = useState("events");
  // const [prInterest, setPrInterest] = useState('basketball');
  // const [seInterest, setSeInterest] = useState('soccer');

  // useEffect() will run whenever the 'eventList' variable changes
  useEffect(() => {
    // const list = trackerApi.get('/events/getEvents');
    // setEventList(list);
    console.log("event list updated");
  }, [eventList]);

  const handleNotifications = (item) => {
    PushNotification.localNotification({
      channelId: 'test-channel',
      title: 'You clicked on ' + item.title,
      message: item.desc,
    })
  }

  const displayUsersForEvent = () => {
    
  }

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
      <FlatList
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
      />
      <Button onClick={fetchEventList}></Button>
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
