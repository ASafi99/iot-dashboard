import React, { Component } from 'react';
import fire from './fire';

class Dashboard extends Component {

    state = {
        temp: [],
        switch: [],
   
    }

    componentWillMount(){
        /* Create reference to messages in Firebase Database */
        let switchRef = fire.database().ref('switch')
        let temps = []
        switchRef.on("value", snap => {
          /* Update React state when message is added at Firebase Database */
           temps.push(snap.val())
          this.setState({ temp: temps });
        })
      }
    // Get a reference to the database service
    
    render (){

        const body = {
            backgroundColor:"#696969"
        }
        const card = {
            margin: "0 auto", 
            float: "none", 
            marginBottom: "10px",
            marginTop: "50px"
        }

        const h1 = {
            left: "0",
            lineHeight: "200px",
            marginTop: "-100px",
            position: "absolute",
            textAlign: "center",
            top: "50%",
            width: "100%",
        }

        const {temp} = this.state
        return(

        //     <div className = "body">
        //     <div className="row">
        //     <div className="col-sm-6"> 
        //         <div className="card text-white bg-warning mb-3" style="max-width: 18rem;">
        //             <div style="fontSize: 20px;" className="card-header">Temperature</div>
        //             <div className="card-body">
        //                 <h1 id="temperature" style="font-size: 75px;" className="card-title">{temp}°C</h1>
        //                 <p className="card-text">Temperature expressed in Celsius degree.</p>
        //             </div>
        //         </div>
        //     </div>
        //     <div className="col-sm-6"> 
        //         <div className="card text-white bg-primary mb-3" style="max-width: 18rem;">
        //             <div style="font-size: 20px;" class="card-header">Humidity</div>
        //             <div className="card-body">
        //                 <h1 id="humidity" style="font-size: 75px;" className="card-title"><span>{temp}%</span></h1>
        //                 <p className="card-text">Relative humidity, expressed in percentage.</p>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        // </div>

        <h1 style = {h1}>{temp.map(temps => <div>{temps.value}°C</div>)}</h1>
        )
        }
    }

    export default Dashboard

  
  
        
      

        