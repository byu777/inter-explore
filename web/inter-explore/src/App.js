import React from "react";

import {
  BrowserRouter, Route, Routes
} from 'react-router-dom';
import Navigation from "./components/Navigation";
import Chat from "./pages/Chat";
import HomePage from "./pages/HomePage";
import LoginSignupPage from "./pages/LoginSignupPage";

function App () {
  return (
    <BrowserRouter>
    <Navigation/>
    <Routes>
    <Route path="/" element={<HomePage/>} exact/>
    <Route path="/loginSignUp" element={<LoginSignupPage/>} exact/>
    <Route path="/chat" element={<Chat/>} exact/>    
    </Routes>
</BrowserRouter>
  )
}
export default App;