import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import tailwind from 'tailwind-rn';
import { Ionicons } from '@expo/vector-icons';

const Search = () => {
    return (
        <View style={[ tailwind(`flex-row w-11/12 self-center rounded-lg justify-center items-center bg-white`), styles.searchContainer ]}>
            <Ionicons name="md-search-sharp" size={24} color="black" style={ tailwind(`p-3 opacity-50`) }/>
            <TextInput 
                placeholder="Search for anything"  
                style={ tailwind(`py-3 pr-5 bg-white flex-1`) }
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
