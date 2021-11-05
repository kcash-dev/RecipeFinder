
import { initializeApp } from 'firebase/app';
import { Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword, updateProfile, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';
import apiKeys from '../config/Keys';

const app = initializeApp(apiKeys.firebaseConfig)

const auth = getAuth()
const db = getFirestore();

let userLoggedIn;

console.log(userLoggedIn)

// const docRef = doc(db, "users", userLoggedIn.uid)
// const username = await getDoc(docRef.name)

// SIGN UP
async function handleSignup(email, password, firstName) {
    if(!email) {
        Alert.alert('Must enter a valid email')
    } else if (!password) {
        Alert.alert('Must enter a valid password')
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            console.log('Logged in')
            const user = userCredential.user;
            setUserDetails(user);
            updateProfile(user, {
                displayName: firstName
            })
            setUpUserDB(user.uid, firstName, email)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

async function setUpUserDB(user, firstName, email) {
    await setDoc(doc(db, 'users', user), {
        name: firstName,
        email: email,
        favRecipes: [],
        currentIngredients: []
    });
}

async function setUserDetails(user) {
    const docRef = doc(db, 'users', user)
    userLoggedIn = await getDoc(docRef)
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
            onAuthStateChanged(auth, () => {
                setUserDetails(user.uid);
            });
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

export { db, auth, userLoggedIn, handleSignup, handleSignOut, handleLogin }