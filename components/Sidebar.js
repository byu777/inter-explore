import React from 'react';
import { View, Button, SafeAreaView, BrowserRouter } from 'react-native';
import {useSelector} from 'react-redux';

function Sidebar() {
    const rooms = ['first room', 'second room', 'third room'];
    //const user = useSelector({state} => state.user);

    return (
        <View>
            <Text>Available groups</Text>
            <FlatList>
                {/* {rooms.map{{room, }}} */}
            </FlatList>
        </View>
    );
}

export default Sidebar;