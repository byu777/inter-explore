
import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  StyledFormArea,
  StyledInputLabel,
  StyledTextInput,
  StyledButton,
  ButtonText,
  Line,
  ErrorText
} from "./../components/LoginStyles";

import { Context as AuthContext } from './../context/AuthContext';
import SelectDropdown from 'react-native-select-dropdown';
import trackerApi from "../api/tracker";

const EditProfileScreen = ({ navigation }) => {

  const {state, getInterests, addUserInterests} = useContext(AuthContext);
  useEffect(() => {
    getInterests()
  }, []);
  const newUser = state.user;

  const submitHandler = async(values) => {
  try{
    newUser.firstName = values.firstName
    newUser.email = values.email
    newUser.primaryInterest = values.primaryInterest
    newUser.secondaryInterest = values.secondaryInterest
    console.log(state.user)
    await trackerApi.post("/api/interests/profile", newUser);
    addUserInterests(newUser);
  }catch(err){

    console.log(err)
  }
    
    
  };

  return (
    <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageTitle>Inter-Explore</PageTitle>
          <Formik
            initialValues={{
              email: state.user.email,
              firstName: state.user.firstName,
              primaryInterest: state.user.primaryInterest,
              secondaryInterest: state.user.secondaryInterest,
              pic:state.user.pic
            }}
            onSubmit={(values) => {
              if (values.email != '' && values.firstName != '' &&
                  values.primaryInterest != '' && values.secondaryInterest != '') {
                 if (values.email.includes("@")){
                  submitHandler(values)
                  navigation.navigate("Tab", values)
                 } else {
                   state.errorMessage = "You must enter a valid email address"
                 }
               } else {
                 state.errorMessage = "You must enter valid inputs";
               }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Name"
                  placeholder={state.user.firstName}
                  placeholderTextColor="#666666"
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  values={values.name}
                />
                <MyTextInput
                  label="Email Address"
                  placeholder={state.user.email}
                  placeholderTextColor="#666666"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  values={values.email}
                  keyboardType="email-address"
                />
                <SelectDropdown
                  data={state.interests}
                  onSelect={(selectedItem) => {
                    values.primaryInterest = selectedItem;
                  }}
                  defaultButtonText={state.user.primaryInterest}
                  buttonTextAfterSelection={(selectedItem) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item) => {
                    return item;
                  }}
                  buttonStyle={styles.dropdown1BtnStyle}
                  buttonTextStyle={styles.dropdown1BtnTxtStyle}
                  renderDropdownIcon={isOpened => {
                    return <Text name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                  }}
                  dropdownIconPosition={'right'}
                  dropdownStyle={styles.dropdown1DropdownStyle}
                  rowStyle={styles.dropdown1RowStyle}
                  rowTextStyle={styles.dropdown1RowTxtStyle}
                />
                <SelectDropdown
                  data={state.interests}
                  onSelect={(selectedItem) => {
                    values.secondaryInterest = selectedItem;
                  }}
                  defaultButtonText={state.user.secondaryInterest}
                  buttonTextAfterSelection={(selectedItem) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item) => {
                    return item;
                  }}
                  buttonStyle={styles.dropdown1BtnStyle}
                  buttonTextStyle={styles.dropdown1BtnTxtStyle}
                  renderDropdownIcon={isOpened => {
                    return <Text name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                  }}
                  dropdownIconPosition={'right'}
                  dropdownStyle={styles.dropdown1DropdownStyle}
                  rowStyle={styles.dropdown1RowStyle}
                  rowTextStyle={styles.dropdown1RowTxtStyle}
                />
                {state.errorMessage ? <ErrorText>{state.errorMessage}</ErrorText> : null}
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Update</ButtonText>
                </StyledButton>
                <Line />
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
  );
};


const MyTextInput = ({
  label,
  ...props
}) => {
  return (
    <View>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
    </View>
  );
};
export default EditProfileScreen;

const styles = StyleSheet.create({

  dropdown1BtnStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    marginBottom: 10,
    marginTop: 10
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'center'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'center'},
});
