import React, { Component} from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Devices extends Component {

    
  
    render (){

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

        return(
            <div>
            <h1 style = {title} >Devices </h1>

            <Button variant="primary" style = {pos}>Primary</Button>
    
        </div>
        )
    }   
}

export default Devices
