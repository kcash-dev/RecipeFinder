import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Pressable, ImageBackground, TextInput, FlatList, ScrollView } from 'react-native'
import tailwind from 'tailwind-rn';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//Ingredients
import { ingredientCategories } from '../data/Ingredients';

//Firebase
import { userLoggedIn } from '../api/Firebase';

//Images
const upperImage = { uri: "https://i.imgur.com/CrICZPR.jpg" }


const SearchContainer = ({ name, subtitle }) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    const [ searchItem, setSearchItem ] = useState('')
    const [ isFocused, setIsFocused ] = useState(false)
    const navigation = useNavigation();
    useEffect(() => {
        if(userLoggedIn) {
            setIsLoggedIn(true)
        }

        return;
    }, [])

    const allIngredients = []
    const ingredients = []
    console.log(ingredientCategories)
    ingredientCategories.forEach(ingredient => {
        allIngredients.push(ingredient.ingredients)
    })
    allIngredients.forEach(item => {
        item.forEach(innerItem => {
            ingredients.push(innerItem)
        })
    })

    const renderItem = useCallback(
        ({ item }) => (
            <View style={ tailwind(`bg-white border h-16 rounded-lg items-center justify-between flex-row w-full px-3`) }>
                <Text style={ tailwind(`text-lg text-black`) }>{ item.name }</Text>
                <Pressable
                    style={({ pressed }) => [ 
                        { 
                            opacity: pressed ?
                                0.5
                                :
                                1
                        },
                        ]
                    }
                >
                    <MaterialCommunityIcons name="plus-circle-outline" size={24} color="black" />
                </Pressable>
            </View>
        ), [])

    const keyExtractor = useCallback((item) => item.name, [])
    
    return (
        <SafeAreaView style={[ tailwind(`items-center justify-center`), styles.upperSection ]}>
            <ImageBackground 
                source={ upperImage }
                resizeMode="cover"
                style={ tailwind(`flex-1 justify-center w-full`) }
                imageStyle={{ opacity: 0.1 }}
            >
            <View style={ tailwind(`items-center flex-row w-11/12 self-center justify-center`) }>
                { isFocused ?
                    <View style={ tailwind(`flex-1 h-16 my-3`) }>
                        <FlatList 
                            data={ ingredients }
                            renderItem={ renderItem }
                            keyExtractor={ keyExtractor }
                            showsVerticalScrollIndicator="false"
                        />
                    </View>
                    :
                    <View style={ tailwind(`flex-1`) }>
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
                }
            </View>
            <View style={ tailwind(`w-full`) }>
                <View style={[ tailwind(`flex-row w-11/12 self-center rounded-lg justify-center items-center bg-white`), styles.searchContainer ]}>
                    <MaterialCommunityIcons name="magnify" size={24} color="black" style={ tailwind(`p-3 opacity-50`) }/>
                    <TextInput 
                        placeholder="Search for an ingredient" 
                        style={ tailwind(`py-3 pr-5 bg-white flex-1`) }
                        onChangeText={text => setSearchItem(text) }
                        value={ searchItem }
                        onFocus={ () => setIsFocused(true) }
                        onBlur={ () => setIsFocused(false) }
                    />
                </View>
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
