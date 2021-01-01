import React, { useRef, useEffect, useCallback, useState} from 'react';
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

export const Modal = ({ showModal, setShowModal }) => {
  const modalRef = useRef();

  const [deviceName, setDevice] = useState("");
  const [user, setUser] = useState("");

  // const handleChange= (e) => {
        
  //   const{deviceName} = e.target

  //     setDevice(deviceName)
  // }

 
  const handleDeviceSave= () => {

   
    var rand = Math.floor(Math.random() * 101);  

    var docRef = fire.firestore().collection("users").doc(fire.auth().currentUser.uid)

    docRef.update({
      devices:{
      [deviceName] :{
        value: rand
      }}
      
    }) 

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

  return (
    <>
      {showModal ? (
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
                  </div>

                  <button type = "button" onClick ={handleDeviceSave}>Save</button>

                  <h3>{deviceName}</h3>
                   
                </form>

              </ModalContent>
              <CloseModalButton
                aria-label='Close modal'
                onClick={() => setShowModal(prev => !prev)}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};