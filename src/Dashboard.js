import React, { Component, useState, useEffect} from 'react';
import {fire} from './fire';
import Card from './Card';
import {CardDeck, Container, Row, Col} from "react-bootstrap";

  export default function Dashboard () {
    
    const [isData, setData] = useState(false);
    const [switchData, setSwitchData] = useState([]);
    const [devices, setDevices] = useState([])
    const [ref, setRef] = useState("")
    const [values, setValues] = useState([11, 15, 10, 16, 10, 15])
    const [time, setTime] = useState(Date.now());
    

    useEffect(() => {   
      
      fire.firestore().collection("users").doc(fire.auth().currentUser.uid).get().then(function(doc) {
        
            let accountType = doc.data().userInfo.accountType;
            

            if(accountType=== "IoT Owner" || accountType === "IoT User"){

              setRef(doc.data().userInfo.ref)
  
            } else{
  
              
            }

           
           
      },)
      
      
      
          
        /* Create reference to messages in Firebase Database */
      

    },[])

     useEffect(() => {

      let docRef

      if(ref) {
         docRef = fire.firestore().collection("users").doc(ref)
      }else{
         docRef = fire.firestore().collection("users").doc(fire.auth().currentUser.uid)
      }
    
      docRef.onSnapshot((doc) => {
          
        
        setDevices([doc.data().devices]); 

       
      })

     
    },[ref])

    useEffect(() => {

      let docRef
      console.log(ref)

      if(ref.length > 1) {
         docRef = fire.firestore().collection("users").doc(ref)
      }else{
         docRef = fire.firestore().collection("users").doc(fire.auth().currentUser.uid)
      }
    
      console.log(docRef)
      docRef.onSnapshot((doc) => {

        let temps1 =[]

        devices.map((data, i) => 
          Object.values(data).map((d) =>{

           let test = d.deviceInfo.deviceName

           if(d.users.includes(fire.auth().currentUser.email)){
              if(Object.keys(doc.data().devices[test].widgets).length>0){
              temps1.push(doc.data().devices[test].widgets)
              console.log(temps1)
              
            }
          }
        }))
  
              if(temps1.length>0){
                
                setSwitchData(temps1)
                setData(true)
          
                }else{
          
                setData(false)
          
                }
          })
        },[ref, devices])

        useEffect(() => {
  

          //const interval = setInterval(() => setValues, 1000);
          const interval = setInterval(() => { let arr = values
          arr.shift()
          arr.push(randomNumber(10,20))
          setValues(arr) 
          setTime(Date.now())}, 5000);
          return () => {
            clearInterval(interval);
          };
        }, []);

        function randomNumber(min, max) {  
          return Math.floor(Math.random() * (max - min) + min); 
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
          <Card key = {obj.id} values = {values} temp = {obj.deviceName}  widgetName = {obj.widgetName} onText = {obj.onText} offText = {obj.offText} type = {obj.type} maxValue = {obj.maxValue} value = {obj.value} unit = {obj.unit} /> 
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
     