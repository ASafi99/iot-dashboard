import React, { Component, useState, useEffect} from 'react';
import fire from './fire';
import Card from './Card';

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

    
    }, [])

    
        
        
 
// const authListener = () => {
//     fire.auth().onAuthStateChanged((user) => {

//         return " "+user.uid
             
//     })}


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

            <>
       
        
          <Card temp = {temp}  />
          </>
        )
     }
    

    export default Dashboard

  
  
        
      

        