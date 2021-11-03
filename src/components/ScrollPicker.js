import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import tailwind from 'tailwind-rn'

const data = [
    {
        name: 'Key Ingredients'
    },
    {
        name: 'Meal Type'
    },
    {
        name: 'Diet'
    },
    {
        name: 'Recipe Time'
    }
]

const ScrollPicker = () => {
    return (
        <FlatList 
            data={ data }
            renderItem={({item}) => (
                <View style={ tailwind(`h-6 w-24 rounded-full border justify-center`) }>
                    <Text style={ tailwind(`text-center`) }>{ item.name }</Text>
                </View>
            )}
            keyExtractor={item => item.name }
            horizontal
            showsHorizontalScrollIndicator={ false }
        />
    )
}

export default ScrollPicker

const styles = StyleSheet.create({})
