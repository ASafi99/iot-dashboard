import {React, useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import zIndex from '@material-ui/core/styles/zIndex';
import {fire} from './fire';
import { FaEye, FaTrashAlt} from 'react-icons/fa';
import firebase from 'firebase/app'


const useStyles = makeStyles({
  root: {
    minWidth:225,
    marginTop: "210px",
    position: "absolute",
    marginLeft:"30px",
    zIndex: -10,
    maxWidth:230
  },
  
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();

 const [created, setCreated] = useState(props.created)
 

 const{device} = props
  
  const sendData = (device) => {
    props.showPage(false)

    props.currentDevice(device)
      
}


  useEffect(() => {
  
    let elements1 =[]

    var options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
  };

  fire.firestore().collection("users").doc(fire.auth().currentUser.uid).get().then(function(doc) {
        
    let accountType = doc.data().userInfo.accountType;
    let docRef

    if(accountType=== "IoT Owner" || accountType === "IoT User" ){

      let ref = doc.data().userInfo.ref;
       docRef = fire.firestore().collection("users").doc(ref)
    } else{
      docRef = fire.firestore().collection("users").doc(fire.auth().currentUser.uid)

    }
    
    docRef.get().then((doc) =>{

     elements1.push(doc.data().devices[device].deviceInfo.created.toDate().toLocaleDateString('en',options).toString())

     setCreated(elements1)
     
    })
  })

},[device])

  const removeField = (device) => {

  var docRef = fire.firestore().collection('users').doc(fire.auth().currentUser.uid);

  docRef.update({

    [`devices.${device}`]: firebase.firestore.FieldValue.delete()
});

}

  
  return (
    <Card >
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>  
        </Typography>
        <Typography variant="h5" component="h2">
       <h5 style = {{ backgroundColor:"blue", color:"white", borderRadius: "6px"}}>  {device} </h5>
        </Typography>
        <Typography variant="body2" component="p">
        <h6>Created on: {created}</h6>
        </Typography>
      </CardContent>
      <CardActions>
        <Button  onClick = {()=>{
         sendData(device)
           }}> {<FaEye/>}</Button>
           <Button onClick = {() => {if(window.confirm('Are you sure you want to delete this device?'))removeField(device)}}>{<FaTrashAlt/>}</Button>

      </CardActions>
    </Card>

    
  );
}

