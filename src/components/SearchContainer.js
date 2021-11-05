import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Pressable, ImageBackground, Image } from 'react-native'
import tailwind from 'tailwind-rn';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

//Firebase
import { userLoggedIn } from '../api/Firebase';

//Components
import Search from '../components/Search';

//Images
const upperImage = { uri: "https://i.imgur.com/CrICZPR.jpg" }

const SearchContainer = ({ name, subtitle }) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    const navigation = useNavigation();
    useEffect(() => {
        if(userLoggedIn) {
            setIsLoggedIn(true)
        }

        return;
    }, [])
    
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
                            onPress={() => isLoggedIn ? navigation.navigate('Favorites', { screen: 'FavoritesScreen' }) 
                            : 
                            navigation.navigate('Favorites', { screen: 'Login' })}
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
                    <Search placeholder="Search for anything" name="magnify"/>
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
