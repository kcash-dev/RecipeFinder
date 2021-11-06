import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import tailwind from 'tailwind-rn'
import { useNavigation } from '@react-navigation/native'

//Firebase
import { handleSignOut, db, auth, doc, getDoc, onSnapshot, onAuthStateChanged } from '../api/Firebase'

//Components
import SearchContainer from '../components/SearchContainer'
import Button from '../components/Button'

//Images
const bgImage = { uri: "https://i.imgur.com/KH7vbXc.png" }

const FavoritesScreen = () => {
    const [ isRegistered, setIsRegistered ] = useState(false)
    const [ currentUser, setCurrentUser ] = useState({})
    const [ favRecipes, setFavRecipes ] = useState([])
    const navigation = useNavigation();

    async function signOut() {
        handleSignOut()
        navigation.navigate('Login')
    }

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setIsRegistered(true)
                async function getUserData(uid) {
                    const docSnap = await getDoc(doc(db, 'users', uid))
                    setCurrentUser(docSnap.data())
                }
                getUserData(user.uid)
            } else if (!user) {
                setIsRegistered(false)
            }
        })
    }, [])

    return (
        <SafeAreaView style={ tailwind(`bg-green-500 flex-1`)}>
            <SearchContainer name="Favorites" />
            <View style={[ tailwind(`items-center bg-white`), styles.recipeSection ]}>
                { isRegistered ?
                <View>
                    {currentUser ?
                        <Text>{ currentUser.name } is logged in!</Text>
                        :
                        null
                    }
                    <Button name="Sign out" onPress={ signOut }/>
                </View>
                    :
                    <View style={ tailwind(`justify-center items-center flex-1`) }>
                        <Image source={ bgImage } style={ tailwind(`h-40 w-40 mt-10 opacity-50`) } />
                        <Text style={ tailwind(`my-10`) }>Only registered users can save recipes.</Text>
                        <Button name="Login/Register" onPress={() => navigation.navigate('Login')}/>
                    </View>
                }
            </View>
        </SafeAreaView>
    )
}

export default FavoritesScreen

const styles = StyleSheet.create({
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
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    }
})
