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
import { useFonts } from "expo-font";

export default function EventListModal() {
  const [loaded] = useFonts({
    Asap: require("../assets/fonts/Asap-Bold.ttf"),
  });

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
      <View style={{ flex: 1, flexDirection: "column", padding: 10 }}>
        <Text style={EventListModalStyles.eventInfo}>Title: {item.title}</Text>
        <Text style={EventListModalStyles.eventInfo}>
          Location: {item.location}
        </Text>
        <Text style={EventListModalStyles.eventInfo}>Time: {item.time}</Text>
      </View>
      <Button
        icon="account"
        mode="contained"
        onPress={() => console.log("Closed")}
        style={{
          justifyContent: "center",
          width: 150,
          backgroundColor: "#FFB703",
          borderRadius: 20
        }}
        uppercase={false}
        labelStyle={{color: "red"}}
        compact={true}
      >
        Members
      </Button>
    </View>
  );

  return (
    //   render first 3 items, then have button to load more
    <View style={EventListModalStyles.modalEnclosingView}>
      <Text style={EventListModalStyles.modalTitleText}>Upcoming events</Text>
      <FlatList
        data={DATA.slice(0, itemCount)}
        renderItem={eventItem}
      />
      <View>
        <Button
          icon="reload"
          mode="contained"
          onPress={() => {
            setItemCount(itemCount + 3);
          }}
          style={EventListModalStyles.actionButtons}
          uppercase={false}
          labelStyle={{color: "red"}}
        >
          Load more
        </Button>
        <Button
          icon="close"
          mode="contained"
          onPress={() => console.log("Closed")}
          style={EventListModalStyles.actionButtons}
          uppercase={false}
          labelStyle={{color: "red"}}
        >
          Close
        </Button>
      </View>
    </View>
  );
}

const EventListModalStyles = StyleSheet.create({
  modalEnclosingView: {
    backgroundColor: "white",
    borderColor: "gray",
    borderRadius: 20,
    flex: 1,
    margin: 20,
    padding: 20
  },
  modalTitleText: {
    fontSize: 25,
    color: "#FFB703",
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
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
    padding: 10,
    margin: 5,
    borderRadius: 20,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#023047"
  },
  eventInfo: {
    fontFamily: "Asap",
    color: "white"
  },
  actionButtons: {
    borderRadius: 10,
    width: 150,
    alignSelf: "center",
    backgroundColor: "#FFB703",
    margin: 5
  }
});
