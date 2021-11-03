import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import tailwind from 'tailwind-rn';

//Components
import IngredientsCard from './IngredientsCard';

const ingredientCategories = [
    {
        name: 'Vegetables & Greens',
        image: "https://i.imgur.com/V0QyecL.png" 
    },
    {
        name: 'Dairy & Eggs',
        image: "https://i.imgur.com/8BVry8A.png" 
    },
    {
        name: 'Herbs & Spices',
        image: "https://i.imgur.com/yJve4GT.png"
    },
    {
        name: 'Baking',
        image: "https://i.imgur.com/7Lz30fR.png"
    },
    {
        name: 'Sugar & Sweeteners',
        image: "https://i.imgur.com/394RyZe.png"
    },
    {
        name: 'Fruits & Berries',
        image: "https://i.imgur.com/lrXcGNw.png"
    },
    {
        name: 'Oils',
        image: "https://i.imgur.com/BnHJ9l3.png"
    },
    {
        name: 'Cheeses',
        image: "https://i.imgur.com/TZgIecv.png"
    },
    {
        name: 'Condiments',
        image: "https://i.imgur.com/TnmiCJb.png"
    },
    {
        name: 'Nuts & Seeds',
        image: "https://i.imgur.com/SJxgJaZ.png"
    },
    {
        name: 'Meats',
        image: "https://i.imgur.com/ksjM6h9.png"
    },
    {
        name: 'Desserts & Sweet Snacks',
        image: "https://i.imgur.com/lghirLe.png"
    },
    {
        name: 'Dressing & Vinegars',
        image: "https://i.imgur.com/NhksaG4.png"
    },
    {
        name: 'Wine, Beer & Spirits',
        image: "https://i.imgur.com/okdxkuo.png"
    },
    {
        name: 'Bread & Salty Snacks',
        image: "https://i.imgur.com/qw0J1cv.png"
    },
    {
        name: 'Soups, Stews & Stocks',
        image: "https://i.imgur.com/BXq1ZCs.png"
    },
    {
        name: 'Poultry',
        image: "https://i.imgur.com/zXqJfeJ.png"
    },
    {
        name: 'Grains & Cereals',
        image: "https://i.imgur.com/9a5K53T.png"
    },
    {
        name: 'Beans, Peas & Lentils',
        image: "https://i.imgur.com/XaqFjNv.png"
    },
    {
        name: 'Seasonings & Spice Blends',
        image: "https://i.imgur.com/RF6yQ9u.png"
    },
    {
        name: 'Beverages',
        image: "https://i.imgur.com/LkY7BA5.png"
    },
]

const IngredientSection = () => {
    return (
        <View style={ tailwind(`flex-1 w-full`) }>
            <FlatList 
                data={ ingredientCategories }
                renderItem={({ item }) => (
                    <IngredientsCard 
                        name={ item.name }
                        image={ item.image }
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
