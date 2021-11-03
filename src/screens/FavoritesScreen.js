import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import tailwind from 'tailwind-rn'
import Button from '../components/Button'

//Components
import SearchContainer from '../components/SearchContainer'

//Images
const bgImage = { uri: "https://i.imgur.com/KH7vbXc.png" }

const FavoritesScreen = () => {
    const [ isRegistered, setIsRegistered ] = useState(false)
    return (
        <SafeAreaView style={ tailwind(`bg-green-500 flex-1`)}>
            <SearchContainer name="Favorites" />
            <View style={[ tailwind(`items-center bg-white`), styles.recipeSection ]}>
                { isRegistered ?
                    null
                    :
                    <View style={ tailwind(`justify-center items-center flex-1`) }>
                        <Image source={ bgImage } style={ tailwind(`h-40 w-40 mt-10 opacity-50`) } />
                        <Text style={ tailwind(`my-10`) }>Only registered users can save recipes.</Text>
                        <Button name="Sign up" />
                    </View>
                }
            </View>
        </SafeAreaView>
    )
}

export default FavoritesScreen

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
