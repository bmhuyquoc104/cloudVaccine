import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react"
import { Grid, Card, CardMedia, CardActionArea, CardActions, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import * as AWS from 'aws-sdk'

const useStyles = makeStyles((theme) => ({
  root:
  {
    flexGrow: 1,
  },
  paper:
  {
    height: 520,
    width: 300,
  },
  control:
  {
    padding: theme.spacing(2),
  },
  bot:
  {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  text:
  {
    color: 'white'
  }
}));

const configuration = {
    region: 'us-east-1',
    secretAccessKey: 'RijJPrAkst+a132dzazw+u9ssMWZsbttvvcVOE32',
    accessKeyId: 'AKIA4Y5CM62A3AGGGW2W'
}


AWS.config.update(configuration)

const docClient = new AWS.DynamoDB.DocumentClient()
const putData = (tableName, data) => {
    var params = {
        TableName: tableName,
        Item: data
    }

    docClient.put(params, function (err, data) {
        if (err) {
            console.log('Error', err)
        } else {
            console.log('Success', data)
        }
    })
}



export default function Vaccine() {
    const [vaccines, setVaccines] = useState([]);
    useEffect(() => {
        axios
            .get('https://75hpp2g9n5.execute-api.us-east-1.amazonaws.com/vac/vaccines')
            .then((res) => {
                setVaccines(res.data.Vaccines);
            })
            .catch((err) => console.error(err))
    }, []
    )
    console.log(vaccines)

   var click = false;
    const addLike = async (idx) =>{
        if(click === false ){
            vaccines[idx].like +=1;
            await putData('vaccine-covid',vaccines[idx]);
            console.log(vaccines[idx]);
            click = true;
        }
        else{
            vaccines[idx].like -=1;
            await putData('vaccine-covid',vaccines[idx]);
            console.log(vaccines[idx]);
            click = false;
        }
    }
  
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();

    return (
            <Grid container spacing={2} style={{paddingTop: "20px", paddingLeft: "50px", paddingRight: "50px"}} className={classes.root}>
              <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={spacing}>
                  {vaccines.map((vaccine, idx) => {
                    return (
                      <Grid key={`vaccine${idx}`} item>
                        <Card className={classes.paper}>
                          <CardActionArea>
                              <CardContent>
                                  <CardMedia image={'https://i.imgur.com/3kkytsv.png'} style={{ width: "250px", height: "300px", margin: "auto" }} alt="..."/>
                              </CardContent>
                          </CardActionArea>
                          
                          <CardContent className={classes.bot}>
                            <Typography className={classes.text}><b>{vaccine.name}</b></Typography>
                            <Typography className={classes.text}><b>ID:</b> {vaccine.id}</Typography>
                            <Typography className={classes.text}><b>Efficiency:</b> {vaccine.effecientcy}</Typography>
                            <Typography className={classes.text}><b>Like:</b> {vaccine.like}</Typography>
                            <Typography className={classes.text}><b>Country:</b> {vaccine.country}</Typography>
                            <IconButton onClick={() => addLike(idx)}>  
                              <FavoriteIcon className={classes.text}/>
                            </IconButton>
                          </CardContent>
                        </Card>
                      </Grid>
                    )
                  })}
                </Grid>
              </Grid>
            </Grid>
    );
}
