import React, { useRef, useEffect, useCallback, useState} from 'react';
import { Form, Col,  } from 'react-bootstrap';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { FaTemperatureHigh } from 'react-icons/fa';
import {fire, otherApp} from "./fire";
import { Button } from '@material-ui/core/';
import {IoIosSwitch} from "react-icons/io";
import { makeStyles } from '@material-ui/core/styles';
import "./User.css";
import firebase from 'firebase/app'


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
  z-index: 0;
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
  height: 520px;
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [accountType, setAccountType] = useState("");

 const { showModal, setShowModal, isWidget,obj, currentDevice, isUser, isManageUser } = props

 const [switchForm, setForm] = useState(false);
 const [chartForm, setChartForm] = useState(false);
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

  const [users, setUsers] = useState([])

  const [userToBeAdded, setUserToBeAdded] = useState("")
  const [userError, setUserError] = useState("")


  

  useEffect(() => { 

    fire.firestore().collection("users").doc(fire.auth().currentUser.uid).get().then(function (doc) {

      let accountType = doc.data().userInfo.accountType;

      setAccountType(accountType);
      if (accountType === "IoT Owner" || accountType === "IoT User") {
      }else{

    let docRef = fire.firestore().collection("users").doc(fire.auth().currentUser.uid)
   
    docRef.onSnapshot((doc) => {
                
         if(Object.keys(doc.data().users).length>0){

         setUsers([doc.data().users])      

         }
      })}
    })
  },[])

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  function handleUserAdd() {

    let temps = []
    users && users.map(users =>

      Object.values(users).map((obj,i) =>
        temps.push(obj.email)
      ))

    if (!userToBeAdded) {
    }
    else if((temps.includes(userToBeAdded)))
    {

      let docRef;

      fire.firestore().collection("users").doc(fire.auth().currentUser.uid).get().then(function (doc) {

        let accountType = doc.data().userInfo.accountType;

        setAccountType(accountType);
        if (accountType === "IoT Owner") {

          let ref = doc.data().userInfo.ref;
          docRef = fire.firestore().collection("users").doc(ref);

        } else {
          docRef = fire.firestore().collection("users").doc(fire.auth().currentUser.uid);

        }      

        docRef.update({

          [`devices.${currentDevice}.users`]: firebase.firestore.FieldValue.arrayUnion(userToBeAdded)
      });
    
       
      });
      setShowModal(prev => !prev);

      alert("You have successfully added user "+ userToBeAdded + " to device " + currentDevice)
      setUserToBeAdded("")
      setUserError("")
    }else{
      setUserError("This user doesn't exist")
    }
    
  }


  const signUpWithEmailAndPassword = () => {
    clearErrors();
     otherApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
       .then(cred => {   
        
          fire.firestore().collection('users').doc(cred.user.uid).set({ 
            
            userInfo:{
              email: email,
              uid: cred.user.uid,
              ref: fire.auth().currentUser.uid,
              accountType: accountType,
            }

          })

          var docRef = fire.firestore().collection("users").doc(fire.auth().currentUser.uid)

          const object = {

            users:{

              [cred.user.uid]:{
                email: email,
                accountType: accountType
              
              }
            }

          }
        
         docRef.set(object, {merge:true})

        setShowModal(prev => !prev)
        alert("You have successfully added user: "+ email)
        clearInputs()

        }).catch((err) => {
          switch (err.code) {
            case "auth/email-already-in-use":
            case "auth/invalid-email":
              setEmailError(err.message);
              break;
            case "auth/weak-password":
              setPasswordError(err.message);
              break;
            default:
              
          }
         
        });
    };
       

  function handleDeviceSave() {

    if (!deviceName) {
    } else {

      let docRef;

      fire.firestore().collection("users").doc(fire.auth().currentUser.uid).get().then(function (doc) {

        let accountType = doc.data().userInfo.accountType;

        setAccountType(accountType);
        if (accountType === "IoT Owner") {

          let ref = doc.data().userInfo.ref;
          docRef = fire.firestore().collection("users").doc(ref);

        } else {
          docRef = fire.firestore().collection("users").doc(fire.auth().currentUser.uid);

        }
        const object = {
          devices: {
            [deviceName]: {
              deviceInfo: {
                deviceName: deviceName,
                created: new Date(),
              },
              widgets: {},

              users: [fire.auth().currentUser.email]
                
              
            }
           
          }
        };

        docRef.set(object, { merge: true });
      });
      setShowModal(prev => !prev);

      alert("You have successfully added device: "+ deviceName)
      setDevice("");
    }
  }

  const submit = (event) => {

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  }

