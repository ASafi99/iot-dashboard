import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from './Modal';
import styled from 'styled-components';

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
    textAlign: "center",
     
}



function Devices (){

   
        
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
      setShowModal(prev => !prev);

    }

       return(

            <>
           
            <h1 style = {title} >Devices </h1>

            <Button onClick={openModal} variant="primary" style = {pos}>Create Device</Button>
            <Modal showModal={showModal} setShowModal={setShowModal} />
    
            </>
        )
    }   

export default Devices
