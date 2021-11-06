import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import tailwind from 'tailwind-rn';

//Components
import IngredientsCard from './IngredientsCard';

const ingredientCategories = [
    {
        name: 'Vegetables & Greens',
        image: "https://i.imgur.com/V0QyecL.png",
        ingredients: [
            {
                name: 'Garlic'
            },
            {
                name: 'Onion'
            },
            {
                name: 'Tomato'
            },
            {
                name: 'Bell Pepper'
            },
            {
                name: 'Carrot'
            },
            {
                name: 'Ginger'
            },
            {
                name: 'Celery'
            },
            {
                name: 'Spinach'
            },
        ]
    },
    {
        name: 'Dairy & Eggs',
        image: "https://i.imgur.com/8BVry8A.png",
        ingredients: [
            {
                name: 'Butter'
            },
            {
                name: 'Egg'
            },
            {
                name: 'Milk'
            },
            {
                name: 'Sour Cream'
            },
            {
                name: 'Heavy Cream'
            },
            {
                name: 'Whipped Cream'
            },
            {
                name: 'Yogurt'
            },
            {
                name: 'Buttermilk'
            },
        ] 
    },
    {
        name: 'Herbs & Spices',
        image: "https://i.imgur.com/yJve4GT.png",
        ingredients: [
            {
                name: 'Cinnamon'
            },
            {
                name: 'Parsley'
            },
            {
                name: 'Basil'
            },
            {
                name: 'Cilantro'
            },
            {
                name: 'Thyme'
            },
            {
                name: 'Cumin'
            },
            {
                name: 'Garlic Powder'
            },
            {
                name: 'Oregano'
            },
        ]
    },
    {
        name: 'Baking',
        image: "https://i.imgur.com/7Lz30fR.png",
        ingredients: [
            {
                name: 'Flour'
            },
            {
                name: 'Vanilla'
            },
            {
                name: 'Baking Powder'
            },
            {
                name: 'Baking Soda'
            },
            {
                name: 'Cornstarch'
            },
            {
                name: 'Cocoa'
            },
            {
                name: 'Yeast'
            },
            {
                name: 'Panko'
            },
        ]
    },
    {
        name: 'Sugar & Sweeteners',
        image: "https://i.imgur.com/394RyZe.png",
        ingredients: [
            {
                name: 'Sugar'
            },
            {
                name: 'Brown Sugar'
            },
            {
                name: 'Honey'
            },
            {
                name: 'Maple Syrup'
            },
            {
                name: 'Stevia'
            },
            {
                name: 'Molasses'
            },
            {
                name: 'Coconut Sugar'
            },
            {
                name: 'Corn Syrup'
            },
        ]
    },
    {
        name: 'Fruits & Berries',
        image: "https://i.imgur.com/lrXcGNw.png",
        ingredients: [
            {
                name: 'Lemon'
            },
            {
                name: 'Lime'
            },
            {
                name: 'Apple'
            },
            {
                name: 'Orange'
            },
            {
                name: 'Banana'
            },
            {
                name: 'Strawberry'
            },
            {
                name: 'Blueberry'
            },
            {
                name: 'Pineapple'
            },
        ]
    },
    {
        name: 'Oils',
        image: "https://i.imgur.com/BnHJ9l3.png",
        ingredients: [
            {
                name: 'Olive Oil'
            },
            {
                name: 'Vegetable Oil'
            },
            {
                name: 'Canola Oil'
            },
            {
                name: 'Coconut Oil'
            },
            {
                name: 'Sesame Oil'
            },
            {
                name: 'Cooking Spray'
            },
            {
                name: 'Frying Oil'
            },
            {
                name: 'Avocado Oil'
            },
        ]
    },
    {
        name: 'Cheeses',
        image: "https://i.imgur.com/TZgIecv.png",
        ingredients: [
            {
                name: 'Parmesan'
            },
            {
                name: 'Cheddar'
            },
            {
                name: 'Cream Cheese'
            },
            {
                name: 'Mozzarella'
            },
            {
                name: 'Feta'
            },
            {
                name: 'Ricotta'
            },
            {
                name: 'Blue Cheese'
            },
            {
                name: 'Swiss Cheese'
            },
        ]
    },
    {
        name: 'Condiments',
        image: "https://i.imgur.com/TnmiCJb.png",
        ingredients: [
            {
                name: 'Soy Sauce'
            },
            {
                name: 'Dijon Mustard'
            },
            {
                name: 'Worcestershire'
            },
            {
                name: 'Hot Sauce'
            },
            {
                name: 'Ketchup'
            },
            {
                name: 'Mustard'
            },
            {
                name: 'Capers'
            },
            {
                name: 'Fish Sauce'
            },
        ]
    },
    {
        name: 'Nuts & Seeds',
        image: "https://i.imgur.com/SJxgJaZ.png",
        ingredients: [
            {
                name: 'Almond'
            },
            {
                name: 'Walnut'
            },
            {
                name: 'Pecan'
            },
            {
                name: 'Peanut Butter'
            },
            {
                name: 'Sesame Seed'
            },
            {
                name: 'Cashew'
            },
            {
                name: 'Peanut'
            },
            {
                name: 'Pistachio'
            },
        ]
    },
    {
        name: 'Meats',
        image: "https://i.imgur.com/ksjM6h9.png",
        ingredients: [
            {
                name: 'Bacon'
            },
            {
                name: 'Ground Beef'
            },
            {
                name: 'Beef Steak'
            },
            {
                name: 'Ham'
            },
            {
                name: 'Ground Sausage'
            },
            {
                name: 'Pork Loin'
            },
            {
                name: 'Beef Roast'
            },
            {
                name: 'Pork Chops'
            },
        ]
    },
    {
        name: 'Desserts & Sweet Snacks',
        image: "https://i.imgur.com/lghirLe.png",
        ingredients: [
            {
                name: 'Chocolate Chips'
            },
            {
                name: 'Chocolate'
            },
            {
                name: 'Marshmallow'
            },
            {
                name: 'Graham Crackers'
            },
            {
                name: 'Oreo'
            },
            {
                name: 'Nutella'
            },
            {
                name: 'White Chocolate'
            },
            {
                name: 'Whipped Cream'
            },
        ]
    },
    {
        name: 'Dressing & Vinegars',
        image: "https://i.imgur.com/NhksaG4.png",
        ingredients: [
            {
                name: 'Mayo'
            },
            {
                name: 'Balsamic Vinegar'
            },
            {
                name: 'Apple Cider Vinegar'
            },
            {
                name: 'Vinegar'
            },
            {
                name: 'Red Wine Vinegar'
            },
            {
                name: 'Rance Dressing'
            },
            {
                name: 'Italian Dressing'
            },
            {
                name: 'Sherry Vinegar'
            },
        ]
    },
    {
        name: 'Wine, Beer & Spirits',
        image: "https://i.imgur.com/okdxkuo.png",
        ingredients: [
            {
                name: 'White Wine'
            },
            {
                name: 'Rum'
            },
            {
                name: 'Red Wine'
            },
            {
                name: 'Vodka'
            },
            {
                name: 'Beer'
            },
            {
                name: 'Whiskey'
            },
            {
                name: 'Cider'
            },
            {
                name: 'Tequila'
            },
        ]
    },
    {
        name: 'Bread & Salty Snacks',
        image: "https://i.imgur.com/qw0J1cv.png",
        ingredients: [
            {
                name: 'Bread'
            },
            {
                name: 'Bread Crumbs'
            },
            {
                name: 'Flour Tortillas'
            },
            {
                name: 'Corn Tortillas'
            },
            {
                name: 'Crackers'
            },
            {
                name: 'Baguette'
            },
            {
                name: 'Tortilla Chips'
            },
            {
                name: 'Pita'
            },
        ]
    },
    {
        name: 'Soups, Stews & Stocks',
        image: "https://i.imgur.com/BXq1ZCs.png",
        ingredients: [
            {
                name: 'Chicken Broth'
            },
            {
                name: 'Vegetable Broth'
            },
            {
                name: 'Chicken Stock'
            },
            {
                name: 'Beef Broth'
            },
            {
                name: 'Beef Stock'
            },
            {
                name: 'Mushroom Soup'
            },
            {
                name: 'Chicken Soup'
            },
            {
                name: 'Onion Soup'
            },
        ]
    },
    {
        name: 'Poultry',
        image: "https://i.imgur.com/zXqJfeJ.png",
        ingredients: [
            {
                name: 'Chicken Breast'
            },
            {
                name: 'Chicken Thighs'
            },
            {
                name: 'Cooked Chicken'
            },
            {
                name: 'Turkey Breast'
            },
            {
                name: 'Ground Turkey'
            },
            {
                name: 'Chicken Leg'
            },
            {
                name: 'Chicken Wings'
            },
            {
                name: 'Ground Chicken'
            },
        ]
    },
    {
        name: 'Grains & Cereals',
        image: "https://i.imgur.com/9a5K53T.png",
        ingredients: [
            {
                name: 'Rolled Oats'
            },
            {
                name: 'Rice'
            },
            {
                name: 'Quinoa'
            },
            {
                name: 'Basmati Rice'
            },
            {
                name: 'Brown Rice'
            },
            {
                name: 'Breakfast Cereal'
            },
            {
                name: 'Couscous'
            },
            {
                name: 'Polenta'
            },
        ]
    },
    {
        name: 'Beans, Peas & Lentils',
        image: "https://i.imgur.com/XaqFjNv.png",
        ingredients: [
            {
                name: 'Peas'
            },
            {
                name: 'Green Beans'
            },
            {
                name: 'Black Beans'
            },
            {
                name: 'Chickpea'
            },
            {
                name: 'Kidney Beans'
            },
            {
                name: 'Lentils'
            },
            {
                name: 'White Beans'
            },
            {
                name: 'Pinto Beans'
            },
        ]
    },
    {
        name: 'Seasonings & Spice Blends',
        image: "https://i.imgur.com/RF6yQ9u.png",
        ingredients: [
            {
                name: 'Italian Seasoning'
            },
            {
                name: 'Curry'
            },
            {
                name: 'Seasoned Salt'
            },
            {
                name: 'Pumpkin Pie Spice'
            },
            {
                name: 'Mustard Powder'
            },
            {
                name: 'Taco Seasoning'
            },
            {
                name: 'Cajun Seasoning'
            },
            {
                name: 'Red Curry'
            },
        ]
    },
    {
        name: 'Beverages',
        image: "https://i.imgur.com/LkY7BA5.png",
        ingredients: [
            {
                name: 'Orange Juice'
            },
            {
                name: 'Coffee'
            },
            {
                name: 'Club Soda'
            },
            {
                name: 'Pineapple Juice'
            },
            {
                name: 'Apple Juice'
            },
            {
                name: 'Tea'
            },
            {
                name: 'Cranberry Juice'
            },
            {
                name: 'Coconut Water'
            },
        ]
    },
]

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
                        isPicked={ findPickedItem }
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
