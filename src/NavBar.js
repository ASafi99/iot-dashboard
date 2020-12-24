import { AppBar, Toolbar, makeStyles, Button } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {MdDashboard, MdDevicesOther, MdLocationSearching} from "react-icons/md";
import {FiUsers} from "react-icons/fi"

export default function Header(props) {

    const headersData = [

        {
            label: "Dashboard",
            href: "/dashboard",
            icon:  <MdDashboard/> ,
          },
        {
          label: "Devices",
          href: "/devices",
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
          color:"grey",
          boxShadow: "0px 0px 0px 0px"
          
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

      const { header, logo, menuButton,toolbar} = useStyles();

      const headerButtons = () => {
        return headersData.map(({ label, href, icon }) => {
          return (
            <Button
              {...{
                key: label,
                color: "inherit",
                to: href,
                component: RouterLink,
                className: menuButton,
                startIcon:icon,
                              
              }}
            >
              {label}
            </Button>
          );
        });
      };

  return (
    <header>
      <AppBar className={header}>
          <Toolbar className={toolbar}>
                {headerButtons()}  
                         
            </Toolbar>
                  
        </AppBar>
    </header>
  );
}