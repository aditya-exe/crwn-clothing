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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()

    if (!snapShot.exists) {
        const {displayName, email} = userAuth
        const createdAt = new Date()
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData,
            })
        } catch (e) {
            console.log('Error creating user', e.message())
        }
    }

    return userRef
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey)

    const batch = firestore.batch()

    objectsToAdd.forEach(
        obj => {
            const newDocRef = collectionRef.doc()
            batch.set(newDocRef, obj)
        }
    )

    return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollections = collections.docs.map(doc => {
        const {title, items} = doc.data()
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })

    return transformedCollections.reduce((accumulator, collection)=>{
        accumulator[collection.title.toLowerCase()]=collection
        return accumulator
    }, {})
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase