import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  SafeAreaView,
} from "react-native";

const MakeEventPage = () => {
    return (
      <SafeAreaView>
        <View style={create_event.event_container}>
          <View style={create_event.title}>
            <Text
              style={{
                flex: 1,
                color: "black",
              }}
            >
              Title
            </Text>
            <View
              style={{
                borderWidth: 2,
                borderColor: "blue",
                flex: 2,
              }}
            >
              {/* <TextInput
                style={{
                  flex: 2,
                }}
              ></TextInput> */}
            </View>
          </View>
  
          <View style={create_event.location}>
            <Text
              style={{
                flex: 1,
                color: "black",
              }}
            >
              Location
            </Text>
            <View
              style={{
                borderWidth: 2,
                borderColor: "blue",
                flex: 2,
              }}
            >
              {/* <TextInput
                style={{
                  flex: 2,
                }}
              ></TextInput> */}
            </View>
          </View>
  
          <View style={create_event.date}>
            <Text
              style={{
                flex: 1,
                color: "black",
              }}
            >
              Date
            </Text>
            <View
              style={{
                borderWidth: 2,
                borderColor: "blue",
                flex: 2,
              }}
            >
              {/* <TextInput
                style={{
                  flex: 2,
                }}
              ></TextInput> */}
            </View>
          </View>
  
          <View style={create_event.description}>
            <Text
              style={{
                flex: 1,
                color: "black",
              }}
            >
              Description
            </Text>
            <View
              style={{
                borderWidth: 2,
                borderColor: "blue",
                flex: 9,
              }}
            >
              {/* <TextInput
                style={{
                  flex: 2,
                }}
              ></TextInput> */}
            </View>
          </View>
  
          <View style={create_event.buttons}>
            <Button
              title="Cancel"
              style={{ padding: 10 }}
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
        </View>
      </SafeAreaView>
    );
  };

  const create_event = StyleSheet.create({
    event_container: {
      flexDirection: "column",
      height: 500,
      margin: 25,
    },
    title: {
      flex: 3,
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
  });
  

  export default MakeEventPage;