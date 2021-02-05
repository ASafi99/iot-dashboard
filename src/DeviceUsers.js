import React, { Component, useState, useEffect} from 'react';
import { Modal } from './Modal';
import { Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {fire, otherApp} from './fire';

export default function DeviceUsers (props) {

    const [showModal, setShowModal] = useState(false);

    const title = {

        right: "500px",
        marginTop: "-150px",
        position: "absolute",
        textAlign: "center",
        top: "50%",
        width: "100%",
        fontSize:"30px",
    
    
    }

    const buttonPos = {

        position: "absolute",
        top:140,
        right: 180,
        width: "10%",
        height: "8%",       
         
    }
    const openModal = () => {
        setShowModal(prev => !prev);
  
      }

    return(
        <>
        <h5 style = {title}>
        Device: <p style = {{display: "inline", backgroundColor:"blue", color:"white", borderRadius: "6px"}}>{props.currentDevice}</p>
        </h5>

    <Button onClick={openModal} variant="primary" style = {buttonPos} >Add User</Button>
    <Modal showModal={showModal} setShowModal={setShowModal} isManageUser = {true} currentDevice = {props.currentDevice} />

</>
    )
}