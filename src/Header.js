import { AppBar, Toolbar, Typography, makeStyles, Button } from "@material-ui/core";
import React from "react";
import {BrowserRouter, Link as RouterLink } from "react-router-dom";


export default function Header({handleLogOut}) {

    const headersData = [

        {
            label: "Home",
            href: "/home",

          },
        {
          label: "My Account",
          href: "/account",
        },
        {
          label: "Log Out",
          href: "/Login",
          onClick: handleLogOut,
        },
       
      ];

    const useStyles = makeStyles(() => ({
        header: {
          backgroundColor: "deepskyblue",
<<<<<<< HEAD
=======
          height: 50,
>>>>>>> 1b65389a5d16572d01440e110d72057c61f6caae
          paddingRight: "79px",
          paddingLeft: "118px",
          zIndex:-1,
          
        },
        logo: {
          fontFamily: "Work Sans, sans-serif",
          fontWeight: 600,
          color: "#FFFEFE",
          textAlign: "left",
          paddingBottom: 10
        },

        menuButton: {
          fontFamily: "Open Sans, sans-serif",
          fontWeight: 700,
          size: "18px",
          paddingBottom: 10,
          marginLeft: "38px",
         
          
       },

       toolbar: {
        display: "flex",
       justifyContent: "space-between",
      },

      }));

      const { header, logo, menuButton,toolbar} = useStyles();

      const headerButtons = () => {
        return headersData.map(({ label, href, onClick }) => {
          return (
            <Button
              {...{
                key: label,
                color: "inherit",
                to: href,
                component: RouterLink,
                className: menuButton, 
                onClick: onClick,
              }}
            >
              {label}
            </Button>
          );
        });
      };

  return (
    <>
    <header>
      <BrowserRouter>
      <AppBar className={header}>
          <Toolbar className={toolbar}>
              <Typography className = {logo}>
              IOT Dashboard
                  </Typography>

                <div>{headerButtons()} </div>               
            </Toolbar>
                  
        </AppBar>
        </BrowserRouter>
    </header>
    </>
  );
}