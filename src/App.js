import React, {useState} from 'react';
import Map from './components/Map'
import Nav from './components/Nav'
import SignIn from './components/SignIn'
import useGoogleAuth from './components/useGoogleAuth'
import './App.css';

function App() {
  const [user, updateUser] = useState(JSON.parse(localStorage.getItem('googleUser')));
  const [profile, updateProfile] = useState(JSON.parse(localStorage.getItem('googleProfile')));

  return (
    <div className="container">
      {!user&&(
        <SignIn/>
      )}
      <div className="map-section">
        <Map user={user}/>
      </div>
    </div>
  );
}

export default App;