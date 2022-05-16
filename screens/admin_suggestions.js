import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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
  Button
} from "react-native";

/**
 * Entry into admin page front and back end.
 * @returns Admin page components
 */
export default function AdminSuggestions() {
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Constant of hard coded data to test suggestion rendering.
   */
  const [TEMP_DATA, setTEMP_DATA] = useState([
    { interest: "Naruto", id: "1" },
    { interest: "Hockey", id: "2" },
    { interest: "Lacrosse", id: "3" },
    { interest: "Soccer", id: "4" },
    { interest: "Football", id: "5" },
    { interest: "Pool", id: "6" },
    { interest: "Running", id: "7" },
    { interest: "Weight lifting", id: "8" },
  ]);

  /**
   * Prompts user if they want to delete suggestion or not.
   * Makes calls to the database to delete from 'suggestions' or 'interests' collection,
   * or to add to the existing 'interests' collection.
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
            const filterData = TEMP_DATA.filter((item) => item.id !== id);
            setTEMP_DATA(filterData);
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
            addToGroup();
          },
        },
      ]
    );
  };

  const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
  
    // check if the requester is admin
  
    const added = await interests.findByIdAndUpdate(
      chatId,
      {
        $push: { user: userId },
      },
      {
        new: true,
      }
    )
      .populate("user", "-password")
  
    if (!added) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(added);
    }
  });

  const modalAppear = (id, interest) => {
    setIsVisible(true);
    return(
      <View>
      <Modal onRequestClose={() => setIsVisible(false)} visible={isVisible}>
        <View>
          <Text>Modal open with {interest} with ID {id}</Text>
          <Button onPress={() => setIsVisible(false)} title={'Close'} />
        </View>
      </Modal>
      </View>
    )
  }

  /**
   * Renders an individual suggestion with ID number and interest name.
   * @param {*} interestObject object of interest id and interest name
   * @returns formatted list item of interest
   */
  const OneInterest = ({ id, interest }) => (
    <View style={adminStyles.suggestionField}>
      <Pressable onPress={() => handleDeleteSuggestion(id, interest)}>
        <Text style={adminStyles.suggestionName}>
          {id} = {interest}
        </Text>
      </Pressable>
      <TouchableOpacity onPress={() => handleAddSuggestion(id, interest)} style={adminStyles.interestButton}>
        <Text>Add</Text>
        </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteSuggestion(id, interest)} style={adminStyles.interestButton}>
        <Text>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ backgroundColor: "#023047" }}>
      <Text style={adminStyles.titleSections}>New Interest Suggestions</Text>
      <Text style={{ textAlign: "center", color: "#FFB703" }}>
        Click on the suggestion to add or remove it.
      </Text>
      <FlatList
        keyExtractor={(item) => item.id}
        data={TEMP_DATA}
        renderItem={({ item }) => (
          <OneInterest id={item.id} interest={item.interest}></OneInterest>
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
    padding: 17
  }
});
