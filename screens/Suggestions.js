import React, { useState, useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
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
  ErrorText,
} from "../components/LoginStyles";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import { Context as AuthContext } from "../context/AuthContext";
import { StyleSheet } from "react-native";
import trackerApi from "../api/tracker";

// Colors
const { darkLight } = Colors;

const Suggestions = ({ navigation }) => {
  // State to hide and show password
  const [errorMessage, setErrorMessage] = useState('');

  // States for user sign up
  const { state, addNewInterest } = useContext(AuthContext);

  function checkSame(InterestName) {
    let interestNames = state.interests;
    for (let i = 0; i < interestNames.length; i++){
        if (interestNames[i] == InterestName){
            return false;
        }
    }
    return true
}

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageTitle>Inter-Explore</PageTitle>
          <SubTitle>Interest Suggestions</SubTitle>
          <Formik
            initialValues={{
              InterestName: "",
            }}
            onSubmit={(values) => {
              if (values.InterestName != ''){
                  if (checkSame(values.InterestName) != false) {
                      setErrorMessage('');
                      addNewInterest(values.InterestName, true);
                      navigation.navigate("Login");
                  } else {
                    setErrorMessage('This Interest already exists');
                  }
              } else {
                setErrorMessage('Please Enter a Interest Name');
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <ExtraView>
                  <ExtraText>Enter a new Interest Name</ExtraText>
                </ExtraView>
                <MyTextInput
                  label=""
                  placeholder=""
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("InterestName")}
                  onBlur={handleBlur("firstName")}
                  values={values.InterestName}
                />
                {errorMessage ? <ErrorText>{errorMessage}</ErrorText> : null}
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Submit</ButtonText>
                </StyledButton>
                <ExtraView>
                  <ExtraText>The Interest you add will be included on the signup page but will be flagged for admin review.</ExtraText>
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

});

export default Suggestions;
