import React, {useState} from 'react';
import {Card, Container, Row, Col} from "react-bootstrap";
import './Card.css'
import {ImSwitch} from "react-icons/im";

export default function DashboardCards(props) {

    const {temp, widgetName, onText, offText, type, maxValue, value, unit} = props

    const [switchState, setSwitchState] = useState(false);
    const [isSwitch, setIsSwitch] = useState(false);

    // if(type === "Sensor"){
    //   setIsSwitch(true)
    // }else if (type === "Switch") {
    //   setIsSwitch(false)
    // }
    

    return(
      <Card>
      {type==="Sensor" ? (
        <Card.Body >
        <Card.Title> {widgetName}</Card.Title>
        <Card.Subtitle style = {{ backgroundColor:"blue", color:"white", borderRadius: "6px"}}>{temp}</Card.Subtitle>
        <br/>
        <Card.Text> 
          
        <div  className = "sensorButton">{value}{unit}</div>
    
        <h3>Max Value: {maxValue} </h3>
                 
            
            </Card.Text> 
            
      </Card.Body>
      ):(
          
  <Card.Body >
    <Card.Title> {widgetName}</Card.Title>
    <Card.Subtitle style = {{ backgroundColor:"blue", color:"white", borderRadius: "6px"}}>{temp}</Card.Subtitle>
    <br/>
    <Card.Text > 
    {switchState ?(
       <>
        <button  onClick = {() => setSwitchState (!switchState)} className = "switchOnButton" ><i><ImSwitch size={70}/></i></button>

        <h3>State: {onText} </h3>
        </>

          ):(
              <>
    <button  onClick = {() => setSwitchState (!switchState)} className = "switchOffButton" ><i><ImSwitch size={70}/></i></button>

    <h3>State: {offText} </h3>
             </>
        )} 
        </Card.Text> 
        
  </Card.Body>
  
  
       ) }
       </Card>  

  )

}