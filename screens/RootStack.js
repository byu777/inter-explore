import React from 'react';

// React navigation
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Tab from './../tabs/tab'
import Chatroom from './chatroom';
import MessageBoardPage from './messageboard';
import EventList from './event_list';
import MakeEventPage from "./../screens/create_event";

// Context
import { Provider as AuthProvider} from './../context/AuthContext';
import { Provider as EventProvider } from '../context/EventContext';

const Stack = createNativeStackNavigator();

const RootStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{headerShown: false,
                    headerStyle: {
                        backgroundColor: 'transparent'
                    },
                    headerTintColor: '#219EBC',
                    headerTransparent: true,
                    headerLeftContainerStyle: {
                        paddingLeft: 20
                    }
                }}
            > 
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Tab" component={Tab} />
                <Stack.Screen name="Chatroom" component={Chatroom} 
                options={{headerShown: true, title: ""}} />
                <Stack.Screen name="MessageBoardPage" component={MessageBoardPage} />
                <Stack.Screen name="EventList" component={EventList} />
                <Stack.Screen name="CreateEvent" component={MakeEventPage}
                options={{headerShown: true, title: ""}} />
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