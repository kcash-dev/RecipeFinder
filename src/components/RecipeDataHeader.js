import React from 'react'
import { StyleSheet, Text, SafeAreaView, Image, View, ImageBackground } from 'react-native'
import tailwind from 'tailwind-rn'

//Images
const upperImage = { uri: "https://i.imgur.com/CrICZPR.jpg" }

const RecipeDataHeader = ({ recipeName, recipeImage, recipeLikes }) => {
    return (
        <SafeAreaView style={ tailwind(`flex-row bg-green-500`) }>
            <ImageBackground 
                source={ upperImage }
                resizeMode="cover"
                style={ tailwind(`flex-1 w-full`) }
                imageStyle={{ opacity: 0.1 }}
            >
                <View style={ tailwind(`flex-row`) }>
                    <Image
                        source={{ uri: recipeImage }}
                        style={ tailwind(`h-36 w-36 rounded-lg m-3`) }
                    />
                    <View style={ tailwind(`mt-2`) }>
                        <Text style={ tailwind(`text-lg w-3/4 font-bold`) }>{ recipeName }</Text>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default RecipeDataHeader

const styles = StyleSheet.create({})
