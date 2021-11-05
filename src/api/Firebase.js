
import { initializeApp } from 'firebase/app';
import { Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import apiKeys from '../config/Keys'

const app = initializeApp(apiKeys.firebaseConfig)

const auth = getAuth()
const db = getFirestore();

let userLoggedIn;

onAuthStateChanged(auth, (user) => {
    if (user != null) {
      userLoggedIn = user
    }

    return;
});

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
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });

    const currentUser = auth.currentUser;
    
    // db.collection("users")
    //   .doc(currentUser.uid)
    //   .set({
    //     email: currentUser.email,
    //     firstName: firstName,
    //     favRecipes: []
    //   });
}

//SIGN IN
async function handleLogin(email, password) {
    if(!email) {
        Alert.alert('Must enter a valid email')
    } else if (!password) {
        Alert.alert('Must enter a valid password')
    }

    signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user
            console.log('Logged in with: ' + user.email)
        })
        .catch(err => console.log(Alert.alert(err.message)))
}

//LOGOUT
async function handleSignOut() {
    signOut()
        .then(() => {
            console.log('FIRED')
        })
        .catch(err => alert(err.message))
}

export { db, auth, userLoggedIn, handleSignup, handleSignOut, handleLogin }