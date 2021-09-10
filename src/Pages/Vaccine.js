import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

// Modal
import VaccineModal from '../Components/Modal/VaccineModal';

// For cards
import { Grid, Card, CardMedia, CardActionArea, CardContent, Typography } from '@material-ui/core'

// For button
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';

import * as AWS from 'aws-sdk'
import { v4 as uuid } from 'uuid';

const useStyles = makeStyles((theme) => ({
  root:
  {
    flexGrow: 1,
  },
  paper:
  {
    width: "24vw",
    height: "59vh"
  },
  control:
  {
    padding: theme.spacing(2),
  },
  bot:
  {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    height: "59vh"
  },
  text:
  {
    color: 'white',
    fontSize: "1rem"
  },
  headText:
  {
    color: '#7F53AC',
    fontSize: "1.25rem"
  },
  divider:
  {
    background: theme.palette.secondary.main,
    margin: "3vh"
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
  var allHeartContainers = document.getElementsByClassName("MuiButton-label");

  // <button class="MuiButtonBase-root MuiIconButton-root" tabindex="0" type="button"><span class="MuiIconButton-label"><svg class="MuiSvgIcon-root makeStyles-text-23" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg></span><span class="MuiTouchRipple-root"></span></button>
  const addLike = async (idx) => {
    if (click === false) {
      vaccines[idx].like += 1;
      allHeartContainers[idx].innerHTML = '<span class="MuiButton-startIcon MuiButton-iconSizeLarge"><svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg></span>' + vaccines[idx].like;
      await putData('vaccine-covid', vaccines[idx]);
      console.log(vaccines[idx]);
      click = true;
    }
    else {
      vaccines[idx].like -= 1;
      allHeartContainers[idx].innerHTML = '<span class="MuiButton-startIcon MuiButton-iconSizeLarge"><svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg></span>' + vaccines[idx].like;
      await putData('vaccine-covid', vaccines[idx]);
      console.log(vaccines[idx]);
      click = false;
    }
  }


  const checked = React.useState(true);
  const [spacing, setSpacing] = React.useState(6);
  const classes = useStyles();


  return (
      <Grid container spacing={6} style={{ paddingTop: "20px"}} className={classes.root}>
        <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <VaccineModal />
          <Grid container justifyContent="center" spacing={spacing}>
            {vaccines.map((vaccine, idx) => {
              return (
                <Grid key={`vaccine${idx}`} item>
                  
                  <Fade in={checked} {...(checked ? { timeout: 1000 } : {})}>
                  <Card
                    className={classes.paper}
                    style={{ border: "none", boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)", borderRadius: "15px", }}>

                  {/* <CardActionArea style={{padding:0}}>
                      <CardContent> */}
                  <CardMedia image={vaccine.img} style={{ width: "24vw", height: "30vh", margin: "auto" }} alt="..." />
                    {/* </CardContent>
                  </CardActionArea> */} 

                    <CardContent className={classes.bot}>
                      <Typography className={classes.headText}><b>{vaccine.name}</b></Typography>
                      <Typography className={classes.text}><b>ID:</b> {vaccine.id}</Typography>
                      <Typography className={classes.text}><b>Efficiency:</b> {vaccine.effecientcy}</Typography>
                      <Typography className={classes.text}><b>Country:</b> {vaccine.country}</Typography>
                      <Button
                          size="large"
                          startIcon={<FavoriteIcon/>}
                          className={classes.text}
                          onClick={() => addLike(idx)}
                      >
                          {vaccine.like}
                      </Button>
                    </CardContent>
                  </Card>
                  </Fade>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
      </Grid>
  );
}
