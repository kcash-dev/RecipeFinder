import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import tailwind from 'tailwind-rn'

//Components
import RecipeDataCard from '../components/RecipeDataCard'
import RecipeDataHeader from '../components/RecipeDataHeader'

const RecipeDataScreen = ({ route }) => {
    const [ steps, setSteps ] = useState([])
    const [ stepByStep, setStepByStep ] = useState([])
    const [ similarRecipes, setSimilarRecipes ] = useState(null)
    const { 
        recipeLikes, 
        recipeID, 
        recipeUsedIngredientCount, 
        recipeUsedIngredients, 
        recipeUnusedIngredientCount, 
        recipeUnusedIngredients, 
        recipeName,
        recipeImage, 
        recipeURI,
        usedIngred,
        unusedIngred 
    } = route.params;

    const getRecipeInfo = async (id) => {
        const uri = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKeys.spoonacularConfig.apiKey}`
        await fetch(uri)
            .then((response) => response.json())
            .then((json) => {
                const data = json
                console.log(data, "DATA")
                setSteps(data.analyzedInstructions[0].steps)
            })
            .catch((error) => console.log(error))
    }

    const getSimilarRecipes = async (id) => {
        const uri = `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${apiKeys.spoonacularConfig.apiKey}`
        await fetch(uri)
            .then((response) => response.json())
            .then((json) => {
                const data = json
                console.log(data, "SIMILAR")
                setSimilarRecipes(data)
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        getRecipeInfo(recipeID)
        getSimilarRecipes(recipeID)
    }, [])

    useEffect(() => {
        getSteps()
    }, [ steps ])

    function getSteps() {
        const stepCollection = []
        steps.forEach(item => {
            console.log(item)
            stepCollection.push({
                stepNumber: item.number,
                stepDescription: item.step
            })
        })
        console.log(stepCollection)
        setStepByStep(stepCollection)
    }

    return (
        <View style={ tailwind(`flex-1`) }>
            <RecipeDataHeader 
                recipeName={ recipeName }
                recipeImage={ recipeImage }
                recipeLikes={ recipeLikes }
            />
            <RecipeDataCard 
                recipeUsedIngredients={ recipeUsedIngredients }
                recipeUnusedIngredients={ recipeUnusedIngredients }
                recipeUnusedIngredientCount={ recipeUnusedIngredientCount }
                recipeUsedIngredientCount={ recipeUsedIngredientCount }
                recipeSteps={ stepByStep }
                similarRecipes={ similarRecipes }
                usedIngred={ usedIngred }
                unusedIngred={ unusedIngred }
                recipeName={ recipeName }
            />
        </View>
    )
}

export default RecipeDataScreen

const styles = StyleSheet.create({})