const handleChartWidgetSave = () => {

    if(!widgetName || !datasource || !locationName ){

    }else{

      let docRef

      fire.firestore().collection("users").doc(fire.auth().currentUser.uid).get().then(function(doc) {
          
        let accountType = doc.data().userInfo.accountType;
      
        setAccountType(accountType)
        if(accountType=== "IoT Owner"){
  
          let ref = doc.data().userInfo.ref;
           docRef = fire.firestore().collection("users").doc(ref)
           
        } else{
          docRef = fire.firestore().collection("users").doc(fire.auth().currentUser.uid)
  
        }

  const object = {
      
    devices:{
      [currentDevice]:{
        widgets:{
        [widgetName]:{
        widgetName: widgetName,
        datasource: datasource,
        location: locationName,
        type: "Chart",
        deviceName: currentDevice,
      }}}
    }
  }

        docRef.set(object, {merge:true})
      })
      setShowModal(prev => !prev)
      alert("You have successfully added chart widget: "+ widgetName)
      setWidget("")
      setDatasource("")
      setLocation("")
      setValidated(false);
          }}
  
  const handleSensorWidgetSave = () => {

    if(!widgetName || !datasource || !locationName || !unit || !maxValue ){

    }else{

      let docRef

      fire.firestore().collection("users").doc(fire.auth().currentUser.uid).get().then(function(doc) {
          
        let accountType = doc.data().userInfo.accountType;
      
        setAccountType(accountType)
        if(accountType=== "IoT Owner"){
  
          let ref = doc.data().userInfo.ref;
           docRef = fire.firestore().collection("users").doc(ref)
           
        } else{
          docRef = fire.firestore().collection("users").doc(fire.auth().currentUser.uid)
  
        }

       var rand = Math.floor(Math.random() * 101);  

      
     

     const object = {
      
      devices:{
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
          deviceName: currentDevice,
        }}}
      }
    }
    
     
    docRef.set(object, {merge:true})
      })
    setShowModal(prev => !prev)
    alert("You have successfully added sensor widget: "+ widgetName)
    setWidget("")
    setDatasource("")
    setLocation("")
    setUnit("")
    setMaxValue("")
    setValidated(false);
    }
  }

  const handleSwitchWidgetSave = () => {



    if(!widgetName || !datasource || !locationName || !onText || !offText || !value ){

    }else{

      let docRef

      fire.firestore().collection("users").doc(fire.auth().currentUser.uid).get().then(function(doc) {
          
        let accountType = doc.data().userInfo.accountType;
      
        setAccountType(accountType)
        if(accountType=== "IoT Owner"){
  
          let ref = doc.data().userInfo.ref;
           docRef = fire.firestore().collection("users").doc(ref)
           
        } else{
          docRef = fire.firestore().collection("users").doc(fire.auth().currentUser.uid)
  
        }

    const object = {
      
      devices:{
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
          deviceName: currentDevice,
          
        }}}
      }}
      

    docRef.set(object, {merge:true})
  })
    setShowModal(prev => !prev)
    alert("You have successfully added switch widget: "+ widgetName)

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
      duration: 250,
      zIndex:100,
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
            top: 50,
            position:'relative',
            right: 20

        }}
    />
);

