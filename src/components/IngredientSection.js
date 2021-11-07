import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import tailwind from 'tailwind-rn';

//Data
import { ingredientCategories } from '../data/Ingredients';

//Components
import IngredientsCard from './IngredientsCard';



const IngredientSection = () => {

    return (
        <View style={ tailwind(`w-full`) }>
            <FlatList 
                data={ ingredientCategories }
                renderItem={({ item }) => (
                    <IngredientsCard 
                        name={ item.name }
                        image={ item.image }
                        ingredients={ item.ingredients }
                    />
                )}
                keyExtractor={ item => item.name }
            />
        </View>
    )
}

export default IngredientSection

const styles = StyleSheet.create({
    
})
