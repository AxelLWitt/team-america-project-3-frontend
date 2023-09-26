import React, {useState, useEffect}  from 'react'
import useGoogleAuth from './useGoogleAuth'
import UserModal from './UserModal'



const Nav = () => {
    const [showProfile, setShowProfile] = useState(false); // Initially, don't show user profile
    const [user, updateUser] = useState(JSON.parse(localStorage.getItem('googleUser')));
    const [profile, updateProfile] = useState(JSON.parse(localStorage.getItem('googleProfile')));

    const handleProfile = () => {
        updateProfile(JSON.parse(localStorage.getItem('googleProfile')))
        updateUser(JSON.parse(localStorage.getItem('googleUser')))
        if(!user){
            return
        }
        setShowProfile(prevState => !prevState)
    }
        return(
            <div className='Nav'>
                <img width="26" height="26" src="https://img.icons8.com/metro/26/menu.png" alt="menu" onClick={handleProfile} className='Hamburger'></img>
                <UserModal show={showProfile} user={user} profile={profile}/>
            </div>
        )
}

export default Nav
