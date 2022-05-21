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
        {/* <Text style={styles.title_text_style}>Title</Text> */}

          {/* <TextInput
            style={styles.textInput_style}
            placeholder="Title..."
            placeholderTextColor="#6E6D71"
            onChangeText={onChangeTitleHandler}
          >
            {title}
          </TextInput> */}

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

      <Text>Click "Schedule" once you're done!</Text>
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
    //flex: 2,
    //flexGrow: 0,
    //height: fullHeight*0.1,
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
    //flex: 2,
    //height: fullHeight*0.1,
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
    //flex: 3,
    //height: fullHeight*0.2,
    height: 100,
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
    //flex: 4,
    //height: fullHeight*0.4,
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
  },

  title_text_style: {
    color: "#0e0e52",
    justifyContent: "flex-start",
    paddingTop: 5,
    marginLeft: 15,
    marginRight: 10,
  },
  textInput_style: {
    //flex: 1,
    // borderColor: "gray",
    // borderWidth: 1,
    // borderRadius: 5,
    padding: 5,
    marginLeft: 10,
    //margin: 10,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    flex: 1,
  },
  event_title: {
    textAlign: "center",
    marginTop: 25,
    fontSize: 30,
    color: "#0e0e52",
  },
  // border_styles: {
  //   borderWidth: 3,
  //   borderRadius: 5,
  //   borderColor: "#db5f4d",
  //   flex: 2,
  // },
  cancel_btn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#150578",
    margin: 15,
  },
  sched_btn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#150578",
    margin: 15,
  },
  form_area: {
    flex: 0.9,
    flexDirection: "column",
  },
  btn_textstyle: {
    color: "white",
    textAlign: "center",
  },
});
