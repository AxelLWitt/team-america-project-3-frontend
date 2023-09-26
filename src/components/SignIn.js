import React from 'react'
import useGoogleAuth from './useGoogleAuth';


const SignIn = () => {
    const {login} = useGoogleAuth()    
    const user = JSON.parse(localStorage.getItem('googleUser'));
    const profile = JSON.parse(localStorage.getItem('googleProfile'));
    if(!user){
            return(
                <div className="button-container">
                    <h3 className="login-button" onClick={() => login()}>Sign in with Google 🚀
                    </h3>
                 </div>
            )
        }
}

export default SignIn