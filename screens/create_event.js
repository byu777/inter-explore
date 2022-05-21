import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  SafeAreaView,
  Pressable,
  Dimensions,
} from "react-native";
import CustomDatePicker from "../components/datepicker";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import trackerApi from "../api/tracker";

let fullHeight = Dimensions.get("window").height;

export default function MakeEventPage({ navigation }) {
  const [title, setTitle] = useState(null);
  const [location, setLocation] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [desc, setDesc] = useState(null);

  const onChangeTitleHandler = (title) => {
    setTitle(title);
  };

  const onChangeLocationHandler = (location) => {
    setLocation(location);
  };

  // const onChangeDateHandler = (date) => {
  //   setDate(date);
  // }

  // const onChangeTimeHandler = (time) => {
  //   setTime(time);
  // }

  const onChangeDescriptionHandler = (desc) => {
    setDesc(desc);
  };

  //checks if title, location, desc fields are empty
  const isAllFieldsValid = (title, location, desc) => {
    if (title != "" && location != "" && desc != "") {
      return true;
    }
  };

  const isValidForm = () => {
    if (isAllFieldsValid(title, location, desc)) return true;
  };

  const onSubmitFormHandler = async (event) => {
    console.log("press the button");
    // if the input is valid (title, desc, etc...) create a response and POST it using the proper route
    if (isValidForm()) {
      try {
        const response = await trackerApi.post("/api/events/createEvent", {
          title,
          location,
          desc,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please fill in all fields before scheduling!")
    }
  };
  return (
    <SafeAreaView style={styles.event_container}>
      <Text style={styles.event_title}>Create an Event!</Text>

      <Text style={styles.title_text_style}>Title</Text>
      <View style={styles.title}>
        <TextInput
          style={styles.textInput_style}
          placeholder="Title..."
          placeholderTextColor="#6E6D71"
          onChangeText={onChangeTitleHandler}
        >
          {title}
        </TextInput>

      </View>

      <Text style={styles.title_text_style}>Location</Text>
      <View style={styles.location}>
      <TextInput
            style={styles.textInput_style}
            placeholder="Location..."
            placeholderTextColor="#6E6D71"
            onChangeText={onChangeLocationHandler}
            mode="outlined"
          >
            {location}
          </TextInput>

      </View>
      <Text style={styles.title_text_style}>Description</Text>
      <View style={styles.description}>
      <TextInput
            style={styles.textInput_style}
            placeholder="Description of event..."
            placeholderTextColor="#6E6D71"
            onChangeText={onChangeDescriptionHandler}
            mode="outlined"
            multiline={true}
          >
            {desc}
          </TextInput>

      </View>

      <Text style={styles.title_text_style}>Date</Text>
      <View style={styles.date}>
        {/* this is a custom Datepicker that I made; how do i grab the date/time state from it and put it on this MakeEventPage's state? */}
        <CustomDatePicker
          value={CustomDatePicker.date}
          style={styles.datepicker}
        />
      </View>

      <Text style={styles.bottom_text}>Click "Schedule" once you're done!</Text>
      <View style={styles.buttons}>
        <Pressable
          style={styles.cancel_btn}
          onPress={() => navigation.navigate("Chatroom")}
        >
          <Text style={styles.btn_textstyle}>Cancel</Text>
        </Pressable>

        <Pressable style={styles.sched_btn} onPress={onSubmitFormHandler}>
          <Text style={styles.btn_textstyle}>Schedule</Text>
        </Pressable>
        {/* <Button
          title="Cancel"
          style={styles.btn_cancel}
          onPress={() => navigation.navigate("Chatroom")}
        />
        <Button
          title="Schedule"
          style={styles.btn_schedule}
          onPress={onSubmitFormHandler}
        /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  event_container: {
    flexDirection: "column",
    flex: 1,
    marginTop: 25,
    marginBottom: 20,
    padding: 25,
    backgroundColor: "white",
  },
  title: {
    borderRadius: 3,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: "#0e0e52",
    shadowOpacity: 0.8,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.5,
    },
    elevation: 5,
  },
  location: {
    borderRadius: 3,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: "#0e0e52",
    shadowOpacity: 0.8,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.5,
    },
    elevation: 5,
  },
  date: {

    height: 100,
    flexGrow: 1,
    justifyContent: 'space-around',
    alignContent: 'space-around',
    borderRadius: 3,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: "#0e0e52",
    shadowOpacity: 0.8,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.5,
    },
    elevation: 5,
  },
  description: {

    flexGrow: 1,
    borderRadius: 3,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: "#0e0e52",
    shadowOpacity: 0.8,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.5,
    },
    elevation: 5,
  },
  datepicker: {
    justifyContent: "space-around",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    paddingTop: 10,
  },

  title_text_style: {
    color: "#0e0e52",
    justifyContent: "flex-start",
    paddingTop: 5,
    marginLeft: 15,
    marginRight: 10,
  },
  bottom_text: {
    color: "#0e0e52",
    justifyContent: "center",
    textAlign: 'center',
    paddingTop: 5,
    marginLeft: 15,
    marginRight: 10,
  },
  textInput_style: {
    padding: 5,
    marginLeft: 10,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    flex: 1,
    //flexGrow: 1,
  },
  event_title: {
    textAlign: "center",
    marginTop: 25,
    fontSize: 30,
    color: "#0e0e52",
  },

  cancel_btn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#150578",
    margin: 10,
  },
  sched_btn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#150578",
    margin: 10,
  },
  btn_textstyle: {
    color: "white",
    textAlign: "center",
  },
});