const classes = useStyles();
  
  return (
    <>
    {
    
    isManageUser ? (

      showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
        <animated.div style={animation}>
          <WidgetModalWrapper style = {{height: 300}} showModal={showModal}>
            <ModalContent>        
            <Form  >
              
            <h2>Users</h2>

            <Form.Group >
              <Form.Label style={{fontSize:15}}>Search User</Form.Label>
              <Form.Control style = {{minWidth:400}} required  placeholder="Search a user..." value = {userToBeAdded} onChange={e => setUserToBeAdded(e.target.value)} />
              <p style = {{color: "red", position:"absolute", top:125}} >{userError}</p>
            </Form.Group>
 
              {/* {users && users.map(users =>

      Object.values(users).map((obj,i) =>(
                <option>{obj.email}</option>
                
      )))} */}

          <input style = {{width:150, height:50, position: "absolute", top: 170}} className = "save" type = "button" value ="Add User" onClick = {handleUserAdd} ></input>

           </Form>           

</ModalContent>
<CloseModalButton
          aria-label='Close modal'
          onClick={() => setShowModal(prev => !prev)}
        />
      </WidgetModalWrapper>
    </animated.div>
  </Background>
      ):null

    ):(
    
    isUser ? (
      showModal ? (
       <Background onClick={closeModal} ref={modalRef}>
       <animated.div style={animation}>
         <WidgetModalWrapper showModal={showModal}>
           <ModalContent>        
           <Form >
             
           <h2>Add User</h2>

           <Form.Group >
              <Form.Label style={{fontSize:15}}>User Name</Form.Label>
              <Form.Control style = {{minWidth:400}} required  placeholder="Enter user name" value = {email} onChange={e => setEmail(e.target.value)} />
              <p style = {{color: "red", position:"absolute", top:125}} >{emailError}</p>
            </Form.Group>

          <Form.Group style = {{position:"relative",  padding:0, margin: 0, top:30 }}>
            <Form.Label style={{fontSize:15}} >Password</Form.Label>
            <Form.Control required placeholder="Enter password" value = {password} onChange={e => setPassword(e.target.value)}/>
            <p style = {{color: "red", position:"absolute", top: 135}}>{passwordError}</p>
          </Form.Group>

          <Form.Group style = {{position:"relative",  padding:0, margin: 0, top: 50 }} >
              <Form.Label style={{fontSize:15}}>Account type</Form.Label>
              <Form.Control required  as = "select" defaultValue = "Choose..." onChange={e => setAccountType(e.target.value)}>
              <option value = "">Choose...</option>
                <option>IoT User</option>
                <option>IoT Owner</option>
                </Form.Control>
            </Form.Group>

          <input style = {{width:200, height:70, position: "absolute", top: 350}} className = "save" type = "button" value ="Add User" onClick = {signUpWithEmailAndPassword} ></input>

           </Form>           

</ModalContent>
<CloseModalButton
          aria-label='Close modal'
          onClick={() => setShowModal(prev => !prev)}
        />
      </WidgetModalWrapper>
    </animated.div>
  </Background>
      ):null
    ):( 
    isWidget ? (
    
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
              <label style = {{position :"absolute", fontWeight: "bold", top:30}}>Choose widget type</label>
              <Button variant = "contained"  color= "primary"  className={classes.button} startIcon = {<FaTemperatureHigh/>} onClick = {()=> setForm(true)} style = {{width:100, position:"relative", top:60, right: 240}}>Sensor</Button>
              <Button variant = "contained"  color= "primary"  className={classes.button} startIcon = {<IoIosSwitch/>} onClick = {()=> {setForm(false) 
                setChartForm(false)}} style = {{width:100, position:"relative", top:60, right: 240}}>Switch</Button>
              <Button variant = "contained"  color= "primary"  className={classes.button} startIcon = {<FaTemperatureHigh/>} onClick = {()=> setChartForm(true)} style = {{width:100, position:"relative", top:60, right: 240}}>Chart</Button>
              
            
                         
              <ColoredLine color="lightGrey" />
             
          {switchForm ? (

           <div style ={{top:40, position: "relative"}}>

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
          
          </div>

           ):(

            chartForm ?(
              <div style ={{top:40, position: "relative"}}>

              <h5 style = {{top:15, position: "relative"}}>Sensor Chart Widget</h5>
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

        <Form.Group as={Col}>
              <Form.Label style={{fontSize:15}}>Location</Form.Label>
              <Form.Control required  size ='sm' as="select" defaultValue="Choose..."onChange={e => setLocation(e.target.value)} >
                <option value = "">Choose...</option>
                <option>Bedroom</option>
                <option>Kitchen</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <input  onClick= {handleChartWidgetSave} className = "save" type = "submit" style = {{position: "static"}} value = "Save"></input>
          


          </div>
            ):(

              <div style ={{top:40, position: "relative"}}>

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
          </div>
           ))}
           
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
    
    )))}
    </>
  );
  }