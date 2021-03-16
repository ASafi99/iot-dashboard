import React, { Component, useState, useEffect} from 'react';
import {fire} from './fire';
import Card from './Card';
import {CardDeck, Container, Row, Col} from "react-bootstrap";
import Alert from 'react-bootstrap/Alert'

  export default function Dashboard () {
    
    const [isData, setData] = useState(false);
    const [switchData, setSwitchData] = useState([]);
    const [devices, setDevices] = useState([])
    const [ref, setRef] = useState("")   
    const [time, setTime] = useState(Date.now());
    const [values,setValues] = useState([])
  


    function generateMockSeries() {
      const series = [];
      for (let i = 20; i >= 1; i = i - 2) {
          series.push([previousSeconds(i), Math.floor(Math.random() * 8 + 30)]);
      }
      return series;
    }
    
    function previousSeconds(s) {
      return new Date().getTime() - (s * 1000);
    }

    //const [values, setValues] = useState({})

    // setValues(generateMockSeries())

   
    //  const values = {
    
    //   for: 'Temperature',
    //   unit: '°C',
    //   series: generateMockSeries()
    // };
  

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

          if(values.length>1){
            
          }else{
          setValues(generateMockSeries())
          }
        },[values.length]);

        useEffect(() => {

         
  
          //const interval = setInterval(() => setValues, 1000);
          const interval = setInterval(() => { 

            values.shift()
         
          values.push([new Date().getTime(), Math.floor(Math.random() * 8 + 30)])
          setTime(Date.now())
        }, 2000);
          return () => {
            clearInterval(interval);
          };
        }, [values]);

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

          float: "left",
          marginLeft: "100px",
          marginTop: "150px",
          fontSize:"30px",
          fontWeight: "bold",
      
      
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

<Alert style = {{width:"30%", right:160,top:140 ,position:"absolute"}} variant={"primary"} >
    Test has exceeded threshold value of 20!
  </Alert>
          <h2 style = {title} >Dashboard </h2>
          {!isData ? (
            <h1 style = {h1}>
                     No data to display
            </h1>
            ): (
          <Container fluid style = {{position: "fixed",  margin:0, marginTop: 180 }}>
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
     