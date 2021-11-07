import firebase from 'firebase/app';
import 'firebase/firestore'; // for the db
import 'firebase/auth';

const config =  {
    apiKey: "AIzaSyDwdKHZSuOO5F7pnw0ixayqerQUs3yuLxs",
    authDomain: "nomad-bags-store-f4db8.firebaseapp.com",
    projectId: "nomad-bags-store-f4db8",
    storageBucket: "nomad-bags-store-f4db8.appspot.com",
    messagingSenderId: "896759884476",
    appId: "1:896759884476:web:3d70b4786fe1b84acbbeb9"
  };

  firebase.initializeApp(config);

const firestore = firebase.firestore();
const auth = firebase.auth();

const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) { return };

  const userRef = firestore.doc(`users/${userAuth.uid}`) //users/uniq26535
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

export {
  firestore,
  createUserProfileDocument,
  auth,
}