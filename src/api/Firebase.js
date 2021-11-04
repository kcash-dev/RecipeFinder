
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, FacebookAuthProvider, signInWithCredential } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import apiKeys from '../config/Keys'

const app = initializeApp(apiKeys.firebaseConfig)

const auth = getAuth()
const db = getFirestore();
const user = auth.currentUser;

// SIGN UP
async function handleSignup(email, password, firstName) {
    if(!email) {
        Alert.alert('Must enter a valid email')
    } else if (!password) {
        Alert.alert('Must enter a valid password')
    }

    await auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
        const user = userCredentials.user
        console.log('Registered with: ' + user.email)
    })
    .catch(err => err.message === "The email address is already in use by another account." ? Alert.alert(err.message) : console.log(err.message))

    const currentUser = firebase.auth().currentUser;
    
    db.collection("users")
      .doc(currentUser.uid)
      .set({
        email: currentUser.email,
        firstName: firstName,
        favRecipes: []
      });
}

//SIGN IN
async function handleLogin(email, password) {
    if(!email) {
        Alert.alert('Must enter a valid email')
    } else if (!password) {
        Alert.alert('Must enter a valid password')
    }

    auth
    .signInWithEmailAndPassword(email, password)
    .then(userCredentials => {
        const user = userCredentials.user
        console.log('Logged in with: ' + user.email)
    })
    .catch(err => console.log(Alert.alert(err.message)))
}

//LOGOUT
async function handleSignOut() {
    auth
    .signOut()
    .then(() => {
        console.log('FIRED')
    })
    .catch(err => alert(err.message))
}

export { db, auth, handleSignup, handleSignOut, handleLogin }