import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Pressable, ImageBackground, Image } from 'react-native'
import tailwind from 'tailwind-rn';
import { FontAwesome } from '@expo/vector-icons';

//Components
import Search from '../components/Search';

//Images
const upperImage = { uri: "https://i.imgur.com/CrICZPR.jpg" }

const SearchContainer = ({ name, subtitle }) => {
    
    
    return (
        <SafeAreaView style={[ tailwind(`items-center justify-center`), styles.upperSection ]}>
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
                        <Text style={[ tailwind(`text-center text-3xl text-white`) ]}>{ name }</Text>
                        { subtitle ?
                            <Text style={ tailwind(`text-white`) }>{ subtitle }</Text>
                            :
                            null
                        }
                    </View>
                </View>
                <View style={ tailwind(`w-full`) }>
                    <Search />
                </View>
                </ImageBackground>
            </SafeAreaView>
    )
}

export default SearchContainer

const styles = StyleSheet.create({
    upperSection: {
        flex: .25
    },
})
