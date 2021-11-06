import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, Pressable, Alert } from 'react-native'
import tailwind from 'tailwind-rn'
import { useNavigation } from '@react-navigation/native'

//Firebase
import { handleSignup, userLoggedIn, auth, EmailAuthProvider, linkWithCredential } from '../api/Firebase'

//Components
import Button from '../components/Button'
import SearchContainer from '../components/SearchContainer'
import Search from '../components/Search';

const RegisterScreen = () => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const navigation = useNavigation();
    
    async function register() {
        if(!email) {
            Alert.alert('You need to enter an email')
        } else if (!password) {
            Alert.alert('You need to enter a password')
        } else if (!name) {
            Alert.alert('You need to enter your name')
        } else if (email && password && name){
            handleSignup(email, password, name);
            await auth.onAuthStateChanged((user) => {
                if (user) {
                    const credential = EmailAuthProvider.credential(email, password)
                    linkWithCredential(auth.currentUser, credential)
                        .then((usercred) => {
                            const user = usercred.user;
                            console.log('Anonymous account upgraded', user)
                        }).catch((error) => {
                            console.log('Error upgrading the account', error)
                        })
                    navigation.navigate('FavoritesScreen')
                }
            })
        }
    }

    return (
            <SafeAreaView
                style={ tailwind(`bg-green-500 flex-1`) }
            >
                <KeyboardAvoidingView
                    style={ tailwind(`flex-1`) }
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <SearchContainer name="Register" />
                    <View 
                        style={[ tailwind(`justify-center items-center bg-white`), styles.recipeSection ]}
                    >
                        <View style={ tailwind(`w-full my-3`) }>
                            <Search 
                                placeholder="First name" 
                                name="account-box" 
                                getText={ setName } 
                            />
                        </View>
                        <View style={ tailwind(`w-full my-3`) }>
                            <Search 
                                placeholder="Email" 
                                name="email-variant" 
                                getText={ setEmail } 
                                autoCaps={ 1 }
                            />
                        </View>
                        <View style={ tailwind(`w-full my-3 mb-10`) }>
                            <Search 
                                placeholder="Password" 
                                name="form-textbox-password" 
                                getText={ setPassword } 
                                autoCaps={ 1 }
                                secureText={ 1 }
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
                <View style={ tailwind(`bg-white items-center justify-center pt-2`) }>
                    <Button name="Register" onPress={ register }/>
                    <Pressable 
                        style={({ pressed }) => [{
                            opacity: pressed ? 0.5 : 1
                        },
                            tailwind(`items-center my-6`)
                        ]}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text>Already registered? Click here.</Text> 
                    </Pressable>   
                </View>
            </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    recipeSection: {
        flex: 0.75,
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
        backgroundColor: 'white'
    }
})
