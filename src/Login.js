import React, {  useState} from "react"
import ButtonLoader from "./ButtonLoader";
import Policy from "./Policy"

const Login = (props) => {

    const [show, setShow] = useState(false);

    const {email,setEmail,password,setPassword,handleLogin,handleSignup,hasAccount,setHasAccount,emailError,passwordError} = props;

   const togglePopup = () => {

        setShow(prev => !prev)

         }  

    return(
        <section className="login">
            
            <div className= "loginContainer">
            <h4>Welcome to IOT Dashboard</h4>

            <h6>Please sign in or create an account to continue!</h6>
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
                        
                         <ButtonLoader handleLogin = {handleLogin} text = "Signing In" text1 = "Sign In"/>
                        <p>Don't have an account? 
                            <span onClick = {() => setHasAccount (!hasAccount)}>Sign Up </span>
                        </p>
                        </>

                    ) :(
                        <>
                        <h6>By clicking on "Signup" below, you are agreeing to the <button className = "privacy" onClick = {togglePopup}>Privacy Policy</button> </h6>
                        {show ?  
                        <Policy  
                                 
                                closePopup={togglePopup}  
                        />  
                        : null  
                        }  
                        <div style = {{position: "relative", top:20}}>
                        
                         <ButtonLoader handleLogin = {handleSignup} text = "Signing Up" text1 = "Sign Up"/>
                        <p>Have an account ? 
                            <span onClick = {() => setHasAccount (!hasAccount)}>Sign in</span>
                        </p>
                        </div>
                        </>
                    )}
            </div>
            </div>
        </section>

    )
}

export default Login