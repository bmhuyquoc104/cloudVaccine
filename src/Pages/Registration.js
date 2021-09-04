// AWS STARTS
import * as AWS from 'aws-sdk'
import RegistrationModal from '../Components/Modal/RegistrationModal';

import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react"

import 'bootstrap/dist/css/bootstrap.min.css';
// const { SendEmailCommand } = require("@aws-sdk/client-ses");
// const { sesClient } = require("./lib/sesClient.js");

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
  
  return (
    <div className="Registration">
      <RegistrationModal />
    </div>
  );
}