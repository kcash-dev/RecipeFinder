
import { initializeApp } from 'firebase/app';
import { Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword, updateProfile, signOut, createUserWithEmailAndPassword, onAuthStateChanged, EmailAuthProvider, linkWithCredential, signInAnonymously } from 'firebase/auth';
import { getFirestore, where, collection, setDoc, updateDoc, doc, getDoc, getDocs, onSnapshot, arrayUnion, arrayRemove, query } from 'firebase/firestore';
import apiKeys from '../config/Keys';

const app = initializeApp(apiKeys.firebaseConfig)

const auth = getAuth()
const db = getFirestore();

let userLoggedIn;

// SIGN UP
async function handleSignup(email, password, firstName) {
    if(!email) {
        Alert.alert('Must enter a valid email')
    } else if (!password) {
        Alert.alert('Must enter a valid password')
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            userLoggedIn = user.uid
            // Signed in 
            console.log('Logged in')
            setUpUserDB(user.uid, firstName, email)
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

async function setUpUserDB(user, firstName, email) {
    await updateDoc(doc(db, 'users', user), {
        name: firstName,
        email: email,
        favRecipes: [],
        currentIngredients: []
    });
}

//SIGN IN
async function handleLogin(email, password) {
    if(!email) {
        Alert.alert('Must enter a valid email')
    } else if (!password) {
        Alert.alert('Must enter a valid password')
    }

    signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user
            userLoggedIn = user.uid
        })
        .catch(err => console.log(Alert.alert(err.message)))
}

//LOGOUT
async function handleSignOut() {
    signOut(auth)
        .then(() => {
            console.log('FIRED')
        })
        .catch(err => alert(err.message))
}

export { db, auth, userLoggedIn, query, where, collection, getDocs, arrayUnion, arrayRemove, onSnapshot, doc, updateDoc, setDoc, getDoc, signInWithEmailAndPassword, updateProfile, onAuthStateChanged,  handleSignup, handleSignOut, handleLogin, EmailAuthProvider, linkWithCredential, signInAnonymously }