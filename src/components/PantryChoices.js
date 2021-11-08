import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable, Alert } from 'react-native'
import tailwind from 'tailwind-rn'

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { removeItem, addToShoppingCart } from '../store/actions'

const PantryChoices = ({ ingredientName }) => {
    const [ press, setPress ] = useState(false)
    const [ isInCart, setIsInCart ] = useState(false)
    const [ clickedItem, setClickedItem ] = useState({
        name: ingredientName
    })

    const dispatch = useDispatch();
    const state = useSelector(state => state.ingredients)

    function removeFromPantry(item) {
        dispatch(removeItem(item))
    }

    function addItemToShoppingCart(item) {
        dispatch(addToShoppingCart(item))
        Alert.alert('Item added to shopping list')
    }

    return (
        <Pressable 
            style={({pressed}) => [{
                opacity: pressed ?
                    0.5
                    :
                    1,
                backgroundColor: isInCart ?
                    '#76BA1B'
                    :
                    '#D3D3D3'
                }, { width: 102 }, tailwind(`m-1 h-14 justify-center rounded-md`) ]}
            onPress={() => {
                removeFromPantry(clickedItem)
            } }
            onLongPress={() => addItemToShoppingCart(ingredientName)}
        >
            <Text style={[ { 
                color: isInCart ?
                    '#000'
                    :
                    '#000'
             }, tailwind(`text-center p-2`) ]}>{ ingredientName }</Text>
        </Pressable>
    )
}

export default PantryChoices

const styles = StyleSheet.create({})