import { StatusBar } from 'expo-status-bar';
import React from "react";
import { StyleSheet, Text, View, FlatList, Alert, Pressable, SafeAreaView} from 'react-native';

/**
 * Entry into admin main page front end.
 * @returns Admin main page component
 */
export default function AdminMain() {
    return(
        <SafeAreaView style={adminMainStyles.mainView}>
            <Text style={adminMainStyles.header}>Welcome admin!</Text>
            <View style={adminMainStyles.navigationContainer}>
            <Pressable onPress={() => console.log("first button pressed")}>
                <Text style={adminMainStyles.navigationButtons}>Interest suggestions</Text>
                <Text style={adminMainStyles.navigationSubtitle}>Approve or deny interests that the user suggests</Text>
            </Pressable>
            </View>
            <View style={adminMainStyles.navigationContainer}>
            <Pressable onPress={() => console.log("second button pressed")}>
                <Text style={adminMainStyles.navigationButtons}>Interest moderation</Text>
                <Text style={adminMainStyles.navigationSubtitle}>Remove or modify any interests that users are in</Text>
            </Pressable>
            </View>
            <View style={adminMainStyles.navigationContainer}>
            <Pressable onPress={() => console.log("third button pressed")}>
                <Text style={adminMainStyles.navigationButtons}>User moderation</Text>
                <Text style={adminMainStyles.navigationSubtitle}>Ban or mute users for a period of time</Text>
            </Pressable>
            </View>
            <StatusBar style='light'/>
        </SafeAreaView>

    )
}

const adminMainStyles = StyleSheet.create({
    mainView: {
        backgroundColor: "#023047",
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    header: {
        fontSize: 30,
        color: "#FFB703",
        textAlign: 'center'
    },
    navigationContainer: {
        padding: 20
    },
    navigationButtons: {
        fontSize: 20,
        color: "red",
    },
    navigationSubtitle: {
        fontSize: 13,
        color: "#FFB703"
    }
})