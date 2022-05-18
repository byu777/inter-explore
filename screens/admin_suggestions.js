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
} from "react-native";

/**
 * Entry into admin page front and back end.
 * @returns Admin page components
 */
export default function AdminSuggestions() {
  /**
   * Data from 'suggestions' collection in JSON format.
   */
  const [suggestionData, setSuggestionData] = useState([""]);
  useEffect(() => {
    getAllSuggestions();
  }, []);

  /**
   * State to hold text from text input.
   */
  const [suggestion, setSuggestion] = useState(null);

  /**
   * Sets the state of the suggestion from text input.
   * @param {string} suggestion text from text input
   */
  const onSuggestionChange = (suggestion) => {
    setSuggestion(suggestion);
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
            Alert.alert("Suggestion deleted", interest + " has been deleted.");
          },
        },
      ]
    );
  };

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
            Alert.alert("Suggestion added", interest + " has been added to the main interest list.");
          },
        },
      ]
    );
  };

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

  /**
   * Adds item to suggestions collection.
   * @param {string} suggestionName Name of the suggestion
   */
  async function addToSuggestions(suggestionName) {
    console.log({ suggestionName });
    const response = await trackerApi.post(
      "/api/suggestions/createSuggestion",
      { suggestionName }
    );
    console.log(response);
  }

  /**
   * Retrieves all data from the suggestions collection.
   * @returns JSON object of data
   */
  async function getAllSuggestions() {
    const response = await trackerApi.get("/api/suggestions/getAllSuggestions");
    console.log(response.data);
    setSuggestionData(response.data);
    return response.data;
  }

  async function addToInterests(InterestName) {
    const response = await trackerApi.post("/api/suggestions/addToInterests",
    {InterestName});
    console.log(response);
  }

  /**
   * Renders an individual suggestion with ID number and interest name.
   * @param {*} interestObject object of interest id and interest name
   * @returns formatted list item of interest
   */
  const InterestSuggestionItem = ({ id, interest }) => (
    <View style={adminStyles.suggestionField}>
        <Text style={adminStyles.suggestionName}>
          {interest}
        </Text>
      <TouchableOpacity
        onPress={() => handleAddSuggestion(id, interest)}
        style={adminStyles.interestButton}
      >
        <Text style={{ fontWeight: "bold", color: "green" }}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleDeleteSuggestion(id, interest)}
        style={adminStyles.interestButton}
      >
        <Text style={{ fontWeight: "bold", color: "red" }}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ backgroundColor: "#023047" }}>
      <Text style={adminStyles.titleSections}>New Interest Suggestions</Text>
      {/* <TextInput
        placeholder="New Suggestion"
        style={{
          borderWidth: 3,
          borderRadius: 10,
          textAlign: "center",
          padding: 5,
        }}
        onChangeText={onSuggestionChange}
      ></TextInput>
      <TouchableOpacity
        style={adminStyles.interestButton}
        onPress={() => addToSuggestions(suggestion)}
      >
        <Text style={{ textAlign: "center" }}>Add to Database</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={adminStyles.interestButton}
        onPress={() => getAllSuggestions()}
      >
        <Text style={{ textAlign: "center" }}>Refresh</Text>
      </TouchableOpacity>
      <FlatList
        data={suggestionData}
        renderItem={({ item }) => (
          <InterestSuggestionItem
            id={item._id}
            interest={item.suggestionName}
          ></InterestSuggestionItem>
        )}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

/**
 * Styling props for all views and texts.
 */
const adminStyles = StyleSheet.create({
  titleSections: {
    fontSize: 30,
    color: "#FFB703",
    textAlign: "center",
    padding: 10
  },
  suggestionName: {
    padding: 20,
    color: "#FFB703",
    textAlign: "center",
  },
  suggestionField: {
    flex: 2,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    borderWidth: 3,
    borderColor: "black",
    margin: 5,
  },
  deleteBox: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    margin: 15,
    padding: 5,
  },
  interestButton: {
    backgroundColor: "#FFB703",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    borderWidth: 5
  },
});
