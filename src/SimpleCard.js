import {React, useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import zIndex from '@material-ui/core/styles/zIndex';
import fire from './fire';
import Widget from './widgets.js'



const useStyles = makeStyles({
  root: {
    minWidth:225,
    marginTop: "220px",
    position: "absolute",
    marginLeft:"50px",
    zIndex: -10
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
  const [deviceState , setDeviceState] = useState(props.device)
  const [showPage, setPage] = useState (props.showPage)
  
  
  const sendData = () => {
    props.showPage(setPage(!showPage))

    let elements =[]
    fire.firestore().collection("users").doc(fire.auth().currentUser.uid).get().then((doc) =>{

     elements.push(doc.data()[device].deviceName)

     props.currentDevice(elements)
    })
}


  useEffect(() => {
    setDeviceState(props.device);
    setPage(props.showPage)


}, [props.device, props.showPage])

  const{device} = props
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        <div><li>{device}</li></div>
        </Typography>
        <Typography variant="h5" component="h2">
       {device}
        </Typography>
        <Typography variant="body2" component="p">
         
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick = {()=>{

         sendData()

         // updates[field_id] = fire.firestore().FieldValue.delete()
      

           }}>VIEW</Button>

      </CardActions>
    </Card>

    
  );
}

