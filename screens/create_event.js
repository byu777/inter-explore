import React, {useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  SafeAreaView,
} from "react-native";
import DatePicker from 'react-native-date-picker';

const MakeEventPage = () => {

  const [date, setDate] = useState(new Date());
  return (
    <SafeAreaView style={create_event.event_container}>
      <Text style={create_event.event_title}>Create an Event!</Text>

      <View style={create_event.title}>
        <Text style={create_event.title_text_style}>Title</Text>
        <View style={create_event.border_styles}>
          <TextInput
                style={{
                  flex: 2,
                }}
              ></TextInput>
        </View>
      </View>

      <View style={create_event.location}>
        <Text style={create_event.title_text_style}>Location</Text>
        <View style={create_event.border_styles}>
          <TextInput
                style={{
                  flex: 2,
                }}
              ></TextInput>
        </View>
      </View>

      <View style={create_event.date}>
        <Text style={create_event.title_text_style}>Date</Text>
        {/* <DatePicker date={date} onDateChange={setDate}/> */}
        {/* <View style={create_event.border_styles}>
          <TextInput
                style={{
                  flex: 2,
                }}
              ></TextInput>
        </View> */}
      </View>

      <View style={create_event.description}>
        <Text style={create_event.title_text_style}>Description</Text>
        <View style={create_event.border_styles}>
          <TextInput
                style={{
                  flex: 2,
                }}
              ></TextInput>
        </View>
      </View>

      <View style={create_event.buttons}>
        <Button
          title="Cancel"
          style={create_event.btn_cancel}
          onPress={() =>
            Alert.alert("Members", "Members of Basketball", [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel pressed"),
                style: "cancel",
              },
            ])
          }
        />
        <Button
          title="Schedule"
          style={create_event.btn_schedule}
          onPress={() =>
            Alert.alert("Success", "Event was successfully created.", [
              {
                text: "OK",
                onPress: () => console.log("OK pressed"),
                style: "ok",
              },
            ])
          }
        />
      </View>
    </SafeAreaView>
  );
};

const create_event = StyleSheet.create({
  event_container: {
    flexDirection: "column",
    flex: 1,
    marginTop: 25,
    padding: 15,
    backgroundColor: "#e6b700",
  },
  title: {
    flex: 3,
  },
  title_text_style: {
    color: "#530127",
  },
  location: {
    flex: 3,
  },
  date: {
    flex: 3,
  },
  description: {
    flex: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  event_title: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 35,
  },
  border_styles: {
    borderWidth: 3,
    borderRadius: 5,
    borderColor: "#db5f4d",
    flex: 2,
  },
  btn_cancel: {
    padding: 10,
    backgroundColor: '#530127',
  },
  btn_schedule: {
    padding: 10,
    backgroundColor: '#530127',
  },
});

export default MakeEventPage;
