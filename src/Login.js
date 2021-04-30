<<<<<<< HEAD

=======
>>>>>>> 1b65389a5d16572d01440e110d72057c61f6caae
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
            <h4 style = {{color:"white"}}>Welcome to IOT Dashboard</h4>

<<<<<<< HEAD
            <h6 style = {{color:"white"}}>Please sign in or create an account to continue!</h6>
                <label>Username</label>
                <input 
                type = "text" 
=======
            <h6 style = {{color:"white"}}>Please login or create an account to continue!</h6>
                <label for = "Username">Username</label>
                <input 
                type = "text" 
                id = "Username"
>>>>>>> 1b65389a5d16572d01440e110d72057c61f6caae
                autoFocus 
                required 
                value = {email}
                onChange ={(e) => setEmail(e.target.value)}/>
            
<<<<<<< HEAD
            <p className = "errorMsg">{emailError}</p>
            
            <label>Password</label>
                <input 
                type = "password" 
=======
            <p className = "errorMsg" data-testid = "emailerror">{emailError}</p>
            
            <label for = "Password">Password</label>
                <input 
                type = "password" 
                id = "Password"
>>>>>>> 1b65389a5d16572d01440e110d72057c61f6caae
                required 
                value = {password} 
                onChange ={(e) => setPassword(e.target.value)}/>

<<<<<<< HEAD
                <p className = "errorMsg">{passwordError}</p>
=======
                <p className = "errorMsg" data-testid = "pwerror">{passwordError}</p>
>>>>>>> 1b65389a5d16572d01440e110d72057c61f6caae

                <div className = "btnContainer">
                    {hasAccount ?(

                        <>
                        
<<<<<<< HEAD
                         <ButtonLoader handleLogin = {handleLogin} text = "Signing In" text1 = "Sign In"/>
=======
                         <button onClick = {handleLogin} text = "Signing In" text1 = "Sign In" id = "but"  >Sign In</button>
>>>>>>> 1b65389a5d16572d01440e110d72057c61f6caae
                        <p>Don't have an account? 
                            <span onClick = {() => setHasAccount (!hasAccount)}>Sign Up </span>
                        </p>
                        </>

                    ) :(
                        <>
                        <h6 style = {{color:"white"}}>By clicking on "Signup" below, you are agreeing to the <button className = "privacy" onClick = {togglePopup}>Privacy Policy</button> </h6>
                        {show ?  
                        <Policy  
                                 
                                closePopup={togglePopup}  
                        />  
                        : null  
                        }  
                        <div style = {{position: "relative", top:20}}>
                        
<<<<<<< HEAD
                         <ButtonLoader handleLogin = {handleSignup} text = "Signing Up" text1 = "Sign Up"/>
=======
                         <button onClick = {handleLogin} text = "Signing Up" text1 = "Sign Up"  id = "but" value = "Sign Up">Sign Up</button>
>>>>>>> 1b65389a5d16572d01440e110d72057c61f6caae
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