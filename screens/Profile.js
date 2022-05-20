import React, {useContext, useState, useEffect} from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Context as AuthContext } from './../context/AuthContext';
import * as ImagePicker from 'expo-image-picker'
import trackerApi from "../api/tracker";


export default function Profile({navigation}) {

  const {state,getInterests} = useContext(AuthContext);

  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [primary, setPrimary] = useState(null);
  const [secondary, setSecondary] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  const newUser = state.user
  useEffect(() => {
    setName(state.user.firstName)
    setPrimary(state.user.primaryInterest)
    setSecondary(state.user.secondaryInterest)
    setEmail(state.user.email)
    setImage(state.user.pic)
    navigation.addListener("focus", () =>setLoading(!loading))
    getInterests()
  
  }, [navigation,loading])

  const uploadPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing:true,
      aspects:[4,3],
      quality:1
    })
    console.log(result)
    if(!result.cancelled){
      newUser.pic = result.uri
      console.log(newUser)
      await trackerApi.post("/api/interests/profile", newUser)
      setImage(result.uri)
    }
  }
 
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
          <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
          <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
          <Ionicons
            name="pencil-outline"
            size={24}
            color="#52575D"
          ></Ionicons>
          </TouchableOpacity>
        </View>

        <View style={{ alignSelf: "center"}}>
          <View style={styles.profileImage}>
            <Image
              source= {{uri:image}}
              style={styles.Image}
            ></Image>
          </View>

          <View style={styles.dm}>
            <MaterialIcons
              name="chat"
              size={18}
              color="#DFD8C8"
            ></MaterialIcons>
          </View>

          <View style={styles.active}></View>
          <TouchableOpacity onPress={uploadPhoto}>
          <View style={styles.add}>
            <Ionicons
              name="ios-add"
              size={48}
              color="#DFD8C8"
              style={{ marginTop: 6, marginLeft: 2 }}
            ></Ionicons>
          </View>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
          {name}
          </Text>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
            {email}
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>483</Text>
            <Text style={[styles.text, styles.subText]}>Posts</Text>
          </View>
          <View
            style={[
              styles.statsBox,
              {
                borderColor: "#DFD8C8",
                borderLeftWidth: 1,
                borderRightWidth: 1,
              },
            ]}
          >
            <Text style={[styles.text, { fontSize: 24 }]}>24</Text>
            <Text style={[styles.text, styles.subText]}>Friends</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>5</Text>
            <Text style={[styles.text, styles.subText]}>Meetings</Text>
          </View>
        </View>

        <View style={styles.interestContainer}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 24 }]}>
            Primary Interest
          </Text>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 18 }]}>
            {primary}
          </Text>
        </View>

        <View style={styles.interestContainer}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 24 }]}>
            Secondary Interest
          </Text>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 18 }]}>
            {secondary}
          </Text>
        </View>

        <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
        <View style={{ alignItems: "center" }}>
          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{ width: 250 }}>
              <Text
                style={[styles.text, { color: "#41444B", fontWeight: "300" }]}
              >
                Started following{" "}
                <Text style={{ fontWeight: "400" }}>Jake Challeahe</Text> and{" "}
                <Text style={{ fontWeight: "400" }}>Luis Poteer</Text>
              </Text>
            </View>
          </View>

          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{ width: 250 }}>
              <Text
                style={[styles.text, { color: "#41444B", fontWeight: "300" }]}
              >
                Started following{" "}
                <Text style={{ fontWeight: "400" }}>Luke Harper</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    color: "#52575D",
  },
  Image: {
    width: 200,
    height: 200
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
  interestContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 24,
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  activityIndicator: {
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20,
  },
});
