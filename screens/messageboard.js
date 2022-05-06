import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import { Alert } from "react-native-web";

const Stack = createNativeStackNavigator();

const MessageBoardPage = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* make as many screens as you want; order doesnt matter */}
        <Stack.Screen
          name="MessageBoard"
          component={MessageBoardLayout}
          options={{ title: "Inbox" }}
        />

        {/* headerTitleAlign -> center the title */}
        <Stack.Screen
          style={mb_styles.text_center}
          name="Chatrooms"
          component={ChatroomScreen}
          // ********* is it better to create event from the Stack using alert or is there a dialog box equivalent?   **************
          // **********************************************************************
          options={{
            title: "Basketball", //rename this to a group-name or name of person if 1:1 chat
            headerTitleAlign: "center",
          }}
        />

        <Stack.Screen
          name="EventBoard"
          component={EventBoard}
          options={{ title: "Your Events" }}
        />

        <Stack.Screen
          name="MakeEvent"
          component={MakeEventPage}
          options={{ 
            title: "Create an Event",
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// ---------------------------Message Board page ------------------------------
// const MessageBoardScreen = ({ navigation }) => {
//   const [text, onChangeText] = React.useState("");
//   return (
//     <View style={mb_styles.container}>
//       <View style={mb_styles.textinput_cont}>
//         <TextInput
//           style={mb_styles.textinput_search}
//           onChangeText={onChangeText}
//           placeholder="search.."
//           value={text} //allows alphanumeric input into TextInput
//         />
//       </View>

//       <View style={mb_styles.button_chat}>
//         <Button
//           title="Go"
//           onPress={() => navigation.navigate("Chatrooms", { name: "Jane" })}
//         />
//       </View>

//       {/* Created a custom component, and nest it inside the 'MAIN' View */}
//       <MessageBoardLayout></MessageBoardLayout>
//     </View>
//   );
// };

// --------------------------- Message Board page -----------------------------
const MessageBoardLayout = ({ navigation }) => {
  const [text, onChangeText] = React.useState("");
  return (
    <View>
      <View style={mb_styles.textinput_cont}>
        <TextInput
          style={mb_styles.textinput_search}
          onChangeText={onChangeText}
          placeholder="search.."
          value={text} //allows alphanumeric input into TextInput
        />
      </View>

      {/* inbox container */}
      <View style={mb_styles.mb_chat_container}>
        <View style={mb_styles.list_item_inbox}>
          <View style={mb_styles.mb_image_container}>
            <Image
              style={mb_styles.mb_image_container}
              source={require("../assets/favicon/favicon.png")}
            ></Image>
            <Button
              title="Go"
              onPress={() => navigation.navigate("Chatrooms", { name: "Jane" })}
            />
          </View>
          <View style={mb_styles.list_item_description}>
            <Text style={{ flexShrink: 1 }}>
              lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
            </Text>
            <Text style={{ flexShrink: 1 }}>
              lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
            </Text>
          </View>
        </View>

        <View style={mb_styles.list_item_inbox}>
          <View style={mb_styles.mb_image_container}>
            <Image
              style={mb_styles.mb_image_container}
              source={require("../assets/favicon/favicon.png")}
              onPress={() => navigation.navigate("Chatrooms", { name: "Jane" })}
            ></Image>
            <Button
              title="Go"
              onPress={() => navigation.navigate("Chatrooms", { name: "Jane" })}
            />
          </View>
          <View style={mb_styles.list_item_description}>
            <Text style={{ flexShrink: 1 }}>
              lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
            </Text>
            <Text style={{ flexShrink: 1 }}>
              lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
            </Text>
          </View>
        </View>

        <View style={mb_styles.list_item_inbox}>
          <View style={mb_styles.mb_image_container}>
            <Image
              style={mb_styles.mb_image_container}
              source={require("../assets/favicon/favicon.png")}
              onPress={() => navigation.navigate("Chatrooms", { name: "Jane" })}
            ></Image>
            <Button
              title="Go"
              onPress={() => navigation.navigate("Chatrooms", { name: "Jane" })}
            />
          </View>
          <View style={mb_styles.list_item_description}>
            <Text style={{ flexShrink: 1 }}>
              lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
            </Text>
            <Text style={{ flexShrink: 1 }}>
              lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
            </Text>
          </View>
        </View>

        <View style={mb_styles.list_item_inbox}>
          <View style={mb_styles.mb_image_container}>
            <Image
              style={mb_styles.mb_image_container}
              source={require("../assets/favicon/favicon.png")}
            ></Image>
            <Button
              title="Go"
              onPress={() => navigation.navigate("Chatrooms", { name: "Jane" })}
            />
          </View>
          <View style={mb_styles.list_item_description}>
            <Text style={{ flexShrink: 1 }}>
              lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
            </Text>
            <Text style={{ flexShrink: 1 }}>
              lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// ---------------------------Chatroom page ------------------------------
const ChatroomScreen = ({ navigation }) => {
  return (
    // main container
    <View style={chatroom_styles.main_container}>
      {/* container for member list */}
      <View style={chatroom_styles.member_container}>
        {/* pull names from group collection and populate here */}
        <Text>Eric, Richard, Justin, Gabriel, Johnny...</Text>
        <Button
          title="Members"
          style={{ padding: 10 }}
          onPress={() =>
            Alert.alert("Members", "Members of Basketball", [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel pressed"),
                style: "cancel",
              },
              {
                text: "OK",
                onPress: () => console.log("OK pressed"),
                style: "ok",
              },
            ])
          }
        />
      </View>

      {/* container for chat messages area */}
      <View style={chatroom_styles.chat_area}>
        <View style={chatroom_styles.chat_row}>
          <View style={chatroom_styles.image_container}>
            <Image
              style={chatroom_styles.image_container}
              source={require("../assets/favicon/favicon.png")}
            ></Image>
          </View>
          <Text>
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          </Text>
        </View>

        <View style={chatroom_styles.chat_row}>
          <View style={chatroom_styles.image_container}>
            <Image
              style={chatroom_styles.image_container}
                            source={require("../assets/favicon/favicon.png")}
            ></Image>
          </View>
          <Text>
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          </Text>
        </View>

        <View style={chatroom_styles.chat_row}>
          <View style={chatroom_styles.image_container}>
            <Image
              style={chatroom_styles.image_container}
                            source={require("../assets/favicon/favicon.png")}
            ></Image>
          </View>
          <Text>
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          </Text>
        </View>

        <View style={chatroom_styles.chat_row}>
          <View style={chatroom_styles.image_container}>
            <Image
              style={chatroom_styles.image_container}
                            source={require("../assets/favicon/favicon.png")}
            ></Image>
          </View>
          <Text>
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          </Text>
        </View>

        <View style={chatroom_styles.chat_row}>
          <View style={chatroom_styles.image_container}>
            <Image
              style={chatroom_styles.image_container}
                            source={require("../assets/favicon/favicon.png")}
            ></Image>
          </View>
          <Text>
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          </Text>
        </View>
      </View>

      <View style={chatroom_styles.make_event}>
        <Button
          onPress={() => navigation.navigate("MakeEvent", { name: "" })} //add dialog box to input details
          title="Make Event"
          color="orange"
        />
      </View>
    </View>
  );
};

// -------------------------- CREATE AN EVENT PAGE -------------------------------------
const MakeEventPage = () => {
  return (
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
          <TextInput
            style={{
              flex: 2,
            }}
          ></TextInput>
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
          <TextInput
            style={{
              flex: 2,
            }}
          ></TextInput>
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
          <TextInput
            style={{
              flex: 2,
            }}
          ></TextInput>
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
  );
};

// ---------------------------LIST OF EVENTS page ------------------------------
// havent made yet!!!!!!!!!!!!!!!!!
const EventBoard = ({ navigation }) => {
  return (
    <View style={chatroom_styles.container}>
      <Text style={chatroom_styles.baseText}>
        I am bold
        <Text style={chatroom_styles.innerText}> and red</Text>
      </Text>

      <Button
        title="Create Event"
        onPress={() => navigation.navigate("EventBoard", { name: "Jane" })}
      />
    </View>
  );
};

// ***------------------------------- STYLING ---------------------------------*********************

// style sheet for message board page
const mb_styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: "lightyellow",
  },
  text_center: {
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  textinput_cont: {
    borderWidth: 1,
    borderColor: "black",
    height: 40,
    width: 300,
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 30,
  },
  textinput_search: {
    flex: 1,
    fontSize: 20,
    alignSelf: "flex-start",
    margin: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    textAlign: "center",
  },
  mb_chat_container: {
    flexDirection: "column",
    justifyContent: "flex-end", //causes the chat container to start from bottom
    height: 600,
    padding: 10,
    marginRight: 20,
  },
  mb_image_container: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 5,
  },
  list_item_description: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    flex: 1,
  },
  list_item_inbox: {
    flexDirection: "row",
    flex: 1,
    margin: 10,
  },
  button_chat: {
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    width: 75,
    marginTop: 30,
  },
});

// style sheet for chatroom page
const chatroom_styles = StyleSheet.create({
  main_container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 500,
  },
  member_container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "center",
    alignItems: "center",
    flex: 1,
    margin: 20,
    flex: 5,
    flexWrap: "wrap",
  },
  // chat_container: {
  //   flexDirection: "column",
  //   flex: 0.2,
  //   marginTop: 8,
  //   backgroundColor: "transparent",
  // },
  image_container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
  },
  chat_area: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    margin: 25,
    flex: 40,
  },

  chat_row: {
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    margin: 5,
  },
  make_event: {
    marginBottom: 15,
  },
});

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

export default MessageBoardPage;
