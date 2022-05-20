import React from 'react';

// React navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Tab from './../tabs/tab'
import Chatroom from './chatroom';
import MessageBoardPage from './messageboard';
import EventList from './event_list';
import MakeEventPage from "./../screens/create_event";
import AdminSuggestionsInfo from './admin_suggestions_info';
import AdminSuggestions from './admin_suggestions';

// Context
import { Provider as AuthProvider} from './../context/AuthContext';

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
                    headerTitle: '',
                    headerLeftContainerStyle: {
                        paddingLeft: 20
                    }
                }}
            > 
                <Stack.Screen name='SuggestionPage' component={AdminSuggestions}/>
                <Stack.Screen name='SuggestionPageInfo' component={AdminSuggestionsInfo}/>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Tab" component={Tab} />
                <Stack.Screen name="Chatroom" component={Chatroom} 
                options={{headerShown: true}} />
                <Stack.Screen name="MessageBoardPage" component={MessageBoardPage} />
                <Stack.Screen name="EventList" component={EventList} />
                <Stack.Screen name="CreateEvent" component={MakeEventPage}
                options={{headerShown: true}} />
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