import React from 'react';  
import './User.css'

const Policy = (props) => {
 
return (  
<div className='popup'>  
<div className='inner'>  
<h5>Privacy Policy</h5>
<p style = {{color: "black", fontSize:14, position: "relative", maxWidth: "660px", textAlign: "left"}}>
This privacy notice applies solely to information collected by this website. It will notify you of the following:

What personally identifiable information is collected from you through the website, how it is used and with whom it may be shared.
What choices are available to you regarding the use of your data.
The security procedures in place to protect the misuse of your information.
How you can correct any inaccuracies in the information.
Information Collection, Use, and Sharing 
We are the sole owners of the information collected on this site. We only have access to/collect information that you voluntarily give us via email or other direct contact from you. We will not sell or rent this information to anyone.

We will use your information to respond to you, regarding the reason you contacted us. We will not share your information with any third party outside of our organization, other than as necessary to fulfill your request, e.g. to ship an order.

Your Access to and Control Over Information 
You may opt out of any future contacts from us at any time. You can do the following at any time by contacting us via the email address or phone number given on our website:

See what data we have about you, if any.
Change/correct any data we have about you.
Have us delete any data we have about you.
Express any concern you have about our use of your data.
Security 
We take precautions to protect your information. When you submit sensitive information via the website, your information is protected both online and offline.

While we use encryption to protect sensitive information transmitted online, we also protect your information offline. Only employees who need the information to perform a specific job (for example, billing or customer service) are granted access to personally identifiable information. The computers/servers in which we store personally identifiable information are kept in a secure environment.
</p>  
 <button style = {{width:"20%"}} onClick={props.closePopup}>Close</button>   
</div>  
</div>  
); 
}  


export default Policy;