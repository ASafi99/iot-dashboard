import React, { Component, useState, useEffect} from 'react';
import { Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from './Modal';
import { makeStyles } from '@material-ui/core/styles';
import {fire} from './fire';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function Users () {

    const useStyles = makeStyles({
        table: {
          minWidth: 800,
          
        },
      });

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

    const [showModal, setShowModal] = useState(false);
    const [isData, setData] = useState(false);
    const [tempa, setTemp] = useState([]);
    const [accountType, setAccountType] = useState ("")


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
        let temps = []
        docRef.onSnapshot((doc) => {
           
           
             temps.push(doc.data().users)
             if(Object.keys(doc.data().users).length>0){

             setTemp([doc.data().users])      
             setData(true)

              }else{
              setData(false)
             }
   })

       }
      })
          
        /* Create reference to messages in Firebase Database */

    
    }, [])
  

    const tablePos = {
        position: "absolute",
        top: 250,
        width:900,
        left:180,
        zIndex: -2
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

     const classes = useStyles();
    return(
        <>
        <h2 style = {title} >Users </h2>

        {accountType === "IoT User" || accountType === "IoT Owner" ? (
           <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-disabled">Only IoT Admins are able to add users!</Tooltip>}>
           <span className="d-inline-block" style = {{position: "absolute", right: "100px",
    marginTop: "140px"}}>
           <Button disabled variant="primary" style = {{pointerEvents: 'none'}}>
               Add users
             </Button>
           </span>
         </OverlayTrigger>
            ) :(
        <Button onClick={openModal} variant="primary" style = {pos}>Add users</Button>
            )}
        <Modal showModal={showModal} setShowModal={setShowModal} isUser= {true} /> 

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
            <TableCell>ID</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Account Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {tempa && tempa.map(temps =>

        Object.values(temps).map((obj,i) =>(
      
          <TableRow key={i}>
              <TableCell component="th" scope="row">
                {i}
              </TableCell>
              <TableCell align="right">{obj.email}</TableCell>
              <TableCell align="right">{obj.accountType}</TableCell>
              <TableCell align="right">
                <button style = {{backgroundColor: "red", color: "white" , borderRadius: "10px", width: 80}} >Delete</button>
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