import React, { useState, useContext, useEffect} from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text} from "react-native";
//icons
import { Ionicons } from "@expo/vector-icons";
//formik
import { Formik } from "formik";
// Components
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledInputLabel,
  StyledTextInput,
  Colors,
  StyledButton,
  ButtonText,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  RightIconSignup, 
  ErrorText
} from "./../components/LoginStyles";
import KeyboardAvoidingWrapper from "./../components/KeyboardAvoidingWrapper";
import { Context as AuthContext } from './../context/AuthContext';
import SelectDropdown from 'react-native-select-dropdown';
import { StyleSheet } from "react-native";

// Colors
const { darkLight } = Colors; 

const Signup = ({ navigation }) => {
  // State to hide and show password
  const [hidePassword, setHidePassword] = useState(true);
  
  // States for user sign up
  const {state, signup, getInterests} = useContext(AuthContext);

  getInterests();
 
  useEffect(() => {
    {state.token ? navigation.navigate("Tab") : null}
  }, [state.token]);

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageTitle>Inter-Explore</PageTitle>
          <SubTitle>Account Signup</SubTitle>
          <Formik
            initialValues={{
              email: "",
              password: "",
              firstName: "",
              userName: "",
              primaryInterest: "",
              secondaryInterest: "",
            }}
            onSubmit={(values) => {
              //console.log(values)
              if (values.email != '' && values.password != '' && values.firstName != '' &&
               values.userName != '' && values.primaryInterest != '' && values.secondaryInterest != '') {
                 if (values.email.includes("@")){
                  signup(values);
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
                  label="First Name"
                  placeholder=""
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  values={values.firstName}
                />
                <MyTextInput
                  label="Email Address"
                  placeholder=""
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  values={values.email}
                  keyboardType="email-address"
                />
                <MyTextInput
                  label="Username"
                  placeholder=""
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("userName")}
                  onBlur={handleBlur("userName")}
                  values={values.userName}
                />
                <MyTextInput
                  label="Password"
                  placeholder=""
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  values={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <SelectDropdown
                  data={state.interests}
                  onSelect={(selectedItem) => {
                    values.primaryInterest = selectedItem;
                  }}
                  defaultButtonText={'Select Primary Interest'}
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
                  defaultButtonText={'Select Secondary Interest'}
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
                  <ButtonText>Signup</ButtonText>
                </StyledButton>
                <Line />
                <ExtraView>
                  <ExtraText>Already have an account?</ExtraText>
                  <TextLink onPress={() => navigation.navigate("Login")}>
                    <TextLinkContent>Login</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({
  label,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIconSignup onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            size={30}
            color={darkLight}
            name={hidePassword ? "md-eye-off" : "md-eye"}
          />
        </RightIconSignup>
      )}
    </View>
  );
};

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

export default Signup;
