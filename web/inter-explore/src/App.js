import React from "react";

import {
  BrowserRouter, Route, Routes
} from 'react-router-dom';
import LoginSignupPage from "./pages/LoginSignupPage";

function App () {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<LoginSignupPage/>} exact/>
        
    </Routes>
</BrowserRouter>
  )
}
export default App;