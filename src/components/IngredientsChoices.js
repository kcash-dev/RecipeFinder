import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import tailwind from 'tailwind-rn'

const IngredientsChoices = ({ name }) => {
    const [ press, setPress ] = useState(false)
    return (
        <Pressable 
            style={({pressed}) => [{
                opacity: pressed ?
                    0.5
                    :
                    1,
                backgroundColor: press ?
                    '#76BA1B'
                    :
                    '#D3D3D3'
                }, { width: 102 }, tailwind(`m-1 h-14 justify-center rounded-md`) ]}
            onPress={() => setPress(!press) }
        >
            <Text style={[ { 
                color: press ?
                    '#fff'
                    :
                    '#000'
             }, tailwind(`text-center p-2`) ]}>{ name }</Text>
        </Pressable>
    )
}

export default IngredientsChoices

const styles = StyleSheet.create({})
