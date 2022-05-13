import React, { Component, useState } from "react";
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
import { Formik } from "formik";

export default class MakeEventPage extends Component {
  constructor(props) {
    super(props);
    this.event_state = { date: "2022-05-11" };
  }

  render() {
    return (
      <SafeAreaView style={create_event.event_container}>
        <Text style={create_event.event_title}>Create an Event!</Text>

        <Formik
          initialValues={{
            title: "",
            location: "",
            date: "",
            time: "",
            desc: "",
          }}
          onSubmit={(values) => {
            console.log(values);
            if (
              values.title != "" &&
              values.location != "" &&
              values.date != "" &&
              values.time != "" &&
              values.desc != "" 
            ) {
              // add logic to add to database
            } 
          }}
        >
          {({ values }) => (
            <StyledFormArea>
              <TextInput
                label="Title of event"
                placeholder=""
                placeholderTextColor={darkLight}
                values={values.title}
              />
              <TextInput
                label="Location"
                placeholder=""
                placeholderTextColor={darkLight}
                values={values.location}
                keyboardType="email-address"
              />
              <TextInput
                label="Date"
                placeholder=""
                placeholderTextColor={darkLight}
                onChangeText={handleChange("userName")}
                onBlur={handleBlur("userName")}
                values={values.date}
              />
              <TextInput
                label="Time (24-hr)"
                placeholder=""
                placeholderTextColor={darkLight}
                onChangeText={handleChange("userName")}
                onBlur={handleBlur("userName")}
                values={values.time}
              />
              <TextInput
                label="Description"
                placeholder=""
                placeholderTextColor={darkLight}
                onChangeText={handleChange("userName")}
                onBlur={handleBlur("userName")}
                values={values.desc}
              />
              
              
              
              {state.errorMessage ? (
                <ErrorText>{state.errorMessage}</ErrorText>
              ) : null}
              <StyledButton onPress={handleSubmit}>
                <ButtonText>Create</ButtonText>
              </StyledButton>
              <Line />
              {/* go back to previous page */}
              <StyledButton onPress={handleSubmit}>
                <ButtonText>Cancel</ButtonText>
              </StyledButton>

            </StyledFormArea>
          )}
        </Formik>
      </SafeAreaView>
    );
  }
  // this was create event stuff before Formik
  // <View style={create_event.title}>
  //         <Text style={create_event.title_text_style}>Title</Text>
  //         <View style={create_event.border_styles}>
  //           <TextInput
  //                 style={{
  //                   flex: 2,
  //                 }}

  //               ></TextInput>
  //         </View>
  //       </View>

  //       <View style={create_event.location}>
  //         <Text style={create_event.title_text_style}>Location</Text>
  //         <View style={create_event.border_styles}>
  //           <TextInput
  //                 style={{
  //                   flex: 2,
  //                 }}
  //               ></TextInput>
  //         </View>
  //       </View>

  //       <View style={create_event.date}>
  //         <Text style={create_event.title_text_style}>Date</Text>
  //         <CustomDatePicker/>
  //         {/* <View style={create_event.border_styles}>
  //           <TextInput
  //                 style={{
  //                   flex: 2,
  //                 }}
  //               ></TextInput>
  //         </View> */}
  //       </View>

  //       <View style={create_event.description}>
  //         <Text style={create_event.title_text_style}>Description</Text>
  //         <View style={create_event.border_styles}>
  //           <TextInput
  //                 style={{
  //                   flex: 2,
  //                 }}
  //               ></TextInput>
  //         </View>
  //       </View>

  //       <View style={create_event.buttons}>
  //         <Button
  //           title="Cancel"
  //           style={create_event.btn_cancel}
  //           onPress={() =>
  //             Alert.alert("Members", "Members of Basketball", [
  //               {
  //                 text: "Cancel",
  //                 onPress: () => console.log("Cancel pressed"),
  //                 style: "cancel",
  //               },
  //             ])
  //           }
  //         />
  //         <Button
  //           title="Schedule"
  //           style={create_event.btn_schedule}
  //           onPress={() =>
  //             Alert.alert("Success", "Event was successfully created.", [
  //               {
  //                 text: "OK",
  //                 onPress: () => console.log("OK pressed"),
  //                 style: "ok",
  //               },
  //             ])
  //           }
  //         />
  //       </View>
}

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
});

// export default MakeEventPage;
