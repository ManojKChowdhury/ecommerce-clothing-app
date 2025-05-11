import {initializeApp} from "firebase/app";
import {doc} from "firebase/firestore";
import {onAuthStateChanged, getAuth, GoogleAuthProvider} from "firebase/auth";
import {collection, getFirestore} from "firebase/firestore";

// TODO: move to env
const config = {
    apiKey: "AIzaSyCjrggEfN-Aw87kK_nq-9rxWP9RwIqTbJw",
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
    const userRef = doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
        const {email} = userAuth;
        const displayName = userAuth.displayName ? userAuth.displayName : (typeof additionalData === 'string' ? additionalData : '');
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt/*,
                ...additionalData*/
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
      const {title, items} = doc.data();
      return {
          routeName: encodeURI(title.toLowerCase()),
          id: doc.id,
          title,
          items
      }
  });
  return transformedCollection.reduce((accumulator,collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(userAuth => {
         unsubscribe();
         resolve(userAuth);
      }, reject);
  });
};

initializeApp(config);

export const firebaseAuth = getAuth();
export const fireStore = getFirestore();

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});
