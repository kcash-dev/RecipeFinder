import React, { useCallback, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, Image, FlatList } from 'react-native'
import tailwind from 'tailwind-rn';

//Components


const RecipeCard = ({ recipeName, recipeURI, recipeImage, ingredientLines }) => {
    
    const renderItem = useCallback(
        ({ item }) => (
            <View>
                <Text>{ item }</Text>
            </View>
    ), [])

    const keyExtractor = useCallback((item) => item, [])
    
    return (
        <SafeAreaView style={ [ tailwind(`w-full mb-2 self-center border-gray-300 rounded-lg border-opacity-50 border`), styles.cardContainer ] }>
                <View style={[ styles.upperCard, tailwind(`h-16 flex-row justify-between items-center border-b border-gray-200`) ]}>
                    <View style={ tailwind(`ml-5 flex-row items-center`) }>
                        <Image 
                            source={{ uri: recipeImage }}
                            style={ tailwind(`h-10 w-10`) }
                        />
                        <Text style={ tailwind(`w-5/6 pl-5`) }>{ recipeName }</Text>
                    </View>
                    <View style={ tailwind(`pr-5`) }>
                        <Text style={ tailwind(`text-lg`) }></Text>
                    </View>
                </View>
                <View style={[ styles.lowerCard, tailwind(`justify-center pl-1 w-full`) ]}>
                    <View style={ tailwind(`py-5`) }>
                        <FlatList 
                            data={ ingredientLines }
                            renderItem={ renderItem }
                            keyExtractor={ keyExtractor }
                        />
                    </View>
                </View>
        </SafeAreaView>
    )
}

export default RecipeCard

const styles = StyleSheet.create({
    cardContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    upperCard: {
        flex: 1
    },
    lowerCard: {
        flex: 4
    }
})
