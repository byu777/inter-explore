import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  Pressable,
  Alert,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const menuOptions = () => {
  Alert.alert("Test", "This is a test");
};

const LandingPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ marginHorizontal: 0 }}>
        {/* Implement call to DB to grab username later */}
        <View style={styles.importantSection}>
          <Text style={styles.welcomeText}>Welcome Gabriel!</Text>
        </View>
        <Text style={{ color: "#023047", fontSize: 20, textAlign: "center" }}>
          Anything you want to share?
        </Text>
        <TextInput style={styles.inputArea} placeholder="Interest"></TextInput>
        <StatusBar style="auto" />
        <View style={styles.verticalItems}>
          <Text
            style={{
              textAlign: "left",
              fontSize: 40,
              color: "#023047",
              padding: 10,
            }}
          >
            Feed
          </Text>

          <View style={styles.activityItems}>
            <Image source={require("../assets/80w/Icon80.png")}></Image>
            <View style={styles.verticalItems}>
              <Text>j_payne likes Karaoke!</Text>
              <Text>Justin Payne</Text>
            </View>
            <Pressable onPress={menuOptions}>
              <Text style={{ fontSize: 40 }}>...</Text>
            </Pressable>
          </View>

          <View style={styles.activityItems}>
            <Image source={require("../assets/80w/Icon80.png")}></Image>
            <View style={styles.verticalItems}>
              <Text>eric_kwon likes fencing!</Text>
              <Text>Eric Kwon</Text>
            </View>
            <Pressable onPress={menuOptions}>
              <Text style={{ fontSize: 40 }}>...</Text>
            </Pressable>
          </View>

          <View style={styles.activityItems}>
            <Image source={require("../assets/80w/Icon80.png")}></Image>
            <View style={styles.verticalItems}>
              <Text>rich_mac likes snowboarding!</Text>
              <Text>Richard Mac</Text>
            </View>
            <Pressable onPress={menuOptions}>
              <Text style={{ fontSize: 40 }}>...</Text>
            </Pressable>
          </View>

          <View style={styles.activityItems}>
            <Image source={require("../assets/80w/Icon80.png")}></Image>
            <View style={styles.verticalItems}>
              <Text>Gab_baluyut likes ice hockey!</Text>
              <Text>Gabriel Baluyut</Text>
            </View>
            <Pressable onPress={menuOptions}>
              <Text style={{ fontSize: 40 }}>...</Text>
            </Pressable>
          </View>

          <View style={styles.activityItems}>
            <Image source={require("../assets/80w/Icon80.png")}></Image>
            <View style={styles.verticalItems}>
              <Text>Gab_baluyut likes ice hockey!</Text>
              <Text>Gabriel Baluyut</Text>
            </View>
            <Pressable onPress={menuOptions}>
              <Text style={{ fontSize: 40 }}>...</Text>
            </Pressable>
          </View>

          <View style={styles.activityItems}>
            <Image source={require("../assets/80w/Icon80.png")}></Image>
            <View style={styles.verticalItems}>
              <Text>Gab_baluyut likes ice hockey!</Text>
              <Text>Gabriel Baluyut</Text>
            </View>
            <Pressable onPress={menuOptions}>
              <Text style={{ fontSize: 40 }}>...</Text>
            </Pressable>
          </View>

          <View style={styles.activityItems}>
            <Image source={require("../assets/80w/Icon80.png")}></Image>
            <View style={styles.verticalItems}>
              <Text>Gab_baluyut likes ice hockey!</Text>
              <Text>Gabriel Baluyut</Text>
            </View>
            <Pressable onPress={menuOptions}>
              <Text style={{ fontSize: 40 }}>...</Text>
            </Pressable>
          </View>

          <View style={styles.activityItems}>
            <Image source={require("../assets/80w/Icon80.png")}></Image>
            <View style={styles.verticalItems}>
              <Text>Gab_baluyut likes ice hockey!</Text>
              <Text>Gabriel Baluyut</Text>
            </View>
            <Pressable onPress={menuOptions}>
              <Text style={{ fontSize: 40 }}>...</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <View style={styles.navbarContainer}>
        <View style={styles.navbar}>
          <Pressable
            onPress={() =>
              Alert.alert("Item pressed", "You pressed this button")
            }
            style={styles.iconBehave}
          >
            <Image
              source={require("../assets/baseline_home_black_24dp.png")}
            ></Image>
          </Pressable>
          <Pressable
            onPress={() =>
              Alert.alert("Item pressed", "You pressed this button")
            }
            style={styles.iconBehave}
          >
            <Image
              source={require("../assets/baseline_search_black_24dp.png")}
            ></Image>
          </Pressable>
          <Pressable
            onPress={() =>
              Alert.alert("Item pressed", "You pressed this button")
            }
            style={styles.iconBehave}
          >
            <Image
              source={require("../assets/baseline_chat_black_24dp.png")}
            ></Image>
          </Pressable>
          <Pressable
            onPress={() =>
              Alert.alert("Item pressed", "You pressed this button")
            }
            style={styles.iconBehave}
          >
            <Image
              source={require("../assets/baseline_person_black_24dp.png")}
            ></Image>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

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
    width: "100%",
    textAlign: "center",
  },
  importantSection: {
    flex: 0,
    flexDirection: "row",
  },
  inputArea: {
    margin: 10,
    padding: 8,
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: "#023047",
    borderRadius: 10,
    alignSelf: "center",
  },
  navbarContainer: {
    position: "absolute",
    alignItems: "center",
    bottom: 10,
  },
  navbar: {
    flexDirection: "row",
    backgroundColor: "#023047",
    width: "90%",
    justifyContent: "space-evenly",
    borderRadius: 20,
    margin: 20,
  },
  iconBehave: {
    padding: 14,
  },
  activityItems: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 5,
  },
  verticalItems: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    margin: 10,
    backgroundColor: "#FFB703",
    borderRadius: 20,
  },
});

export default LandingPage;
