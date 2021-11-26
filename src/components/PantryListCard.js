import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, Image, FlatList } from 'react-native'
import tailwind from 'tailwind-rn';

//Components
import PantryChoices from './PantryChoices';

const PantryListCard = ({ name, image, ingredientList }) => {
    const [ ingredients, setIngredients ] = useState([])

    useEffect(() => {
        setIngredients(ingredientList)
    }, [ ingredientList ])

    return (
        <SafeAreaView style={ [ tailwind(`w-full mb-2 self-center border-gray-300 rounded-lg border-opacity-50 border`), styles.cardContainer ] }>
            <View>
                <View style={[ styles.upperCard, tailwind(`h-16 flex-row justify-between items-center border-b border-gray-200`) ]}>
                    <View style={ tailwind(`pl-5`) }>
                        <Image 
                            source={{ uri: image }}
                            style={ tailwind(`h-10 w-10`) }
                        />
                    </View>
                    <View style={ tailwind(`pr-5`) }>
                        <Text style={ tailwind(`text-lg`) }>{ name }</Text>
                    </View>
                </View>
                <View style={[ styles.lowerCard, tailwind(`justify-center pl-1 w-full`) ]}>
                    <View style={ tailwind(`py-5`) }>
                        <FlatList 
                            data={ ingredients }
                            renderItem={({ item }) => (
                                <PantryChoices ingredientName={ item } />
                            )}
                            numColumns={3}
                            keyExtractor={ item => item.name }
                            listKey='FlatListInnerCard'
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default PantryListCard

const styles = StyleSheet.create({
    cardContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    upperCard: {
        flex: 1
    },
    lowerCard: {
        flex: 4
    }
})