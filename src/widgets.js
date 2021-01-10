import userEvent from '@testing-library/user-event';
import React, { Component, useState, useEffect} from 'react';
import fire from './fire';
import { Button } from 'react-bootstrap';
import { Modal } from './Modal';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
        
    }

    const title = {

        right: "500px",
        marginTop: "-150px",
        position: "absolute",
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

    // const getData = () => {

    //     var docRef = fire.firestore().collection("users").doc(fire.auth().currentUser.uid)

    //     let temp = []
    //     docRef.get((doc) => {
         
    //         temp.push(doc.data().device)
    //         setTemp(temp); 
    //    })
      
  
    
    useEffect(() => {   

        var docRef = fire.firestore().collection("users").doc(fire.auth().currentUser.uid)
          
        /* Create reference to messages in Firebase Database */
        let temps = []
        const unsubscribe =  docRef.onSnapshot((doc) => {
            
              temps.push(doc.data()[currentDevice].widgets)
         
              setTemp(temps)           
         
    })
    

    return () => unsubscribe()

    
    }, )

    

    
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
        <div>
    <h5 style = {title}>
   Device : {currentDevice}
   
   
   </h5>
   {isData ? (
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
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {tempa.map(temps =>

        Object.values(temps).map(obj =>(
      
          <TableRow key={obj.widgetName}>
              <TableCell component="th" scope="row">
                {obj.type}
              </TableCell>
              <TableCell align="right">{obj.widgetName}</TableCell>
              <TableCell align="right">{obj.value}</TableCell>
              <TableCell align="right">{obj.unit}</TableCell>
              <TableCell align="right">{obj.location}</TableCell>
            </TableRow>
          )))}
        </TableBody>
      </Table>
      </TableContainer>
      </div>
   
   )}

   <Button onClick={openModal} variant="primary" style = {buttonPos}>Add widget</Button>
    <Modal showModal={showModal} setShowModal={setShowModal} isWidget = {false} currentDevice = {currentDevice} />
    </div>

    )
}

