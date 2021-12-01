import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, Pressable } from 'react-native'
import tailwind from 'tailwind-rn';
import { MaterialIcons } from '@expo/vector-icons';

const RecipeDataCard = ({ recipeSteps, similarRecipes, recipeUsedIngredients, recipeUnusedIngredients }) => {
    const [ steps, setSteps ] = useState(null)
    const [ instructionsExpanded, setInstructionsExpanded ] = useState(false)
    const [ similarRecipesExpanded, setSimilarRecipesExpanded ] = useState(false)

    function getSteps() {
        setSteps(recipeSteps)
    }
    
    useEffect(() => {
        getSteps()
    }, [ recipeSteps ])

    const renderItem = ({ item }) => (
        <Pressable style={({ pressed }) => [{
            opacity: pressed ?
                0.5
                :
                1
            },
            tailwind(`flex-row m-1 ml-2`) 
            ]}
        >
            <Text style={ tailwind(`text-blue-500`) }>{ item.title }</Text>
        </Pressable>
    )

    console.log(similarRecipes)

    const keyExtractor = item => item.id
    
    return (
        <SafeAreaView style={ tailwind(`bg-green-500 flex-1`)}>
            <View style={[ tailwind(`items-center bg-white`), styles.recipeSection ]}>
                <View style={[ styles.innerContainer ]}>
                    <View 
                        style={[ 
                            { height: instructionsExpanded ?
                                250
                                :
                                30
                            },
                            tailwind(`border-b w-full`) 
                        ]}>
                        <Pressable 
                            style={({ pressed }) => [
                                {
                                    opacity: pressed ?
                                        0.5
                                        :
                                        1
                                },
                                tailwind(`flex-row justify-between items-center`)
                                ]  
                            }
                            onPress={() => setInstructionsExpanded(!instructionsExpanded)}
                            >
                            <Text style={ tailwind(`font-bold text-lg pl-2`) }>Instructions</Text>
                            { instructionsExpanded ?
                                <MaterialIcons name="keyboard-arrow-up" size={24} color="black" style={ tailwind(`pr-3`)} />
                                :
                                <MaterialIcons name="keyboard-arrow-down" size={24} color="black" style={ tailwind(`pr-3`) }/>
                            }
                        </Pressable>
                        <FlatList
                            data={ recipeSteps }
                            renderItem={({item}) => (
                                <View style={ tailwind(`flex-row m-2`) }>
                                    <Text>{ item.stepNumber }. { item.stepDescription }</Text>
                                </View>
                            )}
                            showsVerticalScrollIndicator="false"
                            keyExtractor={item => item.stepNumber.toString()}
                        />
                    </View>
                    <View
                        style={[ 
                            { height: similarRecipesExpanded ?
                                250
                                :
                                30
                            },
                            tailwind(`border-b`) 
                        ]}>
                        <Pressable 
                            style={({ pressed }) => [
                                {
                                    opacity: pressed ?
                                        0.5
                                        :
                                        1
                                },
                                tailwind(`flex-row justify-between items-center`)
                                ] 
                            }
                            onPress={() => setSimilarRecipesExpanded(!similarRecipesExpanded)}
                        >
                            <Text style={ tailwind(`font-bold text-lg pl-2`) }>Similar Recipes</Text>
                            { similarRecipesExpanded ?
                                <MaterialIcons name="keyboard-arrow-up" size={24} color="black" style={ tailwind(`pr-3`)} />
                                :
                                <MaterialIcons name="keyboard-arrow-down" size={24} color="black" style={ tailwind(`pr-3`) }/>
                            }
                        </Pressable> 
                        <FlatList
                            data={ similarRecipes }
                            renderItem={ renderItem }
                            keyExtractor={ keyExtractor }
                            showsVerticalScrollIndicator="false"
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
