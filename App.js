import LandingPage from "./screens/landing_page";
import MessageBoardPage from "./screens/messageboard";
import Profile from "./screens/Profile";
import RootStack from "./screens/RootStack";
import React from 'react';
import Tabs from "./tabs/tab";
import { View, Button, SafeAreaView, BrowserRouter } from 'react-native';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import MakeEventPage from "./screens/create_event";
//import { AppContext, socket } from './context/appContext';

export default function App() {
  return (
    <MakeEventPage/>
    //<RootStack/>
  );
}
