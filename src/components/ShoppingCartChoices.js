import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable, Alert } from 'react-native'
import tailwind from 'tailwind-rn'

//Redux
import { useDispatch } from 'react-redux'
import { removeFromShoppingCart } from '../store/actions'

const ShoppingCartChoices = ({ ingredientName }) => {
    const [ clickedItem, setClickedItem ] = useState({
        name: ingredientName
    })
    
    const dispatch = useDispatch();

    function removeItemFromShoppingCart(item) {
        dispatch(removeFromShoppingCart(item))
    }

    return (
        <Pressable
            style={({pressed}) => [{
                opacity: pressed ?
                    0.5
                    :
                    1,
                backgroundColor: '#D3D3D3'
                },
                { width: 102 }, tailwind(`m-1 h-14 justify-center rounded-md`)
            ]}
            onLongPress={() => {
                removeItemFromShoppingCart(clickedItem)
                Alert.alert('Item removed from shopping list')
            }}
        >
            <Text style={ tailwind(`text-center p-2`) }>{ ingredientName }</Text>
        </Pressable>
    )
}

export default ShoppingCartChoices

const styles = StyleSheet.create({
    
})
