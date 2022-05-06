import React, { useState, useContext} from "react";
import { StatusBar } from "expo-status-bar";
import { View, TouchableOpacity, Text } from "react-native";
//icons
import { Octicons, Ionicons } from "@expo/vector-icons";
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

// Colors
const { brand, darkLight, primary } = Colors;

const Signup = ({ navigation }) => {
  // State to hide and show
  const [hidePassword, setHidePassword] = useState(true);
  
  // States for user sign up
  const {state, signup} = useContext(AuthContext);

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
              console.log(values);
              signup(values)
              if (state.successfulSignup == true) {
                navigation.navigate("Welcome")
              }
              //navigation.navigate("Welcome")
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
                <MyTextInput
                  label="Primary Interest"
                  placeholder=""
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("primaryInterest")}
                  onBlur={handleBlur("primaryInterest")}
                  isPassword={false}
                  values={values.primaryInterest}
                />
                <MyTextInput
                  label="Secondary Interest"
                  placeholder=""
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("secondaryInterest")}
                  onBlur={handleBlur("secondaryInterest")}
                  values={values.secondaryInterest}
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

export default Signup;
