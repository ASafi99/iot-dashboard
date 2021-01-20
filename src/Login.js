import React from "react"
import ButtonLoader from "./ButtonLoader";

const Login = (props) => {

    const {email,setEmail,password,setPassword,handleLogin,handleSignup,hasAccount,setHasAccount,emailError,passwordError} = props;

    return(
        <section className="login">
            
            <div className= "loginContainer">
            <h4>Welcome to IOT Dashboard</h4>
                <label>Username</label>
                <input 
                type = "text" 
                autoFocus 
                required 
                value = {email}
                onChange ={(e) => setEmail(e.target.value)}/>
            
            <p className = "errorMsg">{emailError}</p>
            
            <label>Password</label>
                <input 
                type = "password" 
                required 
                value = {password} 
                onChange ={(e) => setPassword(e.target.value)}/>

                <p className = "errorMsg">{passwordError}</p>

                <div className = "btnContainer">
                    {hasAccount ?(

                        <>
                        {/* <button onClick = {handleLogin}>Sign In</button> */}
                        <ButtonLoader handleLogin = {handleLogin} text = "Signing In" text1 = "Sign In"/>
                        <p>Don't have an account? 
                            <span onClick = {() => setHasAccount (!hasAccount)}>Sign Up </span>
                        </p>
                        </>

                    ) :(

                        <>
                         <ButtonLoader handleLogin = {handleSignup} text = "Signing Up" text1 = "Sign Up"/>
                        <p>Have an account ? 
                            <span onClick = {() => setHasAccount (!hasAccount)}>Sign in</span>
                        </p>
                        </>
                    )}
            </div>
            </div>
        </section>

    )
}

export default Login