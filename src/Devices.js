import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from './Modal';
import fire from './fire';
import styled from 'styled-components';
import Card from './SimpleCard'
import {Grid} from "@material-ui/core";

const title = {

    right: "500px",
    marginTop: "-150px",
    position: "absolute",
    textAlign: "center",
    top: "50%",
    width: "100%",
    fontSize:"30px",

}

const pos = {

    right: "100px",
    marginTop: "150px",
    position: "absolute",
    width: "10%",
    height: "8%",
    
     
}

function Devices (){ 
        
    const [showModal, setShowModal] = useState(false);
    const [showDevices, setDevices] = useState([])
   

    useEffect(() => {   

        var docRef = fire.firestore().collection("users").doc(fire.auth().currentUser.uid)
             
        /* Create reference to messages in Firebase Database */
      
        
        const unsubscribe =  docRef.onSnapshot((doc) => {

           
            
        // devices.push(doc.data())
         setDevices(Object.keys(doc.data())); 
         
    })  

    // .then(() => {
    //     console.log("test")
     
    // } )
    

    return () => unsubscribe()

    },[setDevices])

    const openModal = () => {
      setShowModal(prev => !prev);

    }

    const h1 = {
        left: "0",
        lineHeight: "80px",
        marginTop: "-100px",
        position: "absolute",
        textAlign: "center",
        top: "50%",
        width: "100%",
        zIndex: 0
    }

    const devices = () => {

        return showDevices[0]
    }

    
    

       return(

            <>           
            <h2 style = {title} >Devices </h2>

            <Button onClick={openModal} variant="primary" style = {pos}>Add device</Button>
            <Modal showModal={showModal} setShowModal={setShowModal} />
            <h1 style = {h1}>
            
            </h1>
    <Grid container>
    <Grid item xs= {6}>
            <Card device = {showDevices[0]}/>
    </Grid>
    <Grid item xs= {6}>
            <Card device = {showDevices[1]}  />
    </Grid>

    </Grid> 
            </>
        )
    }   

export default Devices
