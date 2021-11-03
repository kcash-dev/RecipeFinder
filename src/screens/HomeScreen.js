import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import tailwind from 'tailwind-rn';
import { FontAwesome } from '@expo/vector-icons';

//Components
import SearchContainer from '../components/SearchContainer';
import Button from '../components/Button';
import ScrollPicker from '../components/ScrollPicker';

//Image
const lowerImage = { uri: "https://i.imgur.com/BRIllxL.png" }

export default function HomeScreen() {
    return (
        <SafeAreaView style={ tailwind(`bg-green-500 flex-1`)}>
            <SearchContainer name="UltraCook" />
            <View style={[ tailwind(`justify-center items-center bg-white`), styles.recipeSection ]}>
                <ScrollPicker />
                <Image
                    source={ lowerImage }
                    style={ tailwind(`h-40 w-40 opacity-50`) }
                />
                <Text style={ tailwind(`my-10`) }>Let's add an item to get started</Text>
                <Button style={ tailwind(`mb-80`) } name="Add Item" />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    recipeSection: {
        flex: .75,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    }
})
