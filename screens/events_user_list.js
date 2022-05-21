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

export default function EventUserListModal() {
  const [loaded] = useFonts({
    Asap: require("../assets/fonts/Asap-Bold.ttf"),
  });
  const DATA = [
    {
      id: "1",
      title: "Jason",
    },
    {
      id: "2",
      title: "Johnny",
    },
    {
      id: "3",
      title: "Gabe",
    },
    {
      id: "4",
      title: "Emily",
    },
    {
      id: "5",
      title: "Lillian",
    },
    {
      id: "6",
      title: "Josh",
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

  const [isVisible, setisVisible] = useState(false);

  const [itemCount, setItemCount] = useState(3);

  const eventItem = ({ item }) => (
    <View style={EventListModalStyles.eventSeparator}>
      <Text style={EventListModalStyles.eventInfo}>{item.title}</Text>
    </View>
  );

  return (
    //   render first 3 items, then have button to load more
    <View style={EventListModalStyles.modalEnclosingView}>
      <Text style={EventListModalStyles.modalTitleText}>People attending event</Text>
      <FlatList data={DATA} renderItem={eventItem} />
      <View>
        <Button
          icon="close"
          mode="contained"
          onPress={() => setisVisible(true)}
          style={EventListModalStyles.modalClosingButton}
          labelStyle={{color: "white"}}
          uppercase={false}
        >
          Close
        </Button>
        <Modal visible={isVisible} transparent={true}>
          <View style={{backgroundColor:"grey"}}>
            <Text>test</Text>
            <Button
              icon="close"
              mode="contained"
              onPress={() => setisVisible(false)}
              style={EventListModalStyles.modalClosingButton}
              labelStyle={{color: "white"}}
              uppercase={false}
            >
              Close
            </Button>
          </View>
        </Modal>
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
    borderRadius: 10,
    width: 150,
    alignSelf: "center",
    backgroundColor: "#FFB703",
    margin: 5
  },
  eventSeparator: {
    borderColor: "black",
    padding: 10,
    margin: 5,
    borderRadius: 20,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#023047",
    justifyContent: "center"
  },
  buttons: {
    color: "#FBB703",
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 5,
    flex: 1,
    flexDirection: "row",
  },
  eventInfo: {
    fontFamily: "Asap",
    color: "white",
  },
});
