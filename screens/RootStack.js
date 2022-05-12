import React from 'react';

// React navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Tab from './../tabs/tab'

// Context
import { Provider as AuthProvider} from './../context/AuthContext';

const Stack = createNativeStackNavigator();

const RootStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{headerShown: false}}
                initalRouteName="Login"
            > 
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Tab" component={Tab} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const App = RootStack
export default () => {
    return (
        <AuthProvider>
            <App />
        </AuthProvider>
    )
};