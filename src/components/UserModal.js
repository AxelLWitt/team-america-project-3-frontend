import React, { useEffect, useState } from 'react';
import useGoogleAuth from './useGoogleAuth';

const UserModal = ({ show, user, profile }) => {
    // const [user, updateUser] = useState(JSON.parse(localStorage.getItem('googleUser'))||null);
    // const [profile, updateProfile] = useState(JSON.parse(localStorage.getItem('googleProfile'))||null);
    const { logOut } = useGoogleAuth();

    if(!show) {
        return;
    }

    return (
        <div className='UserModal'>
            <h1>{profile.name}</h1>
            <h5>{profile.email}</h5>
            <h3 onClick={logOut} >LogOut</h3>
        </div>
    );
}

export default UserModal;