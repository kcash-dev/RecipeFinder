import React from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'
import tailwind from 'tailwind-rn';

const Button = ({ text }) => {
    return (
        <Pressable 
            style={({ pressed }) => [ 
                { 
                    opacity: pressed ?
                        0.5
                        :
                        1
                },
                tailwind(`w-32 h-10 bg-green-500 rounded-xl items-center justify-center`) ]}
        >
            <Text style={ tailwind(`text-white font-bold`) }>{ text }</Text>
        </Pressable>
    )
}

export default Button

const styles = StyleSheet.create({})
