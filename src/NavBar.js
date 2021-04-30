import { AppBar, Toolbar, makeStyles, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Route,  HashRouter, NavLink } from "react-router-dom";
import {MdDashboard, MdDevicesOther, MdLocationSearching} from "react-icons/md";
import {FiUsers} from "react-icons/fi"
import Dashboard from "./Dashboard";
import Users from "./Users";
import Devices from "./Devices.js"
import {fire} from './fire';



export default function Header() {

    const headersData = [

        {
            label: "Dashboard",
            href:  "/Dashboard",
            icon:  <MdDashboard/> ,
          },
        {
          label: "Devices",
          href: "/Devices",
          icon: <MdDevicesOther/>,
        },
        {
          label: "Locations",
          href: "/locations",
          icon: <MdLocationSearching/>
        },
       
        {

        label: "Users",
          href: "/users",
          icon: <FiUsers/>,
        },
       
      ];

    const useStyles = makeStyles(() => ({
        header: {
          backgroundColor: "white",
          height: 50,
         // marginLeft: 50,
          marginRight:0,
          marginTop:50,
          color:"black",
          boxShadow: "0px 0px 0px 0px",
          borderBottom: "2px solid #d6d6d6",
          position:"fixed",
          zIndex:-1
          
        },
        
        menuButton: {
          fontFamily: "Open Sans, sans-serif",
          fontWeight: 700,
          size: "18px",
          paddingBottom: 10,
          marginLeft: "38px",

          '&:hover': {         
            color:"lightBlue"
          }
          
       },

       toolbar: {
        display: "flex",
        
      },

      }));

      const { header, menuButton,toolbar} = useStyles();

      const headerButtons = () => {
        return headersData.map(({ label, href, icon }) => {
          return (
            <Button
              {...{
                key: label,
                color: "inherit",
                to: href,
                component: NavLink,
                className: menuButton,
                startIcon:icon,
                              
              }}
            >
              {label}
            </Button>
          );
        });
      };

      const content = {
        backgroundColor: "black",
        padding: "50px", 
        color:"blue",
        size:"50px",

        '& h1':{
          color:"blue"
      }
        
      }

      const [accountType, setAccountType] = useState ("")
      const [email, setEmail] = useState ("")
      useEffect(() => {   
        
        fire.firestore().collection("users").doc(fire.auth().currentUser.uid).get().then(function(doc) {

          setAccountType(doc.data().userInfo.accountType)
          setEmail(doc.data().userInfo.email)
      
      })
<<<<<<< HEAD
    },[])
=======
    })
>>>>>>> 1b65389a5d16572d01440e110d72057c61f6caae

      
  return (
  
    <HashRouter>
    <div>
    
      <AppBar className={header}>
          <Toolbar className={toolbar}>
                
                <div>{headerButtons()}</div>
                <p style={{ position: "absolute", right:100, fontWeight: 700, bottom:5}}>Logged in as: {email} ({accountType})</p>
            </Toolbar> 
                            
        </AppBar> 

    <div className = {content}>
    <Route exact path="/" component={Dashboard}/>
    <Route path="/Dashboard" component={Dashboard}/> 
    <Route path="/devices" component={Devices}/>     
    <Route path="/users" component={Users}/>  
    </div>     
    </div>
  </HashRouter>  

 
 )
}





