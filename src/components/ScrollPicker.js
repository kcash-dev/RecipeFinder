import React from 'react'
import { FlatList, StyleSheet, Text, View, Pressable } from 'react-native'
import tailwind from 'tailwind-rn'

const data = [
    {
        name: 'Key Ingredients',
        color: '#10B981'
    },
    {
        name: 'Meal Type',
        color: '#2C10B7'
    },
    {
        name: 'Diet',
        color: '#B71048'
    },
    {
        name: 'Recipe Time',
        color: '#9BB710'
    }
]

//Components
import PickerItem from './PickerItem'

const ScrollPicker = () => {
    return (
        <FlatList 
            data={ data }
            renderItem={({item}) => (
                <PickerItem name={ item.name } color={ item.color }/>
            )}
            keyExtractor={item => item.name }
            horizontal
            showsHorizontalScrollIndicator={ false }
        />
    )
}

export default ScrollPicker

const styles = StyleSheet.create({})
