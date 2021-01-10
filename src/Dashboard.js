import userEvent from '@testing-library/user-event';
import React, { Component, useState, useEffect} from 'react';
import fire from './fire';
import user from './User.js'

  const Dashboard = () => {
    
 

    const [temp, setTemp] = useState([]);
    

    useEffect(() => {   

        var docRef = fire.firestore().collection("users").doc(fire.auth().currentUser.uid)
          
        /* Create reference to messages in Firebase Database */
        let temps = []
        const unsubscribe =  docRef.onSnapshot((doc) => {
         
         temps.push(doc.data().device)
         setTemp(temps); 
      
    })
    

    return () => unsubscribe()

    
    }, )

    
        
        
 
// const authListener = () => {
//     fire.auth().onAuthStateChanged((user) => {

//         return " "+user.uid
             
//     })}
    

        const body = {
            backgroundColor:"#696969"
        }
        const card = {
            margin: "0 auto", 
            float: "none", 
            marginBottom: "10px",
            marginTop: "50px"
        }

        const h1 = {
            left: "0",
            lineHeight: "200px",
            marginTop: "-100px",
            position: "absolute",
            textAlign: "center",
            top: "50%",
            width: "100%",
        }

       
        return(


        <h1 style = {h1}>
            {temp.map(temps => <div>{temps.widgets.temp.value}°C</div>)
            }</h1>
        )
     }
    

    export default Dashboard

  
  
        
      

        