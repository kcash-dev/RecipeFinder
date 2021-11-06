import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import tailwind from 'tailwind-rn'


//Firebase
import { onAuthStateChanged, onSnapshot, arrayUnion, setDoc, arrayRemove, doc, db, auth, signInAnonymously, updateDoc } from '../api/Firebase'

const IngredientsChoices = ({ ingredientName, category }) => {
    const [ press, setPress ] = useState(false)
    const [ isInCart, setIsInCart ] = useState(false)

    const listening = doc(db, 'users', auth.currentUser.uid)
    const observer = onSnapshot(listening, (doc) => {
        const snapshot = doc.data()
        changeData(snapshot)
    })

    function changeData(item) {
        if(item) {
            if (item.currentIngredients) {
                const ingredientList = item.currentIngredients;
                ingredientList.forEach(ingredient => {
                    if(ingredient.name === ingredientName) {
                        setIsInCart(true)
                    }
                })
            }
        }
    }

    const setUserBasket = () => {
        if(!auth.currentUser) {
            isAnonymousUser();
            onAuthStateChanged(auth, (user) => {
                addIngredientToPantry(user.uid, category)
            })
        } else {
            addIngredientToPantry(auth.currentUser.uid, category);
        }
    }
    async function addIngredientToPantry(user, category) {
        const ingredient = {
            name: ingredientName,
            category: category
        }
        if(press) {
            const ingredientRef = doc(db, 'users', user)
            await updateDoc(ingredientRef, {
                currentIngredients: arrayRemove(ingredient)
            })
        } else if (!press) {
            const ingredientRef = doc(db, 'users', user)
            if (ingredientRef) {
                await setDoc(ingredientRef, {
                    currentIngredients: arrayUnion(ingredient)
                })
            } else {
                await updateDoc(ingredientRef, {
                    currentIngredients: arrayUnion(ingredient),
                    shoppingList: []
                })
            }
        }
    }

    async function setUpUserDB(user) {
        await setDoc(doc(db, 'users', user), {
            currentIngredients: [],
            shoppingList: []
        });
    }

    function isAnonymousUser() {
        signInAnonymously(auth)
                .then(() => {
                    onAuthStateChanged(auth, (user) => {
                        if(user) {
                            setUpUserDB(user.uid)
                        } else {
                            return;
                        }
                    })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                })
    }
    return (
        <Pressable 
            style={({pressed}) => [{
                opacity: pressed ?
                    0.5
                    :
                    1,
                backgroundColor: isInCart ?
                    '#76BA1B'
                    :
                    '#D3D3D3'
                }, { width: 102 }, tailwind(`m-1 h-14 justify-center rounded-md`) ]}
            onPress={() => { 
                setIsInCart(!isInCart), 
                setUserBasket()
            } }
        >
            <Text style={[ { 
                color: isInCart ?
                    '#fff'
                    :
                    '#000'
             }, tailwind(`text-center p-2`) ]}>{ ingredientName }</Text>
        </Pressable>
    )
}

export default IngredientsChoices

const styles = StyleSheet.create({})
