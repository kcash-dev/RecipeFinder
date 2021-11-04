import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import tailwind from 'tailwind-rn';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Search = ({ placeholder, name, callback }) => {
    function isCallback(){
        if(callback) {
            callback();
        }
    }
    return (
        <View style={[ tailwind(`flex-row w-11/12 self-center rounded-lg justify-center items-center bg-white`), styles.searchContainer ]}>
            <MaterialCommunityIcons name={ name } size={24} color="black" style={ tailwind(`p-3 opacity-50`) }/>
            <TextInput 
                placeholder={ placeholder } 
                style={ tailwind(`py-3 pr-5 bg-white flex-1`) }
                onFocus={ isCallback }
            />
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    searchContainer: {
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
