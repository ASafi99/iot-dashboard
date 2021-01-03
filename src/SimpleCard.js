import {React, useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import zIndex from '@material-ui/core/styles/zIndex';

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
  const [deviceState , setDeviceState] = useState(props)

  useEffect(() => {
    setDeviceState(props);
}, [props])


  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        <div><li>{props.device}</li></div>
        </Typography>
        <Typography variant="h5" component="h2">
       {props.device}
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

