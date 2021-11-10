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
            if (item === ingredientsState[0]) {
                ingredients.push(inputItem.name)
            } else {
                const input = `%2C%20${ inputItem.name }`
                ingredients.push(input)
            }
        })
        getRecipes(ingredients)
    }, [ ingredientsState ])

    const getRecipes = async (ingredients) => {
        const ingredientsList = ingredients.join('')
        const uri = `https://api.edamam.com/api/recipes/v2?type=public&q=${ingredientsList}&app_id=a39c3b46&app_key=90c9516d61c8da92c31449ddf3617ac4&imageSize=SMALL`
        console.log(uri)
        await fetch(uri)
            .then((response) => response.json())
            .then((json) => {
                const data = json.hits
                const dataArray = []
                data.forEach(item => {
                    dataArray.push(item)
                })
                setRecipeData(dataArray)
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
            <RecipeCard ingredientLines={ item.recipe.ingredientLines } recipeName={ item.recipe.label } recipeImage={ item.recipe.image } recipeURI={ item.recipe.uri }/>
    ), [])

    const keyExtractor = useCallback((item) => item.recipe.uri, [])

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
