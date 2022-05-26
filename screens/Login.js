import React, { useState, useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Image } from "react-native";
//icons
import { Ionicons } from "@expo/vector-icons";
//formik
import { Formik } from "formik";
// Components
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  StyledFormArea,
  StyledTextInput,
  RightIcon,
  Colors,
  StyledButton,
  ButtonText,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  ErrorText,
  StyledInputLabel
} from "./../components/LoginStyles";
import KeyboardAvoidingWrapper from "./../components/KeyboardAvoidingWrapper";
import { Context as AuthContext } from './../context/AuthContext';
// import PushNotification from "react-native-push-notification";

// PushNotification.configure({
//   onNotification: function(notification) {
//     console.log('NOTIFICATION:', notification);

//   },
//   requestPermissions: Platform.OS === 'ios'
// })

// Colors
const { darkLight } = Colors;

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);

  const {state, signin, getInterests} = useContext(AuthContext);

  useEffect(() => {
    getInterests()
  }, []);
  
  useEffect(() => {
    getInterests()
  }, [state.newInterest]);

  useEffect(() => {
    {state.token ? navigation.navigate("Tab") : null}
  }, [state.token]);



  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo
            resizeMode="cover"
            source={require("./../assets/logo/logo5.png")}
          />
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
              signin(values)
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Email"
                  placeholder="Email"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  values={values.email}
                  keyboardType="email-address"
                />
                <MyTextInput
                  label="Password"
                  placeholder="Password"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  values={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                {state.errorMessage ? <ErrorText>{state.errorMessage}</ErrorText> : null}
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Login</ButtonText>
                </StyledButton>
                <ExtraView>
                  <ExtraText>Don't have an account?</ExtraText>
                  <TextLink onPress={() => navigation.navigate("Signup")}>
                    <TextLinkContent> Sign up</TextLinkContent>
                  </TextLink>
                </ExtraView>
                <Line />
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({
  isPassword,
  hidePassword,
  setHidePassword,
  label,
  ...props
}) => {
  return (
    <View>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon isLoginPassword={true} onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            size={30}
            color={darkLight}
            name={hidePassword ? "md-eye-off" : "md-eye"}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
