import React from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
const COLORS = {primary: '#1f145c', white: '#fff'};

const Adminpage = () => {
  const [interests, setInterests] = React.useState([]);
  const [textInput, setTextInput] = React.useState('');

  React.useEffect(() => {
    getinterestsFromUserDevice();
  }, []);

  React.useEffect(() => {
    saveInterestsToUserDevice(interests);
  }, [interests]);

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

  const saveInterestsToUserDevice = async interests => {
    try {
      const stringifyInterests = JSON.stringify(interests);
      await AsyncStorage.setItem('interests', stringifyInterests);
    } catch (error) {
      console.log(error);
    }
  };

  const getinterestsFromUserDevice = async () => {
    try {
      const interests = await AsyncStorage.getItem('interests');
      if (interests != null) {
        setInterests(JSON.parse(interests));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const markinterestComplete = interestsId => {
    const acceptinterests = interests.filter(item => item.id != interestsId);
    Alert.alert('Confirm', 'accept interests?', [
        {
          text: 'Yes',
          onPress: () => setInterests(acceptinterests),
        },
        {
          text: 'No',
        },
      ]);

  };

  const rejectInterests = interestsId => {
    const rejectinterests = interests.filter(item => item.id != interestsId);
   
    Alert.alert('Confirm', 'reject interests?', [
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
            {interests?.task}
          </Text>
        </View>
        {!interests?.completed && (
          <TouchableOpacity onPress={() => markinterestComplete(interests.id)}>
            <View style={[styles.actionIcon, {backgroundColor: 'green'}]}>
              <Icon name="done" size={20} color="white" />
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => rejectInterests(interests.id)}>
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

      <View style={styles.footer}>
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
      </View>
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