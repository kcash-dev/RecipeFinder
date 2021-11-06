import React from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'
import tailwind from 'tailwind-rn';

const Button = ({ name, onPress, number }) => {
    return (
        <Pressable 
            style={({ pressed }) => [ 
                { 
                    opacity: pressed ?
                        0.5
                        :
                        1
                },
                tailwind(`w-32 h-10 bg-green-500 rounded-xl items-center justify-center`), styles.button ]}
            onPress={ () => {
                if (onPress) {
                    onPress();
                }
                return;
            } }
        >
            <Text style={ tailwind(`text-white font-bold`) }>{ name } { number ? <Text>({number})</Text> : null }</Text>
        </Pressable>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})
