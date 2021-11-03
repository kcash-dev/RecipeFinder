import React from 'react'
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import tailwind from 'tailwind-rn';

const IngredientsCard = ({ name, image }) => {
    return (
        <SafeAreaView style={ [ tailwind(`w-5/6 my-3 self-center border-gray-300 rounded-lg border-opacity-50 border`), styles.cardContainer ] }>
            <View>
                <View style={[ styles.upperCard, tailwind(`h-20 flex-row justify-between items-center border-b border-gray-200`) ]}>
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
                <View style={[ styles.lowerCard, tailwind(`h-28 flex-row justify-center items-center`) ]}>
                    <Text>This is where the ingredients will go</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default IngredientsCard

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
