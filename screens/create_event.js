import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  SafeAreaView,
} from "react-native";
import CustomDatePicker from "../components/datepicker";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import trackerApi from "../api/tracker";

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
    // console.log(Object.values(desc).every((value) => value.trim()))
    // console.log(title, location, desc);
    if (title != '' && location != '' && desc != '') {
      return true
    }
    // (values.email != '' && values.password != '' && values.firstName != '' &&
    //            values.userName != '' && values.primaryInterest != '' && values.secondaryInterest != '')

    // return Object.values(title, location, desc).every((value) => value.trim());
  };

  const isValidForm = () => {
    if (isAllFieldsValid(title, location, desc)) return true;
  };

  const onSubmitFormHandler = async (event) => {
    console.log("press the button");
    if (isValidForm()) {
      try {
        const response = await trackerApi.post("/api/events/createEvent",{
          title,
          location,
          desc,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      
      
      //console.log(response);
    }
  };
  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={styles.event_container}>
        <Text style={styles.event_title}>Create an Event!</Text>

        {/* TITLE */}
        <View style={styles.title}>
          <Text style={styles.title_text_style}>Title</Text>
          <View style={styles.border_styles}>
            <TextInput
              style={styles.textInput_style}
              placeholder="Title..."
              placeholderTextColor="#530127"
              onChangeText={onChangeTitleHandler} //whenever text changed in TextInput, it will update the state of that 'title' var
            >
              {title}
            </TextInput>
          </View>
        </View>

        {/* LOCATION */}
        <View style={styles.location}>
          <Text style={styles.title_text_style}>Location</Text>
          <View style={styles.border_styles}>
            <TextInput
              style={styles.textInput_style}
              placeholder="Location..."
              placeholderTextColor="#530127"
              onChangeText={onChangeLocationHandler}
              mode="outlined"
            >
              {location}
            </TextInput>
          </View>
        </View>

        {/* DATE */}
        <View style={styles.date}>
          <Text style={styles.title_text_style}>Date</Text>

          {/* this is a custom Datepicker that I made; how do i grab the date/time state from it and put it on this MakeEventPage's state? */}
          <CustomDatePicker
          value={CustomDatePicker.date}
          //onChangeText={console.log(CustomDatePicker.data)}
          />
        </View>

        {/* DESCRIPTION */}
        <View style={styles.description}>
          <Text style={styles.title_text_style}>Description</Text>
          <View style={styles.border_styles}>
            <TextInput
              style={styles.textInput_style}
              placeholder="Description of event..."
              placeholderTextColor="#530127"
              onChangeText={onChangeDescriptionHandler}
              mode="outlined"
              multiline={true}
            >
              {desc}
            </TextInput>
          </View>
        </View>

        <View style={styles.buttons}>
          <Button
            title="Cancel"
            style={styles.btn_cancel}
            onPress={() => navigation.navigate("Chatroom")}
          />
          <Button
            title="Schedule"
            style={styles.btn_schedule}
            onPress={onSubmitFormHandler}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  );
}

const styles = StyleSheet.create({
  event_container: {
    flexDirection: "column",
    flex: 1,
    marginTop: 25,
    padding: 15,
    backgroundColor: "#ece6dd",
  },
  title: {
    flex: 3,
  },
  title_text_style: {
    color: "#530127",
  },
  textInput_style: {
    flex: 2,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  location: {
    flex: 3,
  },
  date: {
    flex: 5,
  },
  description: {
    flex: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  event_title: {
    textAlign: "center",
    marginTop: 25,
    fontSize: 30,
    color: "#530127",
  },
  border_styles: {
    borderWidth: 3,
    borderRadius: 5,
    borderColor: "#db5f4d",
    flex: 2,
  },
  btn_cancel: {
    padding: 10,
    backgroundColor: "#530127",
  },
  btn_schedule: {
    padding: 10,
    backgroundColor: "#530127",
  },
  form_area: {
    flex: 0.9,
    flexDirection: "column",
  },
});
