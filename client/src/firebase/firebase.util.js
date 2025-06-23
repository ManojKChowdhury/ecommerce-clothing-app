import {initializeApp} from "firebase/app";
import {doc, getDoc, getFirestore, setDoc} from "firebase/firestore";
import {getAuth, GoogleAuthProvider, onAuthStateChanged} from "firebase/auth";

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

initializeApp(config);

export const firebaseAuth = getAuth();
export const fireStore = getFirestore();
console.log(fireStore);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) {
        return;
    }

    const userRef = doc(fireStore,'users',userAuth.uid);
    const snapShot = await getDoc(userRef);

    if (!snapShot.exists) {
        const {email} = userAuth;
        const displayName = userAuth.displayName ? userAuth.displayName : (typeof additionalData === 'string' ? additionalData : '');
        const createdAt = new Date();
        try {
            await setDoc(userRef, {
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
      const unsubscribe = onAuthStateChanged(firebaseAuth,userAuth => {
         unsubscribe();
         resolve(userAuth);
      }, reject);
  });
};
