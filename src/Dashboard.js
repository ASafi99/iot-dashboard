import userEvent from '@testing-library/user-event';
import React, { Component, useState, useEffect} from 'react';
import fire from './fire';
import user from './User.js'

  const Dashboard = () => {
    
    const [user, setUser] = useState("");

    const [temp, setTemp] = useState([]);
    

    useEffect(() => {   

        var docRef = fire.firestore().collection("users").doc(user.uid)

        setUser(fire.auth().currentUser);   
             
        /* Create reference to messages in Firebase Database */
        let temps = []
        const unsubscribe =  docRef.onSnapshot((doc) => {
         
         temps.push(doc.data().devices)
         setTemp(temps); 
      
    })

    return () => unsubscribe()

    
    }, [user.uid], )

    
        
        
 
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

        //     <div className = "body">
        //     <div className="row">
        //     <div className="col-sm-6"> 
        //         <div className="card text-white bg-warning mb-3" style="max-width: 18rem;">
        //             <div style="fontSize: 20px;" className="card-header">Temperature</div>
        //             <div className="card-body">
        //                 <h1 id="temperature" style="font-size: 75px;" className="card-title">{temp}°C</h1>
        //                 <p className="card-text">Temperature expressed in Celsius degree.</p>
        //             </div>
        //         </div>
        //     </div>
        //     <div className="col-sm-6"> 
        //         <div className="card text-white bg-primary mb-3" style="max-width: 18rem;">
        //             <div style="font-size: 20px;" class="card-header">Humidity</div>
        //             <div className="card-body">
        //                 <h1 id="humidity" style="font-size: 75px;" className="card-title"><span>{temp}%</span></h1>
        //                 <p className="card-text">Relative humidity, expressed in percentage.</p>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        // </div>

        <h1 style = {h1}>
            {temp.map(temps => <div>{temps.device1.value}°C</div>)
            }</h1>
        )
     }
    

    export default Dashboard

  
  
        
      

        