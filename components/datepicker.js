import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  SafeAreaView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CustomDatePicker() {
  //Create states
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date"); //change between timeMode and dateMode
  const [show, setShow] = useState(false); //boolean tells us to show box or not
  const [text, setText] = useState("Empty"); //

  //handles what happens when we change the date
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date; //use 'selectedDate' ; otherwise, use the 'date'
    setShow(Platform.OS === "ios"); //if platform is IOS
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let formatDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear(); //formatted Date
    let formatTime =
      "Hours: " + tempDate.getHours() + " | Minutes: " + tempDate.getMinutes();
    setText(formatDate + "\n" + formatTime);

    console.log(formatDate + " (" + formatTime + ")"); // for debugging
  };

  //function to change between modes
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View style={styles.container}>
      <View style={styles.btn_container}>
        <View style={styles.date_btn}>
          <Button title="Date" onPress={() => showMode("date")} />
        </View>

        <View style={styles.time_btn}>
          <Button title="Time" onPress={() => showMode("time")} />
        </View>
      </View>

      <Text style={{ color: '#530127', fontSize: 15 }}>{text}</Text>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
    justifyContent: 'flex-start',
  },
  btn_container: {
      flexDirection: 'column',
      padding: 15,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
  },
  date_btn: {
    backgroundColor: "red",
    borderRadius: 10,
    margin: 5,
  },
  time_btn: {
    backgroundColor: "red",
    borderRadius: 10,
    margin: 5,
  },
});
