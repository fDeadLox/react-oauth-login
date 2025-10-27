import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import './App.css';

function HomePage({ user }) {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="home-page">
      <div className="profile-container">
        {user.photoURL && (
          <img
            src={user.photoURL}
            alt="Profile"
            className="profile-pic"
          />
        )}
        <h1>Welcome, {user.displayName || user.email}!</h1>
        <p>You have successfully logged in.</p>
        <button onClick={handleSignOut} className="login-btn signout-btn">Sign Out</button>
      </div>
    </div>
  );
}

export default HomePage;