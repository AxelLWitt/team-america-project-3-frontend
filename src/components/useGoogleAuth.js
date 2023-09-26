import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';

function useGoogleAuth() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('googleUser')) || null);
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('googleProfile')) || null);

    // This function will be used to reload user and profile data from localStorage.
    const loadDataFromLocalStorage = () => {
        const storedUser = JSON.parse(localStorage.getItem('googleUser'));
        const storedProfile = JSON.parse(localStorage.getItem('googleProfile'));
        setUser(storedUser);
        setProfile(storedProfile);
    };

    // Whenever local storage changes, reload the user and profile.
    useEffect(() => {
      if (user && user.access_token) {
          console.log("Attempting to fetch profile...");
          axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`)
              .then((res) => {
                  console.log("Profile fetch succeeded:", res.data);
                  setProfile(res.data);
                  localStorage.setItem('googleProfile', JSON.stringify(res.data));
              })
              .catch((err) => {
                  console.log("Profile fetch failed:", err);
              });
      }
  }, [user]);
  useEffect(() => {
    console.log("Profile state updated:", profile);
}, [profile]);

    const fetchProfile = () => {
        if (user && user.access_token) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`)
                .then((res) => {
                    setProfile(res.data);
                    localStorage.setItem('googleProfile', JSON.stringify(res.data));
                })
                .catch((err) => console.log(err));
        }
    };

    const login = useGoogleLogin({
      onSuccess: (codeResponse) => {
          // Set the user state directly.
          setUser(codeResponse);
          // Then update the localStorage.
          localStorage.setItem('googleUser', JSON.stringify(codeResponse));
      },
      onError: (error) => {
          console.log('Login Failed:', error);
      }
  });

    useEffect(fetchProfile, [user]);

    const logOut = () => {
        localStorage.removeItem('googleUser');
        localStorage.removeItem('googleProfile');
        googleLogout();
        setUser(null);
        setProfile(null);
    };

    return {
        user,
        profile,
        setUser,
        setProfile,
        fetchProfile,
        login,
        logOut
    };
}

export default useGoogleAuth;

