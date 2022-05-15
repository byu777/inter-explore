import React, { Component, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  SafeAreaView,
} from "react-native";
import CustomDatePicker from "../components/datepicker";
//import { Context as EventContext } from "./../context/EventContext";
import { Context as AuthContext } from './../context/AuthContext';
import trackerApi from '../api/tracker';


export default function MakeEventPage({ navigation }) {
  //const { state, WriteEventToDB } = useContext(EventContext);
  const {state} = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [desc, setDesc] = useState('');

  const onChangeTitleHandler = (title) => {
    setTitle(title);
  }

  const onChangeLocationHandler = (location) => {
    setLocation(location);
  }

  // const onChangeDateHandler = (date) => {
  //   setDate(date);
  // }

  // const onChangeTimeHandler = (time) => {
  //   setTime(time);
  // }

  const onChangeDescriptionHandler = (desc) => {
    setDesc(desc);
  }

  //checks if title, location, desc fields are empty
  const isAllFieldsValid = (title, location, desc) => {
    return Object.values(title, location, desc).every(value => value.trim())
  }

  const isValidForm = () => {
    if (isAllFieldsValid(title, location, desc)) return true
  }

  const onSubmitFormHandler = async (event) => {
    if (!isValidForm()) {
      alert("Please fill all fields!")
      return;
    }

    // --------------------------------  THIS IS FOR A PUT REQUEST -----------------------------
    // const configObject = {
    //   url: `${baseUrl}/api/users`,
    //   method: 'PUT',
    //   data: {title, location, date, time, desc}

    // }

    // axios(configObject).then((response) => {
    //   if (response.status === 200) {
    //     alert(`You have updated: ${JSON.stringify(response.data)}`);
    //     setTitle('');
    //     setLocation('');
    //     setDate('');
    //     setTime('');
    //     setDesc('');
    //   } else {
    //     throw new Error("An error has occurred");
    //   }
    // })
    // .catch((error) => {
    //   alert('An error has occurred');
    // });

    console.log(title, location, desc);

    try {
      // not sure what the URL should be here in line 81
      const response = await trackerApi.post(`${trackerApi.baseUrl}/api/EventRoute/createEvent`, {
        title,
        location,
        date,
        time,
        desc,
      }
      .then(response => console.log(response.data)));

      if (response.status == 201) {
        alert(` You have created: ${JSON.stringify(response.data)}`);
        setTitle('');
        setLocation('');
        setDate('');
        setTime('');
        setDesc('');
      } else {
        throw new Error('An error has occurred');
      }
    } catch (error) {
      alert("An error has occurred");
    }
  };

  return (
    <SafeAreaView style={create_event.event_container}>
      <Text style={create_event.event_title}>Create an Event!</Text>

      {/* TITLE */}
      <View style={create_event.title}>
        <Text style={create_event.title_text_style}>Title</Text>
        <View style={create_event.border_styles}>
          <TextInput
            style={create_event.textInput_style}
            value={title}
            placeholder="Title..."
            placeholderTextColor="#530127"
            onChangeText={onChangeTitleHandler}  //whenever text changed in TextInput, it will update the state of that 'title' var
            // onSubmitEditing={
            //   (value) => setTitle(value).nativeEvent.text
            // }
          >{title}</TextInput>
        </View>
      </View>

      {/* LOCATION */}
      <View style={create_event.location}>
        <Text style={create_event.title_text_style}>Location</Text>
        <View style={create_event.border_styles}>
          <TextInput
            style={create_event.textInput_style}
            value={location}
            placeholder="Location..."
            placeholderTextColor="#530127"
            onChangeText={onChangeLocationHandler}
            mode='outlined'
          >{location}</TextInput>
        </View>
      </View>

      {/* DATE */}
      <View style={create_event.date}>
        <Text style={create_event.title_text_style}>Date</Text>

        {/* this is a custom Datepicker that I made; how do i grab the date/time state from it and put it on this MakeEventPage's state? */}
        <CustomDatePicker 
          //value={CustomDatePicker.date}
        />
      </View>

      {/* DESCRIPTION */}
      <View style={create_event.description}>
        <Text style={create_event.title_text_style}>Description</Text>
        <View style={create_event.border_styles}>
          <TextInput
            style={create_event.textInput_style}
            value={desc}
            placeholder="Description of event..."
            placeholderTextColor="#530127"
            onChangeText={onChangeDescriptionHandler} 
            mode='outlined'
            multiline={true}
          >{desc}</TextInput>
        </View>
      </View>

      <View style={create_event.buttons}>
        <Button
          title="Cancel"
          style={create_event.btn_cancel}
          onPress={() => navigation.navigate("Chatroom")}

          // () =>
          // Alert.alert("Members", "Members of Basketball", [
          //   {
          //     text: "Cancel",
          //     onPress: () => console.log("Cancel pressed"),
          //     style: "cancel",
          //   },
          // ])
          //}
        />
        <Button
          title="Schedule"
          style={create_event.btn_schedule}
          onPress={onSubmitFormHandler}
        />
      </View>
    </SafeAreaView>
  );
}

