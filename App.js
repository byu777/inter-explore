import RootStack from "./screens/RootStack";
import React from 'react';
import { Provider } from "react-native-paper";

export default function App() {
  return (
    <Provider>
    <RootStack/>
    </Provider>
  );
}