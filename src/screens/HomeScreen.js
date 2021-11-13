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

export default function HomeScreen() {
    const [ recipeData, setRecipeData ] = useState([])
    const ingredientsState = useSelector(state => state.ingredients)
    useEffect(() => {
        const ingredients = []
        ingredientsState.forEach(item => {
            const checkedItem = hasWhiteSpace(item.ingredientName)
            const input = `%2C%20${ checkedItem }`
            ingredients.push(input)
        })
        getRecipes(ingredients)
    }, [ ingredientsState ])

    function hasWhiteSpace(item) {
        let itemInput;
        if (item.indexOf(' ') >= 0) {
            itemInput = item.replace(/\s/g, `%20`)
        } else {
            itemInput = item
        }
        return itemInput;
    }

    const getRecipes = async (ingredients) => {
        const ingredientsList = ingredients.join('')
        const numIngredients = ingredients.length + 3
        const uri = `https://api.edamam.com/api/recipes/v2?type=public&q=salt%2C%20pepper%2C%20water${ingredientsList}&app_id=a39c3b46&app_key=90c9516d61c8da92c31449ddf3617ac4&imageSize=REGULAR&ingr=0-${numIngredients}`
        console.log(uri)
        await fetch(uri)
            .then((response) => response.json())
            .then((json) => {
                const data = json.hits
                const dataArray = []
                const ingredientNames = []
                data.forEach(item => {
                    const ingredients = item.recipe.ingredients
                    ingredients.forEach(ing => {
                        ingredientNames.push(ing.food)
                    })
                    dataArray.push({
                        recipeName: item.recipe.label,
                        ingredientNames: ingredientNames,
                        ingredientLines: item.recipe.ingredientLines,
                        ingredientsInfo: ingredients,
                        ingredientImage: item.recipe.image,
                        ingredientURI: item.recipe.uri
                    })
                })
                const filteredRecipes = filterRecipes(dataArray)
                // const chosenRecipes = filterRecipes(dataArray)
                setRecipeData(filteredRecipes)
            })
            .catch((error) => console.log(error))
    }

    function filterRecipes(recipes) {
        const ingredients = []
        recipes.forEach(recipe => {
            objectsAreSame(recipe.ingredientNames, ingredientsState)
        })
    }

    function objectsAreSame(x, y) {
        let objectsAreSame = true;
        for (var propName in x) {
            if(x[propName] !== y[propName]) {
                objectsAreSame = false;
                break;
            }
        }
        return objectsAreSame;
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
            <RecipeCard ingredientLines={ item.ingredientLines } recipeName={ item.recipeName } recipeImage={ item.ingredientImage } recipeURI={ item.imageURI }/>
    ), [])

    const keyExtractor = useCallback((item) => item.recipeName, [])

    const navigation = useNavigation();
    return (
        <SafeAreaView style={ tailwind(`bg-green-500 flex-1`)}>
            <SearchContainer name="UltraCook" />
            <View style={[ tailwind(`justify-center items-center bg-white`), styles.recipeSection ]}>
                <ScrollPicker />
                { ingredientsState.length > 1 ?
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
