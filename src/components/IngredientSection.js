import React, { useCallback } from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import tailwind from 'tailwind-rn';

//Data
import { ingredientCategories } from '../data/Ingredients';

//Components
import IngredientsCard from './IngredientsCard';

const IngredientSection = () => {
    const renderItem = ({ item }) => (
        <IngredientsCard 
            name={ item.name }
            image={ item.image }
            ingredients={ item.ingredients }
        />
    )
    
    const keyExtractor = useCallback((item) => item.name)

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

export default React.memo(IngredientSection)

const styles = StyleSheet.create({
    
})
