import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import tailwind from 'tailwind-rn'

//Components
import SearchContainer from '../components/SearchContainer'
import Button from '../components/Button'

//Navigation
import { useNavigation } from '@react-navigation/native'

//Images
const bgImage = { uri: 'https://i.imgur.com/Ek88xHX.png' }

const ShoppingListScreen = () => {
    const [ numItems, setNumItems ] = useState(0)
    const navigation = useNavigation();
    return (
        <SafeAreaView style={ tailwind(`bg-green-500 flex-1`)}>
            <SearchContainer name="Shopping List" subtitle={`You have ${ numItems } items on your shopping list`} />
            <View style={[ tailwind(`justify-center items-center bg-white`), styles.recipeSection ]}>
                <Image source={ bgImage } style={ tailwind(`h-40 w-40 mt-10 opacity-50`) } />
                <Text style={ tailwind(`my-10`) }>Your shopping list is empty.</Text>
                <Button name="Add an item" onPress={ () => navigation.navigate('Pantry') }/>
            </View>
        </SafeAreaView>
    )
}

export default ShoppingListScreen

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
