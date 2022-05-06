import React from 'react';

// React navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import Tabs from './../tabs/tab'
import Profile from './Profile';
import { Provider as AuthProvider} from './../context/AuthContext';

// Colors
import {Colors} from './../components/LoginStyles';
const { brand, darkLight, primary, tertiary} = Colors;

const Stack = createNativeStackNavigator();

const RootStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'transparent'
                    },
                    headerTintColor: tertiary,
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeftContainerStyle: {
                        paddingLeft: 20
                    }
                }}
                initalRouteName="Login"
            > 
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen options={{headerTintColor: brand}} name="Welcome" component={Welcome} />
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