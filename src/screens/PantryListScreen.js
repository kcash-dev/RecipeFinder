import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native'

//Redux
import { useSelector } from 'react-redux'

//Data
import { ingredientCategories } from '../data/Ingredients';

//Components
import PantryListCard from '../components/PantryListCard'
import tailwind from 'tailwind-rn';

const PantryListScreen = () => {
    const [ inPantry, setInPantry ] = useState(null)
    const storeState = useSelector(state => state.ingredients)
    const [ categoriesList, setCategoriesList ] = useState(null)

    function filterActiveItems() {
        if (inPantry) {
            let categories = []
            let categoryNames = []
            let result = ingredientCategories.filter(o1 => inPantry.some(o2 => {

                if(o1.name === o2.category) {
                    if (!categoryNames.includes(o1.name)){
                        categoryNames.push(o1.name)
                        categories.push({
                            name: o1.name,
                            image: o1.image,
                            ingredients: []
                        })
                    }
                }

                inPantry.forEach(item1 => {
                    categories.forEach(item2 => {
                        if(item1.category === item2.name) {
                            if (!item2.ingredients.includes(item1.name)){
                            item2.ingredients.push(item1.name)
                        }
                        }
                    })
                })
            }));
            setCategoriesList(categories)
        } else {
            return;
        }
    }
    
    function setPantryItems() {
        let pantry = []
        storeState.forEach(item => {
            pantry.push(item)
        })
        setInPantry(pantry)
    }

    useEffect(async () => {
        setPantryItems()
        filterActiveItems();
    }, [ storeState ])

    useEffect(() => {
        filterActiveItems()
    }, [ inPantry ])

    console.log(inPantry)
    
    return (
        <SafeAreaView style={ tailwind(`flex-1`) }>
            { storeState.length >= 1 ?
                <FlatList
                    data={ categoriesList }
                    renderItem={({item}) => (
                        <PantryListCard 
                            name={ item.name }
                            image={ item.image }
                            ingredientList = { item.ingredients }
                        />
                    )}
                    keyExtractor={ item => item.name }
                />
                :
                <View style={ tailwind(`flex-1 justify-center self-center`) }>
                    <Text>You have no items in your pantry!</Text>
                </View>
            }
        </SafeAreaView>
    )
}

export default PantryListScreen

const styles = StyleSheet.create({})
