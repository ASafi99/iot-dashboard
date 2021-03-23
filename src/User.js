import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import {fire} from "./fire";
import "./User.css";
import App from "./App";


export default function User() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [test, setTest] = useState(false);

 

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
          default:
        }
      });
  };

  const handleSignup = () => {
    clearErrors();
     fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(cred => {   
        
        
        fire.firestore().collection('users').doc(cred.user.uid).set({

          
          userInfo:{
            email: email,
            uid: cred.user.uid,
            accountType: "IoT Admin"
          },

          devices:{

          },
          
          users:{

          },
        })     
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
          default:

        }

     
      });
  };

    const handleLogOut = () => {

    console.log("logged out")
    fire.auth().signOut();
    return true;
  }

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      clearInputs();
      if (user) {
        setTest(true)
        setUser(user);

      } else {
        setTest(false)
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <div className="App">
        <p>{test}</p>
        {user ? (
          <>           
              <App handleLogOut={handleLogOut} /> 
    
          </>
        ) : (
          <Login
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            emailError={emailError}
            passwordError={passwordError}
          />
        )}
    </div>
  );
}


