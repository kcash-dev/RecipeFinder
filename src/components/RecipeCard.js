import React, { useCallback, useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native'
import tailwind from 'tailwind-rn';

//Navigation
import { useNavigation } from '@react-navigation/native';


const RecipeCard = ({ recipeCategory, recipeLikes, recipeID, recipeUsedIngredientCount, recipeUsedIngredients, recipeUnusedIngredientCount, recipeUnusedIngredients, recipeName, recipeImage, recipeURI }) => {
    const [ usedIngredients, setUsedIngredients ] = useState([]);
    const [ unusedIngredients, setUnusedIngredients ] = useState([]);
    const [ usedNames, setUsedNames ] = useState();
    const [ unusedNames, setUnusedNames ] = useState();

    const navigation = useNavigation();

    const renderItem = useCallback(
        ({ item }) => (
            <View>
                <Text>{ item }</Text>
            </View>
    ), [])

    function sortIngredientLines() {
        const usedList = []
        const unusedList = []
        const usedName = []
        const unusedName = []
        recipeUsedIngredients.forEach(item => {
            usedList.push(item.original)
            usedName.push(item.name)
        })
        recipeUnusedIngredients.forEach(item => {
            unusedList.push(item.original)
            unusedName.push(item.name)
        })
        setUsedIngredients(usedList)
        setUnusedIngredients(unusedList)
        setUsedNames(usedName)
        setUnusedNames(unusedName)
    }

    useEffect(() => {
        sortIngredientLines()
    }, [ recipeUsedIngredients ])

    const keyExtractor = useCallback((item) => item.recipeID, [])
    
    return (
        <SafeAreaView style={ [ tailwind(`w-full mb-2 self-center border-gray-300 rounded-lg border-opacity-50 border`), styles.cardContainer ] }>
            <Pressable
                style={({ pressed }) => [{
                    opacity: pressed ?
                        0.5
                        :
                        1
                }]}
                onPress={ () =>  navigation.navigate('RecipeData', { 
                    recipeLikes: recipeLikes, 
                    recipeID: recipeID, 
                    recipeUsedIngredientCount: recipeUsedIngredientCount, 
                    recipeUsedIngredients: usedIngredients, 
                    recipeUnusedIngredientCount: recipeUnusedIngredientCount, 
                    recipeUnusedIngredients: unusedIngredients, 
                    recipeName: recipeName, 
                    recipeImage: recipeImage, 
                    recipeURI: recipeURI,
                    usedIngred: usedNames,
                    unusedIngred: unusedNames,
                    recipeCategory: recipeCategory
                 })}
            >
                <View style={[ styles.upperCard, tailwind(`flex-row border-b border-gray-200`) ]}>
                    <Image 
                        source={{ uri: recipeImage }}
                        style={ tailwind(`h-20 w-20 mt-2 rounded m-2`) }
                    />
                    <View style={ tailwind(`justify-center`) }>
                        <View style={ tailwind(`w-11/12`) }>
                            <Text style={ tailwind(`text-lg font-bold`) }>{ recipeName }</Text>
                        </View>
                        <View style={ tailwind(`flex-row items-center my-2`) }>
                            <Image
                                source={{ uri: "https://i.imgur.com/qWCForE.png" }}
                                style={ tailwind(`h-6 w-6`) }
                            />
                            <Text style={ tailwind(`pl-2 text-lg`) }>{ recipeLikes }</Text>
                        </View>
                    </View>
                </View>
                <View style={[ styles.lowerCard, tailwind(`justify-center pl-1 w-full`) ]}>
                    <View style={ tailwind(`py-5`) }>
                        <View style={ tailwind(`flex-row justify-between`) }>
                            <Text style={ tailwind(`italic text-lg underline`) }>Used Ingredients</Text>
                            <Text style={ tailwind(`font-bold text-lg`) }>{ recipeUsedIngredientCount }</Text>
                        </View>
                        <FlatList 
                            data={ usedIngredients }
                            renderItem={ renderItem }
                            keyExtractor={ keyExtractor }
                        />
                    </View>
                    <View style={ tailwind(`py-5`) }>
                        <View style={ tailwind(`flex-row justify-between`) }>
                            <Text style={ tailwind(`italic text-lg underline`) }>Missing Ingredients — { recipeUnusedIngredientCount }</Text>
                        </View>
                        <FlatList 
                            data={ unusedIngredients }
                            renderItem={ renderItem }
                            keyExtractor={ keyExtractor }
                        />
                    </View>
                </View>
            </Pressable>
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
