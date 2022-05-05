import React from 'react';
import { StatusBar } from 'expo-status-bar';

// Components
import {
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Line,
  WelcomeContainer,
  WelcomeImage,
  Avatar,
} from './../components/LoginStyles';


const Welcome = ({navigation}) => {

  return (
      <>
      <StatusBar style="dark" />
      <InnerContainer>
          <WelcomeImage resizeMode="cover" source={require('./../assets/favicon.png')} />
        <WelcomeContainer>
            <StyledFormArea>
            <Avatar resizeMode="cover" source={require('./../assets/favicon.png')} />
            <PageTitle welcome={true} >Welcome Justin!</PageTitle>
            <SubTitle welcome={true} >Justin Payne</SubTitle>
            <SubTitle welcome={true} >justinthecore@gmail.com</SubTitle>
            <Line />
            <StyledButton onPress={() => {navigation.navigate('Login')}}>
                <ButtonText>Logout</ButtonText>
            </StyledButton>
            </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
      </>
  );
};


export default Welcome;
