import userEvent from '@testing-library/user-event';
import React, { Component, useState, useEffect} from 'react';
import fire from './fire';
import user from './User.js'


export default function Widget (props) {

    const h1 = {
        left: "0",
        lineHeight: "200px",
        marginTop: "-100px",
        position: "absolute",
        textAlign: "center",
        top: "50%",
        width: "100%",
        
    }

    return(
        <div>
    <h1 style = {h1}>
    {props.currentDevice}</h1>
    <h1 >
    {props.currentDevice}</h1>
    </div>

    )
}

