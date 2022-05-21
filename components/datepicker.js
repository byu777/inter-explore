import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  Platform,
  Dimensions,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CustomDatePicker() {
  //Create states
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date"); //change between timeMode and dateMode
  const [show, setShow] = useState(false); //boolean tells us to show box or not
  const [text, setText] = useState(""); //

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
      <Pressable style={styles.date_btn} onPress={() => showMode("date")}>
        <Text style={styles.textstyle}>Date</Text>
      </Pressable>

      <Pressable style={styles.time_btn} onPress={() => showMode("time")}>
        <Text style={styles.textstyle}>Time</Text>
      </Pressable>
      {/* <View style={styles.btn_container}>
        <View style={styles.date_btn}>
          <Button title="Date" onPress={() => showMode("date")} />
        </View>
        <Pressable style={styles.date_btn} onPress={() => showMode("date")}>
          <Text style={styles.textstyle}>Date</Text>
        </Pressable>

        <Pressable style={styles.time_btn} onPress={() => showMode("time")}>
          <Text style={styles.textstyle}>Time</Text>
        </Pressable>

        <View style={styles.time_btn}>
          <Button title="Time" onPress={() => showMode("time")} />
        </View>
      </View> */}

      <Text style={{ color: "#0e0e52", fontSize: 15, textAlign: 'center', marginTop: 10, }}>{text}</Text>

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
    justifyContent: "space-evenly",
    backgroundColor: "transparent",
    alignItems: "center",
    padding: 10,
    flexDirection: "column",
  },
  // btn_container: {
  //   flexDirection: "column",
  //   padding: 5,
  //   // alignItems: 'flex-start',
  //   // justifyContent: 'flex-start',
  // },
  date_btn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: "#150578",
    margin: 10,
    color: "white",
  },
  time_btn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 4,
    backgroundColor: "#150578",
  },
  textstyle: {
    color: "white",
    textAlign: "center",
    elevation: 3,
  },
});
