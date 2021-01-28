import React, { Component, useState, useEffect} from 'react';
import {fire} from './fire';
import Card from './Card';
import {CardDeck, Container, Row, Col} from "react-bootstrap";

  export default function Dashboard () {
    
    const [isData, setData] = useState(false);
    const [switchData, setSwitchData] = useState([]);
    const [devices, setDevices] = useState([])
    

    useEffect(() => {   

        var docRef = fire.firestore().collection("users").doc(fire.auth().currentUser.uid)
          
        /* Create reference to messages in Firebase Database */
       // let temps = []
        let temps1 =[]
        docRef.onSnapshot((doc) => {

          setDevices(Object.keys(doc.data())); 

          devices.map(da => {
            if(Object.keys(doc.data()[da].widgets).length>0){
            temps1.push(doc.data()[da].widgets)
            }
            
            })

            if(temps1.length>0){

              setSwitchData(temps1)
              setData(true)
        
              }else{
        
              setData(false)
        
              }
        })


   

    }, [devices])
  

        const h1 = {
            left: "0",
            lineHeight: "200px",
            marginTop: "-100px",
            position: "absolute",
            textAlign: "center",
            top: "50%",
            width: "100%",
            opacity: "50%",
        }

        const title = {

          right: "500px",
          marginTop: "-150px",
          position: "absolute",
          textAlign: "center",
          top: "50%",
          width: "100%",
          fontSize:"30px",
          zIndex: -1
      
      
      }
       
             let switchCards = switchData.map(data =>

              Object.values(data).map(obj => {
      return (
        <Col sm="4" style = {{margin:0, marginTop: 30}} >
          <Card key = {obj.id} temp = {obj.deviceName}  widgetName = {obj.widgetName} onText = {obj.onText} offText = {obj.offText} type = {obj.type} maxValue = {obj.maxValue} value = {obj.value} unit = {obj.unit} /> 
        </Col>
      )
              }
        ))

       
        return(
          <>
          <h2 style = {title} >Dashboard </h2>
          {!isData ? (
            <h1 style = {h1}>
                     No data to display
            </h1>
            ): (
          <Container fluid style = {{margin:0, marginTop: 150 }}>
          <Row style = {{}} >
          <CardDeck style={{ minWidth: "100%", maxWidth:"100%",float: "left"}}>
            {switchCards}
          </CardDeck>
          </Row>
          </Container>
    
            )}
            </> 
        )

      
      }
     