import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet, Text, View, SafeAreaView, Pressable, KeyboardAvoidingView } from 'react-native'
import tailwind from 'tailwind-rn'
import { useNavigation } from '@react-navigation/native'

//Redux
import { useDispatch } from 'react-redux'
import { loginUser } from '../store/actions'

//Firebase
import { handleSignOut, handleLogin, userLoggedIn, auth, EmailAuthProvider, linkWithCredential } from '../api/Firebase'

//Components
import SearchContainer from '../components/SearchContainer'
import Search from '../components/Search';
import Button from '../components/Button'
import InputFields from '../components/InputFields'

const LoginScreen = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const navigation = useNavigation();
    const dispatch = useDispatch()

    async function signIn() {
        await auth.onAuthStateChanged((user) => {
            handleLogin(email, password)
            if (user) {
                dispatch(loginUser())
                navigation.navigate('FavoritesScreen')
            }
        })
    }

    return (
        <SafeAreaView
            style={ tailwind(`bg-green-500 flex-1`) }
        >
            <SearchContainer name="Login" />
            <KeyboardAvoidingView 
                style={[ tailwind(`justify-center items-center bg-white`), styles.recipeSection ]}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={ tailwind(`w-full`) }>
                    <InputFields 
                        placeholder="Email" 
                        name="email-variant" 
                        getText={ setEmail }
                        autoCaps={ 1 }
                    />
                </View>
                <View style={ tailwind(`w-full my-10`) }>
                    <InputFields 
                        placeholder="Password" 
                        name="form-textbox-password" 
                        getText={ setPassword }
                        autoCaps={ 1 }
                        secureText={ 1 }
                    />
                </View>
                { email && password ?
                    <Button name="Login" onPress={ signIn }/>
                    :
                    null
                }
                <Pressable 
                    style={({ pressed }) => [{
                        opacity: pressed ? 0.5 : 1
                    },
                        tailwind(`items-center mt-4`)
                    ]}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text>Not registered? Click here.</Text> 
                </Pressable> 
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default LoginScreen

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
    },
    textInput: {
        height: 50,
        width: '90%',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: 'white',
    }
})
