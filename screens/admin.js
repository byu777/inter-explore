import { StatusBar } from 'expo-status-bar';
import React from "react";
import { ScrollView, StyleSheet, Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Admin() {
  return (
    <View backgroundColor style={{backgroundColor: "#023047"}}>
        <ScrollView>
            <Text style={adminStyles.titleSections}>New Interest Suggestions</Text>
        <View style={adminStyles.userSuggestions}>
            <Text>Suggestion 1</Text>
        </View>
        </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}


const adminStyles = StyleSheet.create({
    titleSections: {
        fontSize: 30,
        color: '#FFB703',
        textAlign: 'center'
    },
    userSuggestions: {
        flex: 1,
        flexDirection: "column",
        flexWrap: "wrap",
        margin: 10,
        borderRadius: 20,
    }
})