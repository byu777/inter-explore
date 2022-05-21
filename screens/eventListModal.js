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
import { Button } from "react-native-paper";
import { useFonts } from 'expo-font';

export default function EventListModal() {
    const [loaded] = useFonts({
    Asap: require("../assets/fonts/Asap-Bold.ttf"),
    });
  const DATA = [
    {
      id: "1",
      title: "First Item - test",
      time: "16:00",
      location: "Time square",
    },
    {
      id: "2",
      title: "Second Item",
      time: "16:00",
      location: "Dundas",
    },
    {
      id: "3",
      title: "Third Item",
      time: "16:00",
      location: "Art gallery",
    },
    {
      id: "4",
      title: "Fourth",
      time: "16:00",
      location: "Time square",
    },
    {
      id: "5",
      title: "Fifth",
      time: "16:00",
      location: "Dundas",
    },
    {
      id: "6",
      title: "Sixth",
      time: "16:00",
      location: "Art gallery",
    },
    {
      id: "7",
      title: "Seventh",
      time: "16:00",
      location: "Time square",
    },
    {
      id: "8",
      title: "Eigth",
      time: "16:00",
      location: "Dundas",
    },
    {
      id: "9",
      title: "Ninth",
      time: "16:00",
      location: "Art gallery",
    },
  ];
  const [eventsData, setEventsData] = useState([]);

//   const fetchData = () => {
//       try {
//             const response = await trackerApi.get("/api/events/getEvents");
//             console.log(response.data);
//             setEventsData(response.data)
//         } catch (error) {
            
//         }
//     }


  const [itemCount, setItemCount] = useState(3);

  const eventItem = ({ item }) => (
    <View style={EventListModalStyles.eventSeparator}>
      <Text style={EventListModalStyles.eventInfo}>Title: {item.title}</Text>
      <Text style={EventListModalStyles.eventInfo}>Location: {item.location}</Text>
      <Text style={EventListModalStyles.eventInfo}>Time: {item.time}</Text>
      <Button
        icon="account"
        mode="contained"
        onPress={() => console.log("Closed")}
      >
        Attending list
      </Button>
    </View>
  );

  const loadMore = 1;

  return (
    //   render first 3 items, then have button to load more
    <View style={EventListModalStyles.modalEnclosingView}>
        <View>
      <Text style={EventListModalStyles.modalTitleText}>Upcoming events</Text>
      <FlatList data={DATA.slice(0, itemCount)} renderItem={eventItem} initialNumToRender={3}/>
      <View style={{backgroundColor:"yellow"}}>
        </View>
      <Button
        icon="reload"
        mode="contained"
        onPress={() => {
            setItemCount(itemCount + 3);
            
        }}
        style={{borderRadius: 10}}
      >
        Load more
      </Button>
      <Button
        icon="close"
        mode="contained"
        onPress={() => console.log("Closed")}
        disabled={true}
      >
        Close
      </Button>
    </View>
    </View>
   
  );
}

const EventListModalStyles = StyleSheet.create({
  modalEnclosingView: {
    backgroundColor: "#023047",
    borderWidth: 5,
    borderColor: "#FFB703",
    borderRadius: 20,
    flex: 1,
  },
  modalTitleText: {
    fontSize: 25,
    color: "#FFB703",
    fontWeight: "bold",
    textAlign: "center",
    padding: 10
  },
  modalClosingButton: {
    shadowColor: "#2AC062",
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowRadius: 25,
  },
  eventSeparator: {
    borderColor: "black",
    borderWidth: 5,
    borderRadius: 10,
  },
  buttons: {
    color: "#FBB703",
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 5,
  },
  eventInfo: {
      fontFamily: 'Asap'
  }
});
