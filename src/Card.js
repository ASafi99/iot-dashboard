import React, {useState} from 'react';
import {Card, Container, Row, Col} from "react-bootstrap";
import './Card.css'
import {ImSwitch} from "react-icons/im";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default function DashboardCards(props) {

    const {temp, widgetName, onText, offText, type, maxValue, value, unit, values} = props

    const [switchState, setSwitchState] = useState(false);
   

    function randomNumber(min, max) {  
      return Math.random() * (max - min) + min; 
  }  

    // if(type === "Sensor"){
    //   setIsSwitch(true)
    // }else if (type === "Switch") {
    //   setIsSwitch(false)
    // }
    
    const options = {
     
      chart: {
        animation: false,
        backgroundColor: 'transparent',
        type: 'areaspline',
        spacingBottom: 50,
        spacingTop: 0,
        spacingLeft: 0,
        spacingRight: 0,
      },

      tooltip: {
        enable: null
      },
      title: {
        text: null
      },

      yAxis: {
        min: 0,
        gridLineWidth: 0,
        title: {
          text: ''
        },
        labels: {
          enabled: false
        },
        stackLabels: {
          enabled: true,
        }
      },
      xAxis: {
       visible: false,
        
      },

      plotOptions: {
        animation: false,
        areaspline: {
          fillOpacity: 0,
          marker: {
            enabled: false
          }
        }
      },
      legend : {
        enabled:false,
      },
      credits: {
        enabled: false
      },
     
        series: [{
          animation: false,
          name: 'Temperature',
          data: values,
      
          stops: [
              [0, 'rgba(0,0,0,.3)'],
              [1, 'rgba(0,0,0,.05)']
            ]
          
        }]
      }
  
  
      
        
      

    return(
      <>
      {type==="Sensor" ? (
        <>
        <Card>
        <Card.Body >
        <Card.Title> {widgetName}</Card.Title>
        <Card.Subtitle style = {{ backgroundColor:"blue", color:"white", borderRadius: "6px"}}>{temp}</Card.Subtitle>
        <br/>
        <Card.Text> 
          
        <div  className = "sensorButton">{value}{unit}</div>
    
        <h3>Max Value: {maxValue} </h3>
                 
            
            </Card.Text> 
            
      </Card.Body>

    </Card> 

      </>
      ):(
        type==="Chart" ? (
          <>
          <Card>
          <Card.Body  >
          <Card.Title> {widgetName}</Card.Title>
          <Card.Subtitle style = {{ backgroundColor:"blue", color:"white", borderRadius: "6px"}}>{temp}</Card.Subtitle>
          <br/>
    
          <p style = {{position: "absolute",float:"left"}}>Temperature: {values.slice(-1)[0]}°C </p>
            <div style = {{ width: "100%",
          position: "relative",
          height: "150px",
          margin: "25px auto"}}>
          <HighchartsReact highcharts={Highcharts} options={options} />
            </div>     
              
          </Card.Body>
          </Card>
          
            </>
            ):(
   <Card>
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
  </Card> 
  
       )) }
       
      
     
            </>
  )

}