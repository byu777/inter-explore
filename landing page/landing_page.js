import { StyleSheet, Text, View, SafeAreaView, TextInput, Image } from "react-native";
import { StatusBar } from "expo-status-bar";


const LandingPage = () => {
    return(
        <SafeAreaView style={styles.container}>
      {/* Implement call to DB to grab username later */}
      <View style={styles.importantSection}>
        <Text style={styles.welcomeText}>Welcome Gabriel!</Text>
      </View>
      <Text style={{ color: "#023047", fontSize: 20 }}>
        Anything you want to share?
      </Text>
      <TextInput style={styles.inputArea} placeholder="Interest"></TextInput>
      <StatusBar style="auto" />
      <View>
        <Text>Feed</Text>
        <Image source={require("../assets/80w/Icon80.png")}></Image>
        {/* Implement call to DB to grab username and action later */}
        <Text>j_payne likes Karaoke!</Text>
        <Text>Justin Payne</Text>
        <Text>...</Text>
        <Image source={require("../assets/80w/Icon80.png")}></Image>
        {/* Implement call to DB to grab username and action later */}
        <Text>eric_kwon likes fencing!</Text>
        <Text>Eric Kwon</Text>
        <Text>...</Text>
        <Image source={require("../assets/80w/Icon80.png")}></Image>
        {/* Implement call to DB to grab username and action later */}
        <Text>rich_mac likes snowboarding!</Text>
        <Text>Richard Mac</Text>
        <Text>...</Text>
        <Image source={require("../assets/80w/Icon80.png")}></Image>
        {/* Implement call to DB to grab username and action later */}
        <Text>Gab_baluyut likes ice hockey!</Text>
        <Text>Gabriel Baluyut</Text>
        <Text>...</Text>
      </View>
      <View style={styles.rowItems}>
      <Image source={require("../assets/87w/Icon87.png")}></Image>
      <Image source={require("../assets/87w/Icon87.png")}></Image>
      <Image source={require("../assets/87w/Icon87.png")}></Image>
      <Image source={require("../assets/87w/Icon87.png")}></Image>
      </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 23,
    },
    welcomeText: {
      color: "#023047",
      fontSize: 40,
    },
    importantSection: {
      backgroundColor: "#ffb703",
    },
    inputArea: {
      margin: 10,
      padding: 8,
      width: 250,
      height: 50,
      borderWidth: 1,
      borderColor: "#023047",
      borderRadius: 10,
    },
    rowItems: {
      flex: 1,
      padding: 20,
      flexDirection: "row"
    }
  });

export default LandingPage;