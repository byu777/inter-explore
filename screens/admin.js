import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, FlatList, Pressable, Alert, Modal} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const userOptions = () => {
  Alert.alert("Test", "Item pressed");
}



export default function Admin() {
  const [modalVisible, setModalVisible] = useState(false);

  const interests = [
    {interest: 'naruto', id: '1'},
    {interest: 'naruto shippuden', id: '2'},
    {interest: 'one piece', id: '3'},
    {interest: 'one piece', id: '4'},
    {interest: 'one piece', id: '5'},
    {interest: 'one piece', id: '6'},
    {interest: 'one piece', id: '7'},
    {interest: 'one piece', id: '8'},
  ];

  const oneInterest = ({item}) => (
    <View style={adminStyles.suggestionField}>
      <Text style={adminStyles.suggestionName}>{item.interest} is cool</Text>
    </View>
  )
  return (
    <SafeAreaView style={{backgroundColor: "#023047"}}>
        <Text style={adminStyles.titleSections}>New Interest Suggestions</Text>
        <Text style={{textAlign: "center", color: '#FFB703'}}>To approve a new suggestion, swipe to the right.</Text>
        <Text style={{textAlign: "center", color: '#FFB703'}}>To decline a new suggestion, swipe to the left.</Text>
        <FlatList
        keyExtractor={(item) => item.id}
        data={interests}
        renderItem={oneInterest}
        
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
        flex: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
        justifyContent: 'space-evenly',
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 30,
        margin: 15
    }
})