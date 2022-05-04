import React from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';

const KeyboardAvoidingWrapper = ({children}) => {
    return (
        <KeyboardAvoidingView style={{flex: 1}}>
            <ScrollView contentContainerStyle={{flex: 1}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismess}>
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default KeyboardAvoidingWrapper;