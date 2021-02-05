import userEvent from '@testing-library/user-event';
import React, { Component, useState, useEffect} from 'react';
import {fire, otherApp} from './fire';
import { Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import { Modal } from './Modal';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import firebase from 'firebase/app'


const useStyles = makeStyles({
  table: {
    minWidth: 800,
    
  },
});


export default function Widget (props) {

    const [showModal, setShowModal] = useState(false);

    const [obj, setObj] = useState({})

    const [tempa, setTemp] = useState([]);

    const {currentDevice} = props

    const [isData, setData] = useState(false);

    
    const h1 = {
        left: "0",
        lineHeight: "200px",
        marginTop: "-100px",
        position: "absolute",
        textAlign: "center",
        top: "50%",
        width: "100%",
        opacity: "50%",
        zIndex: -1
        
    }

    const title = {

        right: 400,
        marginTop: "-150px",
        position: "fixed",
        textAlign: "center",
        top: "50%",
        width: "100%",
        fontSize:"30px",
    
    }

    const buttonPos = {

        position: "absolute",
        top:140,
        right: 180,
        width: "10%",
        height: "8%",       
         
    }

    const [accountType, setAccountType] = useState ("")

    // const getData = () => {

    //     var docRef = fire.firestore().collection("users").doc(fire.auth().currentUser.uid)

    //     let temp = []
    //     docRef.get((doc) => {
         
    //         temp.push(doc.data().device)
    //         setTemp(temp); 
    //    })
      
  
    
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

              if(Object.keys(doc.data().devices[currentDevice].widgets).length>0){
              
              setTemp([doc.data().devices[currentDevice].widgets]) 
              
              setData(true)

               }else{
               setData(false)
              }

             
    })
  
   
  })
  
    
    },[])

    const removeField = (widgetName) => {

     

      var docRef = fire.firestore().collection('users').doc(fire.auth().currentUser.uid);

      docRef.update({

        [`devices.${currentDevice}.widgets.${widgetName}`]: firebase.firestore.FieldValue.delete()
    });

  }
    
    const openModal = () => {
        setShowModal(prev => !prev);
  
      }
      const tablePos = {
       position: "absolute",
       top: 250,
       width:900,
       left:180
    }

      const classes = useStyles();
     
    return(
        <>
    <h5 style = {title}>
   Device :  <p style = {{display: "inline", backgroundColor:"blue", color:"white", borderRadius: "6px"}}>{currentDevice}</p>
   </h5>
   {!isData ? (
   <h1 style = {h1}>
            No data to display
   </h1>
   ): (
    <div style = {tablePos} >
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell align="right">Widget Name</TableCell>
            <TableCell align="right">Current Value</TableCell>
            <TableCell align="right">Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {tempa && tempa.map(temps =>

        Object.values(temps).map(obj =>(
      
          <TableRow key={obj.widgetName}>
              <TableCell component="th" scope="row">
                {obj.type}
              </TableCell>
              <TableCell align="right">{obj.widgetName}</TableCell>
              <TableCell align="right">{obj.value}</TableCell>
              <TableCell align="right">{obj.location}</TableCell>
              <TableCell align="right">
                <button style = {{backgroundColor: "red", color: "white" , borderRadius: "10px", width: 80}} onClick = {() => {if(window.confirm('Are you sure you want to Delete this widget?'))removeField(obj.widgetName)}}>Delete</button>
                </TableCell>
            </TableRow>
          )))}
        </TableBody>
      </Table>
      </TableContainer>
      </div>
   
   )}
     {accountType === "IoT User" ? (
           <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-disabled">Only IoT Admin and IoT Owner are able to add widgets!</Tooltip>}>
           <span className="d-inline-block" style = {{position: "absolute", right: "100px",
    marginTop: "140px"}}>
           <Button disabled variant="primary" style = {{pointerEvents: 'none'}}>
               Add widget
             </Button>
           </span>
         </OverlayTrigger>
            ) :(
   <Button onClick={openModal} variant="primary" style = {buttonPos}>Add widget</Button>
            )}
   <Modal showModal={showModal} setShowModal={setShowModal} isWidget = {false} currentDevice = {currentDevice} />
    </>

    )
}