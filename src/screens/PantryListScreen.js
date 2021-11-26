import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, ImageBackground } from 'react-native'

//Redux
import { useSelector } from 'react-redux'

//Data
import { ingredientCategories } from '../data/Ingredients';

//Components
import PantryListCard from '../components/PantryListCard'
import tailwind from 'tailwind-rn';

//Images
const upperImage = { uri: "https://i.imgur.com/CrICZPR.jpg" }

const PantryListScreen = () => {
    const [ inPantry, setInPantry ] = useState(null)
    const storeState = useSelector(state => state.ingredients)
    const [ categoriesList, setCategoriesList ] = useState(null)

    function filterActiveItems() {
        if (inPantry) {
            let categories = []
            let categoryNames = []
            function sortPantry() { 
                ingredientCategories.filter(o1 => inPantry.some(o2 => {
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
                            if (!item2.ingredients.includes(item1.ingredientName)){
                            item2.ingredients.push(item1.ingredientName)
                        }
                        }
                     })
                    })
                }));
            }
            sortPantry();
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
    
    return (
        <SafeAreaView style={ tailwind(`flex-1 bg-green-500`) }>
            <ImageBackground 
                    source={ upperImage }
                    resizeMode="cover"
                    style={ tailwind(`flex-1 justify-center w-full`) }
                    imageStyle={{ opacity: 0.1 }}
            >
                <View style={[ tailwind(`p-8`), styles.header ]}>
                    <Text style={ tailwind(`text-center text-3xl font-bold text-white`) }>Items in your Pantry</Text>
                </View>
                <View style={[ tailwind(`bg-white`), styles.innerContainer ]}>
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
                        listKey="PantryListFlatList"
                    />
                    :
                    <View style={ tailwind(`flex-1 justify-center self-center`) }>
                        <Text>You have no items in your pantry!</Text>
                    </View>
                }
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default PantryListScreen

const styles = StyleSheet.create({
    header: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        flex: .1
    },
    innerContainer: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flex: .9
    }
})
