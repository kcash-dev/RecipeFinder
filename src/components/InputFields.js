import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import tailwind from 'tailwind-rn';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const InputFields = ({ placeholder, name, callback, getText, autoCaps, secureText }) => {
    const [ item, setItem ] = useState('')
    function isCallback(){
        if(callback) {
            callback();
        } else if (getText) {
            getText(item)
        }
    }

    return (
        <View style={[ tailwind(`flex-row w-11/12 self-center rounded-lg justify-center items-center bg-white`), styles.inputFieldsContainer ]}>
            <MaterialCommunityIcons name={ name } size={24} color="black" style={ tailwind(`p-3 opacity-50`) }/>
            <TextInput 
                placeholder={ placeholder } 
                style={ tailwind(`py-3 pr-5 bg-white flex-1`) }
                onChangeText={text => setItem(text) }
                onEndEditing={ isCallback }
                onSubmitEditing={ isCallback }
                value={ item }
                autoCapitalize={ autoCaps ? 'none' : 'words' }
                secureTextEntry={ secureText ? true : false }
            />
        </View>
    )
}

export default InputFields

const styles = StyleSheet.create({
    inputFieldsContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})