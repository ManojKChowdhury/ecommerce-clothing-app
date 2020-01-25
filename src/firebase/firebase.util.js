import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "",
    authDomain: "ecommerce-clothing-app.firebaseapp.com",
    databaseURL: "https://ecommerce-clothing-app.firebaseio.com",
    projectId: "ecommerce-clothing-app",
    storageBucket: "ecommerce-clothing-app.appspot.com",
    messagingSenderId: "887652410012",
    appId: "1:887652410012:web:607096dbf387a0891b0359",
    measurementId: "G-ZSYYTHY9HK"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) {
        return;
    }
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists) {
        const {email} = userAuth;
        const displayName = userAuth.displayName? userAuth.displayName: (typeof additionalData === 'string'? additionalData: '');
        const createdAt = new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createdAt/*,
                ...additionalData*/
            });
        }catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
