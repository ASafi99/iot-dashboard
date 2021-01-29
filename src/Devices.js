import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from './Modal';
import {fire} from './fire';
import Card from './SimpleCard'
import {Grid} from "@material-ui/core";
import Widget from './widgets.js'

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
    marginTop: "140px",
    position: "absolute",
    width: "10%",
    height: "8%",
}

function Devices (){ 
        
    const [showModal, setShowModal] = useState(false);
    const [showDevices, setDevices] = useState([])
    const [element, setElement] = useState([])
    const [showPage, setPage] = useState (true)
    const [currentDevice, setCurrentDevice] = useState("")
    //const [created, setCreated] = useState([])
   
    const page = (childData) => {
        setPage(childData)
  }

  const device = (childData) => {
    setCurrentDevice(childData)
    
}


  

    useEffect(() => {   

        var docRef = fire.firestore().collection("users").doc(fire.auth().currentUser.uid)
     /* Create reference to messages in Firebase Database */
        var elements=[];
         docRef.onSnapshot((doc) => {
        // devices.push(doc.data())
         setDevices(Object.keys(doc.data().devices)); 
        
    })  

    
      for(var i=0;i<showDevices.length;i++){    

             elements.push(<Grid item xs= {3}>
                 <Card key = {i} device = {showDevices[i]} showPage = {page} currentDevice = {device}  />
              </Grid>)
              
         }
         setElement(elements)
    

    },[showDevices,currentDevice])

    const openModal = () => {
      setShowModal(prev => !prev);

    }


       return(
        <>
        {showPage ? (          
             <>           
            <h2 style = {title} >Devices </h2>

            <Button onClick={openModal} variant="primary" style = {pos}>Add device</Button>
            <Modal showModal={showModal} setShowModal={setShowModal} isWidget ={true} currentDevice = {currentDevice} /> 
    <Grid container>
      {element}
    </Grid> 
            </>
        ) : (
            <>
            <Widget currentDevice = {currentDevice} />
            </>
        )}

        </>
        )
    }   

export default Devices
