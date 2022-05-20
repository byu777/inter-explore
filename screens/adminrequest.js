import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Context as AuthContext } from './../context/AuthContext';
import trackerApi from "../api/tracker";
const COLORS = {primary: '#1f145c', white: '#fff'};

const Adminpage = () => {
  const [interests, setInterests] = useState([]);
  const [textInput, setTextInput] = useState('');

  const {state} = useContext(AuthContext);

  useEffect(() => {
    setInterests(state.reviewInterests)
  }, []);

  const addInterest = () => {
    if (textInput == '') {
      Alert.alert('Error', 'Please input interests');
    } else {
      const newInterests = {
        id: Math.random(),
        task: textInput,
        completed: false,
      };
      setInterests([...interests, newInterests]);
      setTextInput('');
    }
  };

  const acceptInterest = item => {
    const acceptInterest = interests.filter(interest => interest._id != item._id);
    const response = trackerApi.post('/api/interests/updateInterest', item);
    Alert.alert('Confirm', 'Accept Interest?', [
        {
          text: 'Yes',
          onPress: () => setInterests(acceptInterest),
        },
        {
          text: 'No',
        },
      ]);
  };

  const rejectInterests = item => {
    const rejectinterests = interests.filter(interest => interest._id != item._id);
    const response = trackerApi.put('/api/interests/groupdelete', item);

    Alert.alert('Confirm', 'Reject Interest?', [
        {
          text: 'Yes',
          onPress: () => setInterests(rejectinterests),
        },
        {
          text: 'No',
        },
      ]);
  };

  const clearAllinterests = () => {
    Alert.alert('Confirm', 'Clear interests?', [
      {
        text: 'Yes',
        onPress: () => setInterests([]),
      },
      {
        text: 'No',
      },
    ]);
  };
  const ListItem = ({interests}) => {
    return (
      <View style={styles.listItem}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              color: COLORS.primary,
              textDecorationLine: interests?.completed ? 'line-through' : 'none',
            }}>
            {interests.InterestName}
          </Text>
        </View>
        {!interests?.completed && (
          <TouchableOpacity onPress={() => acceptInterest(interests)}>
            <View style={[styles.actionIcon, {backgroundColor: 'green'}]}>
              <Icon name="done" size={20} color="white" />
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => rejectInterests(interests)}>
          <View style={styles.actionIcon}>
            <Icon name="delete" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}> 
      <View style={styles.header}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: COLORS.primary,
          }}>
          Admin page
        </Text>
        <Icon name="delete" size={25} color="red" onPress={clearAllinterests} />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 20, paddingBottom: 100}}
        data={interests}
        renderItem={({item}) => <ListItem interests={item} />}
      />

      {/* <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            value={textInput}
            placeholder="Add interests"
            onChangeText={text => setTextInput(text)}
          />
        </View>
        <TouchableOpacity onPress={addInterest}>
          <View style={styles.iconContainer}>
            <Icon name="add" color="white" size={30} />
          </View>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  inputContainer: {
    height: 50,
    paddingHorizontal: 20,
    elevation: 40,
    backgroundColor: COLORS.white,
    flex: 1,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.primary,
    elevation: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listItem: {
    padding: 20,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    marginLeft: 5,
    borderRadius: 3,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default Adminpage;