import React from 'react'
import { StyleSheet, Text, SafeAreaView, Image, View, ImageBackground } from 'react-native'
import tailwind from 'tailwind-rn'

//Images
const upperImage = { uri: "https://i.imgur.com/CrICZPR.jpg" }

const RecipeDataHeader = ({ recipeName, recipeImage, recipeLikes, spoonacularScore, healthScore }) => {
    return (
        <SafeAreaView style={ tailwind(`flex-row bg-green-500`) }>
            <ImageBackground 
                source={ upperImage }
                resizeMode="cover"
                style={ tailwind(`flex-1 w-full`) }
                imageStyle={{ opacity: 0.1 }}
            >
                <View style={ tailwind(`flex-row`) }>
                    <Image
                        source={{ uri: recipeImage }}
                        style={ tailwind(`h-36 w-36 rounded-lg m-3`) }
                    />
                    <View style={ tailwind(`mt-2`) }>
                        <Text style={ tailwind(`text-lg w-3/4 font-bold text-white`) }>{ recipeName }</Text>
                        { spoonacularScore ?
                            <View style={ tailwind(`flex-row items-center mt-2`) }>
                                <Text style={ tailwind(`font-bold text-white`) }>Spoonacular Score: { spoonacularScore }</Text>
                                <Image 
                                    source={{ uri: 'https://i.imgur.com/PpAYGTw.png' }}
                                    style={ tailwind(`h-6 w-6 ml-3`) }
                                />
                            </View>
                            :
                            null
                        }
                        { healthScore ? 
                            <View style={ tailwind(`flex-row items-center mt-2`) }>
                                <Text style={ tailwind(`font-bold text-white`) }>Health Score: { healthScore }</Text>
                                <Image 
                                        source={{ uri: 'https://i.imgur.com/ZVMxiC2.png' }}
                                        style={ tailwind(`h-6 w-6 ml-3`) }
                                    />
                            </View>
                            :
                            null
                        }
                        { recipeLikes ? 
                            <View style={ tailwind(`flex-row items-center mt-2`) }>
                                <Text style={ tailwind(`font-bold text-white`) }>Likes: { recipeLikes }</Text>
                                <Image 
                                        source={{ uri: 'https://i.imgur.com/fSCMdiL.png' }}
                                        style={ tailwind(`h-6 w-6 ml-3`) }
                                    />
                            </View>
                            :
                            null
                        }
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default RecipeDataHeader

const styles = StyleSheet.create({})
