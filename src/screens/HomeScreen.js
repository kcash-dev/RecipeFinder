import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, FlatList } from 'react-native'
import tailwind from 'tailwind-rn';
import { useNavigation } from '@react-navigation/native';


//Redux
import { useSelector } from 'react-redux';

//Firebase
import { db, auth, setDoc, doc, onAuthStateChanged, signInAnonymously } from '../api/Firebase';

//Component
import SearchContainer from '../components/SearchContainer';
import Button from '../components/Button';
import ScrollPicker from '../components/ScrollPicker';
import RecipeCard from '../components/RecipeCard';

//Image
const lowerImage = { uri: "https://i.imgur.com/BRIllxL.png" }

//Spoonacular
import apiKeys from '../config/Keys';

export default function HomeScreen() {
    const [ recipeData, setRecipeData ] = useState([])
    const ingredientsState = useSelector(state => state.ingredients)
    useEffect(() => {
        const ingredients = ['water']
        ingredientsState.forEach(item => {
            const fixedItem = hasWhiteSpace(item.ingredientName)
            const finalItem = `+${fixedItem}`
            ingredients.push(finalItem)
        })
        if(ingredientsState.length > 0) { getRecipes(ingredients) }
    }, [ ingredientsState ])

    function hasWhiteSpace(item) {
        let itemInput;
        if (item.indexOf(' ') >= 0) {
            let itemChecked = item.replace(/\s+/g, '').toLowerCase()
            itemInput = `${itemChecked}`
        } else {
            itemInput = `${item.toLowerCase()}`
        }
        return itemInput;
    }

    const getRecipes = async (ingredients) => {
        const ingredientsList = ingredients.join(',')
        const uri = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKeys.spoonacularConfig.apiKey}&ingredients=${ingredientsList}`
        await fetch(uri)
            .then((response) => response.json())
            .then((json) => {
                const data = json
                const recipeCollection = []
                data.forEach(recipe => {
                    if(recipe.usedIngredientCount >= 1) {
                        recipeCollection.push({
                            title: recipe.title,
                            id: recipe.id,
                            image: recipe.image,
                            likes: recipe.likes,
                            missedIngredientCount: recipe.missedIngredientCount,
                            missedIngredients: recipe.missedIngredients,
                            usedIngredientsCount: recipe.usedIngredientCount,
                            usedIngredients: recipe.usedIngredients,
                            category: recipe.aisle
                        })
                    }
                })
                setRecipeData(recipeCollection)
            })
            .catch((error) => console.log(error))
    }

    async function newUser() {
        if (auth.currentUser === null) {
            signInAnonymously(auth)
                .then(() => {
                    onAuthStateChanged(auth, (user) => {
                        setDoc(doc(db, 'users', user.uid ), {
                            currentIngredients: [],
                            shoppingList: []
                        })
                    })
                })
        }
    }

    useEffect(() => {
        newUser()
    }, [])
    
    const renderItem = useCallback(
        ({ item }) => (
            <RecipeCard 
                recipeLikes={ item.likes } 
                recipeID={ item.id } 
                recipeUsedIngredientCount={ item.usedIngredientCount } 
                recipeUsedIngredients={ item.usedIngredients } 
                recipeUnusedIngredientCount={ item.missedIngredientCount } 
                recipeUnusedIngredients={ item.missedIngredients } 
                recipeName={ item.title } 
                recipeImage={ item.image } 
                recipeURI={ item.image }
                recipeCategory={ item.category }
            />
    ), [])

    const keyExtractor = useCallback((item) => item.id, [])

    const navigation = useNavigation();
    return (
        <SafeAreaView style={ tailwind(`bg-green-500 flex-1`)}>
            <SearchContainer name="UltraCook" />
            <View style={[ tailwind(`justify-center items-center bg-white`), styles.recipeSection ]}>
                <ScrollPicker />
                { ingredientsState.length >= 1 ?
                    <View style={{ width: "100%" }}>
                        <FlatList 
                            data={ recipeData }
                            renderItem={ renderItem }
                            keyExtractor={ keyExtractor }
                        />
                    </View>
                    :
                    <View style={[ styles.innerContainer, tailwind(`justify-center items-center`) ]}>
                        <Image
                            source={ lowerImage }
                            style={[ styles.image, tailwind(`h-40 w-40 opacity-50`) ]}
                        />
                        <Text style={ tailwind(`my-10`) }>Let's add an item to get started</Text>
                        <Button style={ tailwind(`mb-80`) } name="Add an item" onPress={() => navigation.navigate('Pantry')}/>
                    </View>
                }
            </View>
        </SafeAreaView>
    )
}

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
    },
    innerContainer: {
        top: -50
    }
})
