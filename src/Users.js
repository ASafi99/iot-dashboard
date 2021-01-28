import React, { Component, useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from './Modal';

export default function Users () {

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
        marginTop: "140px",
        position: "absolute",
        width: "10%",
        height: "8%",
    }

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(prev => !prev);
  
      }
  

    return(
        <>
        <h2 style = {title} >Users </h2>

        <Button onClick={openModal} variant="primary" style = {pos}>Add users</Button>
        <Modal showModal={showModal} setShowModal={setShowModal} isUser= {true} /> 

        </>
    )
}