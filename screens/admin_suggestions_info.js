import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import trackerApi from "../api/tracker";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";

export default function AdminSuggestionsInfo({ route, navigation }) {
  const { suggestionName, suggestionId } = route.params;
  const [inputText, setInputText] = useState("");
  /**
   * Adds the suggestion to the 'interests' collection.
   * @param {string} InterestName name of the interest
   */
  async function addToInterests(InterestName) {
    const response = await trackerApi.post("/api/suggestions/addToInterests", {
      InterestName,
    });
    console.log(response);
  }

  /**
   * Deletes item from suggestions collection.
   * @param {string} suggestionId Unique auto-generated ID of suggestion
   * @param {string} suggestionName Name of the suggestion
   */
  async function deleteFromSuggestions(suggestionId, suggestionName) {
    const response = await trackerApi.delete(
      "/api/suggestions/deleteSuggestion",
      { data: { suggestionId, suggestionName } }
    );
    console.log(response.data);
  }

  async function updateSuggestion(InterestNameOld, InterestNameNew) {
    const response = await trackerApi.put("/api/suggestions/updateInterest", {
      InterestNameOld,
      InterestNameNew,
    });
    console.log(response);
    Alert.alert("Updated suggestion", InterestNameOld + " has been changed to " + InterestNameNew);
    navigation.goBack();
  }

  /**
   * Add the suggestion to the interests collection and
   * removes it from the suggestion collection.
   * @param {string} id unique id of interest
   * @param {string} interest name of interest
   */
  const handleAddSuggestion = (id, interest) => {
    Alert.alert(
      "Add suggestion",
      "Are you sure you want to add " + interest + " to interests?",
      [
        { text: "Cancel", onPress: () => {} },
        {
          text: "Add",
          onPress: () => {
            addToInterests(interest);
            deleteFromSuggestions(id, interest);
            Alert.alert(
              "Suggestion added",
              interest + " has been added to the main interest list."
            );
            navigation.goBack();
          },
        },
      ]
    );
  };

  /**
   * Prompts user if they want to delete suggestion or not.
   * Makes calls to the database to delete from 'suggestions' collection.
   * @param {string} id unique id of the interest
   * @param {string} interest name of the interest
   */
  const handleDeleteSuggestion = (id, interest) => {
    Alert.alert(
      "Remove suggestion",
      "Are you sure you want to delete " + interest + "?",
      [
        { text: "Cancel", onPress: () => {} },
        {
          text: "Remove",
          onPress: () => {
            deleteFromSuggestions(id, interest);
            Alert.alert("Suggestion removed", interest + " has been deleted.");
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#023047",
        flex: 1,
        padding: 10,
        justifyContent: "space-evenly",
      }}
    >
      <Text>Suggestion name: {JSON.stringify(suggestionName)}</Text>
      <Text>ID: {JSON.stringify(suggestionId)}</Text>
      <Text>Update name of suggestion:</Text>
      <View style={{flex: 1, flexDirection: "row"}}>
      <TextInput
        placeholder="New interest name..."
        style={adminInfoStyles.textInputUpdate}
        onChangeText={setInputText}
      ></TextInput>
      <Text>From textinput: {inputText}</Text>
      <Pressable
        style={adminInfoStyles.interestButton}
        onPress={() => updateSuggestion(suggestionName, inputText)}
      >
        <Text>Update</Text>
      </Pressable>
      </View>
      <Pressable
        style={adminInfoStyles.interestButton}
        onPress={() => handleAddSuggestion(suggestionId, suggestionName)}
      >
        <Text>Add to interests</Text>
      </Pressable>
      <Pressable
        style={adminInfoStyles.interestButton}
        onPress={() => handleDeleteSuggestion(suggestionId, suggestionName)}
      >
        <Text>Remove from suggestions</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={adminInfoStyles.interestButton}
      >
        <Text>Back</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const adminInfoStyles = StyleSheet.create({
  interestButton: {
    backgroundColor: "#FFB703",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    borderWidth: 5,
  },
  textInputUpdate: {
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 5,
    textAlign: "center",
  },
});
