import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, TouchableOpacity } from "react-native";
//icons
import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons";
//formik
import { Formik } from "formik";
// DateTimePicker
import DateTimePicker from "@react-native-community/datetimepicker";
// Components
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
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
  RightIconSignup
} from "./../components/LoginStyles";
import KeyboardAvoidingWrapper from "./../components/KeyboardAvoidingWrapper";

// Colors
const { brand, darkLight, primary } = Colors;

const Signup = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2000, 0, 1));

  // Actual date of birth to be sent
  const [dob, setDob] = useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageTitle>Flower Crib</PageTitle>
          <SubTitle>Account Signup</SubTitle>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              onChange={onChange}
            />
          )}
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              dateOfBirth: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values) => {
              console.log(values);
              navigation.navigate("Welcome");
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Full Name"
                  placeholder=""
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  values={values.email}
                  keyboardType="email-address"
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
                  label="Date of Birth"
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("dateOfBirth")}
                  onBlur={handleBlur("dateOfBirth")}
                  values={dob ? dob.toDateString() : ""}
                  isDate={true}
                  editable={false}
                  showDatePicker={showDatePicker}
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
                  label="Confirm Password"
                  placeholder=""
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  values={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
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
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  isDate,
  showDatePicker,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      {!isDate && <StyledTextInput {...props} />}
      {isDate && (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput {...props} />
        </TouchableOpacity>
      )}
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
