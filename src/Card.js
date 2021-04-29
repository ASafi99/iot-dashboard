import React, {useState} from 'react';
import {Card, Container, Row, Col} from "react-bootstrap";
import './Card.css'
import {ImSwitch} from "react-icons/im";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default function DashboardCards(props) {

    const {temp, widgetName, onText, offText, type, maxValue, value, unit, values} = props

    const [switchState, setSwitchState] = useState(false);
   
  

    const options={

    chart: {
    
      height:"50%",
      backgroundColor: 'rgba(255, 255, 255, 0.0)',
    },
    credits: {
        enabled: false
    },
    title: {
        text: null
    },
    yAxis: {
        title: {
            text: null,
        },
        visible: false
    },
    xAxis: {
      visible: false,
      type: 'datetime',
      dateTimeLabelFormats: {
        minute: '%H:%M',
      },
      
    },
    legend: {
        layout: 'horizontal',
        align: 'left',
        verticalAlign: 'top',
    },
    tooltip: {
      useHTML: true
    },
    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            
        }
    },
    series: [{
        name: '°C',
        data: values,
        type: 'spline',
        color: 'blue',
        showInLegend: false,
        marker: {
          enabled: false,
        }
    }],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500,
                maxHeight:50
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
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
    
          <p style = {{position: "absolute",float:"left"}}>Temperature: {values.slice(-1)[0][1]}°C </p>
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