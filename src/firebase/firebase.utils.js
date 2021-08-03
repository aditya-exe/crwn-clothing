import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyAWTf8AtP3SgjljsnZKZNeh0AJ0V08bDiQ",
    authDomain: "crwn-25bc8.firebaseapp.com",
    projectId: "crwn-25bc8",
    storageBucket: "crwn-25bc8.appspot.com",
    messagingSenderId: "824346916955",
    appId: "1:824346916955:web:92419629348e6aef8b277e",
    measurementId: "G-CSWHDCNZEH"
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase