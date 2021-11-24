import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Pressable, ImageBackground, TextInput, FlatList, Button, Keyboard } from 'react-native'
import tailwind from 'tailwind-rn';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//Ingredients
import { ingredientCategories } from '../data/Ingredients';

//Firebase
import { userLoggedIn } from '../api/Firebase';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from '../store/actions'

//Images
const upperImage = { uri: "https://i.imgur.com/CrICZPR.jpg" }


const SearchContainer = ({ name, subtitle }) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    const [ searchItem, setSearchItem ] = useState('')
    const [ isFocused, setIsFocused ] = useState(false)
    const [ list, setList ] = useState([])
    const navigation = useNavigation();
    
    const dispatch = useDispatch();
    const state = useSelector(state => state.ingredients)
    
    useEffect(() => {
        if(userLoggedIn) {
            setIsLoggedIn(true)
        }

        return;
    }, [])

    useEffect(() => {
        const result = ingredients.filter(item => item.ingredientName.toUpperCase().includes(searchItem.toUpperCase()))
        setList(result)
    }, [ searchItem ])



    const allIngredients = []
    const ingredients = []
    ingredientCategories.forEach(ingredient => {
        allIngredients.push({
            ingredients: ingredient.ingredients,
            category: ingredient.name
        })
    })
    allIngredients.forEach(item => {
        item.ingredients.forEach(innerItem => {
            ingredients.push({
                ingredientName: innerItem.name,
                category: item.category
            })
        })
    })

    const renderItem = useCallback(
        ({ item }) => (
            <View style={ tailwind(`bg-white h-16 rounded-lg items-center justify-between flex-row w-11/12 border-b self-center px-3`) }>
                <Text style={ tailwind(`text-lg text-black`) }>{ item.ingredientName }</Text>
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
                    onPress={() => {
                        dispatch(addItem(item))
                    }}
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
                    null
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
            <View style={ tailwind(`w-full mt-2 flex-row justify-center`) }>
                <View 
                    style={[ 
                        tailwind(`flex-row self-center rounded-lg justify-center items-center bg-white`), 
                        styles.searchContainer, 
                        styles.shadow,
                        isFocused ?
                            styles.clicked
                            :
                            styles.unclicked
                    ]}
                >
                    <MaterialCommunityIcons name="magnify" size={24} color="black" style={ tailwind(`p-3 opacity-50`) }/>
                    <TextInput 
                        placeholder="Search for an ingredient" 
                        style={ tailwind(`py-3 rounded-lg bg-white flex-1`) }
                        onChangeText={text => setSearchItem(text) }
                        value={ searchItem }
                        onFocus={ () => setIsFocused(true) }
                    />
                    { isFocused ?
                        <Pressable
                            style={({ pressed }) => [{
                                opacity: pressed ?
                                    0.5
                                    :
                                    1
                            }]}
                            onPress={() => {
                                setSearchItem('')
                            }}
                        >
                            <MaterialCommunityIcons 
                                name="window-close" 
                                size={24} color="black" 
                                style={ tailwind(`pr-2`) }
                            />
                        </Pressable>
                        :
                        null
                    }
                </View>
                { isFocused ?
                    <View style={ tailwind(`justify-center`) }>
                        <Button 
                            title="Cancel"
                            onPress={ () => {
                                Keyboard.dismiss()
                                setSearchItem('')
                                setIsFocused(false)
                            } }
                            color="#ffff"
                        />
                    </View>
                    :
                    null
                }
            </View>
            { isFocused ?
                    <View style={[ tailwind(`flex-1 h-16 my-3`), styles.shadow ]}>
                        <FlatList 
                            data={ list }
                            renderItem={ renderItem }
                            keyExtractor={ keyExtractor }
                            showsVerticalScrollIndicator="false"
                        />
                    </View>
                    :
                    null
            }
            </ImageBackground>
        </SafeAreaView>
    )
}

export default SearchContainer

const styles = StyleSheet.create({
    upperSection: {
        flex: .25
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    clicked: {
        width: '75%',
        marginLeft: 8
    },
    unclicked: {
        width: '92%'
    }
})
