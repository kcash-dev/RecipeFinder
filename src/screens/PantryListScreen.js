import React, { useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'

//Firebase
import { db, auth, doc, getDoc, onSnapshot } from '../api/Firebase'

const PantryListScreen = ({ observer }) => {
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
        getItemData
    }, [ observer ])

    return (
        <SafeAreaView>
            <Text>This is the pantry list screen</Text>
        </SafeAreaView>
    )
}

export default PantryListScreen

const styles = StyleSheet.create({})
