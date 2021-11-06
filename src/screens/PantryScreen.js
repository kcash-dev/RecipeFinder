import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import tailwind from 'tailwind-rn';
import { useNavigation } from '@react-navigation/native';

//Firebase
import { db, auth, doc, getDoc, onSnapshot } from '../api/Firebase'

//Components
import IngredientSection from '../components/IngredientSection';
import SearchContainer from '../components/SearchContainer';
import Button from '../components/Button'

//Image
const upperImage = { uri: "https://i.imgur.com/CrICZPR.jpg" }

const PantryScreen = () => {
    const [ numPickedItems, setNumPickedItems ] = useState(0)
    const [ pickedItems, setPickedItems ] = useState([])

    const navigation = useNavigation();

    const listening = doc(db, 'users', auth.currentUser.uid)
    const observer = onSnapshot(listening, (doc) => {

    })

    async function getItemData() {
        const snapshot = await getDoc(listening)
        const data = snapshot.data()
        if(data) {
            if (data.currentIngredients.length !== numPickedItems) {
                setNumPickedItems(data.currentIngredients.length)
                setPickedItems(data.currentIngredients)
            }
        }
    }

    useEffect(() => {
        getItemData()
        return () => {
            return;
        }
    }, [ observer ])

    return (
        <SafeAreaView style={ tailwind(`bg-green-500 flex-1`)}>
            <SearchContainer name="Pantry" subtitle="Pick some items to get started"/>
            <View style={[ tailwind(`items-center bg-white`), styles.recipeSection ]}>
                <IngredientSection />
            </View>
            <View style={ tailwind(`flex-row justify-evenly bg-white py-3`) }>
                <Button name="My Pantry" observer={ observer } onPress={() => navigation.navigate('PantryList')} number={ numPickedItems }/>
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
