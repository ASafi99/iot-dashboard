import { AppBar, Toolbar, Typography, makeStyles, Button } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

export default function Header() {

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
          href: "/logout",
        },
       
      ];

    const useStyles = makeStyles(() => ({
        header: {
          backgroundColor: "lightBlue",
          height: 50,
          paddingRight: "79px",
          paddingLeft: "118px",
          
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
        return headersData.map(({ label, href }) => {
          return (
            <Button
              {...{
                key: label,
                color: "inherit",
                to: href,
                component: RouterLink,
                className: menuButton
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
              <Typography className = {logo}>
              IOT Dashboard
                  </Typography>

                <div>{headerButtons()}  </div>               
            </Toolbar>
                  
        </AppBar>
    </header>
  );
}