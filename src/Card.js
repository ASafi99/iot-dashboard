import { Card } from "react-bootstrap";
import React, {useState} from 'react';
import './Card.css'
import {ImSwitch} from "react-icons/im";

export default function DashboardCards(props) {

    const {temp} = props

    const [switchState, setSwitchState] = useState(false);

    return(
        <Card style={{ width: '20rem', position: "absolute", left:40, top:130 }}>
  <Card.Body>
    <Card.Title> {temp.map(temps => <div>{temps.widgets.Door.widgetName}</div>)}</Card.Title>
    <Card.Subtitle style = {{ backgroundColor:"blue", color:"white", borderRadius: "6px"}}>{temp.map(temps => <div>{temps.deviceInfo.deviceName}</div>)}</Card.Subtitle>
    <br/>
    <Card.Text> 
    {switchState ?(
       <>
        <button onClick = {() => setSwitchState (!switchState)} className = "switchOnButton" ><i><ImSwitch size={70}/></i></button>

        <h3>State: {temp.map(temps => <div>{temps.widgets.Door.onText}</div>)} </h3>
        </>

          ):(
              <>
    <button onClick = {() => setSwitchState (!switchState)} className = "switchOffButton" ><i><ImSwitch size={70}/></i></button>

    <h3>State: {temp.map(temps => <div>{temps.widgets.Door.offText}</div>)} </h3>
             </>
        )}
        </Card.Text> 
     
  </Card.Body>
</Card>
    )

}