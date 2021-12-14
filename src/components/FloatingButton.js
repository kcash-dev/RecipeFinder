import React from 'react'
import { Image, StyleSheet, Text, View, Pressable } from 'react-native'
import tailwind from 'tailwind-rn'

const FloatingButton = ({ bottom, right, top, left, callback }) => {
    function runCallback() {
        if(callback) {
            callback()
        }
    }
    return (
        <Pressable 
            style={({ pressed }) => [
                { opacity: pressed ? 0.5 : 1 }, 
                tailwind(`h-16 w-16 rounded-full bg-green-400 items-center justify-center absolute bottom-${bottom} right-${right} top-${top} left-${left}`), 
                styles.shadow 
            ]}
            onPress={ runCallback }
        >
            <Image 
                source={{ uri: 'https://i.imgur.com/RRkp8Az.png' }}
                style={ tailwind(`h-10 w-10`) }
            />
        </Pressable>
    )
}

export default FloatingButton

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
})
