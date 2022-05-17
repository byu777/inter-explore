import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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
  Modal,
  TextInput,
} from "react-native";

const suggestion = require("../router/models/Suggestion");
const asyncHandler = require("express-async-handler");

/**
 * Entry into admin page front and back end.
 * @returns Admin page components
 */
export default function AdminSuggestions() {
  /**
   * Constant of hard coded data to test suggestion rendering.
   */
  let suggestionReceive = getAllSuggestions();
  let flatListArray = [];
  for (let i = 0; i < suggestionReceive.length; i++) {
    flatListArray.push({
      id: i,
      suggestion: suggestionReceive[i].suggestionName,
    });
  }
  console.log(flatListArray);
  const [TEMP_DATA, setTEMP_DATA] = useState(flatListArray);

  // for (let i =0; i <suggestionReceive.length;  i++ ) {
  //   setTEMP_DATA(suggestionReceive[i].suggestionName);
  // }

  const [suggestion, setSuggestion] = useState(null);

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
            // const filterData = TEMP_DATA.filter((item) => item.id !== id);
            // setTEMP_DATA(filterData);
            removeFromGroup(interest);
            Alert.alert("Confirmation", interest + " has been deleted.");
          },
        },
      ]
    );
  };

  /**
   * Add the suggestion to the interests collection and
   * removes it from the suggestion collection.
   * @param {*} id unique id of interest
   * @param {*} interest name of interest
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
            // const filterData = TEMP_DATA.filter((item) => item.id !== id);
            // setTEMP_DATA(filterData);
            // Alert.alert("Confirmation", interest + " has been added to the list of interests.");
            // addToGroup(interest);
          },
        },
      ]
    );
  };

  const removeFromGroup = asyncHandler(async (req, res) => {
    const { suggestionName } = req.body;

    const added = await suggestion.findByIdAndRemove(
      suggestionId,
      function (err, docs) {
        if (!added) {
          res.status(404);
          throw new Error("Chat Not Found");
        } else {
          res.json(added);
        }
      }
    );
  });

  // const addToSuggestions = asyncHandler(
  async function addToSuggestions(suggestionName) {
    // api call to get interests
    console.log({ suggestionName });
    const response = await trackerApi.post(
      "/api/suggestions/createSuggestion",
      { suggestionName }
    );
    console.log(response);
  }

  async function getAllSuggestions() {
    const response = await trackerApi.get("/api/suggestions/getAllSuggestions");
    console.log(response.data);
    return response.data;
  }

  /**
   * Renders an individual suggestion with ID number and interest name.
   * @param {*} interestObject object of interest id and interest name
   * @returns formatted list item of interest
   */
  const InterestSuggestionItem = ({ id, interest }) => (
    <View style={adminStyles.suggestionField}>
      <Pressable onPress={() => handleDeleteSuggestion(id, interest)}>
        <Text style={adminStyles.suggestionName}>
          {id} = {interest}
        </Text>
      </Pressable>
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
      <Text style={{ textAlign: "center", color: "#FFB703" }}>
        Click on the suggestion to add or remove it.
      </Text>
      <TextInput
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
      </TouchableOpacity>
      <FlatList
        keyExtractor={(item) => item.id}
        data={TEMP_DATA}
        renderItem={({ item }) => (
          <InterestSuggestionItem
            id={item.id}
            interest={item.suggestion}
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
  },
  suggestionName: {
    padding: 20,
    color: "#FFB703",
    textAlign: "center",
  },
  suggestionField: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    borderWidth: 3,
    borderColor: "black",
    margin: 15,
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
    padding: 15,
    borderRadius: 10,
    margin: 5,
  },
});
