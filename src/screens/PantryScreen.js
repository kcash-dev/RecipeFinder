import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import tailwind from 'tailwind-rn';
import { useNavigation } from '@react-navigation/native';

//Redux
import { useSelector } from 'react-redux';

//Firebase
import { auth, db, doc, updateDoc } from '../api/Firebase';

//Components
import IngredientSection from '../components/IngredientSection';
import SearchContainer from '../components/SearchContainer';
import Button from '../components/Button'

//Image
const upperImage = { uri: "https://i.imgur.com/CrICZPR.jpg" }

const PantryScreen = () => {
    const [ numPickedItems, setNumPickedItems ] = useState(0)

    const storeState = useSelector(state => state.ingredients)

    const navigation = useNavigation();

    setTimeout(() => {
        updateDocs()
    }, 120000)

    async function updateDocs() {
        if (auth.currentUser) {
            updateDoc(doc(db, 'users', auth.currentUser.uid), {
                currentIngredients: storeState
            });
        }
    }

    useEffect(() => {
        setNumPickedItems(storeState.length)
    }, [ storeState ])

    return (
        <SafeAreaView style={ tailwind(`bg-green-500 flex-1`)}>
            <SearchContainer name="Pantry" subtitle="Pick some items to get started"/>
            <View style={[ tailwind(`items-center bg-white`), styles.recipeSection ]}>
                <IngredientSection />
            </View>
            <View style={ tailwind(`flex-row justify-evenly bg-white py-3`) }>
                <Button name="My Pantry" onPress={() => navigation.navigate('PantryList')} number={ numPickedItems }/>
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
