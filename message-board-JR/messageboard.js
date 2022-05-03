import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const MessageBoardPage = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* make as many screens as you want; order doesnt matter */}
        <Stack.Screen
          name="MessageBoard"
          component={MessageBoardScreen}
          options={{ title: "Inbox" }}
        />

        {/* headerTitleAlign -> center the title */}
        <Stack.Screen style={cont_styles.text_center}
          name="Chatrooms"
          component={ChatroomScreen}
          options={{ title: "Jim" , headerTitleAlign: "center",}}
        />

        <Stack.Screen
          name="EventBoard"
          component={EventScreen}
          options={{ title: "Your Events" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// ---------------------------Message Board page ------------------------------
const MessageBoardScreen = ({ navigation }) => {
  const [text, onChangeText] = React.useState("");
  return (
    <View style={cont_styles.container}>
      <View style={cont_styles.textinput_cont}>
        <TextInput
          style={cont_styles.textinput_search}
          onChangeText={onChangeText}
          placeholder="useless placeholder"
          value={text} //allows alphanumeric input into TextInput
        />
      </View>

      <View style={cont_styles.button_chat}>
        <Button
          title="Go"
          onPress={() => navigation.navigate("Chatrooms", { name: "Jane" })}
        />
      </View>

      {/* Created a custom component, and nest it inside the 'MAIN' View */}
      <MessageBoardLayout></MessageBoardLayout>
    </View>
  );
};

// ---------------------------Chatroom page ------------------------------
const ChatroomScreen = ({ navigation }) => {
  return (
    <View style={cont_styles.container}>
      <Text style={mb_styles.baseText}>
        I am bold
        <Text style={mb_styles.innerText}> and red</Text>
      </Text>
      <Button
        title="Go"
        onPress={() => navigation.navigate("EventBoard", { name: "Jane" })}
      />
    </View>
  );
};

// ---------------------------Events page ------------------------------
const EventScreen = ({ navigation }) => {
  return (
    <View style={cont_styles.container}>
      <Text style={mb_styles.baseText}>
        I am bold
        <Text style={mb_styles.innerText}> and red</Text>
      </Text>

      <Button
        title="Create Event"
        onPress={() => navigation.navigate("EventBoard", { name: "Jane" })}
      />
    </View>
  );
};

// --------------------------- flex for MessageBoard -----------------------------
const MessageBoardLayout = () => (
  <View>
    <View style={cont_styles.chat_container}>
      <View style={cont_styles.box1} />

      <View style={cont_styles.box2} />

      <View style={cont_styles.box3} />

      <View style={cont_styles.box4} />
    </View>
  </View>
);

// ------------------------------- STYLING ---------------------------------

// style sheet for message board page
const cont_styles = StyleSheet.create({
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
    width: 350,
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 30,
  },
  textinput_search: {
    flex: 1,
    fontSize: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    textAlign: "center",
    
  },
  chat_container: {
    flexDirection: "column",
    justifyContent: "flex-end", //causes the chat container to start from bottom
    height: 600,
    padding: 20,
  },
  box1: {
    backgroundColor: "red",
    flex: 1,
    margin: 10,
  },
  box2: {
    backgroundColor: "green",
    flex: 1,
    margin: 10,
  },
  box3: {
    backgroundColor: "yellow",
    flex: 1,
    margin: 10,
  },
  box4: {
    backgroundColor: "purple",
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
const mb_styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: "orange",
  },



  inboxText: {
    fontWeight: "bold",
    flex: 1,
    alignItems: "flex-start",
    fontSize: 25,
  },
  innerText: {
    color: "red",
  },
});

export default MessageBoardPage;
