import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import tailwind from 'tailwind-rn'
import { MaterialCommunityIcons } from '@expo/vector-icons';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from '../store/actions'

const SearchChoices = ({ item }) => {
    const [ isInCart, setIsInCart ] = useState(false)

    const dispatch = useDispatch();
    const state = useSelector(state => state.ingredients)

    function itemAlreadyInCart() {
        if(state.some(ingredient => ingredient.ingredientName === item.ingredientName)) {
            setIsInCart(true)
        } else {
            setIsInCart(false)
        }
    }

    useEffect(() => {
        itemAlreadyInCart()
    }, [ state ])

    function addToPantry(item) {
        dispatch(addItem(item))
    }

    function removeFromPantry(item) {
        dispatch(removeItem(item))
    }

    return (
        <View style={ tailwind(`bg-white h-16 rounded-lg items-center justify-between flex-row w-11/12 border-b self-center px-3`) }>
        <Text style={ tailwind(`text-lg text-black`) }>{ item.ingredientName }</Text>
        <Pressable
            style={({ pressed }) => [ 
                { 
                    opacity: pressed ?
                        0.5
                        :
                        1
                },
                ]
            }
            onPress={() => {
                if(isInCart) {
                    removeFromPantry(item)
                } else {
                    addToPantry(item)
                }
            }}
        >
            { isInCart ? 
                <MaterialCommunityIcons name="check-decagram" size={24} color="#76BA1B" />
                :
                <MaterialCommunityIcons name="plus-circle-outline" size={24} color="black" />
            }
        </Pressable>
    </View>
    )
}

export default SearchChoices

const styles = StyleSheet.create({})
