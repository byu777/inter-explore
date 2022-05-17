
import React, {useState, useContext} from 'react';
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
import { useDispatch, useSelector } from "react-redux";
import trackerApi from "../api/tracker";

const EditProfileScreen = () => {

  const {state, submit, getInterests, updateProfile} = useContext(AuthContext);
  getInterests();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  //const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!state.user) {
  //     history.push("/");
  //   } else {
  //     setName(state.user.firstName);
  //     setEmail(state.user.email);
  //   }
  // }, [history, state.user]);


  const submitHandler = async(e) => {
    e.preventDefault();
  try{
    
    const newUser = state.user;
    newUser.email = 'ah'
    newUser.firstName = 'tom'

    updateProfile(newUser)
    // console.log(newUser)
    // //console.log(state.user)
    // const { data } = await trackerApi.post("/api/users/profile", newUser);
    // console.log(data)
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
              email: "",
              firstName: "",
              primaryInterest: "",
              secondaryInterest: "",
            }}
            onSubmit={(values) => {
              console.log(values)
              if (values.email != '' && values.firstName != '' &&
                  values.primaryInterest != '' && values.secondaryInterest != '') {
                 if (values.email.includes("@")){
                  submit(values)
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
                  placeholder={state.user.name}
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  values={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <MyTextInput
                  label="Email Address"
                  placeholder={state.user.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  values={email}
                  keyboardType="email-address"
                  onChange={(e) => setEmail(e.target.value)}
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
                <StyledButton onPress={submitHandler}>
                  <ButtonText>Submit</ButtonText>
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
