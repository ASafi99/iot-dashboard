import React, { Component, useState, useEffect} from 'react';
import { Modal } from './Modal';
import { Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {fire, otherApp} from './fire';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import firebase from 'firebase/app'

export default function DeviceUsers (props) {

    const [showModal, setShowModal] = useState(false);
    const [accountType, setAccountType] = useState ("")
    const [tempa, setTemp] = useState([]);
    const [isData, setData] = useState(false);

    const { currentDevice } = props

    const tablePos = {
        position: "absolute",
        top: 250,
        width:900,
        left:180,
        zIndex: -2
     }

   
     const title = {

      float: "left",
      marginLeft: "100px",
      marginTop: "150px",
      fontSize:"30px",
      fontWeight: "bold",
  
  
  }
  
    const buttonPos = {

        position: "absolute",
        top:140,
        right: 180,
        width: "10%",
        height: "8%",       
         
    }

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
    const openModal = () => {
        setShowModal(prev => !prev);
  
      }

      useEffect(() => {   

        fire.firestore().collection("users").doc(fire.auth().currentUser.uid).get().then(function(doc) {
          
          let accountType = doc.data().userInfo.accountType;
          
          setAccountType(accountType)
          if(accountType=== "IoT Owner" || accountType === "IoT User"){
       
         } else{
  
          let docRef = fire.firestore().collection("users").doc(fire.auth().currentUser.uid)
         // let temps = []
          docRef.onSnapshot((doc) => {
             
               if(Object.keys(doc.data().users).length>0){
  
               setTemp([doc.data().devices[currentDevice].users])      
               setData(true)
  
                }else{
                setData(false)
               }
     })
  
         }
        })
            
          /* Create reference to messages in Firebase Database */
  
      
      }, [])

      const removeField = (userName) => {

        var docRef = fire.firestore().collection('users').doc(fire.auth().currentUser.uid);
  
        docRef.update({
  
            [`devices.${currentDevice}.users`]: firebase.firestore.FieldValue.arrayRemove(userName)
      });
  
    }

    return(
        <>
        <h5 style = {title}>
        Device: <p style = {{display: "inline", backgroundColor:"blue", color:"white", borderRadius: "6px"}}>{props.currentDevice}</p>
        </h5>

    <Button onClick={openModal} variant="primary" style = {buttonPos} >Add User</Button>
    <Modal showModal={showModal} setShowModal={setShowModal} isManageUser = {true} currentDevice = {props.currentDevice} />
    {!isData ? (
   <h1 style = {h1}>
            No data to display
   </h1>
   ): (
    <div style = {tablePos} >
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Email</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
        {tempa && tempa.map(temps =>

        Object.values(temps).map((obj,i) =>(
      
          <TableRow key={i}>
              <TableCell component="th" scope="row">
                {i}
              </TableCell>
              <TableCell align="right">{obj}</TableCell>
              <TableCell align="right">
                <button style = {{backgroundColor: "red", color: "white" , borderRadius: "10px", width: 80}} onClick = {() => {if(window.confirm('Are you sure you want to Delete this user from the device?'))removeField(obj)}} >Delete</button>
                </TableCell>
            </TableRow>
          )))}
        </TableBody>
      </Table>
      </TableContainer>
      </div>
   )}
</>
    )
}