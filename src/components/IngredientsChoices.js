import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import tailwind from 'tailwind-rn'

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { addItem, removeItem } from '../store/actions'

const IngredientsChoices = ({ ingredientName, category }) => {
    const [ press, setPress ] = useState(false)
    const [ isInCart, setIsInCart ] = useState(false)
    const [ clickedItem, setClickedItem ] = useState({
        ingredientName: ingredientName,
        category: category
    })

    const dispatch = useDispatch();
    const state = useSelector(state => state.ingredients)

    function itemAlreadyInCart() {
        if(state.some(ingredient => ingredient.name === ingredientName)) {
            setIsInCart(true)
        } else {
            setIsInCart(false)
        }
    }

    useEffect(() => {
        itemAlreadyInCart()
    }, [ state ])

    function isItemInPantry(item) {
        if (state.some(ingred => ingred.name === item.name)) {
            dispatch(removeItem(item))
        } else {
            dispatch(addItem(item))
        }
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
                isItemInPantry(clickedItem)
            } }
        >
            <Text style={[ { 
                color: isInCart ?
                    '#fff'
                    :
                    '#000'
             }, tailwind(`text-center p-2`) ]}>{ ingredientName }</Text>
        </Pressable>
    )
}

export default IngredientsChoices

const styles = StyleSheet.create({})
