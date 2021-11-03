import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Pressable, ImageBackground } from 'react-native'
import tailwind from 'tailwind-rn';
import { FontAwesome } from '@expo/vector-icons';

//Components
import Search from '../components/Search';
import IngredientSection from '../components/IngredientSection';

//Image
const upperImage = { uri: "https://i.imgur.com/CrICZPR.jpg" }

export default function HomeScreen() {

    return (
        <SafeAreaView style={ tailwind(`bg-green-500 flex-1`)}>
            <View style={[ tailwind(`items-center justify-center`), styles.upperSection ]}>
                <ImageBackground 
                    source={ upperImage }
                    resizeMode="cover"
                    style={ tailwind(`flex-1 justify-center w-full`) }
                    imageStyle={{ opacity: 0.1 }}
                >
                <View style={ tailwind(`items-center my-3 flex-row w-full justify-center`) }>
                    <View style={ tailwind(`absolute left-4`) }>
                        <Pressable 
                            style={({pressed}) => [{
                                opacity: pressed ?
                                    0.5
                                    :
                                    1
                            }]}
                        >
                            <FontAwesome 
                                name="user-circle" 
                                size={30} 
                                color="white" 
                            />
                        </Pressable>
                    </View>
                    <View style={ tailwind(`self-center`) }>
                        <Text style={[ tailwind(`text-center text-3xl text-white`) ]}>UltraCook</Text>
                    </View>
                </View>
                <View style={ tailwind(`w-full`) }>
                    <Search />
                </View>
                </ImageBackground>
            </View>
            <View style={[ tailwind(`items-center bg-white rounded-xl`), styles.recipeSection ]}>
                <IngredientSection />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    upperSection: {
        flex: .25
    },
    recipeSection: {
        flex: .75,
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
