import userEvent from '@testing-library/user-event';
import React, { Component, useState, useEffect} from 'react';
import fire from './fire';
import { Button } from 'react-bootstrap';
import { Modal } from './Modal';


export default function Widget (props) {

    const [showModal, setShowModal] = useState(false);

    const h1 = {
        left: "0",
        lineHeight: "200px",
        marginTop: "-100px",
        position: "absolute",
        textAlign: "center",
        top: "50%",
        width: "100%",
        
    }

    const title = {

        right: "500px",
        marginTop: "-150px",
        position: "absolute",
        textAlign: "center",
        top: "50%",
        width: "100%",
        fontSize:"30px",
    
    }

    const pos = {

        right: "100px",
        marginTop: "150px",
        position: "absolute",
        width: "10%",
        height: "8%",
        
         
    }
    
    const openModal = () => {
        setShowModal(prev => !prev);
  
      }

    return(
        <div>
    <h1 style = {title}>
   Device : {props.currentDevice}</h1>

   <Button onClick={openModal} variant="primary" style = {pos}>Add widget</Button>
            <Modal showModal={showModal} setShowModal={setShowModal} isWidget = {false} />
    </div>

    )
}

