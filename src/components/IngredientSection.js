import React, { useCallback } from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import tailwind from 'tailwind-rn';

//Data
import { ingredientCategories, ingredients } from '../data/Ingredients';

//Components
import IngredientsCard from './IngredientsCard';


const IngredientSection = () => {
    const renderItem = useCallback(
        ({ item }) => (
        <IngredientsCard 
            name={ item.name }
            image={ item.image }
            ingredients={ item.ingredients }
        />
    ), [])
    
    const keyExtractor = useCallback((item) => item.name, [])

    return (
        <View style={ tailwind(`w-full`) }>
            <FlatList 
                data={ ingredientCategories }
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />
        </View>
    )
}

export default IngredientSection

const styles = StyleSheet.create({
    
})
