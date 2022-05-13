import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, Alert, Pressable, SafeAreaView} from 'react-native';

export default function Admin() {

  const [TEMP_DATA, setTEMP_DATA]= useState([
    {interest: 'Naruto', id: '1'},
    {interest: 'Hockey', id: '2'},
    {interest: 'Lacrosse', id: '3'},
    {interest: 'Soccer', id: '4'},
    {interest: 'Football', id: '5'},
    {interest: 'Pool', id: '6'},
    {interest: 'Running', id: '7'},
    {interest: 'WEight lifting', id: '8'},
  ]);
  
  const handleDeleteCard = (id, interest) => {
    Alert.alert(
      "Interest suggestion",
      "Would you like to add or remove " + interest + "?",
      [
        {text: 'Cancel', onPress: () => {}},
        {text: 'Add', onPress: () => {
          const filterData = TEMP_DATA.filter(item => item.id !== id);
          setTEMP_DATA(filterData);
          Alert.alert("Confirmation", interest + " has been added to the interest list.");
        }},
        {
          text: 'Remove', onPress: () => {
            const filterData = TEMP_DATA.filter(item => item.id !== id);
            setTEMP_DATA(filterData);
            Alert.alert("Confirmation", interest + " has been deleted.");
          }
        },
      ])
  };

  const OneInterest = ({id, interest}) => (
    <View style={adminStyles.suggestionField}>
      <Pressable onPress={() => handleDeleteCard(id, interest)}>
      <Text style={adminStyles.suggestionName}>{id} = {interest}</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={{backgroundColor: "#023047"}}>
        <Text style={adminStyles.titleSections}>New Interest Suggestions</Text>
        <Text style={{textAlign: "center", color: '#FFB703'}}>Click on the suggestion to add or remove it.</Text>
        <FlatList
        keyExtractor={(item) => item.id}
        data={TEMP_DATA}
        renderItem={({item}) => <OneInterest id={item.id} interest={item.interest}></OneInterest>}
        />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}


const adminStyles = StyleSheet.create({
    titleSections: {
        fontSize: 30,
        color: '#FFB703',
        textAlign: 'center'
    },
    suggestionName: {
      padding: 20,
      color: "#FFB703",
      textAlign: 'center'
    },
    suggestionField: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
        justifyContent: 'space-evenly',
        borderWidth: 3,
        borderColor: "black",
        margin: 15
    },
    deleteBox: {
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      margin: 15,
      padding: 5
    }
})