import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, Pressable, Alert } from 'react-native'
import tailwind from 'tailwind-rn';
import { MaterialIcons } from '@expo/vector-icons';
import { addToShoppingCart } from '../store/actions'

//Redux
import { useDispatch } from 'react-redux'

const RecipeDataCard = ({ recipeCategory, recipeSteps, similarRecipes, usedIngred, unusedIngred, recipeName }) => {
    const [ steps, setSteps ] = useState(null)
    const [ instructionsExpanded, setInstructionsExpanded ] = useState(false)
    const [ similarRecipesExpanded, setSimilarRecipesExpanded ] = useState(false)
    const [ usedIngredientsExpanded, setUsedIngredientsExpanded ] = useState(false)
    const [ unusedIngredientsExpanded, setUnusedIngredientsExpanded ] = useState(false)
    const [ clickedItem, setClickedItem ] = useState({
        ingredientName: recipeName,
        category: recipeCategory
    })

    const dispatch = useDispatch()

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

    const renderIngred = ({ item }) => (
        <Pressable
            style={({pressed}) => [{
                opacity: pressed ?
                    0.5
                    :
                    1,
                backgroundColor: '#D3D3D3'
            }, { width: 102 }, tailwind(`m-1 h-14 justify-center rounded-md`) ]}
            onLongPress={() => addItemToShoppingCart(clickedItem)}
        >
            <Text style={ tailwind(`text-center`) }>{ item }</Text>
        </Pressable>
    )

    const keyExtractor = item => item.id

    function addItemToShoppingCart(item) {
        dispatch(addToShoppingCart(item))
        Alert.alert('Item added to shopping list')
    }
    
    return (
        <SafeAreaView style={ tailwind(`bg-green-500 flex-1`) }>
            <View style={[ tailwind(`items-center bg-white`), styles.recipeSection ]}>
                <View style={[ styles.innerContainer, styles.cardContainer ]}>
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
                    <View
                        style={[ 
                            { height: usedIngredientsExpanded ?
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
                            onPress={() => setUsedIngredientsExpanded(!usedIngredientsExpanded)}
                        >
                            <Text style={ tailwind(`font-bold text-lg pl-2`) }>Used Ingredients</Text>
                            { usedIngredientsExpanded ?
                                <MaterialIcons name="keyboard-arrow-up" size={24} color="black" style={ tailwind(`pr-3`)} />
                                :
                                <MaterialIcons name="keyboard-arrow-down" size={24} color="black" style={ tailwind(`pr-3`) }/>
                            }
                        </Pressable> 
                        <FlatList
                            data={ usedIngred }
                            renderItem={ renderIngred }
                            keyExtractor={ keyExtractor }
                            showsVerticalScrollIndicator="false"
                            numColumns={3}
                        />
                    </View>
                    <View
                        style={[ 
                            { height: unusedIngredientsExpanded ?
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
                            onPress={() => setUnusedIngredientsExpanded(!unusedIngredientsExpanded)}
                        >
                            <Text style={ tailwind(`font-bold text-lg pl-2`) }>Unused Ingredients</Text>
                            { unusedIngredientsExpanded ?
                                <MaterialIcons name="keyboard-arrow-up" size={24} color="black" style={ tailwind(`pr-3`)} />
                                :
                                <MaterialIcons name="keyboard-arrow-down" size={24} color="black" style={ tailwind(`pr-3`) }/>
                            }
                        </Pressable> 
                        <FlatList
                            data={ unusedIngred }
                            renderItem={ renderIngred }
                            keyExtractor={ keyExtractor }
                            showsVerticalScrollIndicator="false"
                            numColumns={3}
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
    },
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
})
