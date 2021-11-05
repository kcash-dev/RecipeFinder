import React from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'
import tailwind from 'tailwind-rn'

const PickerItem = ({ name, color }) => {
    return (
        <Pressable
            style={({ pressed }) => [{
                opacity: pressed ?
                    0.5
                    :
                    1
            },
            tailwind(`h-12 w-24 rounded-full justify-center my-2 mx-2`), { backgroundColor: color }, styles.pickerItem ] }
        >
            <Text style={ tailwind(`text-center text-white`) }>{ name }</Text>
        </Pressable>
    )
}

export default PickerItem

const styles = StyleSheet.create({
    pickerItem: {
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
