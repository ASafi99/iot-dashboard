import { AppBar, Toolbar, makeStyles, Button } from "@material-ui/core";
import React from "react";
import { Link,  BrowserRouter, Route, Switch, HashRouter, NavLink } from "react-router-dom";
import {MdDashboard, MdDevicesOther, MdLocationSearching} from "react-icons/md";
import {FiUsers} from "react-icons/fi"
import Dashboard from "./Dashboard";
import App from "./App"
import Devices from "./Devices.js"


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
          backgroundColor: "transparent",
          height: 50,
          marginLeft: 50,
          marginRight:0,
          marginTop:55,
          color:"black",
          boxShadow: "0px 0px 0px 0px",
          borderBottom: "2px solid #d6d6d6"
          
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


      
  return (
  
    <HashRouter>
    <div>
    
      <AppBar className={header}>
          <Toolbar className={toolbar}>
                
                {headerButtons()}
                            
            </Toolbar>                 
        </AppBar> 

    <div className = {content}>
    <Route exact path="/" component={Dashboard}/>
    <Route path="/Dashboard" component={Dashboard}/> 
    <Route path="/devices" component={Devices}/>     
    </div>     
    </div>
  </HashRouter>  

 
 )
}





