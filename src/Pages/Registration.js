// AWS STARTS
import * as AWS from 'aws-sdk'
import RegistrationModal from '../Components/Modal/RegistrationModal';

import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@material-ui/core/Button';


// Icons
import SendIcon from '@material-ui/icons/Send';

// For cards
import { Grid, Card, CardActionArea, CardActions, CardContent, Typography, CardHeader} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  control: {
    padding: theme.spacing(2),
  },
  button: {
      margin: theme.spacing(1),
  },
  bot:
  {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  icon:
  {
      color: theme.palette.background.default,
  },
  info:
  {
    marginTop: "10px",
    paddingLeft: "20px",
    paddingRight: "20px",
  }
}));

const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./lib/sesClient.js");




const configuration = {
  region: 'us-east-1',
  secretAccessKey: 'RijJPrAkst+a132dzazw+u9ssMWZsbttvvcVOE32',
  accessKeyId: 'AKIA4Y5CM62A3AGGGW2W',
  smtpUsername: 'AKIA4Y5CM62A5U2RIQUR',
  smtpPassword: 'BFid+bWD5no2D1a7gkUoBibbP4rFaDt5EUbIGtcPELjA'
}
AWS.config.update(configuration)

var ses = new AWS.SES();

// AWS ENDS

export default function Registration() {

  const [registrations, setRegistrations] = useState([]);
  useEffect(() => {
    axios
      .get('https://bys39xubeg.execute-api.us-east-1.amazonaws.com/reg/registers')
      .then((res) => {
        setRegistrations(res.data.Registers);

      })
      .catch((err) => console.error(err))
  }, []
  )


  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  return (
    <div>
      <Grid
      container
      spacing={2}
      style={{paddingTop: "20px", paddingLeft: "50px", paddingRight: "50px"}}
      className={classes.root}
      justifyContent="center"
      >
          <Grid item xs={12}>
            <Card
            className={classes.paper}
            style={{ border: "none", boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)", borderRadius: "15px",}}
            >
              <CardHeader
                className={classes.bot}
              />
              <CardActionArea>
                <CardContent>
                    <Typography color="secondary" variant="h4" style={{marginTop: "10px", paddingLeft: "10px"}}><b>Benefits of Getting a COVID-19 Vaccine</b></Typography>

                    <Typography color="secondary" variant="h6" style={{marginTop: "10px", paddingLeft: "10px"}}><b>Benefits of Getting a COVID-19 Vaccine</b></Typography>
                    <Typography variant="body1" className={classes.info}>COVID-19 vaccines were developed using science that has been around for decades.</Typography>
                    <Typography variant="body1" className={classes.info}>COVID-19 vaccines have received and continue to undergo the most intensive safety monitoring in U.S. history.
                     Learn more about how federal partners are ensuring COVID-19 vaccines work.</Typography>
                    <Typography variant="body1" className={classes.info}>COVID-19 vaccines are not experimental. They went through all the required stages of clinical trials.
                     Extensive testing and monitoring have shown that these vaccines are safe and effective.</Typography>

                    <Typography color="secondary" variant="h6" style={{marginTop: "10px", paddingLeft: "10px"}}><b>COVID-19 vaccines are effective</b></Typography>
                    <Typography variant="body1" className={classes.info}>COVID 19-vaccines are effective. They can keep you from getting and spreading the virus that causes COVID-19.</Typography>
                    <Typography variant="body1" className={classes.info}>COVID-19 vaccines also help keep you from getting seriously ill even if you do get COVID-19.</Typography>
                    <Typography variant="body1" className={classes.info}>Getting vaccinated yourself may also protect people around you, particularly people at increased risk for severe
                     illness from COVID-19.</Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.bot}>
                <Button
                size="medium"
                endIcon={<SendIcon/>}
                className={classes.icon}
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
            <br></br>
            <RegistrationModal />
        </Grid>
      </Grid>
    </div>
  );
}