import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, GithubAuthProvider, EmailAuthProvider} from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyC800UsLJ3iRRrsWrDLNVqFaeLFSBXCHQo",
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "reactoauth-7143a.firebaseapp.com",
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "reactoauth-7143a",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "reactoauth-7143a.firebasestorage.app",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "275223138229",
    appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:275223138229:web:f08a89dd880b18f54553fc",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export {auth, googleProvider, githubProvider, GithubAuthProvider, GoogleAuthProvider, EmailAuthProvider};