import React, { useRef, useEffect, useCallback, useState} from 'react';
import { Form, Col,  } from 'react-bootstrap';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { FaTemperatureHigh } from 'react-icons/fa';
import fire from "./fire";
import { Button } from '@material-ui/core/';
import {IoIosSwitch} from "react-icons/io";
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 700px;
  height: 250px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const WidgetModalWrapper = styled.div`
  width: 700px;
  height: 460px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;


const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }


  .save {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
    width:100px;
    float:left;
    position: relative;
    top: 20px;
    background-color:deepskyblue;
    border-radius: 10%;

  }

  .save:hover {
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  }
  form{
      position: absolute;
      top: 20px;
      left: 30px;
      float:left;
  }
  h3{
    float: left;
    font-weight: bold;
  }
  input, label {
    display:block;
    float: left;
  
}
select, label {
  display:block;
  float: left;

}

.test{
  float: left;
}
h5{
  float: left;
  font-weight: bold;
}
  
  
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const Modal = (props) => {
  const modalRef = useRef();

 const { showModal, setShowModal, isWidget,obj, currentDevice } = props

 const [switchForm, setForm] = useState(false);
 const [validated, setValidated] = useState(false);

  const [deviceName, setDevice] = useState("");
  const [locationName, setLocation] = useState("");
  const [widgetName, setWidget] = useState("");
  const [datasource, setDatasource] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [unit, setUnit] = useState("");

  const [onText, setONText] = useState("");
  const [offText, setOFFText] = useState("");
  const [value, setValue] = useState("");
  
   
  const handleDeviceSave= () => {

  if(!deviceName){

  }else{
    var docRef = fire.firestore().collection("users").doc(fire.auth().currentUser.uid)

    const object = {
      [deviceName] :{
        deviceInfo: {
        deviceName: deviceName,
        created: new Date(),
        
      },
      widgets:{

      }
    }

      
    }

    docRef.update(object, {merge:true})
    setShowModal(prev => !prev)

    setDevice("")
  }}

  const submit = (event) => {

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  }
  const handleSensorWidgetSave = () => {

    if(!widgetName || !datasource || !locationName || !unit || !maxValue ){

    }else{

    var docRef = fire.firestore().collection("users").doc(fire.auth().currentUser.uid)
    var rand = Math.floor(Math.random() * 101);  

    const object = {
      
        [currentDevice]:{
          widgets:{
          [widgetName]:{
          widgetName: widgetName,
          datasource: datasource,
          location: locationName,
          unit: unit,
          maxValue: maxValue,
          type: "Sensor",
          value: rand,
        }}}
      }
    

    docRef.set(object, {merge:true})
    setShowModal(prev => !prev)

    setWidget("")
    setDatasource("")
    setLocation("")
    setUnit("")
    setMaxValue("")
    setValidated(false);
    }
  }

  const handleSwitchWidgetSave = () => {

    var docRef = fire.firestore().collection("users").doc(fire.auth().currentUser.uid)

    if(!widgetName || !datasource || !locationName || !onText || !offText || !value ){

    }else{

    const object = {
      
        [currentDevice]:{
          widgets:{
          [widgetName]:{
          widgetName: widgetName,
          datasource: datasource,
          location: locationName,
          value: value,
          onText: onText,
          offText: offText,
          type: "Switch",
          
        }}}
      }
      

    docRef.set(object, {merge:true})
    setShowModal(prev => !prev)

    setWidget("")
    setDatasource("")
    setLocation("")
    setValue("")
    setONText("")
    setOFFText("")

    setValidated(false);
    }
  }
  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showModal]
  );

  useEffect(
    () => {

      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            top: 20,
            position:'relative',
            right: 20

        }}
    />
);

const classes = useStyles();
  
  return (
    <>
    {isWidget ? (
    
      showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <ModalContent>
              <form > 
                  <h3>Device Form</h3>
                
                  <div style = {{float: "left"}}>
                  <label for = "deivceName"> Device Name </label>
                    <input
                    required
                    style = {{width: "600px", position : "relative"}}
                    //placeholder="Device name"
                    onChange={e => setDevice(e.target.value)}
                    type= "text" 
                    placeholder = "Enter device name"
                    name = "deviceName"
                    id = "deviceName"
                   />
                  <input className = "save" type = "submit" value ="Save" onClick = {handleDeviceSave} ></input>
                  </div>
                </form>
            
              </ModalContent>
              <CloseModalButton
                aria-label='Close modal'
                onClick={() => setShowModal(prev => !prev)}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null
    
    ) :(

      
      showModal ? (
        
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <WidgetModalWrapper showModal={showModal}>
              <ModalContent>        
              <Form  noValidate validated={validated} onSubmit={submit} >
                
              <h5>Widget Form</h5>
              {/* <span style = {{right:160, top: 20,position: "absolute", fontSize:10}}>Choose Widget Type:</span> */}
              <label style = {{position :"absolute", top:20}}>Choose widget type</label>
              <Button variant = "contained"  color= "primary"  className={classes.button} startIcon = {<FaTemperatureHigh/>} onClick = {()=> setForm(true)} style = {{width:100, position:"relative", top:40, right: 110}}>Sensor</Button>
              <Button variant = "contained"  color= "primary"  className={classes.button} startIcon = {<IoIosSwitch/>} onClick = {()=> setForm(false)} style = {{width:100, position:"relative", top:40, right: 110}}>Switch</Button>
            
                         
              <ColoredLine color="lightGrey" />
             
          {switchForm ? (
           <>
             <h5 style = {{top:15, position: "relative"}}>Sensor Widget</h5>
              <br/>
              <br/>
              
            <Form.Group >
              <Form.Label style={{fontSize:15}}>Widget Name</Form.Label>
              <Form.Control style = {{maxWidth:600}} required size ='sm' placeholder="Enter widget name" onChange={e => setWidget(e.target.value)} />
            </Form.Group>

         

          <Form.Group >
            <Form.Label style={{fontSize:15}} >Data Source</Form.Label>
            <Form.Control required size ='sm' style = {{maxWidth:600}} placeholder="Enter data source" onChange={e => setDatasource(e.target.value)}/>
          </Form.Group>
         
          <Form.Row style = {{float: "left", width:650}}>
    
            <Form.Group as={Col} >
              <Form.Label style={{fontSize:15}}>Max Value</Form.Label>
              <Form.Control required size ='sm' type = "number" onChange={e => setMaxValue(e.target.value)} />
            </Form.Group>

            <Form.Group as={Col} >
              <Form.Label style={{fontSize:15}}>Unit</Form.Label>
              <Form.Control required size ='sm' as = "select" defaultValue = "Choose..." onChange={e => setUnit(e.target.value)}>
              <option value = "">Choose...</option>
                <option>%</option>
                <option>°C</option>
                <option>°F</option>
                </Form.Control>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label style={{fontSize:15}}>Location</Form.Label>
              <Form.Control required  size ='sm' as="select" defaultValue="Choose..."onChange={e => setLocation(e.target.value)} >
                <option value = "">Choose...</option>
                <option>Bedroom</option>
                <option>Kitchen</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <input  onClick= {handleSensorWidgetSave} className = "save" type = "submit" style = {{position: "static"}} value = "Save"></input>
          
          </>

           ):(
             <>
              <h5 style = {{top:15, position: "relative"}}>Switch Widget</h5>
              <br/>
              <br/>
            <Form.Group style={{maxWidth:600}} >
              <Form.Label style={{fontSize:15}}>Widget Name</Form.Label>
              <Form.Control   required size ='sm' placeholder="Enter widget name" onChange={e => setWidget(e.target.value)} />
            </Form.Group>
    
            <Form.Row style={{float: "left"}}>
          <Form.Group>
            <Form.Label style={{fontSize:15}} >Data Source</Form.Label>
            <Form.Control required size ='sm' placeholder="Enter data source" onChange={e => setDatasource(e.target.value)}/>
          </Form.Group>

          <Form.Group as={Col} >
              <Form.Label style={{fontSize:15}}>Initial Value</Form.Label>
              <Form.Control required size ='sm' as = "select" defaultVlaue = "Choose..."  onChange={e => setValue(e.target.value)} >
              <option value = "">Choose...</option>
                <option>0</option>
                <option>1</option>
                </Form.Control>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label style={{fontSize:15}}>Location</Form.Label>
              <Form.Control required size ='sm' as="select" defaultValue="Choose..."onChange={e => setLocation(e.target.value)} >
                <option value = "">Choose...</option>
                <option>Bedroom</option>
                <option>Kitchen</option>
              </Form.Control>
            </Form.Group>

          </Form.Row>

          <Form.Row style = {{position: "relative", bottom: 10, float: "left", width:600}}>
            <Form.Group as={Col} >
              <Form.Label style={{fontSize:15}}>ON Text</Form.Label>
              <Form.Control required size ='sm' placeholder = "Enter Text to display when switch is ON" onChange={e => setONText(e.target.value)}/>
            </Form.Group>

          
            <Form.Group as={Col} >
              <Form.Label style={{fontSize:15}}>OFF text</Form.Label>
              <Form.Control required size ='sm'  placeholder = "Enter Text to display when switch is OFF"  onChange={e => setOFFText(e.target.value)} />
            </Form.Group>
        
  
            </Form.Row>

            <input  onClick= {handleSwitchWidgetSave} className = "save" type = "submit" style = {{position: "static",}} value = "Save"></input>
          </>
            )}
           
            </Form>           

      </ModalContent>
   <CloseModalButton
                aria-label='Close modal'
                onClick={() => setShowModal(prev => !prev)}
              />
            </WidgetModalWrapper>
          </animated.div>
        </Background>
      ) : null
    
    )}
    </>
  );
  }