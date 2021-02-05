import React, { useState, useEffect } from 'react';
import { Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from './Modal';
import {fire} from './fire';
import Card from './SimpleCard'
import {Grid} from "@material-ui/core";
import Widget from './widgets.js'
import { makeStyles } from "@material-ui/core/styles";
import DeviceUsers from './DeviceUsers'

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
    const [showPage, setPage] = useState (true)
    const [showUserPage, setUserPage] = useState (false)
    const [currentDevice, setCurrentDevice] = useState("")
    const [accountType, setAccountType] = useState ("")

    //const [created, setCreated] = useState([])
   
    const page = (childData) => {
        setPage(childData)
        setUserPage(childData)
  }

  const page1 = (childData) => {
    
    setUserPage(childData)
}




  const device = (childData) => {
    setCurrentDevice(childData)
    
}


  

    useEffect(() => {   

        fire.firestore().collection("users").doc(fire.auth().currentUser.uid).get().then(function(doc) {
        
            let accountType = doc.data().userInfo.accountType;
            let docRef

            setAccountType(accountType)
            if(accountType=== "IoT Owner" || accountType === "IoT User"){

              let ref = doc.data().userInfo.ref;
               docRef = fire.firestore().collection("users").doc(ref)
               
            } else{
              docRef = fire.firestore().collection("users").doc(fire.auth().currentUser.uid)

            }
        
     /* Create reference to messages in Firebase Database */
        
         docRef.onSnapshot((doc) => {
        // devices.push(doc.data())
         setDevices(Object.keys(doc.data().devices)); 
         
    })  

        })
    
        
    },[currentDevice])


        let deviceCards = showDevices.map((d, i) =>
    
    <Grid item xs={3} >
      <Card key = {i} device = {showDevices[i]} showPage = {page} showUserPage= {page1} currentDevice = {device} /> 
    </Grid>
    )
          

    const useStyles = makeStyles({
      gridContainer: {
        
        margin:0,
       marginTop: 150 ,
       position: "absolute",
       width:"inherit",
       zIndex:-10,
       minWidth:1200
       
      }
    });

    const openModal = () => {
      setShowModal(prev => !prev);

    }

    const classes = useStyles();

       return(
        <>
        {showPage ? (          
             <>           
            <h2 style = {title} >Devices </h2>

            {accountType === "IoT Owner" || accountType === "IoT User" ? (
           <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-disabled">Only IoT Admin are able to add devices!</Tooltip>}>
           <span className="d-inline-block" style = {{position: "absolute", right: "100px",
    marginTop: "140px"}}>
           <Button disabled variant="primary" style = {{pointerEvents: 'none'}}>
               Add device
             </Button>
           </span>
         </OverlayTrigger>
            ) :(
            <Button onClick={openModal} variant="primary" style = {pos}>Add device</Button>
            )}
           
    <Grid  
          fluid
          container
          className={classes.gridContainer}
          spacing= {8}
          direction="row"
          alignContent="center"
          alignItems="center"
          wrap="wrap"
         >
      {deviceCards}
    </Grid> 
            </>
        ) : (
          showUserPage ? ( 
            <>   
           <DeviceUsers currentDevice = {currentDevice}/>
           </>
          ):(
            <>
            <Widget currentDevice = {currentDevice} />
            
            </>
        
        ))}
        </>
       )  
    }   

export default Devices
