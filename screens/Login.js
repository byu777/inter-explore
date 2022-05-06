import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
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
} from "./../components/LoginStyles";
import KeyboardAvoidingWrapper from "./../components/KeyboardAvoidingWrapper";
import { Context as AuthContext } from './../context/AuthContext'; 

// Colors
const { darkLight } = Colors;

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);

  const {state, signin} = useContext(AuthContext);


  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo
            resizeMode="cover"
            source={require("../assets/favicon/favicon.png")}
          />
          <PageTitle>Inter-Explore</PageTitle>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
              console.log(values);
              signin(values)
              //navigation.navigate("Welcome")
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  placeholder="Email"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  values={values.email}
                  keyboardType="email-address"
                />
                <MyTextInput
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
  ...props
}) => {
  return (
    <View>
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
