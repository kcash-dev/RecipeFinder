import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, FlatList } from 'react-native'
import tailwind from 'tailwind-rn'

//Redux
import { useSelector } from 'react-redux'

//Components
import SearchContainer from '../components/SearchContainer'
import Button from '../components/Button'
import ShoppingListCard from '../components/ShoppingListCard'

//Navigation
import { useNavigation } from '@react-navigation/native'

//Images
const bgImage = { uri: 'https://i.imgur.com/Ek88xHX.png' }

const ShoppingListScreen = () => {
    const [ numItems, setNumItems ] = useState(0)
    const navigation = useNavigation();
    const shoppingCartState = useSelector(state => state.shoppingCart)

    console.log(shoppingCartState, "SHOPPING")

    useEffect(() => {
        setNumItems(shoppingCartState.length)
    }, [ shoppingCartState ])

    const categories = []

    shoppingCartState.forEach(item => {
        let categoryName = item.categoryName
        console.log(categoryName)
        if(!categories.includes(categoryName)) {
            categories.push({
                name: categoryName,
                image: item.image,
                items: [ item.name ]
            })
        } else {
            const foundItem = categories.find(item => {
                item.name === categoryName
            })
            foundItem.items.push(item.name)
        }
    })

    console.log(categories, "CATS")

    const renderItem = useCallback(
        ({item}) => (
            <ShoppingListCard category={ item.name } image={ item.image } shoppingItems={ item.items } />
    ), [])

    const keyExtractor = useCallback((item) => item, [])
    return (
        <SafeAreaView style={ tailwind(`bg-green-500 flex-1`)}>
            <SearchContainer name="Shopping List" subtitle={`You have ${ numItems } items on your shopping list`} />
            <View style={[ tailwind(`justify-center items-center bg-white`), styles.recipeSection ]}>
                { shoppingCartState.length > 0 ?
                    <View style={ tailwind(`w-full h-full mt-5`) }>
                        <FlatList
                            data={ categories }
                            renderItem={ renderItem }
                            keyExtractor={ keyExtractor }
                            showsVerticalScrollIndicator='false'
                        />
                    </View>
                    :
                    <View style={ tailwind(`items-center`) }>
                        <Image source={ bgImage } style={ tailwind(`h-40 w-40 mt-10 opacity-50`) } />
                        <Text style={ tailwind(`my-10`) }>Your shopping list is empty.</Text>
                        <Button name="Add an item" onPress={ () => navigation.navigate('Pantry') }/>
                    </View>
                }
            </View>
        </SafeAreaView>
    )
}

export default ShoppingListScreen

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
    }
})
