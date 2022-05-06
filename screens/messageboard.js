import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
} from "react-native";

// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// const Stack = createNativeStackNavigator();

// const MessageBoardPage = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {/* make as many screens as you want; order doesnt matter */}
//         <Stack.Screen
//           name="MessageBoard"
//           component={MessageBoardLayout}
//           options={{ title: "Inbox" }}
//         />

//         {/* headerTitleAlign -> center the title */}
//         <Stack.Screen
//           style={mb_styles.text_center}
//           name="Chatrooms"
//           component={ChatroomScreen}
//           // ********* is it better to create event from the Stack using alert or is there a dialog box equivalent?   **************
//           // **********************************************************************
//           options={{
//             title: "Basketball", //rename this to a group-name or name of person if 1:1 chat
//             headerTitleAlign: "center",
//           }}
//         />

//         <Stack.Screen
//           name="EventBoard"
//           component={EventBoard}
//           options={{ title: "Your Events" }}
//         />

//         <Stack.Screen
//           name="MakeEvent"
//           component={MakeEventPage}
//           options={{ 
//             title: "Create an Event",
//             headerTitleAlign: "center",
//           }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// ---------------------------Message Board page ------------------------------
// const MessageBoardScreen = ({ navigation }) => {
//   const [text, onChangeText] = React.useState("");
//   return (
    // <View style={mb_styles.container}>
    //   <View style={mb_styles.textinput_cont}>
    //     <TextInput
    //       style={mb_styles.textinput_search}
    //       onChangeText={onChangeText}
    //       placeholder="search.."
    //       value={text} //allows alphanumeric input into TextInput
    //     />
    //   </View>

    //   <View style={mb_styles.button_chat}>
    //     <Button
    //       title="Go"
    //       onPress={() => navigation.navigate("Chatrooms", { name: "Jane" })}
    //     />
    //   </View>

//       {/* Created a custom component, and nest it inside the 'MAIN' View */}
//       <MessageBoardLayout></MessageBoardLayout>
//     </View>
//   );
// };

// --------------------------- Message Board page -----------------------------
const MessageBoardPage = () => {
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


// ***------------------------------- STYLING ---------------------------------*********************

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
    justifyContent: "flex-end", 
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


export default MessageBoardPage;
