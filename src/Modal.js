import React, { useRef, useEffect, useCallback, useState} from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import fire from "./fire";

import userEvent from '@testing-library/user-event';

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
  height: 440px;
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
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
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


h5{
  float: left;
  font-weight: bold;
}
  button {
    width:100px;
    float:left;
    position: relative;
    top: 20px;
    background-color:deepskyblue;
    border-radius: 10%;
  }
  button:hover {
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
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

export const Modal = ({ showModal, setShowModal, isWidget }) => {
  const modalRef = useRef();

  const [deviceName, setDevice] = useState("");
  const [locationName, setLocation] = useState("");
  
  // const handleChange= (e) => {
        
  //   const{deviceName} = e.target

  //     setDevice(deviceName)
  // }

 
  const handleDeviceSave= () => {

   
    var rand = Math.floor(Math.random() * 101);  

    var docRef = fire.firestore().collection("users").doc(fire.auth().currentUser.uid)

    const object = {
      [deviceName] :{
        deviceName: [deviceName],
        value: rand,
        created: new Date()
      }
    }
    docRef.update(object, {merge:true})
    setShowModal(prev => !prev)
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

const test = {

  bottom:50
  
  
      
}

  
  return (
    <div>
    {isWidget ? (
    
      showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <ModalContent>
              <form>
                  <h3>Device Form</h3>
                
                  <div style = {{float: "left"}}>
                  <label for = "deivceName"> Device Name </label>
                    <input
                    style = {{width: "600px", position : "relative"}}
                    //placeholder="Device name"
                    onChange={e => setDevice(e.target.value)}
                    type= "text" 
                    name = "deviceName"
                    id = "deviceName"
                   />
                  <button type = "button" onClick ={handleDeviceSave}>Save</button>
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

              
              <Form>
              <h5>Widget Form</h5>
              <ColoredLine color="lightGrey" />
              <h5 style = {{top:15, position: "relative"}}>Sensor Widget</h5>
              <br/>
              <br/>
          
            <Form.Group  controlId="exampleForm.ControlInput1">
              <Form.Label style={{fontSize:15}}>Widget Name</Form.Label>
              <Form.Control size ='sm' placeholder="Enter widget name" />
            </Form.Group>

         

          <Form.Group controlId="formGridAddress1">
            <Form.Label style={{fontSize:15}} >Data Source</Form.Label>
            <Form.Control size ='sm' placeholder="Enter data source" />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col}  controlId="formGridCity">
              <Form.Label style={{fontSize:15}}>Unit</Form.Label>
              <Form.Control size ='sm' placeholder = "Enter C,F, % etc" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label style={{fontSize:15}}>Location</Form.Label>
              <Form.Control size ='sm' as="select" defaultValue="Choose...">
                <option>Choose...</option>
                <option>Bedroom</option>
                <option>Kitchen</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label style={{fontSize:15}}>Max Value</Form.Label>
              <Form.Control size ='sm' />
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
</Form>
              {/* <form>
             
              <h3>Widget Form</h3>
              <ColoredLine color="lightGrey" />
                
                  <div style = {{float: "left"}}>
                  <h5 style = {{top:15, position: "relative"}}>Sensor Widget Form</h5>
                  <label style = {{ position: "relvative",marginTop:10, marginRight:500}} for = "widgetName"> Widget Name </label>
                    <input
                    style = {{width: "700px"}}
                    placeholder="Enter widget name"
                    //onChange={e => setDevice(e.target.value)}
                    type= "text" 
                    name = "widgetName"
                    id = "widgetName"
                   />

                <label style = {{ position: "relvative",marginTop:10, marginRight:500}} for = "datasource">DataSource ID</label>
                    <input
                    style = {{width: "700px"}}
                    placeholder="Enter datasource ID"
                    //onChange={e => setDevice(e.target.value)}
                    type= "text" 
                    name = "datasource"
                    id = "datasource"
                   /> 
                 
                   
              <label style = {{ position: "relvative",marginTop:20, marginRight: 700}} for = "favDest">Location: </label>
                    <select 
                    style = {{width:100}}
                    //value = {this.state.favDest}
                    name = "favDest"
                    onChange = {e => setLocation(e.target.value)}
                    >
                    <option value="">Location</option>
                    <option value="England">England</option>
                    <option value="Spain">Spain</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                </select>

                <label style = {{ verticalAlign:"top", marginRight: 20}} for = "unit">Unit</label>
                    <input
                    placeholder="Enter Unit"
                    //onChange={e => setDevice(e.target.value)}
                    type= "text" 
                    name = "unit"
                    id = "unit"
                   />
                   </div>
                 
                  
                </form> */}

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
    </div>
  );
  }