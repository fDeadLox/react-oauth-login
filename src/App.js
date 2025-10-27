import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, linkWithCredential } from 'firebase/auth';
import { auth, googleProvider, githubProvider, GithubAuthProvider, GoogleAuthProvider } from './firebaseConfig';
import { FaGoogle, FaGithub, FaEnvelope } from 'react-icons/fa';
import './App.css';
import HomePage from './HomePage';

function LoginPage() {
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
    } catch (error) {
      alert(error.message);
    }
  };

  const loginWithGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        const email = error.customData.email;
        alert(`An account already exists with ${email}. Please sign in with the original method to link your GitHub account.`);

        try {
          const methods = await fetchSignInMethodsForEmail(auth, email);
          if (methods[0] === 'google.com') {
            const result = await signInWithPopup(auth, new GoogleAuthProvider());
            const githubCredential = GithubAuthProvider.credentialFromError(error);
            await linkWithCredential(result.user, githubCredential);
            alert('Successfully linked GitHub to your Google account!');
          }
        } catch (linkError) {
          alert(`Error linking accounts: ${linkError.message}`);
        }
      } else {
        alert(error.message);
      }
    }
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEmailSignUp = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <h1>Login</h1>
        <button onClick={loginWithGoogle} className="login-btn google-btn">
          <FaGoogle /> Login with Google
        </button>
        <button onClick={loginWithGithub} className="login-btn github-btn">
          <FaGithub /> Login with GitHub
        </button>

        <hr />

        <FaEnvelope className="email-icon" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="input-field"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="input-field"
        />
        <button onClick={handleEmailLogin} className="login-btn email-btn">
          Login with Email
        </button>
        <button onClick={handleEmailSignUp} className="login-btn signup-btn">
          Sign Up with Email
        </button>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? <HomePage user={user} /> : <LoginPage />}
    </div>
  );
}

export default App;