//const { state, WriteEventToDB } = useContext(EventContext);

//{state.token ? navigation.navigate("Tab") : null}

// export default class MakeEventPage extends Component {
//   constructor(props) {
//     super(props);
//     this.event_state = { date: "2022-05-11" };
//     const { getInterests, WriteEventToDB } = useContext(EventContext);
//   }

//   render() {
//     return (
// <SafeAreaView style={create_event.event_container}>
//   <Text style={create_event.event_title}>Create an Event!</Text>

//         <Formik
//           initialValues={{
//             title: "",
//             location: "",
//             date: "",
//             time: "",
//             desc: "",
//           }}
//           onSubmit={(values) => {
//             console.log(values);
//             if (
//               values.title != "" &&
//               values.location != "" &&
//               values.date != "" &&
//               values.time != "" &&
//               values.desc != ""
//             ) {
//               WriteEventToDB(values);
//             } else {
//               console.log("Make sure all the fields are filled in!");
//             }
//           }}
//         >
//           {({ handleChange, handleSubmit, values }) => (
//             <StyledFormArea
//             style={create_event.form_area}>
//               <TextInput
//                 label="Title of event"
//                 placeholder="Title"
//                 placeholderTextColor={darkLight}
//                 onChangeText={handleChange("firstName")}
//                 values={values.title}
//               />
//               <TextInput
//                 label="Location"
//                 placeholder="Location"
//                 placeholderTextColor={darkLight}
//                 onChangeText={handleChange("firstName")}
//                 values={values.location}
//                 keyboardType="email-address"
//               />

//               <View style={create_event.date}>
//                 <Text
//                   style={create_event.date}
//                   label="Date"
//                   placeholder="Date"
//                   placeholderTextColor={darkLight}
//                   onChangeText={handleChange("Date..")}
//                   values={values.date}
//                 />
//                 <Text
//                   style={create_event.date}
//                   label="Time (24-hr)"
//                   placeholder="Time"
//                   placeholderTextColor={darkLight}
//                   onChangeText={handleChange("Time..")}
//                   values={values.time}
//                 />
//                 {/* <Text style={create_event.title_text_style}>Date</Text> */}
//                 <CustomDatePicker />
//               </View>

//               <TextInput
//                 label="Description"
//                 placeholder="Description"
//                 placeholderTextColor={darkLight}
//                 onChangeText={handleChange("Description..")}
//                 values={values.desc}
//               />

//               <StyledButton onPress={handleSubmit}>
//                 <ButtonText>Create</ButtonText>
//               </StyledButton>
//               <Line />
//               {/* go back to previous page */}
//               <StyledButton onPress={handleSubmit}>
//                 <ButtonText>Cancel</ButtonText>
//               </StyledButton>
//             </StyledFormArea>
//           )}
//         </Formik>
//       </SafeAreaView>
//     );
//   }


const create_event = StyleSheet.create({
  event_container: {
    flexDirection: "column",
    flex: 1,
    marginTop: 25,
    padding: 15,
    backgroundColor: "#ece6dd",
  },
  title: {
    flex: 3,
  },
  title_text_style: {
    color: "#530127",
  },
  textInput_style: {
    flex: 2,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  location: {
    flex: 3,
  },
  date: {
    flex: 5,
  },
  description: {
    flex: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  event_title: {
    textAlign: "center",
    marginTop: 25,
    fontSize: 30,
    color: "#530127",
  },
  border_styles: {
    borderWidth: 3,
    borderRadius: 5,
    borderColor: "#db5f4d",
    flex: 2,
  },
  btn_cancel: {
    padding: 10,
    backgroundColor: "#530127",
  },
  btn_schedule: {
    padding: 10,
    backgroundColor: "#530127",
  },
  form_area: {
    flex: 0.9,
    flexDirection: "column",
  },
});

// export default MakeEventPage;
