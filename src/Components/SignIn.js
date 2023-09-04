import React, { useState } from 'react';
import {auth , provider}  from '../Firebase.js';
import { signInWithPopup } from 'firebase/auth';
import GoogleButton from 'react-google-button'

const Login = (props) => {
  
    // Sign in with google
    const [user,setUser] = useState("");
    const [isSignIn, setIsSignIn] = useState(false);
    const signin = () => {
             signInWithPopup(auth,provider)
             .then(data=>{
                console.log(data);
                console.log(data.user.displayName);
                console.log(data.user.email);
                setUser(data.user.displayName);
                setIsSignIn(true);
              
             })
             .catch(err=>console.log(err));

    }

    const logout = ()=>{
        setUser("");
        setIsSignIn(false);
        props.isSignIn(isSignIn);
    }
      
    return (
      <>
            {/* <center> */}
            {user!="" && <h1>{user}</h1>}
            {isSignIn && props.isSignIn(true)}
            {!isSignIn && props.isSignIn(false)}
            {user=="" &&  <GoogleButton  onClick={signin}/> }
               
            {/* </center> */}

           {user!="" && <button onClick={logout} style={{    "width": "125px",
    "height": "38px",
    "border-radius": "16px",
    "color": "white",
    "background-color": "#0d0d80",
    "font-size": "19px",
    "font-weight":" 700"}}>Logout</button>} 
           </>
    );
}
  
export default Login;