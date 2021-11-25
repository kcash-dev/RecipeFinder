import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Button, SafeAreaView, FlatList } from 'react-native'
import tailwind from 'tailwind-rn';

const RecipeDataCard = ({ recipeSteps, similarRecipes, recipeUsedIngredients, recipeUnusedIngredients }) => {
    const [ steps, setSteps ] = useState(null)

    function getSteps() {
        setSteps(recipeSteps)
    }
    
    useEffect(() => {
        getSteps()
    }, [ recipeSteps ])
    
    return (
        <SafeAreaView style={ tailwind(`bg-green-500 flex-1`)}>
            <View style={[ tailwind(`items-center bg-white`), styles.recipeSection ]}>
                <View style={[ styles.innerContainer ]}>
                    <View style={ tailwind(`flex-auto`) }>
                        <Text style={ tailwind(`font-bold text-lg pl-2`) }>Instructions</Text>
                        <FlatList
                            data={ recipeSteps }
                            renderItem={({item}) => (
                                <View style={ tailwind(`flex-row m-2`) }>
                                    <Text>{ item.stepNumber }. { item.stepDescription }</Text>
                                </View>
                            )}
                            keyExtractor={item => item.stepNumber.toString()}
                        />
                    </View>
                    <View style={ tailwind(`flex-auto`) }>
                        <Text style={ tailwind(`font-bold text-lg pl-2`) }>Similar Recipes</Text>
                        <FlatList
                            data={ similarRecipes }
                            renderItem={({ item }) => (
                                <View style={ tailwind(`flex-row`) }>
                                    <Text>{ item.title }</Text>
                                </View>
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default RecipeDataCard

const styles = StyleSheet.create({
    recipeSection: {
        flex: 1,
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
