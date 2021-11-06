import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import tailwind from 'tailwind-rn';

//Components
import IngredientSection from '../components/IngredientSection';
import SearchContainer from '../components/SearchContainer';
import Button from '../components/Button'

//Image
const upperImage = { uri: "https://i.imgur.com/CrICZPR.jpg" }

const PantryScreen = () => {
    const [ pickedItems, setPickedItems ] = useState([])

    function getPickedItems(item) {
        setPickedItems([
            ...pickedItems,
            item
        ])
    }
    return (
        <SafeAreaView style={ tailwind(`bg-green-500 flex-1`)}>
            <SearchContainer name="Pantry" subtitle="Pick some items to get started"/>
            <View style={[ tailwind(`items-center bg-white`), styles.recipeSection ]}>
                <IngredientSection 
                    pickedItems={ pickedItems }
                    setPickedItems={ getPickedItems }
                />
            </View>
            <View style={ tailwind(`flex-row justify-evenly bg-white py-3`) }>
                <Button name="My Pantry" number={ pickedItems.length }/>
                <Button name="Recipes"/>
            </View>
        </SafeAreaView>
    )
}

export default PantryScreen

const styles = StyleSheet.create({
    upperSection: {
        flex: .25
    },
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
