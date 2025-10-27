import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, GithubAuthProvider, EmailAuthProvider} from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyC800UsLJ3iRRrsWrDLNVqFaeLFSBXCHQo',
    authDomain: 'reactoauth-7143a.firebaseapp.com',
    projectId: 'reactoauth-7143a',
    storageBucket: 'reactoauth-7143a.firebasestorage.app',
    messagingSenderId: '275223138229',
    appId: '1:275223138229:web:f08a89dd880b18f54553fc',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export {auth, googleProvider, githubProvider, GithubAuthProvider, GoogleAuthProvider, EmailAuthProvider};